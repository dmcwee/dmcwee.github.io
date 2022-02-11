---
layout: post
title: Defender for Endpoint Upgrade Script - FOR ALL!
date: 2021-11-11 12:18:55.000000000 -05:00

categories:
- MDE
- Security
tags:
- Defender for Endpoint
- MDE
- Microsoft
permalink: "/2021/11/11/defender-for-endpoint-upgrade-script-for-all/"
---
Working with a customer on the MDE Unified Installer for Windows Server 2016/2012R2 we ran into the issue that SCEP was installed and thus blocking the Unified Installer. Therefore, instead of the Install approach we really needed to perform an Upgrade, but would that mean we needed an approach for servers where SCEP had been installed vs. servers where SCEP was not installed? Answer: No!

## MDE Unified Installer Upgrade Script

Microsoft has already published the [Unified Installer Upgrade Script](https://github.com/microsoft/mdefordownlevelserver) which allows organizations to move from the SCEP + MMA MDE approach to using the Unified Installer (which includes a number or extra capabilities). However, what is the necessary configuration of scripts, installers, etc. and is it only useful for upgrading is a bit vague so I'll cover that below.

## What does the script do?

The upgrade script takes a few actions, starting with removing the OMS Workspace and Workspace ID (Lines 220-236 of the script)...assuming you provide it. If you don't use the RemoveMMA parameter no change will occur with MMA, so you could in theory end up reporting twice about the device (Note: I have not tested this scenario as I think you should remove the OMS information from MMA when moving to the Unified Agent).

Next, the script checks the registry to determine if the SCEP client was installed (Lines 253-267) and performs an Uninstall of SCEP. On line 257 the script assumes that the installer/uninstaller for SCEP is located in the standard Program Files path, so a custom install path for SCEP may cause issues (Note: I have not tested to verify this).

For Server 2012R2 instances the script ensures that two hotfixes (KB2999226 and KB3080149) have been applied and if not applies the Hotfixes (Lines 269-327).

Now that the server is ready to have the unified agent installed the script executes a quite MSI (no UI) install of the agent.

Finally, if the OnboardingScript parameter is provided, the upgrade script will execute the onboarding script (.cmd file) that is used in standard Windows 10, Server 2019 Onboarding GPO and the device will onboard to MDE.

## Considerations for using the Upgrade Script

Like the onboarding script used by Windows 10, 11, and Server 2019 the upgrade script (install.ps1) needs to be in a location where all of the machines that will use it can read it. I recommend following the same guidance for the upgrade script as outlined [here](https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-gp?view=o365-worldwide)in Step 2 that is provided for the Onboarding Script. I would also recommend you consider storing the upgrade script in the same location as the onboarding script.

As detailed in the above section there are several parameters (RemoveMMA, OnboardingScript) that control how the upgrade script executes, but one important consideration was overlooked: the location of the Unified Agent's MSI file. Currently, the Unified Agent's MSI is assumed to be stored in the same location ($PSScriptRoot) as the upgrade script (ref Lines 99-105). Therefore, when you are setting up your shares a file locations be sure to locate the md4ws.msi in the SAME folder as the install.ps1 script!

If you have any servers that have a configured MMA agent, include the RemoveMMA parameter to ensure that MMA and the Unified Agent are not trying to report the same/similar information to MDE. If the server is not running MMA, or is not reporting to the workspace the script will detect this and skip removing the workspace. If the MMA agent is reporting to OMS and MDE only the MDE workspace will be removed.

Use the OnboardingScript parameter! Although you could chain the upgrade script with the onboarding script I don't see a driving value for doing this. Using the OnboardingScript parameter will cause the immediate onboarding of the device, so you don't need to worry about applying multiple GPOs or chaining GPO tasks, the script handles the right actions at the right time.

Finally, because you are running a Powershell script be mindful of execution policy that may be set on your Servers. Although the script is signed when I did initial testing I found that my execution policy was too restrictive to allow the script to run successfully.

## Example GPO

I created a GPO exactly like the directions for [Windows 10/11 or Server 2019](https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-gp?view=o365-worldwide) for use with the upgrade script (Immediate Task, Runs as System, Run with highest privileges, etc.).

For the Task itself the command I used was:

```
Program/Script: Powershell
Arguments: -ExecutionPolicy Bypass \\sharelocation\install.ps1 -OnboardingScript \\sharelocation\WindowsDefenderATPOnboardingScript.cmd -RemoveMMA MMA-MDE-Workspace-Guid
```

You can refer to my [previous post about using a WMI Filter](https://davidmcwee.com/2021/11/01/defender-for-endpoint-unified-package-for-server-2016-and-2012-r2/) to target deployment to only Server 2012R2 and 2016 instances if your servers aren't segmented into different OUs.