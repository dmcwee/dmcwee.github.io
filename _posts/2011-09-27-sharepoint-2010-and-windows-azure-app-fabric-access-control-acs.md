---
layout: post
title: SharePoint 2010 and Windows Azure App Fabric Access Control (ACS)
date: 2011-09-27 16:24:11.000000000 -04:00





categories:
- Microsoft
- SharePoint 2010
tags: []

  

  
  

  
  
  
  
  
permalink: "/2011/09/27/sharepoint-2010-and-windows-azure-app-fabric-access-control-acs/"
---
Last month I was working on a demo for a charitable organization that has lots of volunteers around the country. The charity didn't want to have to create new active directory accounts for each of these volunteers so as part of the demo we integrated SharePoint 2010 site with Windows Azure App Fabric Access Control (ACS), this way we could use Google, Windows Live, and Yahoo! as authentication providers. (Yes I know we could hook directly to each of these providers, but using ACS allowed me to use all the providers with one SharePoint Trusted Provider instead of using three different trust providers). We demoed the site to the charity and they were very excited and happy with the solution.

This week we began building a demo for an accounting firm who needs to be able to grant access to external clients. While talking with our Business Developers and other team members I recommended we re-use the ACS access for this new site to give the external users access. I first attempted just enabling the current ACS Trust for my new Account site, but found that it was trying to authenticate me to the original charity site. After a little playing around here are the steps to allow multiple sites to authenticate with a single Windows ACS.

## Add a new Relying Party Application

From the Windows Azure AppFabric portal (or the demo portal as we are using) select your existing SharePoint 2010 Service Namespace and click on the Access Control Portal button.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint21.png)

From the Access Control portal select the Relying Party Applications  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint22.png)  
  
In the Relying Party Applications click Add.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint23.png)  
  
Provide a unique name and realm for the new application.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint24.png)

Make sure you increase the Token lifetime so you don't get stuck in a token issue-reissue cycle. For the Rule Group use the same rules I created for my previous application. Also make sure you select the "Use a dedicated certificate" for the Token Signing Setting. You can re-use the same certificate for each application or issue a new one, but if you don't set this value one of the certificates created by Windows ACS will be used and your services will fail to authenticate due to certificate signing issues.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint25.png)

Now click the Save button.

At this point you should have a new relying party application listed.

## Update your SharePoint Trust

Now you will need to go to your SharePoint 2010 environment and log in as one of the SharePoint Farm Administrators.  
In Central Administration view the application previously configured with the Windows ACS. Here you are just looking for the name of the Trusted Authentication provider, we will need that name in order to access it from the SharePoint Management Shell.  
Open the SharePoint Management Shell and type the following command:  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint26.png)  
  
To see all the properties of the provider type $provider in the management shell. This will result in a printout of all the properties.  
Next we need to create a URI object so we can add a new realm to the Trusted Identity Issuer.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint27.png)  
  
Now we can add the realm with the URI to the trusted provider we retrieved  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint28.png)  
  
Now update the provider.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint29.png)  
  
Now when you display the Trusted Identity Issuer you will see an entry in the Provider Realms like this.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint210.png)

## Update your SharePoint Site Authentication

Now we can enable the site to use this claim provider.

Go back to Central Administration-\>Manage Web Applications and select the new site.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint211.png)  
  
Then select Authentication Providers and the name of the Zone you want to allow ACS authentication for.  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint212.png)  
  
Scroll down in the Edit Authentication window and check the Trusted Identity provider and your Windows ACS provider name (this is the same name we used above in the SharePoint 2010 Management Shell).  
 ![]({{ site.baseurl }}/assets/images/2011/09/092711_2023_sharepoint213.png)  
  
Now scroll all the way down to the bottom and click Save.  
Now go and log into your site with a non Windows ACS account. This way you can add some Windows ACS accounts to your site and test.  
Once you have added some accounts go ahead and give it a try, you should be able to log in using your Windows ACS service on both the original and the new site.  
Need to set up ACS for the first time? I recommend using these sites:

[https://blogs.pointbridge.com/Blogs/nielsen\_travis/Pages/Post.aspx?\_ID=38](https://blogs.pointbridge.com/Blogs/nielsen_travis/Pages/Post.aspx?_ID=38) (this is a bit older version of ACS, so the UI is different)

[http://blogs.technet.com/b/speschka/archive/2011/05/05/federated-saml-authentication-with-sharepoint-2010-and-azure-access-control-service-part-1.aspx](http://blogs.technet.com/b/speschka/archive/2011/05/05/federated-saml-authentication-with-sharepoint-2010-and-azure-access-control-service-part-1.aspx)

