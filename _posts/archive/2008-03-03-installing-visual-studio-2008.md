---
layout: post
title: Installing Visual Studio 2008
categories:
- Microsoft
tags: []
---
In January I&nbsp;attempted installing Visual Studion 2008 and always&nbsp;got an install failure when the Microsoft Visual Studio Web Authoring Component was being installed.&nbsp; I found several postings on the Microsoft Support Site ([http://support.microsoft.com](http://support.microsoft.com/)).&nbsp; After reading thoses posts here is what I have found:

1. Uninstall ALL Beta everything
  1. SDKs
  2. VS Add-Ons
  3. Development...whatever
2. Uninstall Microsoft Windows SDK 6
3. Reboot and attempt VS2008 installation again

I also uninstalled Sharepoint Designer, as I have seen issues with this before, but it does not appear that this is not an issue/problem source.&nbsp; Several of my coworkers who had similar experiences were able to install VS2008 without removing Sharepoint Designer so there is not need to worry about that.

