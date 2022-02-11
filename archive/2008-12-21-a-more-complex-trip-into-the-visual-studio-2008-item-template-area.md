---
layout: post
title: A more complex trip into the Visual Studio 2008 Item Template Area
date: 2008-12-21 21:49:51.000000000 -05:00





categories:
- VSX
tags: []

  

  
  
  
  
  
permalink: "/2008/12/21/a-more-complex-trip-into-the-visual-studio-2008-item-template-area/"
---
After creating [my first](https://blogs.microlinkllc.com/dmcwee/archive/2008/12/21/a-simple-trip-into-the-visual-studio-2008-item-template-area.aspx) Visual Studio Template Item I decided that creating another would be interesting as well. Since I had already done the feature receiver I didn't feel that creating the web part item template would be as interesting, so I decided to create the Layout Page template.

&nbsp; &nbsp;

A layout page is a standard aspx page that is stored in SharePoint's \_layouts folder. This page usually consists of an aspx and a cs page (in the case of C#) which the aspx page inherits from. This means my template must include two files which is why this is a more complex activity.

&nbsp; &nbsp;

I begin by creating a new StsDev2008 project with the layout pages, by default StsDev2008 places the aspx in the LAYOUTS folder in your project and places the class file in the root of the project. The means that the two files are not recognized as being linked in Visual Studio 2008. Therefore when you run the export wizard what you find is that only the aspx or the class file are exported. I find that exporting the aspx is the best method. Before exporting we do need to make some changes, first we need to update the aspx \<%@ Page …%\> tag with some replacement macros.

&nbsp; &nbsp;

In the Inherits value in the \<%@ Page … %\> tag replace the current value with $rootnamespace$.$fileinputname$. This will allow the proper substitutions to occur when the item is added to the project. Now I tried, but failed, to change the \<%@ Assembly Name="…" %\> so that it would reference the project name. However, it appears that this does not work (I am still looking into this to see if I can resolve the problem). Because of this limitation I just replaced the assembly name with [Your Assembly] so that a user knows they need to manually replace that value. Now you can export the aspx as an item template.

&nbsp; &nbsp;

Finally, modify the class file in the same way as documented in my previous blog.

&nbsp; &nbsp;

By this point you should have created and exported the Item Template so we need to discuss how Visual Studio Templates work. First, the template object is nothing more than a zip file. Inside the zip file is an icon file (.ico) and a template file which is similar to a SharePoint manifest file. Also inside are one or more class, aspx, ascx, etc files which contain the Visual Studio Template Macros. For this blog we will add an additional template item file and update our template manifest file.

&nbsp; &nbsp;

First you can drag and drop your class file, the one that actually implements the inherited class referenced by your aspx file, into the Item Template zip file. Next you can extract the .vstemplate from the zip file. By double clicking on the vstemplate file Visual Studio will open the file and you will immediately notice it is a simple XML file.

&nbsp; &nbsp;

Example of my .vstemplate:

\<VSTemplate Version="2.0.0" Type="Item" xmlns="…"\>

\<TemplateData\>

\<DefaultName\>SharePointLayoutPage.aspx\</DefaultName\>

\<Name\>SharePoint Layout Page\</Name\>

\<Description\>\<SharePoint Layout Page\</Description\>

\<ProjectType\>CSharp\</ProjectType\>

\<SortOrder\>10\</SortOrder\>

\<Icon\>\_\_TemplateIcon.ico\</Icon\>

\</TemplateData\>

\<TemplateContent\>

\<References\>

…

\</References\>

\<ProjectItem …\>

...

\</TemplateContent\>

\</VSTemplate\>

&nbsp; &nbsp;

The ProjectItem tags are what we are interested in. More than likely you have one that references your aspx file. Replace the ProjectItem with the following xml

&nbsp; &nbsp;

\<ProjectItem TargetFileName="$fileinputname$.aspx" ReplacementParameters="true"\>AppPage1.aspx\</ProjectItem\>

\<ProjectItem TargetFileName=$fileinputname$.aspx.cs" ReplacementParameters="true"\>AppPage1.aspx.cs\</ProjectItem\>

&nbsp; &nbsp;

What you have just done is to allow the user to change what the filename is, but you will restrict them to using an aspx and aspx.cs extension for the layout page and class file respectively.

&nbsp; &nbsp;

Once you have saved the template file you can copy it back into the zip file.

&nbsp; &nbsp;

Now if you are like me and edited the templates in the export folder you are now wondering why your changes didn't get committed. The reason is that export folder has a copy that is not used of the template. Visual Studio actually uses the templates that appear in the %USERDOCS%/Visual Studio 2008/Templates/ItemTemplates. You may edit this location directly, but if you have already modified your Exported Template item then just copy from the My Exported Templates into the Templates/ItemTemplates folder and you are off and running.

