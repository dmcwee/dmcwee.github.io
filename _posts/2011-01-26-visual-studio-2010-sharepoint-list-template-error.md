---
layout: post
title: Visual Studio 2010 SharePoint List Template Error
date: 2011-01-26 00:15:13.000000000 -05:00





categories:
- Microsoft
- SharePoint 2010
tags:
- List Template
- Visual Studio 2010

  
    05:40:35";}
  


  
  
  
  
  
permalink: "/2011/01/26/visual-studio-2010-sharepoint-list-template-error/"
---
I was attempting to create a custom FAST Search Center that would have a custom master page, and some web parts added to the search and result pages. My starting point was to grab the FAST Search Center site definition from the site templates in the SharePoint 14 Hive.

Next, I added the search tab and result tab lists to the site collection. Again I copied the XML from the SharePoint site definition...well almost. I actually copied all but the root node which had an XML namespace. After pasting this content I noticed under a few nodes, and some attributes, the little squiggly line. When I built the solution I noted warning messages but there were no errors. However, the deployment failed with an XML validation error.

As I began comparing the SharePoint list template with my list template I began removing various segments, starting with the ones that we marked as errors. While this resolved the deployment issue my lists did not function properly with the Site Template.

Next, I removed the XML namespace and the restored the previously erroneous XML, this time without any squiggly line or build warnings. When I deployed the solution no errors or failures occurred and my Custom FAST Site Template worked perfectly.

