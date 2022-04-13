---
title: Getting started with Defender Attack Surface Reduction - Part 1
layout: post
series: get-started-with-defender
categories:
  - MDE
  - Microsoft
  - Security
---
This post is intended as a starting point for organizations looking to adopt Attack Surface Reduction (ASR) rules. ASR rules can help improve an organization's security, but they can potentially disrupt normal user and application behaviors in certain environments. My recommendation to anyone looking to implement ASR rules is to always start with **Auditing**.
<!-- more -->

## Jump to ASR with Auditing today
If you are considering using ASR in your environment the safest, and I believe most important, things to do is to start capturing information about the impact of each rule in **your** environment. 

**NOTE:** *Enabling ASR rules in Audit will NOT protect your machines, it will simply provide information in the ASR report about what block may/should have occured.*

### Creating an ASR Audit Policy
To create an ASR policy that will audit events go to **[Endpoint Manager](https://endpoint.microsoft.com/) >> [Endpoint Security](https://endpoint.microsoft.com/#blade/Microsoft_Intune_Workflows/SecurityManagementMenu/overview) >> [Attack surface reduction](https://endpoint.microsoft.com/#blade/Microsoft_Intune_Workflows/SecurityManagementMenu/asr)** and click **Create Policy**

![MEM Admin Portal]({{ "/assets/images/2022/04/MEM-AdminPortal-ASR.png" | relative_url}})

Select your **Platform**:* *Windows 10 and later* or *Windows 10 and later (ConfigMgr)*, select *Attack Surface Reduction Rules* as the **Profile**, and click **Create**.

![Create ASR Policy]({{ "/assets/images/2022/04/MEM-ASR-Policy-CreateBlade.png" | relative_url}})

Provide a policy name, I recommend something like *'Audit All ASR Rules'*, and click **Next**.

On the **Configuration settings** tab select *Audit* from the drop down for each ASR rules.

![Create ASR Policy]({{ "/assets/images/2022/04/MEM-ASR-CfgSettings-Audit.png" | relative_url}})

You do NOT need to enable or configure any of the Exclusions or Controlled Folder Access settings at this time.  The goal is to capture as much information as possible about the impact of ASRs so you can later determine what if anything should go into these settings.

![Create ASR Policy]({{ "/assets/images/2022/04/MEM-ASR-Exclusions.png" | relative_url}})

Click **Next** and select the group of Users or Devices you wish to assign the Audit policy to.  Since this policy will only generate Audit events you can select a large set of users or devices and this will be helpful in determining what rules can and cannot be turned on easily.

Click **Next** to apply any necessary scoping values you might have.

Finally, click **Next** to review your policy, and then click **Create** to create and assign your policy.

## Monitoring ASR Auditing Results
After ASR Rules have been applied to one or several machines in your environment you will start getting Audit events in the **Microsoft Security Portal**.  To review these results go to **[Microsoft Security Portal](https://security.microsoft.com) >> [Reports](https://security.microsoft.com/securityreports) >> [Attack surface reduction rules](https://security.microsoft.com/asr)**

![ASR Report Results]({{ "/assets/images/2022/04/Security-Report-ASR.png" | relative_url }})

Depending on how many machines and how long you have been running in Audit mode you will get a chart with the number of ASR events per day as well as a break down of those events by rule.

![ASR Report]({{ "/assets/images/2022/04/Security-ASR-Results.png" | relative_url }})