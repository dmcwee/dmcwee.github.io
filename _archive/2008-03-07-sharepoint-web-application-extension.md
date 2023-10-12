---
layout: post
title: SharePoint Web Application Extension
categories:
- SharePoint
tags: []
---
The urls below are ficticious so if you attempt to navigate to them.&nbsp; I have no idea what will happen nor do I claim responsibility or support for any content on the www.devsite.org if it even exits.&nbsp; I have used this name in an attempt to provide a complete example of what occoured and how to correct the problem.

&nbsp;

A team member recently deployed a web application capability to our development environment&nbsp;(web application name: devsite80) which caused an error in the web.config.&nbsp; When I went to central admin to deactivate the feature I tested using our internal url (http://devsite) which is the default&nbsp;zone's&nbsp;url for devsite80 in SharePoint alternate access mappings.&nbsp; The site was back up, then I attempted to reconnect to our dev site from my local machine, again using the public address.&nbsp; The site was down, with the same web.config issue.&nbsp; What happened?

&nbsp;

<font size="3">Background</font>

When we created the&nbsp;public development site, we extended the internal development site (http://devsite)&nbsp;site.&nbsp;&nbsp;This allowed the public development site to be configured in the same&nbsp;mannor as the internal development site, but also added&nbsp;the proper host headers, etc for us.

&nbsp;

When features were deployed and activated everything worked fine.&nbsp; When feature were deactivated, only the http://devsite site was effected.&nbsp; (_Quick Note:&nbsp; In Central Admin only&nbsp;http://devsite_ _was avaible for deploy/activate/deactivation,&nbsp;http://www.devsite.org&nbsp;__was not._)&nbsp; After inspecting the file system we noted that there were two independent folders, devsite80 and www.devsite.org80.&nbsp; The other thing I found was that devsite80's web.config had the feature's xml changes removed, but www.devsite.org80's web.config did not.&nbsp; We, a system admin and myself, decided that managing one folder would be much easier than trying to manage two (kinda obvious).&nbsp; So here is what we did.

&nbsp;

<font size="3">Steps</font>

1. Central Admin-\>Application Management-\>Remove SharePoint from IIS Web Site
  1. Selected&nbsp;http://devsite as the _Web Application_
  2. Selected http://www.devsite.org&nbsp;from the _Select IIS Web site and zone to remove_
  3. Selected the **Yes** radio button for _Delete IIS Web sites_
  4. OK
2. Central Admin-\>Operations-\>Alternate access mappings
  1. Select Add Internal Urls
    1. Selected **Devsite80** from the _Alternate Access Mapping Collection_
    2. Entered http://www.devsite.org&nbsp;for the _URL protocol, host and port_
    3. Selected **Internet** from the _Zone dropdown_
    4. Save
- Opened IIS management console (Right Click My Computer-\>Manage)
1. Navigated to the Web Sites folder (IIS Manager-\>local computer-\>Web Sites)
2. Right clicked on Harmonieweb80 site and selected Properties
  1. Selected Advanced... on the Web Site tab (next to the IP Address drop down list)
  2. Selected Add... in the Multiple identities for this Web site.
    1. Selected **(All Unassigned)** from the dropdown list for the _IP Address_ (This site did not have any specific IP address assigned so this was appropriate, you might have to select an appropriate IP address)
    2. Entered **80** for the _TCP port_
    3. Entered **www.devsite.org** &nbsp;for the _Host Header_ value
    4. OK
  3. OK
3. Apply
4. OK
- Restart IIS

Following this we ended up with one web application, one web application folder, and the ability to activate and deactivate successfully.&nbsp; We were also able to now access the site from both the http://devsite and the http://www.devsite.org&nbsp;urls.

<font size="3">Recommendation</font>

If you ever need to add additional urls for a site use alternate access mapping with host headers.&nbsp; This may take you a few extra steps, but for management it will save you a lot of time.&nbsp; DO NOT use web application extension to create a new zone entry for an already existing application unless you want them to function and act independently.

