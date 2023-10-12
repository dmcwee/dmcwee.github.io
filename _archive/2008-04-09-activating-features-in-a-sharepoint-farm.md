---
layout: post
title: Activating Features in a SharePoint Farm
categories:
- SharePoint
tags: []
---
I have been pounding my head against a wall for the last few days trying to get a couple of features to activate in my projects new High Availability Environment (HA).&nbsp; The environment consists of two MOSS Web Front Ends (WFE) named web1 and web2.&nbsp; Our env. also includes web3 which runs the Central Admin site, but does not have any of the externally accessible sites (the ones that run on port 80 and 443).&nbsp; This has lead to the following issues.

1. Attempt to activate the feature fails when executed from the web app.&nbsp; This issue was easily resolved when I read [The Kid's blog](http://blog.thekid.me.uk/archive/2007/02/05/activating-office-sharepoint-server-publishing-infrastructure-access-denied.aspx), basically the permissions proposed by Microsoft for the MOSS configuration does not allow this.
2. Actual values never appear in the web.config for web1 or web2
  1. I have a theory about this issue.&nbsp; In our development environment we have two WFEs, but one of them is also running Central Admin.&nbsp; I believe that I need to have the web applications running on the server that is also running Central Admin in order for this to work.&nbsp; As I work through this issue with our system admins I will update my findings.


<font color="#0000ff">Per the results here is my recommendation about configuring a SharePoint environment.  When you are running within a SharePoint farm ensure that the Central Admin server is also running the Web Application Service.  You do not necessarily have to allow it to be one of the Network Load Balanced WFE's but having it running the Web Applications seems to be important to allow configuration changes through out the farm.</font>

<font color="#000000">Since I have now gotten this to work consistently I feel comfortable with my code implementation, so here it is.  This IS how you can get a SharePoint Solution Feature Listener to actually modify the web.config file in a single server or multi-server SharePoint installation.</font>

<font color="#000000">First we create the class that is going to be our feature listener.  To do this using Visual Studio create a new class file and add inheritance from SPFeatureReceiver.  After adding this inheritance add the appropriate "using" statement, this can be done using the Intelli-Sense menu.  Next, using the Intelli-Sense menu add the four abstract methods FeatureActivated, FeatureDeactivating, FeatureInstalled, FeatureUninstalling.  For the Installing, and Uninstalling functions we will just leave those blank.  </font>

<font color="#000000">My personal preference is to now create a function that will return a list of SPWebConfigModifications, however I have seen other concepts on the web as to how best create the SPWebConfigModifications so it is up to you.  For this blog I am simply going to assume we have a function that returns a list of SPWebConfigModificaitons, the method you choose is up to you.</font>

<font color="#000000" size="4"><u>FeatureActivated</u></font>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public override void FeatureActivated(SPFeatureReceiverProperties properties)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List\<SPWebConfigModification\> modifications = CreateConfigModification();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPWebApplication webApp = null;

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (properties.Feature.Parent is SPSite)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPSite spSite = properties.Feature.Parent as SPSite;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp = spSite.WebApplication;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; else if (properties.Feature.Parent is SPWebApplication)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp = properties.Feature.Parent as SPWebApplication;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foreach (SPWebConfigModification mod in modifications)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.WebConfigModifications.Add(mod);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.Farm.Services.GetValue\<SPWebService\>().ApplyWebConfigModifications();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.Update();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

1. <font color="#000000">To allow a more generic approach to the activation getting the SPWebApplication object is done so we can handle Web Application, Site, etc. feature activation scopes.</font>
2. <font color="#000000">Once we have created the list of SPWebConfigModifications we simply loop through it and apply them to the SPWebApplication object.</font>
3. <font color="#000000">Finally, call the SPWebApplication's Farm Service to Apply the web.config modifications.  This causes the changes to setup across the farm.  ALWAYS follow this with the SPWebApplication's update function, which essentially causes the modifications to "stick".</font>

<font color="#000000" size="4"><u>FeatureDeacting</u></font>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public override void FeatureDeactivating(SPFeatureReceiverProperties properties)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List\<SPWebConfigModification\> modifications = CreateConfigModification();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPWebApplication webApp = null;

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (properties.Feature.Parent is SPSite)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPSite spSite = properties.Feature.Parent as SPSite;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp = spSite.WebApplication;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; else if (properties.Feature.Parent is SPWebApplication)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp = properties.Feature.Parent as SPWebApplication;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foreach (SPWebConfigModification mod in modifications)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.WebConfigModifications.Remove(mod);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.Farm.Services.GetValue\<SPWebService\>().ApplyWebConfigModifications();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.Update();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

1. <font color="#000000">To remove the modifications simply cycle through the same list of modifications we used orignally during activation.  I like this method because it is very clean and a bit more efficient.  However there is a problem with this approach!  If you do not name your modification correctly the modification will not be removed.  Therefore you may wish to cycle through the SPWebApplication's WebConfigModification list first matching the owner name to this feature's owner name and then cycle though that list removing the modifications as shown below</font>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public override void FeatureDeactivating(SPFeatureReceiverProperties properties)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List\<SPWebConfigModification\> modifications = new List\<SPWebConfigModification\>();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPWebApplication webApp = null;

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (properties.Feature.Parent is SPSite)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SPSite spSite = properties.Feature.Parent as SPSite;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp = spSite.WebApplication;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; else if (properties.Feature.Parent is SPWebApplication)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp = properties.Feature.Parent as SPWebApplication;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foreach (SPWebConfigModification mod in webApp.WebConfigModifications)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (mod.Owner.Equals(this.GetType().ToString()))

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; modifications.Add(mod);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; foreach (SPWebConfigModification mod in modifications)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.WebConfigModifications.Remove(mod);

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

&nbsp;

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.Farm.Services.GetValue\<SPWebService\>().ApplyWebConfigModifications();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webApp.Update();

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }

1. <font color="#000000">I usually use the typename as the owner, since the typename's must all be unique this ensures that all of my owners are unique.  I have also seen other developers use the Feature ID for the Owner property, that is up to you but make sure your's is always going to be unique if you use this method.</font>

<font color="#000000">Now you can activate and deactivate the feature for the farm.  I want to recommend adding <a href="http://blog.thekid.me.uk/archive/2007/03/24/web-config-modification-manager-for-sharepoint.aspx">The Kid's Web Modification Manager</a> page to your central admin site as well.  This will help you see if and when the modifications have been added, and will also allow you to remove ones that get orphaned.  If you are doing activation and deactivation especially in the development process, this will be a life (or sanity) saver.</font>

