---
title: MDE Tamper Protection Forced Values
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
- Tamper Protection
---
Recently an issue was raised that a customer had configured their Defender AV policies and then applied Tamper Protection. When they checked the local machine's settings they realized that some values in Defender AV were not consistent with their AV Policy which was unexpected. What was found is an undocumented action by Tamper Protection.
<!--more-->

## Setting AV Policies

Lots of organizations create their own AV policies to align with their desired security postures. Sometimes these settings align with the Microsoft AV defaults, and sometimes they exceeed (more strict) the defaults or relax (less strict) the defaults. Whether done with GPOs, SCCM, or Intune these centrally controlled policies allow the organization to maintain a consistent approach to their security posture and will generally prevent an average user from changing them.

## Tamper Protection

Tamper Protection can be enabled using either the Microsoft Security portal.

![mde-turn-tamperprotectionon.png](/assets/images/2023/03/mde-turn-tamperprotectionon.png)

Or by a device management policy (Intune shown below).

![turnontamperprotectinmem.png](/assets/images/2023/03/turnontamperprotectinmem.png)

Many customers assume that Tamper Protection, once enabled, will "lock" **their** settings in place so that if a malicious actor does compromise the machine any changes they attempt will not be successful or persist. This assumption is actually incorrect unless your policy is a match to the Microsoft AV Defaults.

[Tamper Protection FAQ: What settings can't be changed when tamper protection is turned on?](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/faqs-tamper-protection?view=o365-worldwide#what-settings-cant-be-changed-when-tamper-protection-is-turned-on)

The above link to the FAQ has a critical, but not obvious statement in it: "...tamper-protected settings can't be changed **from their default value** ..." *emphasis added by me here*. What this truly means is that default MDAV value will be used when Tamper Protection is enabled, and no it does not matter if the protection is enabled via the Security Portal or by Intune Policy.

## What is impacted - What is set?

Unfortunately, because Tamper Protections "reversion" to the default values is not fully documented the exact settings and values are not documented either. Fortunately, some settings are "On" vs. "Off" which make them easy to figure out, but other settings are not, and I unfortunately haven't had the chance to fully test all of these settings yet.

Below is my table of settings that Tamper Protection does impact. I've determined these by:

1. Creating an Intune Policy with non-default settings
1. Performing a `Get-MPPreference` on both a Windows 10 and 11 VM and saving the output to text file
1. Applying Tamper Protection from the [Security Portal](https://security.microsoft.com)
1. Performing a `Get-MPPreference` on both a Windows 10 and 11 VM and saving the output to text file
1. Using a `diff` tool to compare the output from before and after Tamper Protection was applied

| Setting | Tamper Protection Forced Value |
| --- | --- |
| HighThreatDefaultAction | 0 |
| Low ThreatDefaultAction | 0 |
| MAPSReporting | 2 |
| ModerateThreatDefaultAction | 0 |
| SevereThreatDefaultAction | 0 |

> This table is accurate for my findings as of 7 March 2023. More testing will be performed to determine what additional settings will be changed as well as human readable settings values.