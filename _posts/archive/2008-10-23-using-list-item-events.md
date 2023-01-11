---
layout: post
title: Using List Item Events
categories:
- SharePoint 2007
tags: []
---
Being one of the Sr. Developers on a project, and being responsible for Code Review and a part of the Configuration Management team I recommended we use some versioning of our assemblies. I stand by this decision on the versioning as I do believe it is very important, but when had to start modifying code in the Account Registration process I realized a flaw. I was using a SPItemEventReceiver and had not accounted for the assembly numbers changing which would affect SharePoint's ability to call the correct event receiver. The key issue was I HAD to update the event receiver and without the ability to remove the old event handlers and replace them with the new assembly event receivers I couldn't comply with the Code Review standards for Assembly Versioning.

&nbsp;  
&nbsp;

After a little thinking and research the code below allowed me to resolve the issue.

&nbsp;  
&nbsp;

Step 1. Finding and remove the old event receiver

list = spWeb.GetListFromUrl(listUrl);

bool allItemsChecked = false;

while (!allItemsChecked)

{

allItemsChecked = true;

foreach (SPEventReceiverDefinition receiver in list.EventReceivers)

{

if (

(receiver.Type == SPEventReceiverType.ItemAdded ||

receiver.Type == SPEventReceiverType.ItemUpdated)

&& receiver.Class == typeof(MyRequestItemEventReceiver).ToString()

)

{

receiver.Delete();

allItemsChecked = false;

break;

}

}

&nbsp;  
&nbsp;

You will notice that I loop through the event receivers and each time I removed/delete a receiver I start looping again. This restart ensures that when you delete the object the foreach loop continues to work properly and does not reference deleted items. I chose to compare just the Receiver.Class because, as I mentioned above the version numbers change but the list is maintained.

&nbsp;  
&nbsp;

I initially assumed that receiver.Type would return to me the Object.Type information. This was not an accurate assumption and I do think it is a BAD thing that Microsoft allowed in this case. Given that Type is a specific object in .NET I really think this attribute should have been named EventType, but I wasn't asked…so… Anyway, I check the Type to ensure that I only remove the events that I added custom actions for.

&nbsp;  
&nbsp;

&nbsp;  
&nbsp;

Step 2. Add new event receivers

list.EventReceivers.Add(SPEventReceiverType.ItemUpdated,

this.GetType().Assembly.ToString(),

typeof(MyRequestItemEventReceiver).ToString());

&nbsp;  
&nbsp;

list.EventReceivers.Add(SPEventReceiverType.ItemAdded,

this.GetType().Assembly.ToString(),

typeof(MyRequestItemEventReceiver).ToString());

&nbsp;  
&nbsp;

&nbsp;  
&nbsp;

I implemented this code as part of my SPFeatureReceiver in the FeatureActivated function, because during that event I also update some other critical items the SPItemEventReceiver uses. You may find that removing and adding your custom event receivers to the list during the FeatureActivated event is more appropriate.

