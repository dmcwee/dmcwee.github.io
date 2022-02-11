---
layout: post
title: AngularJS Module for Azure Mobile Services
date: 2014-07-08 11:03:35.000000000 -04:00
categories:
- AngularJS
tags: 
- AngularJS Module for Azure Mobile Services
- Azure
- CodePlex
- Mobile Web Services
- NuGet
permalink: "/2014/07/08/angularjs-module-for-azure-mobile-services/"
---
A few months back a coworker introduced me to AngularJS as an alternative to using KnockoutJS.&nbsp; Around the same time Microsoft was pushing a bunch of videos and "How To's" on the Azure Mobile Services.&nbsp; After walking through the AngularJS tutorial and playing with the Azure Mobile Services "To Do" Demo I decided it would be interesting to mesh these two items together, use AngularJS in the UI to communicate with Azure Mobile Services for data storage, and who know what else in the future.

The first thing I did was create the To Do demo application and then I started to create the AngularJS partial views for everything.&nbsp; Once the views and all worked I began working on the actual communication with the Azure Mobile Services, and this is where things went south.

## Don't Assume AngularJS Behaves

So the major problem I ran into was that I \*ahem\* Assumed that AngularJS would behave with JQuery Deferred objects, in particular with the Ajax objects and the 'Then' chaining.&nbsp; I know AngularJS has its own Ajax methods, but the Azure Mobile Services utilize JQuery and I wanted to stick as close to the "To Do" code as I could.&nbsp; Well, what I found was AngularJS doesn't behave well with JQuery Then chaining, and this has to do with Angular's $q object.&nbsp; If you read the documentation for $q you will find, somewhat glossed over I believe, the following statement in the section "Differences between Kris Kowal's Q and $q" the following statement:

> $q is integrated with the $rootScope.Scope Scope model observation mechanism in angular, which means faster propagation of resolution or rejection into your models and avoiding unnecessary browser repains, which would result in flickering UI.

The first part of that statement is key: $q is integrated with the $rootScope.Scope which means other deferred objects that change values linked to UI components won't trigger the $rootScope.Scope to repaint the browser display.&nbsp; Therefore code like:

> `$get([some url]).then(function() { someUiBoundVariable = "in then"; });`

would fail to update the UI with the "in then" string value.

## Solution

So after realizing the issues of $q Deferred objects vs. other JavaScript Library Deferred objects I rewrote my Azure Service to utilize the $q deferred object.&nbsp; Interestingly, my coworker who introduced me to AngularJS soon contacted me about how to integrate AngularJS with the Azure Mobile Service, so I took my object and made it more generic so he and I could both use the same AngularJS Module.&nbsp; After we both used this for a little we realized we had a reasonably solid AngularJS Module for the Azure Mobile Services, and so was born the [AngularJS Module for Azure Mobile Services](http://www.nuget.org/packages/AzureMobileAngularServices)NuGet Package and [AngularJS Module for Azure Mobile Services](http://azuremobileangularservices.codeplex.com/)Codeplex Project.

## Get AngularJS Module for Azure Mobile Services

There are two ways you can use the AngularJS Module for Azure Mobile Services.&nbsp; First you can use NuGet and add AngularJS Module for Azure Mobile Services to your project.

NuGet Package: [http://www.nuget.org/packages/AzureMobileAngularServices](http://www.nuget.org/packages/AzureMobileAngularServices "AngularJS Module for Azure Mobile Services NuGet Package Link")

Or you can download the js file directly from CodePlex and add this to your project.

CodePlex Project: [http://azuremobileangularservices.codeplex.com/](http://azuremobileangularservices.codeplex.com/ "AzureJS Module for Angular Mobile Services CodePlex Link")

