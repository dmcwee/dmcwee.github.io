---
title: Defender Deployment Tool
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
featured: true
image: /assets/images/2024/03/path_to_success.jpg
banner: /assets/images/2024/03/path_to_success.jpg
theme: dark
---
The Defender Deployment Tool has been released, at least in public preview, and you should use it now.
<!--more-->

I frequently help customers deploying Defender on Windows Servers, and my experience has been that 2012 R2 is painful, 2016 is a nighmare, but 2019+ have been relatively ok. Typically there are 4 issues we run into deploying Defender

* Feature Removed (Uninstalled)
* Down-Level Install
* Missing Updates
* Onboarding in Passive Mode
* Blocking GPO Settings

## Feature Removed (Uninstalled)

Defender deployment tool checks, on Window Server 2016+, for the Windows Defender feature being installed. If the feature is not installed then the deployment tool will take action to enable/install the feature and prompts the user that a restart is required.

> Note: The install does not restart automatically after reboot, so if you are trying to automate this then you will need some checks in place to handle the automatic restart scenario.

## Down-Level Install

If you have ever deployed Defender in an environment by GPO, SCCM, or automated process, that isn't Defender for Cloud, then you've experienced the pain of detecting the OS, pushing updates, applying the down-level agent, pushing updates again...or wait do you push the down-level agent then update...or update then install the down-level agent and your done...?

The Defender deployment tool simplifies this challenge: run it and it handles when updates are pulled, when the down-level agent is needed, if any more updates are required after, and even handles the onboarding at the end of this process.

## Missing Updates

Already mentioned above, but updates and the sequencing is a challenge especially in the down-level scenario where some update level is required in order for the down-level agent to first install. In addition, having an updated defender instance when onboarding completes also ensures some key capabilities, like Security Policy Management, is available.

## Onboarding in Passive Mode

Another common scenario is onboarding Windows Servers onto Defender while a 3rd party AV solution is currently protecting the machine. Unlike client machines, which automatically detect the 3rd party, Windows Servers must be configured to onboarding in Passive Mode which is driven by a Registry Key. Also, although not well documented the registry key settings does require a reboot for it to be respected properly. 

Instead of adding registry keys, rebooting, and then proceeding the Defender deployment tool allows for a command line `-passive` to support configuring the device to run in Passive Mode as it is deployed. 

## Extra Goodness

Along with addressing deployment challenges the other major benefit of the new deployment tool is it extends MDE support to additional older versions of Windows and Windows Server:

* Windows 7 SP1
* Windows Server 2008 R2 SP1

The defender deployment tool also automates the removal of the MMA agent while moving these endpoints to the newer client.

## Official Learn Documentation

* [Defender Deployment Tool](https://learn.microsoft.com/en-us/defender-endpoint/defender-deployment-tool-windows)