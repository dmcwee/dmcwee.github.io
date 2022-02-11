---
layout: post
title: ClientScriptManager - why didn't that work
date: 2008-03-03 14:44:01.000000000 -05:00
categories:
- Microsoft
tags: []
permalink: "/2008/03/03/clientscriptmanager-why-didnt-that-work/"
---
NET 2.0 added the ClientScriptManager to allow developers a simple method to add javascript and other "Script" capabilites to a web page easily.  However, the documentation never really got developed, so attempting to use it can be a bit trick.

Lets start with adding an include of a .js file.

'code block here
protected override void Render(HtmlTextWriter writer){
    if(!this.Page.ClientScript.IsClientScriptIncludeRegistered(this.GetType(), VirtualEarthSettings.VirtualEarthJScriptTagHeader)) {
        this.Page.ClientScript.RegisterClientScriptInclude(this.GetType(), 
            VirtualEarthSettings.VirtualEarthJScriptTagHeader, 
            http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6
        );
    }
    base.Render(writer);
}

Didn't work did it? **Why?**

You can't call RegisterClientScriptInclude(...) after the PreRender section of the page lifecycle. Best bet: call in OnInit.

In fact about the ONLY ClientScriptManager function you can use after the PreRender is: ClientScript.RegisterStartupScript

