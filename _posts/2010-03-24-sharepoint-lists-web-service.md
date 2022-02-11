---
layout: post
title: SharePoint Lists Web Service
date: 2010-03-24 10:59:41.000000000 -04:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2010
permalink: "/2010/03/24/sharepoint-lists-web-service/"
---
During a recent project I was leveraging the SharePoint Lists Web Service to retrieve information from a list and push it to a Silverlight display. The list I was using was a heavily customized list with about 35 different views and at least as may fields. My Silverlight display would provide information like the “status” of the list item based on a number of other criteria. This status field was stored as a simple “Single line of text” field in the SharePoint list.

The first issue I had to resolve was how to get the right view for the SharePoint list. The frustration with this is that the Lists Service’s (lists.asmx) GetListItems action has the second parameter “viewName” the documentation on this parameter actually specifies the proper value is a GUID. I will write another blog about how I retrieved the view’s GUID later, but for now just understand that I did have to take that into account.

After getting the proper view information I now needed to filter the list so that only particular items I was interested in would be returned. I added the query parameter to perform the filtering as well as adding the viewFields parameter to ensure that I received the fields I expected.

At this point I went ahead and executed my code thinking that I was now good to go and should receive my filtered list items. On the initial execution an exception was thrown, so I placed a breakpoint on the xml result from the GetListItems call and re-executed. When I hit the breakpoint I looked at the and noticed the status field was missing. I allowed the code to continue and when it attempted to access the status field the exception was thrown. I verified that I had the correct view, view fields, filters etc and nothing looked out of place.

I think downloaded U2U’s CAML Query Builder (a tool I HIGHLY recommend if you are building CAML queries) and tested my query in that. Interestingly, I noticed that the status field was missing in U2U’s output. I then modified the query, I removed the \<where\>…\</where\> statement, so that all list items would be returned and suddenly the status field appeared.

I reexamined the list item data, and since it had no value in the status field I decided to add one (something that normal users are not allowed to do in the production list). I executed my query in the U2U tool and noticed that now the status field was available. Again I went back to the list and removed the status field value, and again the field was removed from my query results.

I have tested this scenario with a number of other lists all using the single line of text field and have noticed similar outcomes, the field is not returned if it has no value. I have since modified my code to handle the case where the field may not be returned and I use a default “status” value. I have since noticed that this is pointed out in the commends (second from the bottom at the time of me writing this blog) but is not included anywhere in the documentation.

Best of luck!

