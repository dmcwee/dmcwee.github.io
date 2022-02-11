$(document).ready(function() {
    $('form').on('submit', function(event) {
        console.debug("Submit");
        return false;
    });
});

function checkTenant(e) {
    console.debug("checkTenant");
    $("#results").hide();

    var tenantName = $("#tenantName").val();
    var serviceEndpoint = $('input[name="msCloud"]:checked').val();

    openIdConfig(tenantName, serviceEndpoint)
    .then(response => response.json())
    .then(result => {
        if(result.error) 
        {
            handleServiceError(result);
        }
        else 
        {
            handleServiceSuccess(result);
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
        return false;
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

function openIdConfig(tenant_name, discovery_string = "https://login.microsoftonline.com/") {
    return fetch(`${discovery_string}/${tenant_name.trim()}/.well-known/openid-configuration`);
}