---
layout: post
title: Spell Check Your Code (Funy Storie)
categories:
- SharePoint
tags: []
---
Before I tell this story I must admit that without Spell Check I never would have graduated college.&nbsp; It is not because I mistyped words, I am a horrible speller!

&nbsp;

I recently developed a solution allowing SharePoint KPIs to be associated with GeoRSS polygons.&nbsp; The solution also leveraged IDV Solutions ([www.idvsolutions.com](http://www.idvsolutions.com/)) Visual Fusion Suite as the map display and region creation tool.&nbsp; The KPI would be used to determine the color of the region when it was activated on the map.&nbsp; This required me to perform the KPI calculations for the dynamic KPIs, could not find any method of getting the dynamic value.&nbsp; One of the dynamic calculations is to find the Minimum value of the items in the list...simple enough.&nbsp; I developed the code and tested, fixed a few bugs and then set it on to our tester.&nbsp; While our tester was looking at the tool another developer performed a code review and remarked that I had misspelled "Minimun" in the code.&nbsp; So I went back and fixed the issues from the code review and redeployed for our tester.&nbsp; Next day I spoke with the tester and several tests had all of a sudden begun to fail!&nbsp; This was very strange because most of the code review comments had been violations of our variable and method naming schema, code compiled so all of that should have been working...

&nbsp;

After using U2U's CAML viewer I discoverd I hadn't misspelled Minimun,&nbsp;SharePoint actually uses Minimun!&nbsp; Of course the value in the User Interface is spelled Minimum.

&nbsp;

Moral of the story, spell check your code.&nbsp; I have been told this before in software development classes and seminars, and never really understood, cared, or ever did it.&nbsp; I understand now, that simple spelling mistake can really cause issues for others using your code.&nbsp; Worse it can cause you problems later in your code when you actually spell that variable name correctly.

