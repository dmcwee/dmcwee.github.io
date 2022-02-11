Handlebars.registerHelper("tenantId", function(token_endpoint) {
        return token_endpoint.replace("https://login.microsoftonline.us/", "")
        .replace("/oauth2/token", "")
        .replace("https://login.microsoftonline.com/", "");
});

Handlebars.registerHelper("tenantLocation", function(tenant_region_scope) {
    console.debug(`tenantRegionScope: ${tenant_region_scope}`);
    if(tenant_region_scope == "USG") {
        return "Fairfax";
    }
    else if(tenant_region_scope == "USGov") {
        return  "Arlington";
    }
    else {
        return "Commercial - " + tenant_region_scope;
    }
});

Handlebars.registerHelper("tenantB2BAvailable", function(tenant_region_scope) {
    if(tenant_region_scope == "USG") {
        return "Not Available";
      }
      else if(tenant_region_scope == "USGov") {
        return "Available";
      }
      else {
        return "Available";
      }
});

Handlebars.registerHelper("tenantRegion", function(tenant_region_scope, tenant_region_sub_scope){
    console.debug(`tenantRegion: ${tenant_region_scope}, ${tenant_region_sub_scope}`);
    if(tenant_region_sub_scope == "DODCON") {
        return "GCCH (IL4)";
      }
      else if(tenant_region_sub_scope == "DOD") {
        return "DOD (IL5)";
      }
      else if(tenant_region_sub_scope == "GCC") {
        return "GCC (IL2)";
      }
      else if(tenant_region_scope == "USG" || tenant_region_scope == "USGov") {
        return "Azure Gov Only";
      }
      else {
        return "Worldwide";
      }
});

Handlebars.registerHelper("tenantWhiteListed", function(cloud_instance_name, tenant_region_scope){
    console.debug(`tenantWhiteListed ${cloud_instance_name}, ${tenant_region_scope}`);

    if(tenant_region_scope == "USG" && cloud_instance_name == "microsoftonline.com") {
        return "No";
      }
    else if(tenant_region_scope == "USGov" && cloud_instance_name == "microsoftonline.com") {
        return "No - Unexpected!";
    }
    else {
        return "Yes";
    }
});

Handlebars.registerHelper("stringify", function(data) {
    return JSON.stringify(data);
});