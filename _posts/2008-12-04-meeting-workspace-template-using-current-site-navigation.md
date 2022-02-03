---
layout: post
title: Meeting Workspace Template Using Current Site Navigation
date: 2008-12-04 14:45:47.000000000 -05:00





categories:
- SharePoint 2007
tags: []

  


  
  
  
  
  
permalink: "/2008/12/04/meeting-workspace-template-using-current-site-navigation/"
---
Recently I was asked to provide the same kind of "Current Site Navigation" on a Meeting Workspace template that appears on the site's master page. Amazingly, given the right tools this is actually a VERY simple task. However, in order to accomplish this in the easiest method you will need SharePoint designer.

&nbsp;  
&nbsp;

Steps:

1. Open the Site using SharePoint Designer
2. Open the Page with SharePoint Designer
3. 
On the Custom Content object in the Content Place Holder _PlaceHolderLeftNavBar_ click on the \> button and choose to revert to the master page content.

  1. If you want you can simple delete everything in the _\<asp:Content ContentPlaceHolderId="PlaceHolderLeftNavBar" …\>…\</asp:Content\>_ section from the page
4. Save the page back to SharePoint
5. 
Go to the Site Navigation Settings page

  1. _Site Actions-\>Site Settings_  
  2. _Navigation (under the Look and Feel heading)_  
6. Choose the _Display only the navigation items below the current site_ radio button in the **Current Navigation** page section.
7. Customize the _Current Navigation_ items in the **Navigation Editing and Sorting** page section.

