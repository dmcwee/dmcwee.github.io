---
layout: post
title: DirectoryEntry Exception when calling  Invoke("SetPassword",…)
date: 2008-07-21 02:29:44.000000000 -04:00





categories:
- Active Directory
tags: []

  


  
  
  
  
  
permalink: "/2008/07/21/directoryentry-exception-when-calling-invokesetpassword%e2%80%a6/"
---
I wrote a [blog](http://blogs.microlinkllc.com/dmcwee/archive/2008/05/13/ad-com-exception-in-windows-2003-server.aspx) a few months ago about a COMException I got when I attempted to call DirectoryEntry.Invoke("SetPassword", …). The issue was that I could set the password for one account but then subsequent set password attempts would throw an exception. I had contacted Microsoft and they informed me that I was only the second person ever to report the problem, and that is was intermittent at best for the previous report. Microsoft had, and to this day still does not, have a hotfix for this issue.  
After testing and trying a lot of ideas I thought I had resolved the issue by just capturing the exception and continuing on in my code (later calls would set account enabled and commit, etc). However, when we deployed the solution we quickly realized our test environment was able to create the account more regularly than our production environment. Therefore our testers were able to create account with valid password and log into the test environment, but production users were getting invalid passwords.  
I started looking back through our system and SharePoint logs and realized I was still having the COMException get thrown and that the password change was not getting committed later in the process, our lost password utility really triggered this since both the account provisioner and lost password used the same logic for setting the password. Microsoft had told me that when the first caller notified them of this issue they were able to reset IIS and the issue was resolved.  
Although this is a high availability environment, we really couldn't afford resetting our IIS on the server every time a new account was created. Instead I realized that I could push the DirectoryEntry.Invoke("SetPassword", …) into a web service and allow my provisioning code to use that. Each time a web service was called it essentially created a new process to handle the service request, and when complete the process would effectively terminate.  
Just to make sure this issue could also be worked around I added a Application Pool Recycle, basically a restart of an IIS Web Application, so that if it did fail we could restart the web service's web application. I have been monitoring the log for about a month and have NEVER seen the recycle request. To date the code has created over 200 new Active Directory, MOSS, Exchange, and OCS accounts on our system.

