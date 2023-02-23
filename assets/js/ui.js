$(document).ready(function() {
    $('form').on('submit', function(event) {
        console.debug("Submit");
        return false;
    });
});

function checkTenant(e) {
    console.debug("checkTenant");
    $("#results").hide();
    $("#domains").hide();
    $("#domains").html("");

    var tenantName = $("#tenantName").val();

    openIdConfig(tenantName)
    .then(response => response.json())
    .then(result => {
        if(result.error) 
        {
            handleServiceError(result);
        }
        else 
        {
            handleServiceSuccess(result);
            tenantDomains(tenantName, result.tenant_region_sub_scope)
              .then(response => response.json())
              .then(autoDiscoverResult => {
                handleAutoDiscoverSuccess({
                  domains: autoDiscoverResult,
                  tenant_name: autoDiscoverResult.find(element => {
                    if(element.includes("onmicrosoft") && !element.includes("mail.onmicrosoft")) {
                      return true;
                    }
                  })
                });
              })
              .catch(error => {
                console.error(`[tenantDomains] Caught exception ${error}`);
              })
              .finally(() => {
                $("#domains").show();
              });
        }
    })
    .catch(error => {
      console.error(`Caught exception ${error}`);
      handleServiceError({
        error: "service_error",
        error_description: "Fetch or the processing of the response threw an exception.  Expand results for full details.",
        inner_error: error
      });
    })
    .finally(() => {
        $("#results").show();
        //return false;
    });
}

function toggleResult() {
    $("#result").toggle();
}

function handleServiceError(result) {
  console.debug(`handleServiceError: ${ JSON.stringify(result) }`);

  var template = $("#results-error").html();
  var templateScript = Handlebars.compile(template);
  var html = templateScript({
    result: result,
    invalidTenant: (result.error !== null && result.error === "invalid_tenant"),
    error: (result.error !== null && result.error === "invalid_tenant")?null:result.error,
    errorDescription: (result.error !== null && result.error !== "invalid_tenant")?null:result.error_description
  });
  $("#results").html(html);
}

function handleServiceSuccess(result) {
  console.debug(`Result: ${ JSON.stringify(result) }`);

  var template = $("#results-display").html();
  var templateScript = Handlebars.compile(template);
  var html = templateScript(result);
  $("#results").html(html);
}

function handleAutoDiscoverSuccess(result) {
  console.debug(`Result: ${JSON.stringify(result)}`);

  var template = $("#domains-display").html();
  var templateScript = Handlebars.compile(template);
  var html = templateScript(result);
  $("#domains").html(html);
}

function openIdConfig(tenant_name, discovery_string = "https://login.microsoftonline.com/") {
  console.log("Calling openId Config");
  return fetch(`${discovery_string}/${tenant_name.trim()}/.well-known/openid-configuration`);
}

function tenantDomains(tenant_name, tenantRegionScope, proxy_uri = "https://davidmcweeproxy.azurewebsites.net/api/autodiscover") {
  console.log("Calling Tenant Domains");
  return fetch(`${proxy_uri}?tenant=${tenant_name.trim()}&cloud=${tenantRegionScope}`);
}

function tenantName(tenant_name, proxy_uri = "https://davidmcweeproxy.azurewebsites.net/api/autodiscover"){
  return fetch(`${proxy_uri}?tenant=${tenant_name.trim()}&domainFilter=onmicrosoft`);
}