---
layout: post
title: SharePoint and Membership Providers
date: 2010-06-04 12:03:50.000000000 -04:00





categories:
- SharePoint 2010
tags: []

  


  
  
  
  
  
permalink: "/2010/06/04/sharepoint-and-membership-providers/"
---
Many SharePoint developers have come from a background with ASP.NET and so most are familiar with the Membership Provider concept.&nbsp; SharePoint uses ASP.NET at its core the membership providers you have build for custom web applications can be used in your SharePoint web application.&nbsp; The advantage of this is that you can abstract your web parts, application pages, etc in SharePoint so they use the Membership Provider to get user information rather than coding your own Active Directory calls into a library or the web part/application page itself.

Although SharePoint can use membership providers for authenticating users it does not require the membership providers be configured unless you want to use them.&nbsp; So what happens when you use a web part or application page with membership provider logic on a SharePoint site that does not have the membership providers configured?

What ends up happening is that SharePoint, by default, assumes you are trying to talk to a SQL Membership Provider.&nbsp; In fact, SharePoint assumes you want to use the default ASP.NET SQL Membership Provider ([System.Web.Security.SQLMembershipProvider](http://msdn.microsoft.com/en-us/library/system.web.security.sqlmembershipprovider.aspx)).&nbsp; This surprised me because SharePoint by default uses Windows Authentication (Active Directory or local machine accounts) for authentication, not SQL.&nbsp; The resulting error is also not very clear as it simply states “Unable to connect to SQL Database”.&nbsp; This error may also occur if you have not specified a membership provider default provider in the web.config xml.

