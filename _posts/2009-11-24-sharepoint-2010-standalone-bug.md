---
layout: post
title: SharePoint 2010 Standalone Bug
date: 2009-11-24 10:14:36.000000000 -05:00





categories:
- Beta
- SharePoint 2010
tags: []

  


  
  
  
  
  
permalink: "/2009/11/24/sharepoint-2010-standalone-bug/"
---
<div class="bvMsg" id="msgcns!3434442F19CE5B65!337">
<p>I recently ran the SharePoint 2010 installer, still in Beta, and had no issues during the installation.  My system was configured as a Windows Server 2008 R2 64-bit with a separate Domain Controller.  This was a “clean” server so nothing else was installed.  Next I ran the SharePoint 2010 installer and decided to start by using a StandAlone install, I figured that if this worked then I could proceed to a Farm Installation.</p>
<p>Before I go any further let me commend Microsoft on improving the SharePoint installation process.  I really appreciate the fact that they have now configured the installer to handle installing all pre-requisites instead of just halting and requiring the user to perform these steps.</p>
<p>After the installation completed I ran the SharePoint Configuration wizard, but when I got to the last step I suddenly got an error:</p>
<p>“Unrecognized attribute 'allowInsecureTransport'. Note that attribute names are case-sensitive. (C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\14\WebClients\Profile\client.config line 56) ---
\> System.Configuration.ConfigurationErrorsException: Unrecognized attribute 'allowInsecureTransport'. Note that attribute names are case-sensitive. (C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\14\WebClients\Profile\client.config line 56)”

I checked the file (client.config) and sure enough the line appears as described in he error message above.&nbsp; Not sure if the installation was now broken or not I attempted to access Central Admin, SUCCESS.&nbsp; Next I looked at the SharePoint Web Applications and noticed a Team Site on port 80 had been created.&nbsp; I checked this site to see if it would work, SUCCESS!

Finally I decided to push my luck and see if a Visual Studio 2010 Web Part could be created and deployed to the new SharePoint 2010 environment.&nbsp; SUCCESS!

To date I have not seen any issues resulting from the error message, I am still testing and will update this posting if I run into any issues.

UPDATE 11/24

The Microsoft Team has a resolution for the issue described above.  
[http://blogs.msdn.com/sharepoint/archive/2009/11/19/installation-notice-for-the-sharepoint-server-public-beta-on-microsoft-windows-server-2008-r2-and-microsoft-windows-7.aspx](http://blogs.msdn.com/sharepoint/archive/2009/11/19/installation-notice-for-the-sharepoint-server-public-beta-on-microsoft-windows-server-2008-r2-and-microsoft-windows-7.aspx)

