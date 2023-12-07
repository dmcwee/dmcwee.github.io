---
title: MDE Migration Script
categories:
- Microsoft
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
- Migration
---
For the last 2-3 years I've been working with customers on migrating to Defender for Endpoint from other AV/FW/EDR solutions. One of the big issues I've seen is there are a lot of checks to see what could prevent Defender from successfully onboarding. In order to make these checks more consistent and faster I decided to create a script to help identify and flag potential migration issues.
<!--more-->

## MDE Scripts

The MDE Scripts repository provides a single script that can evaluate multiple machines, using PowerShell Remoting, against a set of GPO checks and intalled HotFix IDs to identify potential issues.

[Get MDE Scripts](https://github.com/dmcwee/MDEScripts)

> **Note:**
> The MDE Script does attempt to use Get-ADComputer to detect the OS type of the target machine. While there are checks in place to handle running this from a machine that does not have the **AD Managment PowerShell Module**, it does make running the script more accurate.

## Running

MDE Script works on machine with and without internet access, but requires you to download and stage more files when run off-line.

**Parameters**
- **Machines:** A list of machine names to check for Defender compatibility
- **Output:** *HTML*, *JSON*, and *Screen* are acceptable inputs and will result in the output being pushed to and HTML or JSON file or being printed on the screen
- **OutputFileName (Optional):** Allows you to specify what output file

```shell
PS> Get-MdeMigrationReadyState.ps1 -Machines Machine1, Machine2, Machine3 -Output HTML
```

### With Internet Access

The `Get-MdeMigrationReadyState.ps1` script is all you need to download from the repository assuming the machine you will run the script from has internet access. With internet access the script will automatically retrieve the `Tests.json`, `MachineResult.json`, and `ResultsOutputTemplate.html` from the GitHub repository.

### Without Internet Access

If the machine you are using to evalute your environment does not have access to the internet you can download the `Get-MdeMigrationReadyState.ps1`, `MachineResult.json`, `ResultsOutputTemplate.html`, and `Tests.json` files and then move them to your evaluation machine. Place all of these files in a single folder and the MDE Script will use the local copies rather than retrieving from the GitHub repository.

## Checks Performed

### OS Check

The script begins by collecting the OS string from every machine. This is attempted using `Get-ADComputer` but will fall back to using `Get-ComputerInfo` and `Get-WmiObject`.

### GPO Checks

The script then checks for GPOs that impact the running of Defender for Endpoint

|GPO Name|Undesirable Value|
|---|---|
|Turn off Windows Defender Antivirus|Enabled|
|Turn off real-time protection|Enabled|
|Turn on behavior monitoring|Disabled|
|Scan all downloaded files and attachments|Disabled|
|Monitor file and program activity on your computer|Disabled|
|Turn on process scanning whenever real-time protection is enabled|Disabled|
|Force Defender in Passive Mode (Registry Key Setting - Servers Only)|On|

### OS Checks

The script completes by checking if the `Defender-Feature` is installed (Server 2016 and later) and if necessary updates have been applied (Server 2012 R2 and Server 2016).