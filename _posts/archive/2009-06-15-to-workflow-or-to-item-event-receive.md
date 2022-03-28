---
layout: post
title: To Workflow or to Item Event Receive
date: 2009-06-15 15:39:29.000000000 -04:00





categories:
- SharePoint 2007
tags: []

  


  
  
  
  
  
permalink: "/2009/06/15/to-workflow-or-to-item-event-receive/"
---
I was recently asked about how to determine when a List Item should be transferred from one list to another.&nbsp; Immediately two possible solutions came to mind, use a Workflow or use an Item Event Receiver.&nbsp; I offered both as “capable” of handling such a need, which of course lead to the next “well which should I use for this…” question and this blog.

### Background

SPItemEventReceiver “Provides methods for trapping events that occur to items.” – [MSDN](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.spitemeventreceiver.aspx).&nbsp; This class generally provides two functions for each action that can occur to an item in a list, eg. ItemAdded and ItemAdding, one that is Synchronous and the other that is Asynchronous.&nbsp; Custom receivers can be added to lists either programmatically or by ContentType ID.

SPWorkflow “A workflow instance that has run or is currently running on an item.” – [MSDN](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.workflow.spworkflow.aspx). This class is not used like the SPItemEventReceiver because with a workflow we are usually looking at Sequential or State Machine Workflow instances, but I want to remain as generic about the workflows in this article as possible.&nbsp; This statement does highlight a significant and important difference between the Item Event Receiver and the Workflow, workflows run ON an item but are not necessarily driven BY the item itself.

Before going any further I want to make sure the reader understand that I’m not saying one solution is right and the other is wrong, or that you should only use this solution for this issue.&nbsp; I also want to be clear in that this is not an either-or approach to solving a problem, in fact the more complex the issue the more you may find the need for both in a “little of this-little of that” solution.&nbsp; Instead what I have found is that developers often learn one of these two skills and then apply that to everything because it is what they are comfortable with or because it is a new skill and we all like to use our new skills!&nbsp; Which ever of these cases you fall into I hope this blog will help you understand the benefits of another capability, and save you some time.

### SPItemEventReceiver

A SPItemEventReceiver is intended to deal directly with a List Item, either during or immediately after an that item has been involved in an event.&nbsp; The statement “defining” the SPItemEventReceiver above shows that the SPItemEventReceiver is used to “react to” changes to the item itself.&nbsp; The Event Receiver is aware of all information stored by an item in the list, and in the ‘ing’ (sychronous) events even exposes the original and new values.

Since the SPItemEventReceiver is designed to interact directly with a list item when a change occurs, actions that are driven by the information it represents are standard candidates for being implemented in the SPItemEventReceiver.&nbsp; The most common example of this is dealing with records that could be associated with an item that has been deleted from a list.&nbsp; In this case removing the record association link from all items in the list would be implemented in the asynchronous ItemDeleted event.

**My rule of thumb:** &nbsp; Use SPItemEventReceiver when the information in this list item the driver for the event (when you must react).&nbsp; This may be part or all of the entire information stored by the list item, but in all cases the information in the list item is the MOST IMPORTANT aspect to consider.

### SPWorkflow

A SPWorkflow comes in different flavors, but workflows all have one thing in common and that is a “process” by which the workflow will move from beginning to end.&nbsp; The statements “defining” the SPWorkflow above show that the SPWorkflow is running ON an item.&nbsp; Therefore the workflow process is typically generic and not oriented to the specific information contained in the actual List Item it is associated with.&nbsp; This is not to say that the list item’s data is irrelevant, the information may be displayed or modified in one or many of the workflow steps, but the workflow is more oriented toward processing the steps an item must go through to reach a “final” state.

Since the SPWorkflow is designed to progess an item through a series of steps it is mostly concerned with its own state (active/complete), how to move to the next state, and so forth.&nbsp; Due to this orientation toward step processing of an item, series of actions that will repeat consistently and predictably are candidates for being implemented as Workflows.&nbsp; The most common example of this is of course the approval process where one or many users/groups must “sign off” on the item before is is approved.

**My rule of thumb:** Use SPWorkflow when there are a series of steps and actions an item must go through to get from a beginning state to an ending state (when you must cause action).

So what did I recommend for moving the item from one list to another?&nbsp; First, my question was “How do you determine when to move the item?”.&nbsp; Based on the answer, “User checks a box on the Edit Item screen” I recommended the SPItemEventReceiver because there was no process for “approving” or determining when to move the item, just a reaction to a List Item’s field.

