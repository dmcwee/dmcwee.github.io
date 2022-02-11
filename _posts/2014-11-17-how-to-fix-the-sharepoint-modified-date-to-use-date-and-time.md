---
layout: post
title: How to Fix the SharePoint Modified Date to use Date and Time
date: 2014-11-17 14:32:41.000000000 -05:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2013
permalink: "/2014/11/17/how-to-fix-the-sharepoint-modified-date-to-use-date-and-time/"
---
If you've started using SharePoint 2013 you probably noticed that Microsoft changed the way they present the Modified value. In SharePoint 2010 the Modified field showed a Date/Time stamp, but in SharePoint 2013 the Date/Time is replaced with something like "3 minutes ago". Personally I like this, but some users may not and the Date/Time stamp may be really important especially for Legal Departments or other Audited applications.

Fortunately there is a very simple fix, using the Client Side Rendering to override SharePoint's default rendering of the Modified field.

The script is simple enough:

> (function() {  
> var overrideCtx = {};  
> overrideCtx.Templates = {};
> 
> overrideCtx.Templates.Fields = {  
> 'Modified': {  
> View: function(ctx) {  
> //var utcDate = new Date(ctx.CurrentItem.Modified);
> 
> return "\<span\>" + ctx.CurrentItem.Modified + "\</span\>";  
> }  
> }  
> };  
> SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);  
> });

As I've discussed in other blogs([here](http://davidmcwee.com/2014/01/28/sharepoint-contacts-on-a-map-with-client-side-rendering/ "SharePoint Contacts on a Map with Client Side Rendering"), [here](http://davidmcwee.com/2014/02/12/more-customizations-with-client-side-rendering/ "More customizations with Client Side Rendering"), and [here](http://davidmcwee.com/2014/11/14/client-side-rendering-of-form-fields/ "Client Side Rendering of Form Fields"))on CSR we use our self executing function and within it we create the Override Context (overrideCtx) object along with it's Templates and Fields properties. Within Fields we specify which field, Modified,and what form, View, we are managing the rendering for. The nice aspect of this is that we can override the rendering on one or many forms and rely on SharePoint to handle the rendering for the forms we don't want to override.

In the function for our form we simply return an HTML formatted string that should be displayed. Using the browser developer tools you can view the argument passed to our View function as well as the CurrentItem's properties and determine what value to display. In the case of the 'Last Modified' Date/Time stamp the property we want to use is Modified.

Finally, in order to make SharePoint use our override template we pass our Override Context object to the RegisterTemplateOverrides and then add a reference to our JavaScript file to the Display Form's JSLink property.

