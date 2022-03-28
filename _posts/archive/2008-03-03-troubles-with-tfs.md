---
layout: post
title: Troubles with TFS
date: 2008-03-03 14:25:34.000000000 -05:00
categories:
- Microsoft
tags: []
permalink: "/2008/03/03/troubles-with-tfs/"
---
I recently inherited a project from a fellow ML developer who had been having issues getting the project checked into source code.&nbsp; I attempted checking the code in myselft and received the following error:

&nbsp;

_The project cannot be added to source control because it overlaps a project that is already bound to source control at a lower root._

&nbsp;

A little research and here is what I found was the issue.&nbsp; The solution contained two projects, one a&nbsp;Library and the other a WebPart.&nbsp; The solution referenced the WebPart's Assembly Key, the key used to sign the assembly, as a solution item.&nbsp; When Visual Studio attempted to check the code into&nbsp;Source Control&nbsp;through TFS Team Explorer the error would occur.&nbsp; This is because Team Explorer was trying to check in the Solution Items as thought they were physically located in the solution folder.&nbsp; Because the key was actually located in the project then the check in failed.&nbsp; 

&nbsp;

I resolved this issue as removing the key as a solution item, infact I removed all solution items, and then attempted to check in the code.&nbsp; This time the check in went successfully, thus as a word to the wise make sure your solution items are physically located in the solution folder and not referenced from sub projects.

