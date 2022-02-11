---
layout: post
title: User Profile Personalized Links
date: 2012-03-01 23:52:03.000000000 -05:00
categories:
- Microsoft
- SharePoint
tags: 
- SharePoint 2010
permalink: "/2012/03/01/user-profile-personalized-links/"
---
Recently my company performed a migration for our old production environment to a new production environment so we had a more stable and robust platform to support the company, including providing leadership with better business intelligence about our operations. As part of the migration one of my goals was to launch My Sites for our internal users so they had somewhere to store information they were working on.

As I was thinking about what would be useful to our employees I ran across the Personalized Links capability available in the User Profile Service Application. In general this capability allows us to "push" links onto a user's My Site. Since our company uses Great Plains for timecards and financial management integrated into SharePoint I thought it would be worthwhile to place the link to an employee's Timecard Entry page along with a link to our primary portal. I then decided a link for Timesheet Reviewers made sense, but I didn't want it to show up on all of the employee's pages, just the employees who actually review timesheets. We have already scoped this link on our portal by using the Business Portal security groups, but since we are working in the context of the My Site we don't have those security groups to rely on.

User Profile Personalized Links like most other things in SharePoint include the ability to apply audiences, so controlling who sees the links are possible, but I needed to create the right audience. I jumped over to the Profile Audiences and told my profile service to compile the audience. While the audience was compiling I applied it to my Personalized Link for Timesheet Review. I then checked to see that the audience had compiled and took a look at my My Site…no Timesheet Review link.

I took another look at my audience and realized it had 0 members, so I decided to delete it. After deleting the audience I then decided I would remove the Timesheet Review Link for the time being ad that is where the trouble began.

When I pulled up the Personalized Links page the only item showing where my links should have been was a message "The query returned and error. Contract your SharePoint Administrator" \*Crap! I am the SharePoint Administrator! \*

Ok, I figured I could fix this easily, I'll just recreate the Audience with the same name…Nope, same error message.

Ok, the add new link button is available, I'll add a new Link and the bad one will get "fixed" magically…Nope, no magic here.

Ok, so I checked my SharePoint Logs, my server application logs, and everywhere else in hopes I would see what the exact error was, alas nothing…

Fine, SharePoint is nothing more than a database application when we boil it down to the root I decided to crack it open and see what was going on. I opened the My Site Content Database and began looking at the various tables and opening the ones I thought had the highest probability of containing the list of links I had created.

After about an hour of searching I finally opened the table SharedListSync, and there I found my entry for the Timesheet Review along with the audience GUID. I decided the best method at this point was to change the audience GUID to 0, like the other entries that I had not applied Audiences to.

When I returned to the Personalized Links page sure enough all the links I had entered were now available and I was able to finally remove the Timesheet Review link.

