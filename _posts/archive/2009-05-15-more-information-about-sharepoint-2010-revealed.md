---
layout: post
title: More information about SharePoint 2010 Revealed
categories:
- Beta
- SharePoint 2010
tags: []
---
A fellow SharePointer, Joel Oleson, posted a very nice [summary](http://www.sharepointjoel.com/Lists/Posts/Post.aspx?ID=224) to the recently [released SharePoint 2010 system requirements](http://blogs.msdn.com/sharepoint/archive/2009/05/07/announcing-sharepoint-server-2010-preliminary-system-requirements.aspx).

Two items have really stood out as I reviewed the information.

First, SharePoint 2010 will require a 64-bit platform to run correctly.&nbsp; Most likely this is due to limitations of memory and providing enough resources for the SharePoint Web Application Pools.&nbsp; However, it does seem to follow the recent trend Microsoft has established with the release of OCS R2 and Exchange 2010 which both require 64-bit operating systems.

Second, was the requirement to run Server 2008, 64-bit of course.&nbsp; This will of course provide the latest version of IIS, but may also be a helpful to Microsoft Hyper-V to start cutting into the VMWare market share.&nbsp; Given that Server 2008 comes with “free” Hyper-V capabilities why would companies then look to spend additional funds to purchase another virtualization capability.

One last significant advancement from Microsoft that has gone a little under the radar, but I believe is going to be a key capability is the release of [Service Pack 2 for the Microsoft Office 2007 suite](http://blogs.technet.com/office_sustained_engineering/archive/2009/04/16/service-pack-2-for-the-2007-microsoft-office-system-due-to-ship-april-28th.aspx).&nbsp; This service pack as attempted to overcome some of the issues experienced when using Office 2007 with SharePoint 2007 that has forms enabled.&nbsp; Overcoming this issue will be critical as Microsoft has announced that SharePoint 2010’s security will be claims based thus requiring greater support for authentication schemas that do not use Windows Authentication.

