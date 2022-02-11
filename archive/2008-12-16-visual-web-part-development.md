---
layout: post
title: Visual Web Part Development
date: 2008-12-16 00:03:31.000000000 -05:00





categories:
- SharePoint 2007
- Visual Studio
tags: []

  


  
  
  
  
  
permalink: "/2008/12/16/visual-web-part-development/"
---
So I readily admit that I am often a code junkie, if I can do it in code then I will. However, I have started to look for tools and solutions that let me code less, drag and drop more, and generate solutions that look better faster.  
I have always wanted to experiment with building WebParts using the Visual Studio GUI, but have often found time lacking, until recently. I have a very complex solution that leverages 'n' Membership Providers to handle provisioning user information into several different systems (MOSS, AD, OCS, Exchange, Adobe Connect, etc). Working with another developer we initially laid out the solution that would tie all these together, however we quickly realized that we had cut our ability to use the standard .NET Membership Controls. Fortunately, we are able to revisit our designs as we use an iterative approach to our solution development and we have moved back toward the .NET Membership Control support. As such we decided to use the CreateUserWizard control to handle our user creation, however we needed to customize this control…A LOT! Enter visual development of web parts.  
We are using the Visual Studio 2008 for development and I initially created a web site project and added a user control to the project. My reason for this is I do not want a code behind page in a SharePoint solution so I will do the initial development and layout in the web project. Because I was using the web project I could use my membership providers to test the compatibility, perform debugging, and just work in a generally scaled down environment.  
When I was done with the ascx development, including customization of the look, feel, and actions I copied the ascx into my SharePoint solution. Visual Studio attempted to be helpful by also copying the code behind file, which I deleted. I created a class file in the SharePoint solution and had it inherit from System.Web.UI.UserControl. I copied the functions I had in the code behind page into this class file and saved it. I then changed the \<%@ Control … line so that rather than referencing a code behind file I inherited from the class I had just added to the SharePoint solution. Finally, for the code where I referenced controls on the ascx I included protected controls in the class file (if you forget this step the compiler will remind you).  
Once I had the ascx and the class file included in my SharePoint solution I added a WebPart class that simply called the Page.LoadControl(…) and passed the relative path to my ascx user control. The Page.LoadControl returns a Control object which I then added to the Controls of my WebPart.  
That was it, I loaded the solution and added the web part to the page. As soon as it was added the part displayed exactly as expected and functioned just like it had in the web site project. Total time for this was about 30 minutes, which if I had tried to create the wizard in code and customize the template would probably have taken most of a day, if not multiple days.
