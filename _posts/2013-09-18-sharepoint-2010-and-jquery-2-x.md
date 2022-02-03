---
layout: post
title: SharePoint 2010 and jQuery 2.x
date: 2013-09-18 15:41:33.000000000 -04:00





categories:
- Microsoft
- SharePoint 2010
tags:
- jQuery
- jQuery 2.x
- KnockoutJS


  

  
  
  
  
  
permalink: "/2013/09/18/sharepoint-2010-and-jquery-2-x/"
---
Recently, I was working with a coworker who had created a javascript dashboard using jQuery and KnockoutJS in SharePoint.&nbsp; The dashboard had worked perfectly for him, but when I viewed the site none of the data would render.&nbsp; While we were testing the site we noticed that my browser was running in&nbsp;Browser Mode&nbsp;IE10 with Document Standard IE 7 Standard,&nbsp;but his was running Browser Mode IE 10 with Document Mode: Standards.&nbsp; Having battled with SharePoint 2010&nbsp;using an&nbsp;HTML5 Masterpage I began looking for the Meta tag on the page which should define the appropriate browser mode and noticed he had removed it.&nbsp; I had him add the tag back to the masterpage (from my experience removing the browser mode tag in SP2010 causes all kinds of issues when editing pages, list items, etc) but still found the dashboard was not functioning properly.

When we looked at the jQuery include I noticed he was using the latest version from the Microsoft CDN, which happens to be version 2.x.&nbsp; Because I had another site running with jQuery and Knockout I had him revert his version of jQuery to 1.10.x and we found this was working.

The cause of the issue is detailed in the jQuery documentation for 2.x:  
jQuery 2.x has the same API as jQuery 1.x, but _does not support Internet Explorer 6, 7, or 8_. ([source](http://jquery.com/download/ "Source"))  
The reason this is relevant is&nbsp;because SharePoint masterpages include:  
\<meta http-equiv="X-UA-Compatible"content="IE=8"/\>  
Which forces IE browsers to effectively run in an IE 8 mode.

Therefore, if you are a SharePoint 2010 developer and are attempting to use jQuery, make sure you are using 1.x versions

