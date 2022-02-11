---
layout: post
title: SharePoint Published Content Types
date: 2013-09-25 10:41:05.000000000 -04:00

categories:
- Microsoft
- SharePoint
tags:
- Publishing Content Types
- SharePoint 2010
permalink: "/2013/09/25/sharepoint-published-content-types/"
---
I have done a lot of development with SharePoint workflows, especially those developed in Visual Studio. Unless I have been working with a standard list type, I generally create a Content Type that my workflow can be associated with and to ensure the columns and values needed in the workflow will be present. However, creating Content Types is always a painful process, because as you develop the content types and test them you need to delete the original content type, and any list depended up in before you deploy the updated version. This is even worse when you upgrade a solution that is in use in productionbecause you can't easily delete the content type just to add additional fields.

Recently, I have been working with Publishing Content Types, usually designed through the SharePoint UI, and what I began to notice was that when the published Content Type was updated in the Content Type Hub those changes were reflected in the sites making use of those Content Types.

This made me wonder if the same would happen if I deployed the Content Type through a Visual Studio solution, published it and then updated the Content Type. I initially createda Content Type that had a Title and a Choice column. Once deployed I published the content type and created a list in my Published Content Type Consumer site. I then added an additional text column to the Content Type and redeployed. After the Content Type Hub timer jobs executed the List I created using the Published Content Type now had the new column.

Lesson from this: If you have to deploy and maintainCustom Content Types use a Content Type Publishing Hub to manage the Content Types, and any future updates you may need to make.

