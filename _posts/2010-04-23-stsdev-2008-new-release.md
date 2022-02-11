---
layout: post
title: STSDev 2008 New Release
date: 2010-04-23 09:42:01.000000000 -04:00
categories:

tags:
- STSDev 2008
permalink: "/2010/04/23/stsdev-2008-new-release/"
---
I have just released completed work on STSDev 2008 Version 2.0.1 which provides a number of fixes to the original 2.0 version.

### Fixes

In STSDev 2008 the attempt was made to read through the project file and find all the “dependent” assemblies so they could be deployed with the solution.&nbsp; This lead to a number of issues when trying to find those assemblies, so in STSDev 2008 v2.0.1&nbsp; only assemblies in the build output folder are included in the Manifest.xml file.&nbsp; This allows developers to “choose” what assemblies to deploy in their solution simply by setting the “copy local” option on your reference assembly.&nbsp; Once the assembly is copied to your build output folder STSDev 2008 will include it in your solution.

\*\*Issue Alert: If you are deploying an assembly that inherits from another assembly deployed in a separate solution and you have not copied this assembly to your development machine GAC you may see an error comment in the assemblies/assembly section of your manifest.xml file.&nbsp; This occurs because STSDev 2008 attempts to load your assembly and determine if there are any controls published that require a “safe control” section in your manifest.xml file.&nbsp; During this process if the parent assembly is not deployed to the GAC then the current assembly load will fail and no safe controls can be written.&nbsp; In the error message you will see the Full Name of the assembly that could not be loaded, simply install this assembly to the GAC.&nbsp; You may need to restart Visual Studio after doing this for the newly installed assembly to be recognized by STSDev 2008.

In STSDev 2008 v2.0 and v2.0.1 the CAB file builder reads from the manifest.xml file in-order to determine locations of the assembly file(s).&nbsp; If there was an error building the manifest.xml file in v2.0 an exception would be thrown and you would have to go and manually delete the manifest.xml file.&nbsp; In v2.0.1 the manifest.xml additional error handling has been added to the process for building the manifest.xml file so that even if errors occur in the creation process the manifest.xml will still include proper xml.

In STSDev 2008 v2.0 the template and feature section could sometimes get written to the manifest.xml file even if no template or feature objects were included in the project.&nbsp; This would cause an error when attempting to load the solution in SharePoint which would require the user to manually fix the manifest.xml and recreate the solution file.&nbsp; In STSDev 2008 v2.0.1 the template and feature sections are not written unless they contain at least one child element.

### Use with VSeWSS 1.3

I have not yet completed my testing with v2.0.1 but initial results appear to indicate that with some changes to the SharePoint Target file STSDev 2008 v2.0.1 will be able to successfully build the projects created using VSeWSS 1.3 from Microsoft.&nbsp; I believe this to be important as VSeWSS is the recommended tool for SharePoint 2007 projects from Microsoft and they will include a method of upgrading these solutions to the Visual Studio 2010 and SharePoint 2010 projects.&nbsp; When I am totally satisfied with the steps I will update this blog to include them.

