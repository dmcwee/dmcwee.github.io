---
layout: post
title: jQuery to SharePoint Web Services
categories:
- SharePoint 2007
tags: []
---
Recently I have been working on a Google Maps integration for SharePoint and one of the desired capabilities was to include items from SharePoint lists on the map.&nbsp; The solution was not going to leverage the AJAX .NET capabilites and would instead be built using standard .NET and jQuery.&nbsp; This presented the major challenge, while we could convert the lists into RSS, GeoRSS, and KML feeds they all required authentication to access these feeds, something that Google Maps does not support in the GGeoXml object.&nbsp; Google Maps are heavily javascript focused so we couldn’t use the SharePoint API to access the items directly especially since we wanted to avoid post backs to the server, and javascript arrays would likely run out of space give the number of possible items.&nbsp; This really left us with one possible solution, javascript calls to the SharePoint Web Services.&nbsp; Fortunately, talking with one of my co-workers he pointed me to a nice, somewhat limited, jQuery plugin for the SharePoint web services available here:

[http://www.sympraxisconsulting.com/Demos/Demo%20Pages/SPjQueryWebServices.aspx](http://www.sympraxisconsulting.com/Demos/Demo Pages/SPjQueryWebServices.aspx "http://www.sympraxisconsulting.com/Demos/Demo%20Pages/SPjQueryWebServices.aspx")

Using this service I have been able to access the current web’s lists and items from those lists.&nbsp; Here is an example of how I have used this plugin to retrieve the lists and populate a selection box, their code for the button clicks are also available.

### My Code

$(“.list\_select\_cell”).html(“\<img src=\”/\_layouts/images/ewr133.gif\” alt=\”Loading lists\” /\>”).SPServices({  
operation: “GetListCollection”,  
completefunc: function(data, status) {  
var mySelectBox = “\<select size=’5’ id=’list\_select’\>”;  
$(data.responseXML).find(“List”).each(function() {  
mySelectBox += “\<option value=’” + $(this).attr(“Title”) + “’\>” + $(this).attr(“Title”) + “\</option\>”;  
});  
mySelectBox += “\</select\>”;  
$(“.list\_select\_cell”).html(mySelectBox);  
}  
});

### So what is really happening here?

$(“.list\_select\_cell”).html(“\<img src=\”/\_layouts/images/ewr133.gif\” alt=\”Loading lists\” /\>”).SPServices({…

In the above code we have selected a location that currently exists in our page’s DOM and have added the ewr133.gif, the same gif SharePoint uses when processing Site creations.&nbsp; So basically you specify the DOM object you want to effect while making the asynchronous calls to the SharePoint web service.&nbsp; You do not have to add or remove text from a DOM object, you could also choose to show or hide an object, that is based on your needs.

operation: “GetListCollection”

Here you are specifying the service you are calling.&nbsp; These match the name of the asmx file provided by SharePoint, in this case the call is actually going to the GetListCollection.asmx service.&nbsp; Only certain service calls are supported as the jQuery library is not an all inclusive library.

completefunc: function(data, status) { …

This specifies the action to take when the asynchronous call completes.&nbsp; The first argument provided to this function is the XmlHttpRequest object, thus in order to gather any information from the response you must parse the responseXML.&nbsp; At the end of this function I recommend, if you changed the DOM object’s html as part of the “while processing” action that you now set the value to something useful to the user.

So now you can access your lists, and your list items from Javascript and you don’t even need to perform a standard PostBack.

### Some limitations

One of the biggest limitations I experienced with this tool is that the plugin assumes you want to use the “current” SharePoint web when retrieveing lists, and also assumes that any list you are accessing is stored in the current web.

### Conclusion

This plugin while limited is EXTREMELY stable for an 0.X version, and saved me a number of hours of custom coding WCF services, or building my own version of this plugin.

