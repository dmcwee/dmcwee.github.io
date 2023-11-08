---
title: MDE Tamper Protection Forced Values
last_update: 3/8/2023
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
- Tamper Protection
featured: true
image: /assets/images/2023/03/tamper_protection.jpg
banner: /assets/images/2023/03/tamper_protection.jpg
---
Recently an issue was raised that a customer had configured their Defender AV policies and then applied Tamper Protection. When they checked the local machine's settings they realized that some values in Defender AV were not consistent with their AV Policy which was unexpected. What was found is an undocumented/vaguely documented action by Tamper Protection.
<!--more-->

## Setting AV Policies

Lots of organizations create their own AV policies to align with their desired security postures. Sometimes these settings align with the Microsoft AV defaults, and sometimes they exceeed (more strict) the defaults or relax (less strict) the defaults. Whether done with GPOs, SCCM, or Intune these centrally controlled policies allow the organization to maintain a consistent approach to their security posture and will generally prevent an average user from changing them.

## Tamper Protection

Tamper Protection can be enabled using either the Microsoft Security portal.

![mde-turn-tamperprotectionon.png](/assets/images/2023/03/mde-turn-tamperprotectionon.png)

Or by a device management policy (Intune shown below).

![turnontamperprotectinmem.png](/assets/images/2023/03/turnontamperprotectinmem.png)

Many customers assume that Tamper Protection, once enabled, will "lock" **their** settings in place so that if a malicious actor does compromise the machine any changes they attempt will not be successful or persist. This assumption is actually incorrect unless your policy is a match to the Microsoft AV Defaults.

[Protect Security Settings with Tamper Protection: What happens when tamper protection is turned on?](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/prevent-changes-to-security-settings-with-tamper-protection?view=o365-worldwide#what-happens-when-tamper-protection-is-turned-on)

The above link does state "When tamper protection is turned on, tamper protected settings cannot be changed from their default values." It lists 9 settings and the default values, but this is often overlooked or misunderstood.

[Tamper Protection FAQ: What settings can't be changed when tamper protection is turned on?](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/faqs-tamper-protection?view=o365-worldwide#what-settings-cant-be-changed-when-tamper-protection-is-turned-on)

The above link to the FAQ has a critical, but not obvious statement in it: "...tamper-protected settings can't be changed **from their default value** ..." *emphasis added by me here*. What this truly means is that default MDAV value will be used when Tamper Protection is enabled, and no it does not matter if the protection is enabled via the Security Portal or by Intune Policy.

## What is impacted - What is set?

Unfortunately, because Tamper Protections "reversion" to the default values is not fully documented the exact settings and values are not documented either. Fortunately, some settings are "On" vs. "Off" which make them easy to figure out, but other settings are not. I've done my best to identify the settings that change by creating an Intune policy that uses non-default values, but I cannot guarantee that these are the only value changes.

Below is my table of settings that Tamper Protection does impact. I've determined these by:

1. Creating an Intune Policy with non-default settings - you must Allow Cloud Protection
1. Performing a `Get-MPPreference` on both a Windows 10 and 11 VM and saving the output to text file
1. Performing a `Get-MPComputerStatus` on both a Windows 10 and 11 VM and saving the output to text file
1. Applying Tamper Protection from the [Security Portal](https://security.microsoft.com)
1. Performing a `Get-MPPreference` on both a Windows 10 and 11 VM and saving the output to text file
1. Performing a `Get-MPComputerStatus` on both a Windows 10 and 11 VM and saving the output to text file
1. Using a `diff` tool to compare the output from before and after Tamper Protection was applied

| Setting | Tamper Protection Forced Value | Source |
| --- | --- | --- |
| BehaviorMonitorEnabled | True | Get-MPComputerStatus |
| IsTamperProtected | True | Get-MPComputerStatus |
| NISEnabled | True | Get-MPComputerStatus |
| OnAccessProtectionEnabled | True | Get-MPComputerStatus |
| RealTimeProtectionEnabled | True | Get-MPComputerStatus |
| DisableArchiveScanning | False | Get-MPPreference |
| DisableBehaviorMonitoring | False | Get-MPPreference |
| DisableIOAVProtection | False | Get-MPPreference |
| DisableRealtimeMonitoring | False | Get-MPPreference |
| DisableScriptScanning | False | Get-MPPreference |
| HighThreatDefaultAction | 0 | Get-MPPreference |
| LowThreatDefaultAction | 0 | Get-MPPreference |
| MAPSReporting | 2 | Get-MPPreference |
| ModerateThreatDefaultAction | 0 | Get-MPPreference |
| SevereThreatDefaultAction | 0 | Get-MPPreference |

> Table updated on 8 March 2023.
> Changes were identified by applying an Intune Policy that intentionally chose non-default values to gather 'before' values, and then applying Tamper Protection via MDE Security Portal to gather 'after' values. Notepad++ was used to perform a diff and modified values were documented.
