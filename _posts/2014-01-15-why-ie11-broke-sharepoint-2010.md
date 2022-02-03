---
layout: post
title: IE11 Broke SharePoint 2010
date: 2014-01-15 15:42:30.000000000 -05:00





categories:
- Microsoft
- SharePoint 2010
tags:
- IE11
- User Agent

  


  
  
  
  
  
permalink: "/2014/01/15/why-ie11-broke-sharepoint-2010/"
---
I've been noticing recently my SharePoint site was behaving oddly, especially when I wanted to edit a web part. Yesterday the odd behavior hit a critical point as I was unable to connect web parts on a page. The problem was every time I clicked the drop down arrow on the web part heading the page would refresh and some of the menu content would appear in a side panel, where the web part properties are usually displayed.

Knowing we had a customized master page I was convinced some change must have caused the problem. However, after reverting the master page to the site default the problem persisted. A coworker jokingly suggested I try using Chrome or Firefox. In frustration I opened the site in Firefox and amazingly everything worked.

I went back to IE 11 and opened the emulator setting. Although the browser mode was IE8 I noticed the User Agent setting was Default. I decided to change this to the IE8 User Agent setting and after the page refreshed, the site worked as expected.

After doing a little web search I found the IE team's blog about [changes to the User Agent string](http://blogs.msdn.com/b/ieinternals/archive/2013/09/21/internet-explorer-11-user-agent-string-ua-string-sniffing-compatibility-with-gecko-webkit.aspx), which recommends you not use the User Agent Browser Sniffing technique (maybe something to tell the SharePoint Team?).

Overall, the site's end user experience look unchanged, but it does effect the developer's and site owner's experience.

