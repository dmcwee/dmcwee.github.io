---
layout: post
title: The Identity stupid!
date: 2019-04-02 09:51:15.000000000 -04:00
categories:
- AAD
- Identity
tags: 
- Azure
- Azure Active Directory (AAD)
- Security &amp; Identity
permalink: "/2019/04/02/the-identity-stupid/"
---
James Carville's campaign strategy for Bill Clinton's '92 campaign was **"The economy, stupid!"** These 3 words left no doubt to what was important, what to focus on, and the fact that getting the Economy right would make everything else possible. Today, as we look at changes to the corporate IT network and infrastructure we should adopt a similar slogan:

## The Identity, stupid!

Identity is a core enabler of modern solutions be they Collaboration, Security, from IaaS to PaaS. Companies in the past could rely on physical controls to secure information, but today Cloud and the interconnectedness of businesses has destroyed those controls. So where does this leave us in a world where we don't control where information is accessed from, by what devices, or where the information is stored? We are left with one truth, unique to everyone and applicable to devices and data: Identity.

The funny think is, we've known identity has been important for a long time. If you ever took a class on journalism the first thing they taught was the mantra " **Who** , What, When, Where, Why." When you log into your computer today the first thing it asks you is: **Who** are you? When you go to buy a car, boat, or house you have to tell them is **who** you are. You even have to tell the barista at Starbucks **who** you are!

# Identity is important, so protect it!

Identity is the control mechanism today for enabling technology, if you secure the identity you've gone a long way to securing your systems and your data. Here are some methods to improve your organization's identity strength without hampering their ability to do work.

## Update your password policy

Recently even [NIST updated their password policy](https://pages.nist.gov/800-63-3/sp800-63b.html) (Section 5.1.1.2) to reduce the artificial complexity rules, changes passwords only when suspected of compromise, and perform checks against 'dirty words' and previously compromised passwords. At Microsoft the use of 'Seattle', and 'Seahawks' are rumored to be banned (I wouldn't know because I don't live in Seattle and I'm not a Seahawks fan).

Beyond these recommendations think Passphrase not Password. The longer the password the more difficult it is to guess so brute force and dictionary attacks are less likely to be successful.

All of these policies are easy to implement, prohibited words/phrases, detection of compromised passwords, and password length controls, and even self service password resets are built into Azure Active Directory. Azure Active Directory can become the central hub for password management with the ability to synchronization changes to your on-premise systems.

## Enable MFA

I wrote about this in another [post](https://davidmcwee.com/2018/12/04/o365-mfa-vs-azure-ad-mfa/), but seriously if you have any admin accounts that don't have MFA enabled stop reading this and go GO TURN IT ON NOW!

MFA is one of the simplest solutions to interrupt account compromises, and it has become more common for users because it is used in Banking Apps, Commercial Email, and even Facebook recommends your account be protected with MFA. At Microsoft we see a decrease in account compromises by over 99%. Clearly, this is the first step in enhancing the security of your identities. This is already included in O365 E3 or Azure Premium licenses and enabling it is just a few checkboxes, so there really is NO EXCUSE!

## Use data

Monitoring accounts is critical, but there is a lot of information about what is happening in the world, like Dark Web sale of Credentials, that may not show up in your organization's monitoring of accounts. However, a service like Azure Active Directory which is used by millions of user accounts daily gets lots of insight not only about your accounts but from all accounts, so when an attack is detected everywhere everyone can benefit from awareness and steps taken to block this type of attack.

## Use AI and ML

Along with information about what is happening globally around authentications, it is also important to understand what is 'normal' and what is 'abnormal' for your users. If users sign in Monday-Friday between 9am and 5pm for 15 years then your identity system should recognize that a sign in on Saturday at 2:30am is abnormal. In this scenario the system may require extra identity validation (MFA), block the login attempt, or alert your other security monitoring tools and personnel. This capability is part of the Azure Active Directory Conditional Access which natively learns user behavior patters and can dynamically adapt the authentication experience based on user behavior patterns.

## Change Written Policy to Automated Action

If you want to protect identities, really if you want to protect anything these days, then you need to take written policies and automate them in your identity system. A written policy like "If a password is compromised require a user to change it" requires a user to be notified and then for them to take action. Instead, your Identity tools should be able to detect the credential compromise and require a password reset (with MFA validation) on the next login attempt. In Azure Active Directory this can be done with Identity Protection policies, so if a user's authentication event appears risky then flag the account for a password reset.

## Loose the Password

I mention this one last because a Zero Password World isn't quite there for everyone, but we are close. With Windows Hello and the Microsoft Azure Authenticator app we are moving closer and closer. Personally I don't have a password for any of my Microsoft consumer accounts (Hotmail, OneDrive, etc.) and I very seldom use a password when accessing my Microsoft corporate resources. Actually, one the rare occasion I am prompted for a password I usually have to perform a Self Service Password reset, because I honestly don't remember it.

Azure Active Directory has added this ability, but it is currently in Preview (maybe even Private Preview) so customers have to opt it to enabling the capability, but this is coming and I predict by the end of 2019 this capability will be readily and easily available to customers.

# The Identity, Stupid!

It is time for us to focus on what is most important to the success of modern IT, both for usability and security, and it is all about **Who!**  Like the 90's campaign use this motto/mantra/whatever you want to call it to help you focus on **The Identity, Stupid!**  If you get Identity right you can make everything else happen.

