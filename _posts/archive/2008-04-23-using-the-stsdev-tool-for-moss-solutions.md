---
layout: post
title: Using the StsDev tool for MOSS Solutions
categories:
- STSDev 2008
tags: []
---
I have been maintaining and enhancing the stsdev project from codeplex as part of the HarmonieWeb Configuration Management and it is now at a state where most anyone within the company could take the product and make use of it.&nbsp; Here I am working on documenting the changes/bug fixes we have done to get the product to where it is today.

&nbsp;  
&nbsp;

Before reading this entire post you should take a look at the stsdev codeplex project ([http://www.codeplex.com/stsdev](http://www.codeplex.com/stsdev)).&nbsp; There are three videos that will get you going on how to use stsdev, and will make the rest of this information actually make sense to you.

&nbsp;  
&nbsp;

Enhancements

1. 
The original version of stsdev provided no method of deploying web parts unless used as part of a feature and contained in the feature.xml or element.xml.&nbsp;

  1. Now by placing the&nbsp;.dwp or .webpart file(s) in the RootFolders location and adding the \<DwpFiles\>...\</DwpFiles\> section to the SolutionConfig.xml file the webparts can be deployed the same as before.
2. 
There are several default project types, all of which required some level of work to change the various files to have the correct feature icons, web part gallery icons, and web part gallery group.

  1. Thanks to the stsdev API two new projects (MicroLink GAC WebParts and MicroLink CAS WebParts) the proper MicroLink Logo is set for the feature icon as well as the web part's web part gallery icon.&nbsp; The webparts are also grouped into a MicroLink LLC. WebParts group by default.
3. 
stsdev creates a custom targets file for use with building the application.&nbsp; In this file was stored the absolute path of stsdev when the targets files was created.&nbsp; Thus if two developers used stsdev but had it in different locations, then they would constantly have issues.

  1. The new stsdev installer now adds the stsdevpath as an environment variable so that it can be referenced in the target file rather than the absolute path.
4. The wsp destination location has been changed to the bin/[configuration] location.&nbsp; This supports the MSBuild when executed on TFS.

Bug Fixes

1. 
stsdev originally seemed to allow a user to select the strong name key and use it for assembly signing, but this never worked.&nbsp; In the end you had to use a strong name key the application created.

  1. Selection and Use of the desired strong name key is now working.
2. 
stsdev provides several debugxxx configuration options, which really save a LOT of time.&nbsp; However, only the DebugBuild ever contained debugging information, thus all that time saved was for not!

  1. Now All Debugxxx configurations include full debugging
  2. Also noted was that the ReleaseBuild included debugging information.&nbsp; This has now been changed so that no debugging information is included.
3. stsdev included a releasebuild configuration, however it would always fail because it was unable to find the .ddf file.&nbsp; However, thanks to Athens Holloway, the correction to the target file was made to not delete the .ddf but rather delete the wsp file.
4. The projects created by stsdev set the Generate Serialization dll to automatic, however this version now sets that to Off.&nbsp; This prevents the build from failing with an sgen.exe error.

So now that you see what has been fixed in stsdev, what does it do for you?

STSDEV is a windows console application that creates VS2005 and VS2008 projects/solutions with custom build targets so you can easily build and deploy your SharePoint solution to your local development SharePoint instance.&nbsp; The tool can be added to your Tools menu so that when you need to create a new SharePoint solution it is easily accessable.&nbsp;

STSDEV handles the creation and updating of the manifest.xml, and makecab ddf file.&nbsp; It also provides some of the other useful files, like feature.xml and element.xml as well as initial webpart files.&nbsp; That means when you build using STSDEV the output of your project is a wsp, you don't need the CAB projects any more, and the advanced layouts&nbsp;are formatted propertly for SharePoint.

STSDEV is currently the project creation tool picked by the Harmonie Web team and we have made the necessary enhancements to allow it to work with the TFS build process.&nbsp; We would highly recommend that everyone take a look at using this with their SharePoint solutions.

I am currently working with Athens Holloway about including the capabilities he has created to allow deployment of SharePoint solutions to remote SharePoint servers.&nbsp; The end goal will be that as part of your build process you will deploy, retract, upgrade, etc your solution to a remote server ALL from within Visual Studio!

