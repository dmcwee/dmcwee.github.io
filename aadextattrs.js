if(typeof Msal === 'undefined') {
    console.log("Msal Undefined");
}

const msalConfig = {
    auth: {
        clientId: '694b1abe-b0ec-409e-96a6-6764257f532c',
        redirectUri: 'https://mcweestaticwebs.z13.web.core.windows.net/aadextattrs.html'
        //redirectUri: 'https://dmcwee.github.io/aadextattrs.html'
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

const loginRequest = {
    scopes: ["openid", "user.read.all", "Directory.Read.All"],
    forceRefresh: false
};

const myMsalObj = new Msal.UserAgentApplication(msalConfig);
myMsalObj.handleRedirectCallback(authCallback);

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

function getUsers() {
    myMsalObj.acquireTokenSilent(loginRequest).then((response) => {
        console.log("response returned");
        var url = "https://graph.microsoft.com/v1.0/users?$select=userPrincipalName,displayName,jobTitle,mail,onPremisesExtensionAttributes";
        var selectParams = $("#selectParameters").val();
        if(selectParams != "") {
            url = url + "," + selectParams;
        }
        $.ajax({
            headers: {"Authorization": "Bearer " + response.accessToken},
            url: url
            //url: "https://graph.microsoft.com/v1.0/users"
        })
        .done(function(data) {
            console.log("response: " + JSON.stringify(data));
            $("#userTableHeader").next("tr").remove();

            data.value.forEach(function(user, idx){
                extStr = "";
                if(user.onPremisesExtensionAttributes != null) {
                    for(var extAttr in user.onPremisesExtensionAttributes) {
                        extStr += "<span class='col-sm-3'>" + extAttr + ": " + user.onPremisesExtensionAttributes[extAttr] + "</span>";
                    }
                }
                $("#userTableHeader").after("<tr><td>" + user.userPrincipalName + 
                    "</td><td>" + user.displayName + 
                    "</td><td>" + user.jobTitle + 
                    "</td><td>" + user.mail + 
                    "</td></tr><tr><td>&nbsp;</td><td colspan='3'>" + extStr + "</td></tr>");
            });
        })
        .fail(function(){
            console.log("request failed");
        });
    });
}

if(myMsalObj.getAccount() && ! myMsalObj.isCallback(window.location.hash)) {
    console.log("WELCOME: " + JSON.stringify(myMsalObj.getAccount()));
}

$(document).ready(function(){
    $("#doCheck").click(function() {
        getUsers();
        return false;
    });
    getUsers();
});