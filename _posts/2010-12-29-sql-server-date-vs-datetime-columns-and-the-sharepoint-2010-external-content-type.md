---
layout: post
title: SQL Server Date vs. DateTime columns and the SharePoint 2010 External Content
  Type
date: 2010-12-29 11:32:46.000000000 -05:00

categories:
- Microsoft
- SharePoint
tags:
- External Content Types
- SharePoint 2010
  
permalink: "/2010/12/29/sql-server-date-vs-datetime-columns-and-the-sharepoint-2010-external-content-type/"
---
Recently I have been working on a SharePoint 2010 solution that leverages External Content Types for storing information associated with Microsoft Dynamics Great Planes Timesheets. Part of the information captures when an task is expected to be completed, which the UI allows the user to select a date from a calendar. Since the only significant information for this field was the date when I designed the database I chose to only capture the date value. Testing on my local Windows 7 VM worked perfectly and we rolled the solution out to the customer for testing.

In the late testing stages the customer sent back a critical issue. The date value selected by the user was being changed, worse when the associated information was imported from Timesheet to Timesheet (because it was an ongoing task) the dates were moving further and further back in time.

I have seen this issue before with SharePoint 2007, pre SP1, that on DateTime field inputs if you didn’t convert to from local time to UTC your dates would not appear correctly. Immediately I added code to manually convert my captured time from local to UTC. I then changed the Time Zone on my VM so I would have a similar offset (originially I was running with GMT time myself thus I had not seen this issue). As I began testing I continued to see the same issue the customer was seeing, even with my conversion to UTC.

With the debugger attached I began looking at the values going into and out of the database. What I noticed was that a value going in would be something like 1/1/2011 05:00:00 but the value being returned looked like 12/31/2010 19:00:00. Looking into the External Content Type I noticed that it was using a DateTime .NET object. This means that when the value is retrieved from the database if the time is not in the database field then it defaults to 12:00:00. From there SharePoint performs the conversion from UTC to the local timezones (in this case subtracting 5 hours).

Lesson from this is to make sure you use full date time fields with your external content types.

