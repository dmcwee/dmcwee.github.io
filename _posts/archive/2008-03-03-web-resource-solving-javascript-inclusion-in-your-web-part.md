---
layout: post
title: Web Resource, Solving JavaScript inclusion in your Web Part
categories:
- Microsoft
tags: []
---
<font face="Calibri" size="2">Working with client side controls requires a lot of javascript, and I have often just written the javascript in the Render or RenderHTML functions of my web controls.  This works, but is NOT the best, or even a recommended method to do this.  So I began looking around and found this nice capability, but there are some major pitfalls to be aware of!</font>

<font face="Calibri" size="2"></font>&nbsp;

There are several&nbsp;other sites, blogs, etc which explain this&nbsp;information&nbsp;which I originally referenced, but I had several issues&nbsp;as many of them included only partial examples.&nbsp; What I have tried to do is consolidate what I found on several other&nbsp;blogs.

&nbsp;

<font face="Calibri" size="2">This example is based on a current Mirolink development project for Virtual Earth 6.  The projects namespace is <em>MicroLink.Applications.VirtualEarth.Core</em>.  The javascript file is at the root level of the project and is <em>Core.js</em>.  The webpart is coded in the VirtualEarthControl.cs file also located at the root level of the project.  This information is critical to be aware of in the steps below!</font>

<font face="Calibri" size="2"></font>&nbsp;

<font face="Calibri" size="2">ASP.NET 2.0 introducted the WebResource capability to include javascript, image, and other "resource" files within a DLL.  Using the WebResource is actually pretty simple, just follow these three steps.</font>

<font face="Calibri" size="2"></font>&nbsp;

<font face="Calibri" size="2">Step 1</font>

<font face="Calibri" size="2">Add your resource (.js, .css, etc) to the project you want to bundle it with.  Set the <em>Build Action</em> property to <strong>Embedded Resource</strong>.</font>

<font face="Calibri" size="2"></font>&nbsp;

<font face="Calibri" size="2">Step 2</font>

<font face="Calibri" size="2">In the AssemblyInfo.cs file, usually located in the <em>Properties</em> folder add the following line:<br></font>

<font face="Calibri" size="2">[assembly: <font color="#2b91af">WebResource</font>(<font color="#a31515">"MicroLink.Applications.VirtualEarth.Core.Core.js"</font>, <font color="#a31515">"application/x-javascript"</font>)]</font>

<font face="Calibri"><font size="2"><strong> ***NOTE*** <br></strong>Notice that the resource name is actually formed [Package] {.SubFolder}.[Filename].  <strong>This is not noted anywhere in the MSDN!</strong></font></font>

<font face="Calibri" size="2">Step 3<br>In the web part class file (VirtualEarthControl.cs) add the following line for security<br></font>

<font face="Calibri" size="2">[<font color="#2b91af">AspNetHostingPermission</font>(<font color="#2b91af">SecurityAction</font>.Demand, Level= <font color="#2b91af">AspNetHostingPermissionLevel</font>.Minimal)]</font>

<font face="Calibri" size="2">Finally to reference the resource:</font>

<font face="Calibri"><font size="2"><font color="#0000ff">string</font> coreJS = <font color="#0000ff">this</font>.Page.ClientScript.GetWebResourceUrl(<font color="#0000ff">this</font>.GetType(), <font color="#a31515">"MicroLink.Applications.VirtualEarth.Core.Core.js"</font>);</font></font>

