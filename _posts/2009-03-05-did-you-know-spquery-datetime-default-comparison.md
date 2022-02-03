---
layout: post
title: Did You Know - SPQuery DateTime default comparison
date: 2009-03-05 01:17:42.000000000 -05:00





categories:
- SharePoint 2007
tags: []

  

  

  
  
  
  
  
permalink: "/2009/03/05/did-you-know-spquery-datetime-default-comparison/"
---
After hours of wondering why my code kept reporting scheduling conflicts when I could see events did not overlap I discovered a VERY important note in MSDN on the SPQuery page.  
**...DID YOU KNOW...**

When SPQuery is used to check values against a DateTime field it only checks the Date portion by default? In order to make SPQuery include a time check you must include IncludeTimeValue='TRUE' in the Value tag.  
**Example:**

\<Value Type='DateTime' IncludeTimeValue='TRUE'\>\<Today/\>\</Value\>  
  
**Reference:**

[http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spquery.aspx](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spquery.aspx)

