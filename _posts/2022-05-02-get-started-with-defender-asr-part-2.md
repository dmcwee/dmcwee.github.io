---
title: Getting started with Defender Attack Surface Reduction - Part 2
layout: post
series: get-started-with-defender
categories:
  - MDE
  - Microsoft
  - Security
---
In the previous post about ASR adoption, I recommended you enable ALL ASR rules in AUDIT mode.  Now we will use the Security Baseline to build an ASR policy that *should* be minimally impactful to your systems and end users.
<!--more-->

## Security Baseline
Security Baseline is available in the Endpoint Manager portal, in the Endpoint Security section.  There are actually several Security Baselines available to choose from, but in this post, we are going to focus on the **Security Baseline for Windows 10 and later** settings. 

![Security Baselines]({{ "/assets/images/2022/04/All_Security_Baselines.png" | relative_url}})

## Getting the settings
The simplest way to get the settings is to create a security baseline policy, assign it to nothing, and then look at the various settings under Microsoft Defender to duplicate them to your AV policy. 

> **Note:** If you did this as part of the Defender AV Getting Started posts then you can reuse the profile you created then to get the settings.

In the **Security Baseline for Windows 10 and later** profile's properties the ASR rules can be found under the **Microsoft Defender** section.

Below are two tables that map the Security Baseline's Rule Values, fortunately the ASR labels in the Security Baseline and in the ASR policies do match, to the MEM and ConfigMgr ASR policy values. There is also a table that maps the Security Baseline values to the PowerShell GUIDs and Values. 

### Security Baseline to Windows 10 and later Attack Surface Reduction Rules

| Rule | Value | ASR Policy Value |
|---|:---:|:---:|
| Block Adobe Reader from creating child process| Enable | Block |
| Block Office communication application from creating child process | Enable | Block |
| Block Office applications from injecting code into other processes | Block | Block |
| Block Office applications from creating executable content | Block | Block |
| Block Win32 API calls from Office macro | Block | Block |
| *Block execution of potentially obfuscated scripts (js/vbs/ps)* | Block | Block |
| Block JavaScript or VBScript from launching downloaded executable content | Block | Block |
| Block executable content download from email and webmail clients | Block | Block |
| *Block credential stealing from the Windows local security authority subsystem (lsass.exe)* | Enable | Block |
| Block untrusted and unsigned processes that run from USB | Block | Block |


> **Note:** The two italicized rules above have a slight difference in the names between the ASR Policy and the Security Policy.  In both cases the text in the parenthesis is not included in the ASR policy's label text.


### Security Baseline to Windows 10 and later (ConfigMgr) Attack Surface Reduction Rules (ConfigMgr)

| Rule | Value | ASR Policy Value (ConfigMgr) |
|---|:---:|:---:|
| Block Adobe Reader from creating child process| Enable | Block |
| Block Office communication application from creating child process | Enable | Block |
| Block Office applications from injecting code into other processes | Block | Block |
| Block Office applications from creating executable content | Block | Block |
| Block Win32 API calls from Office macro | Block | Block |
| *Block execution of potentially obfuscated scripts (js/vbs/ps)* | Block | Block |
| Block JavaScript or VBScript from launching downloaded executable content  | Block | Block |
| Block executable content download from email and webmail clients | Block | Block |
| *Block credential stealing from the Windows local security authority subsystem (lsass.exe)* | Enable | Block |
| Block untrusted and unsigned processes that run from USB | Block | Block |


> **Note:** The two italicized rules above have a slight difference in the names between the ASR Policy and the Security Policy.  In both cases the text in the parenthesis is not included in the ASR policy's label text.


### Security Baseline to PowerShell

| Rule | Value | PowerShell GUID | PowerShell Value |
|---|:---:|:---|:---:|
| Block Adobe Reader from creating child process| Enable | 7674ba52-37eb-4a4f-a9a1-f0f9a1619a2c | Enabled |
| Block Office communication application from creating child process | Enable | 26190899-1602-49e8-8b27-eb1d0a1ce869 | Enabled |
| Block Office applications from injecting code into other processes|Block|75668C1F-73B5-4CF0-BB93-3ECF5CB7CC84 | Enabled |
| Block Office applications from creating executable content | Block | 3B576869-A4EC-4529-8536-B80A7769E899 | Enabled |
| Block Win32 API calls from Office macro | Block | 92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B | Enabled |
| *Block execution of potentially obfuscated scripts (js/vbs/ps)* | Block | 5BEB7EFE-FD9A-4556-801D-275E5FFC04CC | Enabled |
| Block JavaScript or VBScript from launching downloaded executable content  | Block | D3E037E1-3EB8-44C8-A917-57927947596D | Enabled |
| Block executable content download from email and webmail clients | Block | be9ba2d9-53ea-4cdc-84e5-9b1eeee46550 | Enabled |
| Block credential stealing from the Windows local security authority subsystem (lsass.exe) | Enable | 9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2 | Enabled |
| Block untrusted and unsigned processes that run from USB | Block | b2b3f03d-6a65-4f7b-a9c7-1c7ef74a9ba4 | Enabled |