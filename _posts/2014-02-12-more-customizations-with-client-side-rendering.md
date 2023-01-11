---
layout: post
title: More customizations with Client Side Rendering
date: 2014-02-12 12:14:25.000000000 -05:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2013
permalink: "/2014/02/12/more-customizations-with-client-side-rendering/"
---
Recently I posted about how you can use [Client Side Rendering (CSR)to display contacts on a map](http://davidmcwee.com/2014/01/28/sharepoint-contacts-on-a-map-with-client-side-rendering/ "SharePoint Contacts on a Map with Client Side Rendering"). After posting about how to display the entire list data, I decided I wanted to see how CSRcould be used to change the user experience while adding, updating, and viewinglist items, updating items, and viewing items. This post will provide a high level overview of how I was able to change the display during New, Display, and Edit of an individual item and then later I will actually put this together with the Contact Map idea.
<!--more-->

## Where's the Documentation?

As mentioned in the previous blog, this work was all pretty much done 100% in the dark. I was able to find a few blogs about how to style specific fields, in particular those custom fields being added by a feature, but there really isn't much about the full CSR capabilities. In order to figure some of this stuff out I ended up using the IE Developer Tools Console to view various objects, in particular the SPClientTemplates.TemplateManager and SPClientTemplates.\_defaultTemplates JavaScript objects.

## Specific Items mean Specific Field(s)

My original goal was to do something, really anything, with all the input fields. However, to date, I haven't been able to figure out how to get my CSR to change all the fields, but I have been able to impact specific field(s) and in the remainder of this post I will focus on impacting my custom field 'Lat'. This being said, the CSR does include a OnPostRender function which you can use to 'go back' and update the fields, but it doesn't do anything while the field is being rendered.

CSRs need to self execute, and to prevent namespace pollution I'm using the self wrapping anonymous function.

> (function() {  
> })();

Wewill againuse theoverrideCtx and overrideCtx.Templates objects to specify the various items we want to control.

> var overrideCtx = {};  
> overrideCtx.Templates = {};

Unlike our Contacts on a List example this time rather than overriding the Item template we are going to override the Fields. Fields is a bit different from the item in that rather than providing a function which is passed a context object, Fields is an object that specifies the field(s) we want to override during render. For each field specified we can then provide our rendering template function which receives the current Field's context.

> overrideCtx.Templates.Fields = {
> 
> 'Lat': {
> 
> 'NewForm': function(ctx) { return ("\<div style='border: 1px solid blue;'\>Hello World\</div\>"); }  
> 'EditForm': function(ctx) { return ("\<div style='border: 1px solid green;'\>Hello World\</div\>"); }
> 
> }
> 
> };

Initially, the names 'NewForm' and 'EditForm' whichmatch up with the URL /NewForm.aspx and /EditForm.aspx caused me toassume the naming'sshould use the name of the ASPX form. However, 'DispForm' (/DispForm.aspx)did not provide the expected rendering and this is where the IE Developer Tools were critical. Using the IE Developer Tools and the Console I was able to look at the SPClientTemplates.\_defaultTemplates where I was able to traverse the object structure and found the function 'DisplayForm'.

### Related

[SharePoint Contacts on a Map with Client SideRendering](http://davidmcwee.com/2014/01/28/sharepoint-contacts-on-a-map-with-client-side-rendering/ "SharePoint Contacts on a Map with Client Side Rendering")

