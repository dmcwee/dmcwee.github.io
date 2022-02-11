---
layout: post
title: Automate Accounts for Azure AD
date: 2019-07-18 16:43:32.000000000 -04:00
categories:
- AAD
- Identity
tags:
- Azure Active Directory (AAD)
- Security and Identity
- SharePoint
- SharePoint Online (SPO)
- Flow
- Forms
- Microsoft
permalink: "/2019/07/18/automate-accounts-for-azure-ad/"
---
Azure AD's B2B capability is a really powerful way to leverage identities from outside of an organization, but is it the right solution for seasonal, temporary, or white listed employees?&nbsp; Maybe, maybe not, and if not then the creation of cloud only accounts may require a time consuming (possibly manual) request \> approval \> provision process.

Recently I had a customer that asked how we could automate an account provisioning processes that allow for a request, an approval workflow, automated account provisioning, association of the account with a 'manager', an automated actions if the 'manager' departed, and time boxing of the account.&nbsp; In order to minimize development and utilize as much Out of the Box as I could I turned to Flow.

# Start with SharePoint

> So this is the benefit of experience: I actually started with Flow and discovered the template for Flow, SharePoint, and Azure AD.&nbsp; Because I started with Flow I didn't think about what data I wanted to capture first, I just wanted to get accounts creating and would add fields as I needed them.&nbsp; This lead to some issues, probably because I'm impatient, between adding field and having those available in Flow.&nbsp; Therefore, I recommend YOU think about the information you need to capture from a user, build your SharePoint list and then proceed.

I decided that I would create a new site for tracking requests and host my request list in this location.&nbsp; In a real world environment this would allow an organization to have a single account request location which I viewed as valuable.

I created a list as shown below (_Title_ will be used as the last name)

![SP List]({{ site.baseurl }}/assets/images/2019/07/sp-list.png)

All fields are _Single Line of Text_ except for _Review Status_ which is a _Choice_ field with _Pending, Approved, Rejected_ as the options with _Pending_ as the Default value.

# Create your workflow with Flow

I am by no means a Flow expert, thanks to this demo I learned a little bit, but I really needed a simple place to start.&nbsp; Fortunately, if you go to _Flow_ select _Templates_ and _Search_ for _Azure AD_ the second template is _Create Azure AD User from SharePoint List_.

![Flow Templates]({{ site.baseurl }}/assets/images/2019/07/flow-templates.png)

Once the flow is generated you need to update the first action with your SharePoint site Url and list name.

![Flow Item Created]({{ site.baseurl }}/assets/images/2019/07/flow-item-created.png)

You can skip the second action as this will generate a random password for the account.

Next, you need to update the _Create User_ step based on the fields you created in your list.&nbsp; You can also use Expressions to customize the values you want to use when creating the user.&nbsp; For example I use the following to create a username:

```
concat(triggerbody()['FirstName'], '.', triggerbody()['Title'], '@mydomain.com')
```

![Flow Create User]({{ site.baseurl }}/assets/images/2019/07/flow-create-user.png)&nbsp;You will also notice that I've clicked on the _Show advanced options_ and updated the _Business Phone_, _Department_, _Job Title_, _Mobile Phone_, _Office Location_, and _Preferred Language_.

> Account creation will fail if Preferred Language does not meet the specific format.&nbsp; Business Phone can be an empty array, but cannot accept a null value.  
> eg. [] - ok  
> [null] - failure

Next, update the _Update item_ action to set the current item's _ReviewStatus_ value to _Approved_.&nbsp; You will also notice the _IsComplete_ field with a value of _true_, this field needs to be added to your SharePoint list or else the _Update item_ action will fail.

![Flow Update Item.png]({{ site.baseurl }}/assets/images/2019/07/flow-update-item.png)

Finally, update the _Send an email_ action to utilize the values captured from the list.

![Flow Send Email.png]({{ site.baseurl }}/assets/images/2019/07/flow-send-email.png)

Now you should be able to test you Flow by creating an item in the SharePoint list and observe the execution of your flow, and if there are errors then you can perform troubleshooting and resubmit.

![Flow Runs]({{ site.baseurl }}/assets/images/2019/07/flow-runs.png)

# Add the Review

Now that the creation process is working update the flow to include the actual review phase and condition handling.&nbsp;Add the _Start and wait for an approval (v2)_ action to your flow AFTER the _Initialize variable_ step and configure it as shown.

> The Initialize Variable cannot happen within the Condition portion of the workflow, so you may as well initialize this immediately after the flow starts.

![Flow Wait for Approval]({{ site.baseurl }}/assets/images/2019/07/flow-wait-for-approval.png)

Next, add a _Condition_ action to your flow.&nbsp; Update the _Condition_ to use the _Outcome_ of the _Start and wait for an approval_ outcome to be equal to _'Approve'_.

![Flow Condition]({{ site.baseurl }}/assets/images/2019/07/flow-condition.png)

Finally, move (yes drag and drop does work) the _Create User_, _Update Item_, and _Send an email_ actions into the _If yes_ segment of the workflow. You should also&nbsp;add a _Send an email_ to the _If no_ segment of the workflow and send the user a notification that their request has been rejected.

![Flow Condition Branches]({{ site.baseurl }}/assets/images/2019/07/flow-condition-branches.png)

> I recommend testing again to make sure your approval process works as expected, and be sure to test both the Approve and Reject.

# Collect Requests with Forms

Now that our flow works we need to set up a way for people to submit requests to be reviewed and approved/rejected.&nbsp; Microsoft Forms is a simple way to create the request form you need and allow it to be shared outside of your organization.

Creating a Form is really easy so I won't provide the full details, but create a new Form that captures the same information that the SharePoint list stores.&nbsp; Don't include the workflow type fields like&nbsp;_Approval status_ and _IsComplete_ field of course.&nbsp; Here is an example of the Form I created.

![Form Example]({{ site.baseurl }}/assets/images/2019/07/form-example.png)

As you can see I provided friendly names for each of the user input fields and marked everything as required.

Now you need to allow this Form to be accessed by anyone with the link.&nbsp; To do this click on the _Share_ button in the upper right of the browser window and select the _Anyone with the link can respond_.&nbsp; This will allow you to copy the URL and send it to any external participants.

![Form Share]({{ site.baseurl }}/assets/images/2019/07/form-share.png)

# Tie this all together

The final part is to pull our Form submission into our SharePoint list, and again we go back to Flow for this and use an existing Template.

![Form Flow]({{ site.baseurl }}/assets/images/2019/07/form-flow.png)

After creating the new Flow from the Template you need to customize the _When a new response is submitted_ Action and select the form you just created.

![Form Flow New Response]({{ site.baseurl }}/assets/images/2019/07/form-flow-new-response.png)

In the _Apply to each_ action update the _Get response details_ and select the form you created.

![Form Get response details.png]({{ site.baseurl }}/assets/images/2019/07/form-get-response-details.png)

Finally, update the _Create item_ by selecting the _Site Address_ and _List Name_, then expand the _Advanced Options_ so that all the fields from your list display.

![Form Create Item]({{ site.baseurl }}/assets/images/2019/07/form-create-item.png)

Save your flow, and go test your solution from Flow to Account Creation.

# Wrapping Up

You should now be able to share your Form with people outside of your organization, have them submit the form, record the entry in SharePoint and have the Approval process kick off and the account creation be performed.

> There are lots of Flow templates and clearly the Approval process doesn't specifically require SharePoint to store the item, so there are probably hundreds of ways to approach this problem.&nbsp; However, I like this method because I can see the data move from Forms to SharePoint to Azure AD and creating tracking and report solutions are easy.

