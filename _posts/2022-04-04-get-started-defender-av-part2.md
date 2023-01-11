---
layout: post
title: Get started with Defender AV - Part 2
series: get-started-with-defender
categories:
  - MDE
  - Microsoft
  - Security
---
This is the second post on switching to Defender Anti-Virus and using the Security Baselines published in Endpoint Manager to create a good starting point for your Defender AV settings.  This post will focus on the settings in the **Security Baseline for Windows 10 and later** and how to create an AV only policy based on these settings.
<!--more-->

## Security Baseline
Security Baseline is available in the Endpoint Manager portal, in the Endpoint Security section.  There are actually several Security Baselines available to choose from, but in this post we are going to focus on the **Security Baseline for Windows 10 and later** settings. You can [review Part 1]({% post_url 2022-03-30-get-started-defender-av %}) of this series for information on using the **Microsoft Defender for Endpoint Baseline**.

![Security Baselines]({{ "/assets/images/2022/04/All_Security_Baselines.png" | relative_url}})

## Getting the settings
The simplest way to get the settings is to create a security baseline policy, assign it to nothing, and then look at the various settings under Microsoft Defender to duplicate them to your AV policy.

There is a challenge here, the labels in *Security Baseline* don't match up with the *Windows 10, Windows 11, and Server Defender* AV Policy. Security Baseline's labels also don't match up to the *Windows 10, Windows 11, and Windows Server (ConfigMgr)* Antivirus Policy. So some translation of the settings is required which is what the table below does: identifies the settings and their values.

## Decoding the Security Baseline settings
Below are two tables that identify the Security Baseline Label and Value and provide the Policy's Label and Value. There is also a table that maps the Security Baseline values to the CSP attributes. *Italicized lines indicate a policy is new or different from the **Microsoft Defender for Endpoint Baseline** policy set.*

**Note:** There is something different about the Defender settings in the Security Baseline for Windows 10 and later vs. Microsoft for Endpoint Baseline.  When you evaluate the two baselines, one thing you should notice is that the Security Baseline for Windows includes a number of the Attack Surface Reduction rules mixed in with the AV settings.  As such, we will ignore those for now because we are focused on the AV settings, but I will come back to the ASR policies and do a a similar breakdown at a later date.

### Security Baseline to Windows 10, Windows 11, and Windows Server AV Policy

|Security Baseline|Value|Defender AV|Value|
|---|:---:|---|:---:|
|Ender how often (0-24) to check for security intelligence updates|4|Signature Update Interval| Configured (switch) and 4|
|Scan type|Quick Scan|Scan Parameter|Quick scan|
|Defender schedule scan day|Everyday|Schedule Scan Day|Every day|
|Scheduled scan start time|Not configured|Schedule Scan Time|Not Configured (switch)|
|Cloud-delivered protection level|High|Cloud Block Level|High|
|*Scan network files*|*Yes*| *Allow Scanning Network Files* | *Allowed. Scans network files.* |
|Turn on real-time protection|Yes|Allow Realtime Monitoring|Allowed. Thurs on and runs the real-time monitoring service.|
|*Scan scripts that are used in Microsoft browsers*|*Yes*|*Allow Script Scanning*|*Allowed.*|
|*Scan archive files*|*Yes*|*Allow Archive Scanning*|*Allowed. Scans the archive files.*|
|*Turn on behavior monitoring*|*Yes*|*Allow Behavior Monitoring*|*Allowed. Turns on real-time behavior monitoring.*|
|Turn on cloud-delivered protection|Yes|Allow Cloud Protection|Allowed. Turns on Microsoft Active Protection Service.|
|*Scan incoming email messages*|*Yes*|*Allow Email Scanning*|*Allowed. Turns on email scanning.*|
|Scan removable drives during full scan|Yes|Allow Full Scan Removable Drive Scanning|Allowed. Scans removable drives|
|Defender potentially unwanted app action|Block|PUA Protection|PUA Protection on. Detected items are blocked. They will show in history along with other threats.|
|*Enable network protection*|*Enable*|*Enable Network Protection*|*Enabled (block mode)*|
|Defender sample submission consent|Send safe samples automatically|Submit Samples Consent|Send safe samples automatically|

