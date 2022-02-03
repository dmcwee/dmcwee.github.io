---
layout: post
title: Site Collection Content Type vs. Content Type Hub
date: 2014-01-13 13:25:20.000000000 -05:00





categories:
- Microsoft
- SharePoint 2010
tags: []


  

  
  
  
  
  
permalink: "/2014/01/13/site-collection-content-type-vs-content-type-hub/"
---
I've been working on a project recently that has a large number of sub-agencies and the parent organization was attempting to push a standardization of Content Types.&nbsp; Since no one really wanted to duplicate work the organization decided they did not want to migrate content into SharePoint (from file shares) until all the content types and metadata had been identified and created.&nbsp; However, as with all large agencies some groups wanted to move forward with limited or partial capabilities because after all some limited capability is better than what they currently have.&nbsp; The concern that arose from this was: What if they created a Content Type in one of their Site Collections that had the same name as one that would be published later on?

The process I followed was very simple:

1. Create a new Site Collection
2. Create a Content Type 'RFP'
3. Create a Content Type in the Metadata Hub name 'RFP'
4. Publish and see what happens

Once the import of the Content Types was completed I checked my Content Type Import Log in the Site Collection (created in #1 above).&nbsp; What I found was an error stating: Content Type Name 'RFP' conflict.&nbsp; In addition I checked my Site Content Type and found that the one custom field I had added in the Metadata Hub was NOT included as a field of my local 'RFP' Content Type.

