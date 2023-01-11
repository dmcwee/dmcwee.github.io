---
layout: post
title: SharePoint Contacts on a Map with Client Side Rendering
date: 2014-01-28 01:46:11.000000000 -05:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2013
permalink: "/2014/01/28/sharepoint-contacts-on-a-map-with-client-side-rendering/"
---
Several years ago, back in the dark days of SharePoint (MOSS) 2007, [Tom Resing](http://tomresing.com/) and I worked together on a demo displaying contacts from a SharePoint contact list on a Bing/Google Map. He and I presented this at several SharePoint Saturday events (Boston, Virginia Beach, Richmond, Tampa) and found highly positive response. It has been a while since Tom and I worked together, and a lot has changed in SharePoint so I wanted to revisit our old demo and take a newly available approach.
<!--more-->

## SharePoint 2007 & 2010

When Tom and I first worked together jQuery was early in development, HTML5 was only being discussed, and Chrome didn't exist. JavaScript was used a little, but because of the browser limitations it didn't have the capabilities it has today, so SharePoint relied heavily on XML and XSLT to edit and customize the display of information. The demo was remarkably simple but required significant work with XSLTs. We would do the demo in SharePoint 2007by adding a SharePoint DataView Web Part (DVWP) and customize the XSLT list and item rendering to add the map and geocode the items. This worked well, but injectingJavaScript throughan XSLT translationrequired HTML encoding of symbols like '&' and '\>' which really made the JavaScript code very difficult to read and understand.

**History Lesson:** You can find Tom's old slide deck [here](http://www.slideshare.net/tomresing/mapping-mashups-in-sharepoint-designer-presentation).

## SharePoint 2013 - Client Side Rendering (CSR)

Today jQuery is a mature, and a common tools set, HTML5 is becoming more and more common, and business applications rely on JavaScript almost as much as Server Side code. SharePoint 2013 introduced a new method, utilizing JavaScript, to provide rendering of lists rather than using the 'old' method of XSLT. Given this improvement, I thought it was worthwhile to revisit the old demo, and give it a refresh.

## Updated Demo

I have been unable to find a solid MSDN CSR API reference, but I can tell you CSR does NOT use the JSOM when executing so no need to perform context loads, queries, etc. CSR actuallyseems to provide a JavaScript object that is a JSON'ized version of the List View and Rows so we can actually access row columns by using .[Static Row Column Name].

I've created a separate page where I could work with the list data and CSR to ensure I would be able to access my list even if the JavaScript wasn't working and I would highly recommend others do the same at least during development. Once your done developing, the CSR can be applied directly to a list/list view. Also, on the page I added the Bing and jQuery references using a Script web part because I found that adding it in the CSR code did not guarantee that those files would actually be loaded.

From all the code examples I have seen, and JavaScript best practices, CSR files should have a self contained object so your variables and functions do not pollute the global namespace. However, your CSR must be self executing, so begin with something like:

> (function() {  
> })();

Now we need to create the Template Override object. This object will be provided to and used by SharePoint to implement the rendering of the list and list items based on what areas we choose to override.

> var overrideCtx = {};  
> overrideCtx.Templates = {};

Our template has to perform three main tasks:

1. Add a Div that the Bing Map API can use to display the map tiles
2. Capture each item in the List
3. Initialize the map and add the geocoded items to it

In order to perform these task we will override the Header, Item, and OnPostRender.

One really nice aspect of the CSR is we can either call JavaScript functions, or we can return back HTML for rendering. In the Header function we will just return the necessary HTML to add our div which the Bing API will use to display it's map. Add the following to override the Header

> overrideCtx.Templates.Header = function(ctx) {
> 
> return ("\<div id='mapDiv' style='position: relative; width: 450px; height: 450px;'\>\</div\>");
> 
> }

Next we want to capture each item in our list. Because we don't have the Bing Map loaded yet we will just store the items so once the Map and Search Manager are loaded we can the perform the geocoding and rendering. To override our Items use the following:

> overrideCtx.addressArray = new Array();  
> overrideCtx.Templates.Item = function(ctx) {
> 
> overrideCtx.addressArray.push({Title: ctx.CurrentItem.Title,  
> Address: (ctx.CurrentItem.WorkAddress + " " ...)});
> 
> //This has been truncated for more efficient reading
> 
> }

Now that we have our Div and Items we can load the Map, Geocode the items, and add them to the display. I'm going to avoid in depth discussion on how to work with the Bing Maps and Geocoding in this blog, but if you want more detail check out the Bing Map API.

To perform the initialization of the map and search I chose to use the OnPostRender, which ensures all other templating has been performed and is complete meaning everything I need to initialize and geocode is ready.

> overrideCtx.OnPostRender = function () {
> 
> overrideCtx.Map = new Microsoft.Maps.Map(...);  
> Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: function() {
> 
> ...  
> overrideCtx.geocodeRequest();
> 
> }});
> 
> overrideCtx.geocodeRequest = function () {
> 
> $.each(overrideCtx.addressArray, function(index, val) {
> 
> var currentContact = {
> 
> where: val.Address,  
> callback: function (result, userData) {
> 
> var pushpin = new Microsoft.Maps.Pushpin(...);  
> overrideCtx.map.entities.push(pushpin);
> 
> },
> 
> ...
> 
> };
> 
> });
> 
> }

Finally, now that our template is ready to be used we need to register it with SharePoint. At the end of the self invoking function add:

> SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);

## Use Our CSR

With that our CSR is ready, now add the CSR js file to your site (I prefer to use the SiteAssets library because I've had issues in the past with Document Libraries not always returning the expected HTTP headers). On a page with the Contacts List View (which should include the Address, City, State, and Zip fields) edit the List View web part and expand the Miscellaneous section. There you will find a new text box 'JS Link' where you can add the url to your CSR file. The JS Link field allows you to also use the ~site urltoken to make referencing your file easier and ensure the path is properly formatted for SharePoint to load.

Once you've added the CSR the your JS Link Save your changes and enjoy the new Client Side Rendering.

If your interested in my actual CSR JS file you can download it in PDF format [here](http://dmcwee.files.wordpress.com/2014/01/csr.pdf).

