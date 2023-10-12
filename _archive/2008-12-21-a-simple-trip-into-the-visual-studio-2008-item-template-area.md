---
layout: post
title: A simple trip into the Visual Studio 2008 Item Template Area
---
I recently ran across a very well done [video](http://msdn.microsoft.com/en-us/vstudio/cc700976.aspx), except the developer was using VB and I'm a C# person, about how to create your own Visual Studio 2008 Item Templates. After watching the video I decided to play around with the [StsDev2008](http://www.codeplex.com/stsdev2008) projects and see if I could create a series of item templates for each of the special projects that get created.

&nbsp; &nbsp;

My first attempt was to create a SharePoint Feature Receiver. This is simple enough to program, but I'm often copying the same code snippet:  
&nbsp;

SPWebApplication webApp = null;

&nbsp; &nbsp;

If(properties.Feature.Parent is SPSite)

{

…

}

Else if(Properties.Feature.Parent is SPWebApplication)

{

…

}

&nbsp; &nbsp;

Foreach(SPWebConfigModification mod in CreateConfigModifications())

{

//Add or Remove based on whether this is the Activated or DeActivated function

}

&nbsp; &nbsp;

webApp.Farm.Services.GetValue\<SPWebService\>().ApplyWebConfigModifications();

webApp.Update();

&nbsp; &nbsp;

Instead I wanted my FeatureReceiver to always have this code in place and then all I would have to do is implement the CreateConfigModifications function.

&nbsp; &nbsp;

I began by creating my [StsDev2008](http://www.codeplex.com/stsdev2008) Simple Feature Project and selected one of the deployment locations (not really important where it was going to since this is just an item template) and I also made sure I had the Include Feature Receiver checked. I then added the custom code (shown above) into the FeatureActivated and FeatureDeactivated functions. Then I created a shell function for the CreateConfigModifications with a List\<SPWebConfigModfication\> which is created and returned.

&nbsp; &nbsp;

Next I changed the namespace that was provided to $rootnamespace$ which is a Visual Studio Item Template Replacement Macro. The $rootnamespace$ will be replaced when the user creates the new item with the project's namespace.

&nbsp; &nbsp;

Next I changed the class name to $safeitemname$ which will be replaced with the name the user specifies when they create a new object.

&nbsp; &nbsp;

Finally I used the Export Wizard as described in the [video](http://msdn.microsoft.com/en-us/vstudio/cc700976.aspx) to export the project. After the export wizard was complete I tried the Add Item option on the project, and there was my new SharePointFeatureReceiver item.

