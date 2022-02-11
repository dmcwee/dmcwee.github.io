---
layout: post
title: O365 MFA vs Azure AD MFA
date: 2018-12-04 15:44:20.000000000 -05:00
categories:
- AAD
- Security
- Identity
tags:
- Azure Authenticator App
- Multi Factor Authentication
- Office 365
- Azure
- Azure Active Directory (AAD)
- Azure Active Directory B2B (AAD B2B)
- Microsoft
- Security &amp; Identity
permalink: "/2018/12/04/o365-mfa-vs-azure-ad-mfa/"
---
As a Technical Solutions Professional at Microsoft who covers Identity and Security I get a lot of questions about Office 365 MFA vs. Azure Active Directory MFA around the differences, benefits, and what I suggest. Customers always assume because I concentrate on the EMS stack Microsoft offers (Intune, Azure AD, Azure Information Protection) I recommend Azure AD MFA over Office 365 MFA, but the reality is when customers really compare the experiences they will almost always go with Azure AD MFA.

Before we talk about Office 365 vs Azure AD MFA let me make this position perfectly clear.

> Use MFA! If you are not using, or haven't implemented, MFA stop reading and GO TURN IT ON especially for your Administrator accounts.

Why? We, Microsoft, find that by enabling MFA on your accounts the your organization will reduce account compromise by OVER 99%!

## Office 365 MFA

Office 365 E3, and up, subscriptions entitle an organization to enable Multi Factor Authentication for their users who will be accessing O365 resources (SharePoint, OneDrive, Office Pro Plus, etc.). When a user is entitled and enabled to use MFA they have three (3) options:

1. Azure Authenticator App
2. Text Message
3. Phone Call + PIN

To enable Office 365 MFA you must turn the feature on for each user individually (user-by-user), and once MFA is required for the user, it is always required for the user. Therefore, when a user is authenticating to O365 resources from their work computer or home computer using Office or browser, they will be prompted for MFA verification.

## Azure AD MFA

Azure AD MFA is available for organizations that purchase Azure AD Premium P1, or P2, licenses for their users and this Multi Factor Authentication solution can be use with Office 365, Azure, On-Premise applications, third party applications (SaaS), and custom built Line of Business applications. Like the O365 MFA offering Azure AD MFA provides three (3) 'native' options:

1. Azure Authenticator App
2. Text Message
3. Phone Call + PIN

Azure AD also offers customers the ability to use 3rd party MFA providers including the following:

1. RSA
2. DUO
3. Trusona
4. (More to come)

This additional integration with 3rd party MFA providers means that any existing investment in MFA can continue to be leveraged and we can provide MFA support even in locations where mobile or office phone access is limited or prohibited.

The way an organization applies MFA with Azure AD is also different than Office 365. When applying MFA with Azure AD an organization does so by creating Conditional Access (CA) rules. CA rules for MFA can be very simple:

```
All Users + All App + MFA = Grant Access
```

Basically this is what the Office 365 MFA solution provides, but limited to O365 apps that is. However, CA can do much better, it can actually allow you to address questions and policies intelligently:

- Why prompt for MFA when a user is connecting from a corporate network and is using a corporate device?
- Why prompt for MFA when a user is connecting to their time card the same way you would if they were connecting to the corporate account line of business application?
- Why MFA everyone all the time, can we target specific users when they are accessing accessing sensitive information?

Using CA to drive MFA also allows your organization to integrate MFA easily with Windows Always-On VPN solutions. Now not only do you protect a user when their app connects to a service, but you protect your corporate network when an endpoint device connects and its all managed with the same CA, MFA, and identities.

## What drive Azure AD MFA over Office 365 MFA

I find most organizations choose Azure AD MFA over Office 365 MFA for one of these two reasons:

1. They already invested in an MFA solution, maybe RSA, so the users know it, IT trusts it, and they can continue to use it.
2. They don't have to use an All-Or-Nothing approach, they can apply a Who-What-When-Where approach to their MFA policy and only require MFA when necessary.

To me, the greatest benefit of Azure AD MFA is the ability to target MFA scenarios. I've seen many customers push MFA for everyone all the time, and within a short period of time they turn it off because "there was too much prompting"

