---
layout: post
title: Hero Blog Post of the Day
date: 2014-07-24 14:39:36.000000000 -04:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2010
permalink: "/2014/07/24/hero-blog-post-of-the-day/"
---
I was working on a project today where I need to dynamically create a MS Word Document, save it to a SharePoint library, and then present the document to the user for editing. My first attempt was to create an IFrame that would redirect to the document once it was created, but this would only open the document in 'Read Only' Mode.
<!--more-->

### Enter the Hero Blog Post

After a quick search I found this [blog post](http://dotnetninja.wordpress.com/2009/01/12/how-to-open-sharepoint-documents-in-edit-mode-with-internet-explorer-6-and-windows-xp-without-regfix/ "DotNetNinja - Open document in Edit Mode"). DotNetNinja found a javascript function `editDocumentWithProgID2` which performs this exact operation and is part of the SharePoint 2010 Core.js file.

Simple!

