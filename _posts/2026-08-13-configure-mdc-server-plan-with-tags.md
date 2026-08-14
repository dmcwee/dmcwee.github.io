---
title: Configure MDC Server Protection Plan Using Azure Tags
author: David McWee
categories:
- MDE
- MDC
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
- Microsoft Defender for Cloud
image: /assets/images/2026/03/mde-missed-detection.jpg
banner: /assets/images/2026/03/mde-missed-detection.jpg
theme: light
excerpt: Azure Policies and Resource Tags are a great way to handle Mixed Mode licensing of Defender for Server, but the Azure Policy may not work as you expect.
---

## Defender for Cloud - Server Protection

Defender for Cloud offers customers the ability to license MDE for Servers with a consumption based billing plan. There are two options (P1 & P2) with increased capabilities, and increased cost (about 3x increase from P1 to P2). 

## Enabling Defender for Server - Subscription Level (Easy Button)

Defender for Cloud makes enabling Defender for Server very easy by applying it at the subscription level. However, this means the plan you select at the subscription level is what you will be billed for on **all** the machines in the subscription. 

### Onboarding impacts Benefit

An important consideration in subscribing & adopting Defender for Server is depending on _how_ devices are onboarded to MDC they may not be able to benefit from MDC's Server Protection Plan 2. [Machines that are onboarded usind direct onboarding and do not have Azure Arc deployed cannot benefit from the full P2 suite](https://learn.microsoft.com/en-us/azure/defender-for-cloud/support-matrix-defender-for-servers).

## Mixing & Matching Plans

Aside from how the device is onboarded there are other considerations for why, or why not, a machine should have a specific Defender for Server plan. Thus mixed mode licensing is important to implement and to implement in a way that is easy to maintain.

## Mixed Mode Done Right

To use set up mixed mode licensing you must first enable Defender for Server at the subscription level for P2.

> **Note:** You cannot *upgrade* the Defender for Server plan at the resource level, you can only *downgrade*.

If your device objects are oganized so that you can assign the P1 Plan by resource group then you can use the Azure Policy `Configure Azure Defender for Servers to be enabled (with 'P1' subplan) for all resources (resource level)`, and during assignment pick the resource group you wish to target with P1. If you have multiple resource groups you want to assign this policy to you will need to do multiple assignments.

If your device objects are not consistently organized by resource group you can use the Azure Policy `Configure Azure Defender for Servers to be enabled ('P1' subplan) for all resources (resource level) with the selected tag` to set the plan on all resources based on a tag. However, due to a flaw in the policy the evaluation won't work as you expect.

## Azure Policy Flaw

In the `Configure Azure Defender for Servers to be enabled ('P1' subplan) for all resources (resource level) with the selected tag` policy the evaluation of the policy checks `PricingTier` value is set to `Standard`, but this condition is true for both Plan 1 & Plan 2, so as long as the P2 plan is associated the policy evaluates as compliant. What needs to happen is the evaluation logic, which is correct in the `Configure Azure Defender for Servers to be enabled (with 'P1' subplan) for all resources (resource level)` policy needs to be duplicated to the `... with the selected tag` policy.

### Policy Fix

To correct the issue follow these steps:

1. Open the `Configure Azure Defender for Servers to be enabled ('P1' subplan) for all resources (resource level) with the selected tag`
1. Click the **Duplicate definition** button
   1. Select your subscription as the **Definition Location**
   1. (Optional) Update the **Name** & **Description**
   1. Create or select a **Category**
   1. Replace the `existenceCondition` section of the **Policy Rule**, should be around line 27, using the below snippet.
   1. Click **Save**

Incorrect `existenceCondition` section:
```json
"existenceCondition": {
    "field": "Microsoft.Security/pricings/pricingTier",
    "equals": "Standard"
},
```

Corrected Policy's `existenceCondition`:

```json
"existenceCondition": {
    "allOf": [
    {
        "field": "Microsoft.Security/pricings/pricingTier",
        "equals": "Standard"
    },
    {
        "field": "Microsoft.Security/pricings/subPlan",
        "equals": "P1"
    }]
},
```

> **Extra Goodies:** Consider updating the parameters section of your policy to either remove the default values, or to pre-populate the default values. Without doing this you will always need to uncheck the *Only show parameters that need input or review* checkbox during policy assignment.

### Assign **Your** Policy

Once you have created and fixed your duplicate policy you can now perform the assignment. 

> **Note:** Be sure on the Parameters page that the *Inclusion Tag Name* and *Inclusion Tag Value* are both populated.

## Tag & Remediate

Finally, you can now tag the machines with the desired tag & value to *downgrade* the Defender for Server Plan. Once the tagging is completed the Azure Policy will begin to identify machines that are not compliant and remediation tasks can be created to automatically fix the Defender for Server Service Plan.
