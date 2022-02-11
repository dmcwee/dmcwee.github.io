---
layout: post
title: A web configuration modification operation is already running.
date: 2008-04-07 13:30:29.000000000 -04:00





categories:
- SharePoint 2007
tags: []

  
  
  
  
  
  
  
  
  

  
  
  
  
  
permalink: "/2008/04/07/a-web-configuration-modification-operation-is-already-running/"
---
I have been using the SPWebConfigModification class for a while, and every now and then I hit the issue that when I attempt to activate a feature that modifies the web.config file I get the following error:

<font color="#0070c0"><font size="1">A web configuration modification operation is already running. at Microsoft.SharePoint.Administration.SPWebService.ApplyWebConfigModifications()<br>  at ...</font> </font>

The biggest issue here is that I can no longer activate any other features that are going to edit the web.config, BIG PROBLEM!&nbsp; So with some investigation here is what I have found that will allow you to overcome this issue.&nbsp; Open your SharePoint **Central Admin** site, click on the **Operations** tab and click on the **Job Definitions** link under the **Global Configuration** heading.&nbsp; Here you will see a number of Timer Jobs that execute Daily, Disabled, Hourly, Mintues, etc.&nbsp; Here we are looking for a timer job titled Windows SharePoint Services Web.Config Update which executes One Time and will have an N/A listed for the Web Application.&nbsp; If you click on the title you will be directed to the Edit Timer Job page.&nbsp; This page provides you with three options, Delete, OK, Cancel.&nbsp; You can probably guess the next step, but before I confirm let me provide a warning.&nbsp; BY DELETING THE TIMER JOB BAD THINGS COULD HAPPEN!&nbsp; Now, go ahead and delete the timer job.&nbsp; You should now be able to activate your feature.

Here are a few blogs about how to properly deploy and activate features that should help you avoid this issue.

- Daniel Larson's Developer Blog [http://daniellarson.spaces.live.com/blog/cns!D3543C5837291E93!954.entry](http://daniellarson.spaces.live.com/blog/cns!D3543C5837291E93!954.entry "http://daniellarson.spaces.live.com/blog/cns!D3543C5837291E93!954.entry")
- Tony Bierman [http://sharepointsolutions.blogspot.com/2006/12/using-spwebconfigmodificat\_116736917110571614.html](http://sharepointsolutions.blogspot.com/2006/12/using-spwebconfigmodificat_116736917110571614.html "http://sharepointsolutions.blogspot.com/2006/12/using-spwebconfigmodificat\_116736917110571614.html")

