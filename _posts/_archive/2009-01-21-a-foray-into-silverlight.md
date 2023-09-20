---
layout: post
title: A foray into Silverlight
categories:
- Silverlight
tags: []
---
I finally have a little time while some code I developed is being tested to take a look at the "new" technologies Microsoft has released. Since my experimentation of Azure flopped, I didn't have a supported system, I decided to turn my attention to Silverlight.

**First Impressions**

One of the first things I have noticed is that many people talking about Silverlight also reference Expressions Blend, looks like a new program I have to learn now too. However, before I get into Expressions I just want to be able to create the old faithful coding application "Hello World!"

**Silverlight Project**

After installing the Silverlight tools for Visual Studio 2008 (which require .NET Framework 3.5 SP1 and Visual Studio 2008 SP1) you can then click on the File-\>New-\>Project. Under your preferred language, mine happens to be C#, you will see the Silverlight grouping. When you click on the Silverlight grouping you will have the option to create a Silverlight application, or a Silverlight library. I chose the Silverlight Application and provided a name. Next I was prompted with adding an ASP.NET web application to the project, in this case I went with the default options and had my silverlight application and ASP.NET testing application created.

**Making Hello World**

Typically in Visual Studio you are able to drag and drop controls onto the design surface of a windows form, web page, etc. However, Silverlight does not provide a design surface, but rather a Preview of what you have done in your XAML.

Instead you must drag and drop items from the toolbox into your XAML, for "Hello World!" a simple TextBlock will work. Once added to the XAML you can set the Text attribute to "Hello World!". As show in the image above you may also choose to set the x:Name value of the item, but this is not required.

**Running/Testing**

Now all you have to do is build, so by pressing your F5 key your solution is built, your .xap file (known as "zap") is copied to your web application and the web application is started. When the web application starts you may be prompted about your web.config not including debug information, this is the standard prompt you receive when you try to start any web application in debug mode that does not have debugging enabled in the web.config. Once the web application starts your browser should open to the page with your new Hello World! Silverlight control.

