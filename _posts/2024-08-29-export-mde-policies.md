---
title: Export MDE Policies
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
---
Customers frequently ask about moving Defender policies between various environment. This generally requires manual efforts of replicating settings from one portal to another. However, this manual process is painful and error prone which makes the migration less that optimal.

Instead, a better way is to export the policy and push it to the other environment, but without portal capabilities how can this be accomplished. Enter the Device Configuration v2 API.
<!--more-->

## GraphApi (BETA)

Using Edge's developer tools and network capture revealed that the Security Portal uses Device Configuration Graph API calls, but those calls are not part of the v1.0 so the documentation is easy to find. However, a bit of Search Engine Dorking and you can find the [beta versions of these calls](https://learn.microsoft.com/en-us/graph/api/resources/intune-deviceconfigv2-devicemanagementconfigurationpolicy?view=graph-rest-beta). 

These calls are part of the Device Configuration v2 effort which have a loose coupling of the [Device Management Configuration Setting Definition](https://learn.microsoft.com/en-us/graph/api/resources/intune-deviceconfigv2-devicemanagementconfigurationsettingdefinition?view=graph-rest-beta) to the [Device Management Configuration Policy](https://learn.microsoft.com/en-us/graph/api/resources/intune-deviceconfigv2-devicemanagementconfigurationpolicy?view=graph-rest-beta) itself. The Device Management Configuration Settings is extended to support various input types like `choice`, `numeric`, and `plain text` and even include child & parent relationships so that an on/off switch can also include a child choice value.

## Exporting Policies

Having found the correct Graph API Beta endpoints to call the process of exporting the policy is easy, or at least is should be. In reality there is a combination of calls that must be made so it isn't as easy a just calling one api and writting the output to disk. To generate a policy that is complete, and imported to other locations, at least two calls are necessary.

### Get Your Tenant's Policies

The Device Management Configuration Policy Graph API call `/beta/deviceManagement/configurationPolicies` returns all of the policies for a tenant, or by appending `('POLICY_ID_HERE)` to the end of the URI a single policy can be returned. Unfortunately the policy item that is returned doesn't include the actual settings of the policy, so from this call you must extract the ID and then make your second call to get the policy settings.

### Get Your Policy's Settings

The Device Management Configuration Policy Graph API call `/beta/deviceManagement/configurationPolicies/_POLICY_ID_HERE_/settings` returns the settings for the specific policy. 

### Merging Policy and Settings

Once the policy and settings have been pulled from the different service endpoints then it is critical to merge the settings into the policy.

## Simplify Exports

In order to simply the process a Proof of Concept application has been created and can be found [here](https://github.com/dmcwee/nodeaction).