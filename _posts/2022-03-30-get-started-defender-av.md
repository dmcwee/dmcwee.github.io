---
layout: post
title: Get Started with Defender AV
categories:
  - MDE
  - Microsoft
  - Security
---
When switching from one AV to another organizations want to know if they can keep their current AV settings, or if their AV Vendor has recommendations for better adoption, detection, and performance.  For these types of conversations with Microsoft Defender AV I often recommend customers look at the Security Baseline rules as a good starting point.
<!--more-->

## Security Baseline
Security Baseline is available in the Endpoint Manager portal, in the Endpoint Security section.  There are actually several Security Baselines available to choose from, but in this post we are going to focus on the **Microsoft Defender for Endpoint Baseline** settings. 

![Security Baselines]({{ "/assets/images/2022/03/All_Security_Baselines.png" | relative_url}})

**Note:** *This is not the only baseline that has Defender AV settings, so you may want to collect the settings from multiple policies.*

## Getting the settings
The simpliest way to get the settings is to create a security baseline policy, assign it to nothing, and then look at the various settings under Microsoft Defender to dupliace them to your AV policy.

There is a challenge here, the labels in *Security Baseline* don't match up with the *Windows 10, Windows 11, and Server Defender* AV Policy. Security Baseline's labels also don't match up to the *Windows 10, Windows 11, and Windows Server (ConfigMgr)* Antivirus Policy. So some translation of the settings is required which is what the table below does: identifies the settings and their values.

## Decoding the Security Baseline settings
Below are two tables that identify the Security Baseline Label and Value and provide the Policy's Label and Value. There is also a table that maps the Security Baseline values to the CSP attributes.

### Security Baseline to Windows 10, Windows 11, and Windows Server AV Policy

|Security Baseline|Value|Defender AV|Value|
|---|:---:|---|:---:|
|Turn on real-time protection|Yes|Allow Realtime Monitoring|Allowed. Thurs on and runs the real-time monitoring service.|
|Additional amount of time (0-50 seconds) to extend cloud protection timeout|50|Cloud Extended Timeout|Configure (switch) and 50|
|Scan all downloaded files and attachments|Yes|Allow scanning of all downloaded files and attachments|Allowed.|
|Scan type|Quick Scan|Scan Parameter|Quick scan|
|Defender schedule scan day|Everyday|Schedule Scan Day|Every day|
|Scheduled scan start time|Not configured|Schedule Scan Time|Not Configured (switch)|
|Defender sample submission consent|Send safe samples automatically|Submit Samples Consent|Send safe samples automatically|
|Cloud-delivered protection level|High|Cloud Block Level|High|
|Scan removable drives during full scan|Yes|Allow Full Scan Removable Drive Scanning|Allowed. Scans removable drives|
|Defender potentially unwanted app action|Block|PUA Protection|PUA Protection on. Detected items are blocked. They will show in history along with other threats.|
|Turn on cloud-delivered protection|Yes|Allow Cloud Protection|Allowed. Turns on Microsoft Active Protection Service.|

### Security Baseline to Windows 10, Windows 11, and Windows Server (ConfigMgr)

|Security Baseline|Value|Windows 10, 11, Server (ConfigMgr)|Value|
|---|:---:|---|:---:|
|Turn on real-time protection|Yes|Real-time protection >> Turn on real-time protection|Yes|
|Additional amount of time (0-50 seconds) to extend cloud protection timeout|50|Cloud protection >> Defender Cloud Extended Timeout in Seconds|50|
|Scan all downloaded files and attachments|Yes|Real-time protection >> Scan all downloaded files and attachments|Yes|
|Scan type|Quick Scan|Scan >> Scan Type|Quick scan|
|Defender schedule scan day|Everyday|Scan >> Day of week to run a scheduled scan|Every day|
|Scheduled scan start time|Not configured|Scan >> Time of day to run a scheduled scan|Not Configured|
|Defender sample submission consent|Send safe samples automatically|Remediation >> Submit Samples Consent| Send safe samples automatically.|
|Cloud-delivered protection level|High|Cloud Protection >> Cloud-delivered protection level| High|
|Scan removable drives during full scan|Yes|Scan >> Scan removable drives during full scan|Yes|
|Defender potentially unwanted app action|Block|Remediation >> Action to take on potentially unwanted apps|Enable|
|Turn on cloud-delivered protection|Yes|Cloud Protection >> Turn on cloud-delivered protection|Yes|

### Security Baseline to CSP

|Security Baseline|Value|CSP|Value|
|---|:---:|---|---:|
|Turn on real-time protection|Yes|[Defender/AllowRealtimeMonitoring](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowrealtimemonitoring)| 1|
|Additional amount of time (0-50 seconds) to extend cloud protection timeout|50|[Defender/CloudExtendedTimeout](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-cloudextendedtimeout)|50|
|Scan all downloaded files and attachments|Yes|[Defender/AllowIOAVProtection](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowioavprotection)|1|
|Scan type|Quick Scan|[Defender/ScanParameter](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-scanparameter)|1|
|Defender schedule scan day|Everyday|[Defender/ScheduleScanDay](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-schedulescanday)|0|
|Scheduled scan start time|Not configured|[Defender/ScanParameter](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-schedulescantime)| 120 |
|Defender sample submission consent|Send safe samples automatically|[Defender/SubmitSamplesConsent](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-submitsamplesconsent)|1|
|Cloud-delivered protection level|High|[Defender/CloudBlockLevel](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-cloudblocklevel)| 0x2|
|Scan removable drives during full scan|Yes|[Defender/AllowFullScanRemovableDriveScanning](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowfullscanremovabledrivescanning)|1|
|Defender potentially unwanted app action|Block|[Defender/PUAProtection](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-puaprotection)|1|
|Turn on cloud-delivered protection|Yes|[Defender/AllowCloudProtection](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowcloudprotection)|1|