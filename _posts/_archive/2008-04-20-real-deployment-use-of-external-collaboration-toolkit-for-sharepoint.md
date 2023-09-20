---
layout: post
title: Real Deployment use of External Collaboration Toolkit for SharePoint
categories:
- ECTS
tags: []
---
Microsoft has released the External Collaboration Toolkit from development, so what does this give you and your organization?&nbsp;

Lets start with a little background.&nbsp; Most companies have internal sites, I'll refer to as internal, that their employees use for various activities like timecard management, team collaboration, document storage.&nbsp; However, it is often desired that they have a site they can use with people outside of their organization, corporate partners, who do not need access to items like the timecard management but do need the team collaboration capability.&nbsp; Before ECTS we would either create an external user within our companies own Active Directory (AD) or some other user storage/authentication system.&nbsp; The problem was that organizations who had 100 people working there now had 1500 names in their AD because no one ever cleaned out old contacts, but that also means many of those users had access to systems, like the office desktops, that they did not need.

To try to resolve this issue Microsoft create the External Collaboration Toolkit for SharePoint (ECTS) which leverages Active Directory Application Mode (ADAM) and allows access to a previously internal site to external users.&nbsp; The documentation for ECTS provides a great installation document, but I have found some gaps in the install that can take hours to get around, and cause lots of headaches.

First, Microsoft's documentation talks a lot about how to create an internal and external web application from scratch, but since MOSS has been out for a while and is being heavily used then it is more probable that your internal site already exists.&nbsp; You can get around having to recreate your site from scratch, here is how (lets assume that your existing site it accessible at _http://internal_ and you want your external site accessible via _https://external.company.com_).

### Extending and Existing Web Application

1. In **Central Admin** click on the **Application Management** tab
2. Click on the **Create or Extend Web Application**
3. Click on the **Extend an Existing Web Application**
4. On the Extend an Existing Web Application
  1. Web Application Section
    1. Choose your _http://internal_ site from the Web Application drop down
  2. IIS Web Site Section


      1. This is the standard SSL port and since you are allowing external access this is probably what you want to use.&nbsp; However you can choose any port you want for this


- In the Security Configuration Section
1. **Authentication provider** : (just use the default)
2. **Allow Anonymous Access** : No
3. **Use Secure Sockets Layer (SSL)**: Yes
- Load Balanced URL Section
1. **URL** : should now be _https://external.company.com_
2. **Zone** : Extranet
- Click **OK**

Once the Web Application Extension has completed we need to make sure the Alternate Access Mappings are correct.&nbsp; Conflicts might exist will exist if the internal and external sites are running on the same ports without any way for IIS to differentiate between the two sites.

### Alternate Access Mappings

1. In **Central Admin** click on the **Operations** tab
2. Click on **Alternate access mappings** under **Global Configuration**
3. Verify you have an entry that shows _https://external.company.com_ as the **Internal URL** and **Public URL**.&nbsp; The **Zone** should be **Extranet**
4. I also recommend adding an entry for _http://internal_ in the **Alternate access mappings**
  1. Select the internal site from the **Alternate Access Mapping Collection** drop down list
  2. Click on the **Edit Public URLs**
  3. In the **Intranet** text box add _http://internal_
  4. Click **OK**

Now that we are sure our alternate access mappings are correct we need to make sure we do not have any IIS conflicts.&nbsp; IIS conflicts are likely because both the internal and external sites are likely running on port 80 and neither is configured with host headers.&nbsp; Another possible issue is that the internal site could have been setup to run on port 443 which will also cause conflicts.

### IIS Web Applications

1. Right click on the **My Computer** icon and select **Manage** from the menu
2. Expand the **Services and Applications** and **Internet Information Service** branches in the **Computer Management** Tree
3. Click on the **Web Sites** folder under IIS.&nbsp; This will cause the right pane to display the web sites that are hosted on the machine.
4. If either your internal or external site is stopped then you have an IIS port conflict which means you will have to add host headers to resolve the issue.
5. Right click on your internal site and select **Properties**
6. On the **Web Site** tab click on the **Advanced** button (next to the **IP Address** for the site)
7. Select your default identity for the site and click on the **Edit** button
8. Set the **Host Header** value to _internal_
9. Click **OK**
10. Click **OK**
11. On the **Web Site** tab set the TCP port to _80_ and remove the **SSL Port** value
12. Click **OK**
13. Right click on the external site and select **Properties**
14. On the **Web Site** tab click on the **Advanced** button (new to the **IP Address** for the site)
15. Select your default identity for the site and click on the **Edit** button
16. Set the **Host Header** value to _external.company.com_
17. Click **OK**
18. Click **OK**
19. On the **Web Site** tab set the **TCP Port** value to _80_ and the **SSL Port** to _443_
20. Click **OK**

What we have just done is set IIS to handle request for _external.company.com_ and _internal_ by the two web applications.&nbsp; If either of your sites (internal or external) were stopped then you may now start the site successfully.

Now try connecting to _http://internal_, you should get the windows authentication box, or you will be logged in automatically.&nbsp; Then try connecting to _https://external.company.com_, you should be presented with a forms based authentication box.&nbsp; If you are presented with an error about the inability to connect to your ADAM instance then the most likely cause is that the Secure LDAP connection is not working.&nbsp;

### Troubleshooting ADAM

1. On the server where your ADAM instance for ECTS is installed try connecting using the ldp program.
  1. Click on **Start** -\> **All Programs** -\> **ADAM** -\> **ADAM Tools Command Prompt**
  2. Type _ldp_ and press Enter
  3. Click on the **Connection** menu
  4. Click on **Connect...**
  5. In the Connect window use



    4. Click **OK**

If you are able to connect locally then attempt this from the SharePoint WFE, use the directions above but use the correct server name instead of _localhost_, where the external site is running.&nbsp; (Windows 2003 Server R2 comes with ADAM, but you may need to install it.&nbsp; To install ADAM refer to the ECTS Installation and Configuration manual or download ADAM from Microsoft's MSDN web site.)&nbsp; If you are unable to connect ensure that you have installed the appropriate Certificate for Secure LDAP connection and that any firewalls that may exist between you ADAM Server and your WFE have openings for the Secure LDAP connection.

If you get both the windows and the forms based authentication then you can move on at this point.&nbsp; Otherwise you should probably revisit the above steps, and ensure you can connect to ADAM over Secure LDAP.

At this point you might be interested in adding a user to your ADAM instance and seeing if you can use that to log in, DO NOT.&nbsp; What you will find is that by adding the user through ADAM instance editor when you attempt to add the User Manager web part to your management page like instructed in the ECTS install the Web Part will throw an exception.&nbsp; Instead, follow the configuration instructions in ECTS.&nbsp;

When you have completed the ECTS configuration you will be ready to allow internal and external users to access your sites.