### Security Baseline to Windows 10, Windows 11, and Windows Server (ConfigMgr)

|Security Baseline|Value|Windows 10, 11, Server (ConfigMgr)|Value|
|---|:---:|---|:---:|
|Ender how often (0-24) to check for security intelligence updates|4| | |
|Scan type|Quick Scan|Scan >> Scan Type|Quick scan|
|Defender schedule scan day|Everyday|Scan >> Day of week to run a scheduled scan|Every day|
|Scheduled scan start time|Not configured|Scan >> Time of day to run a scheduled scan|Not Configured|
|Cloud-delivered protection level|High|Cloud Protection >> Cloud-delivered protection level| High|
|*Scan network files*|*Yes*| *Real-time protection >> Scan network files* | *Yes* |
|Turn on real-time protection|Yes|Real-time protection >> Turn on real-time protection|Yes|
|*Scan scripts that are used in Microsoft browsers*|*Yes*| *Real-time protection >> Scan scripts that are used in Microsoft browsers* | *Yes* |
|*Scan archive files*|*Yes*| *Scan >> Scan archive files* | *Yes* |
|*Turn on behavior monitoring*|*Yes*| *Real-time protection >> Turn on behavior monitoring* | *Yes* |
|Turn on cloud-delivered protection|Yes|Cloud Protection >> Turn on cloud-delivered protection|Yes|
|*Scan incoming email messages*|*Yes*| *Real-time protection >> Scan emails* | *Yes* |
|Scan removable drives during full scan|Yes|Scan >> Scan removable drives during full scan|Yes|
|Defender potentially unwanted app action|Block|Remediation >> Action to take on potentially unwanted apps|Enable|
|*Enable network protection*|*Enable*| **Use the ASR Web protection policy** *Enable Network Protection (Device)* | *Enabled (block mode)* |
|Defender sample submission consent|Send safe samples automatically|Remediation >> Submit Samples Consent| Send safe samples automatically.|

### Security Baseline to CSP

|Security Baseline|Value|CSP|Value|
|---|:---:|---|---:|
|Ender how often (0-24) to check for security intelligence updates|4|[Defender/SignatureUpdateInterval](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-signatureupdateinterval)|4|
|Scan type|Quick Scan|[Defender/ScanParameter](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-scanparameter)|1|
|Defender schedule scan day|Everyday|[Defender/ScheduleScanDay](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-schedulescanday)|0|
|Scheduled scan start time|Not configured|[Defender/ScanParameter](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-schedulescantime)| 120 |
|Cloud-delivered protection level|High|[Defender/CloudBlockLevel](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-cloudblocklevel)| 0x2|
|*Scan network files*|*yes*|*[Defender/AllowScanningNetworkFiles](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-allowscanningnetworkfiles)*|*1*|
|Turn on real-time protection|Yes|[Defender/AllowRealtimeMonitoring](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowrealtimemonitoring)| 1|
|*Scan scripts that are used in Microsoft browsers*|*Yes*| *[Defender/AllowScriptScanning](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-allowscriptscanning)* | *1* |
|*Scan archive files*|*Yes*|*[Defender/AllowArchiveScanning](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-allowarchivescanning)*|*1*|
|*Turn on behavior monitoring*|*Yes*|*[Defender/AllowBehaviorMonitoring](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-allowbehaviormonitoring)*|*1*|
|Turn on cloud-delivered protection|Yes|[Defender/AllowCloudProtection](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowcloudprotection)|1|
|*Scan incoming email messages*|*Yes*|*[Defender/AllowEmailScanning](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-allowemailscanning)*|*1*|
|Scan removable drives during full scan|Yes|[Defender/AllowFullScanRemovableDriveScanning](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-allowfullscanremovabledrivescanning)|1|
|Defender potentially unwanted app action|Block|[Defender/PUAProtection](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-puaprotection)|1|
|*Enable network protection*|*Enable*| *[Defender/EnableNetworkProtection](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-defender#defender-enablenetworkprotection)*|*1*|
|Defender sample submission consent|Send safe samples automatically|[Defender/SubmitSamplesConsent](https://docs.microsoft.com/en-us/windows/client-management/mdm/policy-csp-Defender#defender-submitsamplesconsent)|1|