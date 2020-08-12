if(typeof Msal === 'undefined') {
    console.log("Msal Undefined");
}

const msalConfig = {
    auth: {
        clientId: '6b07b38b-35f0-483f-a053-34bc72593efb',
        redirectUri: 'https://mcweestaticwebs.z13.web.core.windows.net/aadspa.html'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

const loginRequest = {
    scopes: ["openid","SecurityEvents.Read.All", "SecurityEvents.ReadWrite.All", "user.read.all", "Directory.Read.All", "RoleManagement.Read.Directory"],
    forceRefresh: false
};

const myMsalObj = new Msal.UserAgentApplication(msalConfig);

function authCallback(error, response) {
    if(error) {
        console.log("Error: " + error);
    }
    else {
        if(response.tokenType === "id_token" && myMsalObj.getAccount() && !myMsalObj.isCallback(window.location.hash)) {
            console.log("id_token acquired");
        }
        else if(response.tokenType === "access_token") {
            console.log("access token acquired");
        }
        else {
            console.log("token of type: " + response.tokenType);
        }
    }
}

function signIn(method) {
    if(method === "loginPopup") {
        myMsalObj.loginPopup(loginRequest)
            .then(loginResponse => {
                console.log(JSON.stringify(loginResponse));
                if(myMsalObj.getAccount()) {
                    console.log("Welcome " + JSON.stringify(myMsalObj.getAccount()));
                }
            })
            .catch (function (error) {
                console.log("Sign In Error: " + JSON.stringify(error));
            });
    }
    else if(method === "loginRedirect") {
        myMsalObj.loginRedirect(loginRequest);
    }
}

function getTokenPopup(request) {
    return myMsalObj.acquireTokenSilent(request).catch(error => {
        console.log("silent token acquisition failed.  using popup");
        return myMsalObj.acquireTokenPopup(request).then(tokenResponse => {
            console.log("token acquired silently with popup. " + JSON.stringify(tokenResponse));
            return tokenResponse;
        }).catch(error => {
            console.log("token popup failure: " + JSON.stringify(error));
        });
    });
}

function getTokenRedirect(request) {
    return myMsalObj.acquireTokenSilent(request).then((response) => {
        console.log("response: " + JSON.stringify(response));
        return response;
    }).catch(error => {
        console.log("silent token acquisition failure. using redirect");
        return myMsalObj.acquireTokenRedirect(request);
    });
}

function getSecureScores() {
    myMsalObj.acquireTokenSilent(loginRequest).then((response) => {
        console.log("response returned");
        $.ajax({
            headers: {"Authorization": "Bearer " + response.accessToken},
            url: "https://graph.microsoft.com/beta/security/secureScores"
        })
        .done(function(data) {
            console.log("response: " + JSON.stringify(data));
        })
        .fail(function(){
            console.log("request failed");
        });
    });
}

if(myMsalObj.getAccount() && ! myMsalObj.isCallback(window.location.hash)) {
    console.log("WELCOME: " + JSON.stringify(myMsalObj.getAccount()));
}