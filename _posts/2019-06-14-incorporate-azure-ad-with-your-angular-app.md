---
layout: post
title: Incorporate Azure AD with your Angular App
date: 2019-06-14 16:06:51.000000000 -04:00
categories:
- AAD
- Identity
tags: 
- Angular
- Azure
- Azure Active Directory (AAD)
- Coding
- Microsoft
- Typescript
permalink: "/2019/06/14/incorporate-azure-ad-with-your-angular-app/"
---
I began my career as a software developer and I still love the opportunity to tinker with code from time to time. Since I usually deal with authentication and identity I have a need from time to time to demonstrate how customers can add their own custom applications to Azure AD and how the protections can be applied. So, I spent a few days recently building and testing my own, single page, custom application based on the latest version of Angular (Typescript).
<!--more-->

While I could detail what I did to get the project working, it is probably easier to provide the various links I used to learn Angular as well as the libraries I used and added to get the project working.

# Getting Going

Since I had ZERO experience with Typescript and the latest TS Angular I started with the [Tour of Heroes tutorial](https://angular.io/tutorial).

Second, I was able to find the Angular-MSAL library available [here on Github](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular). I recommend going here so you can read the friendly documentation, but use 'npm install @azure/msal-angular' to add this to your development project.

Third, I followed [these directions](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa#register-your-application) to register my application in Azure AD.

Finally, I used the sample application [found here](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular/samples/MSALAngularDemoApp) to make my application. This is where I found the most trouble so below I'll focus on some of the issues I had.

# Issues I Had

The first issue I ran into was that every time I logged in I would get an error about lacking some api permissions. Searching for the error didn't provide really relevant information so I started to eliminate as much as I could. What I discovered was that during the LoginPopup call the Sample code I copied and pased into my app include 'api://a88bb933-319c-41b5-9f04-eff36d985612/access\_as\_user' which is unnecessary for Login and user queries so I removed it.

The second issue I ran into was that the MsalService.getAllUsers() only returned my local user's information, which is actually documented, but I wanted that ability. Instead I had to call directly against the Graph services to get that information which you can find [my solution here](https://github.com/dmcwee/msaldemo/blob/master/src/app/userlist/userlist.service.ts).

# My App

If you are interested [here is the app I created](https://github.com/dmcwee/msaldemo). Yes there are still some issues which I'm working on, but it may be an easier starting point for others.



