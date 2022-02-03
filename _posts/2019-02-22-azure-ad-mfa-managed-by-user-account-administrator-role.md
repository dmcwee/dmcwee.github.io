---
layout: post
title: Azure AD MFA managed by User Account Administrator Role
date: 2019-02-22 09:47:55.000000000 -05:00





categories:
- Azure
- Azure Active Directory (AAD)
- Security &amp; Identity
tags:
- AAD
- conditional access
- Microsoft
- Multi Factor Authentication
- RBAC

  



  

  
  
  
  
  
permalink: "/2019/02/22/azure-ad-mfa-managed-by-user-account-administrator-role/"
---
Many organizations want to delegate enabling and disabling MFA for a user to their helpdesk, but the only RBAC role that allows MFA management is the Global Administrator and no one wants to grant helpdesk technicians Global Admin access to their tenant.&nbsp; However, there is a way around this RBAC limitation if your organization has Azure AD Premium.

# General Concept

At a high level enabling and disabling MFA will be managed by adding and removing users from a security group.&nbsp; The security group will be included in a Conditional Access policy which defines the MFA requirements.

# Setup

## Requirements

1. Admin with Conditional Access administrator role
2. Helpdesk user(s) with User Administrator role assigned

## Setup

Have a Helpdesk user create a security group in Azure Active Directory and assign the users your organization wants to require MFA when accessing applications.&nbsp; Make sure to include a descriptive name like MFA Required Users.

![NewGroup.png]({{ site.baseurl }}/assets/images/2019/02/newgroup.png.jpg)

Next, have the Conditional Access Admin create a new Conditional Access rule with Assignments target set to the group created by the Helpdesk user.

![CATargetGroup.png]({{ site.baseurl }}/assets/images/2019/02/catargetgroup.png.jpg)

Next, select the Cloud apps you want to require MFA before allowing access, or select All Cloud Apps.

![SelectCloudApps.png]({{ site.baseurl }}/assets/images/2019/02/selectcloudapps.png.jpg)

Next, choose the option to Grant Access and check Require multi-factor authentication.

![GrantMFAAccess.png]({{ site.baseurl }}/assets/images/2019/02/grantmfaaccess.png.jpg)

Finally, Enable the policy and choose Create.

# ![CreatePolicy.png]({{ site.baseurl }}/assets/images/2019/02/createpolicy.png.jpg)

# Operations

Now, when the Helpdesk (someone with User Administrator Role) needs to enable or disable MFA for a user all they need to do is add (Enable MFA) or remove (Disable MFA) the user from your MFA Security Group.

