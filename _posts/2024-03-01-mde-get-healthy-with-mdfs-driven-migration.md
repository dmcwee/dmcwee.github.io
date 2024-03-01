---
title: MDE Get Healthy with MDfS Driven Migration
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
featured: true
image: /assets/images/2024/03/path_to_success.jpg
banner: /assets/images/2024/03/path_to_success.jpg
---
*"By failing to prepare, you are preparing to fail" -Benjamin Franklin*

Recently I've been working with several customers on migrations from a third party EPP-EDR to Microsoft Defender for Servers (MDfS), and have found there is an important pattern that should be followed to predict, control, and minimize performance and business impacts during the migration. While Arc may perform the onboarding for your organization, other factors like change management and maintenance windows may require additional steps or procedures to limit & control what and when Arc performs actions.
<!--more-->

## Migration Challenges

I've observed when helping migrate from a third party EPP-EDR to Defender some third party EPP-EDR solutions, either by consulting engagement recommendation or software installation action, uninstall the Defender feature. This results in a sequence of challenges that Azure Arc may or may not be able to handle. However, even if the EPP-EDR product does not remove the Defender feature some of these challenges may be faced by a customer.

First, for Server 2016+ the feature must be re-installed which the Azure Arc agent can normally do, but in cases where the OS has been 'optimized' the re-install of the feature can fail and may require, at install time, a *wim* to be specified. If the install of the feature fails or requires the WIM then the Azure Arc agent won't be able to recover and manual intervention is needed. In addition to enabling this feature, unique to the Windows Server environment, you need to manually configure MDE in Passive Mode or else you risk having an *active-active* protection conflict.

Next, many customers because they are using a third party EPP-EDR don't apply the Defender updates to the servers, and don't have their local WSUS configured to acquire the Product & Definition updates necessary for the products. 

Finally, updating the various system to the latest version may have some pre- and post update and reboot requirements. For Server 2012 R2 and 2016 before the *MDE Unified Agent* can be installed some updates may be necessary and there is a potential that those updates or an update's dependency may require a reboot of the server. While applying and rebooting can be handled by Arc there may be a need to coordinate this during maintenance windows. Additionally, adding software 'whenever' may also not be allowed without configuration management approval. Also, after the feature and *MDE Unified Agent* are installed there may be other additional updates before the product reaches its most up-to-date functionality.

## Plan to get Healthy and Deploy Successfully

*"An hour of planning can save you ten hours of doing." -Dale Carnegie*

To help customer achieve a successful migration that can be controlled and coordinated with Change Control, Maintanance Windows, and other procedural practices I've broken down the approach to three phases. From a project planning perspective each phase should be viewed as dependent upon the prior phase and the end of each phases offers a natural pauses where aligment with organization procedures can be performed before moving to the next phase.

### Phase 1: Server Preparation

In preparation for a migration from a third party EPP-EDR that will utilize Azure Arc the following items should be addressed before enabling MDfS Endpoint Protection

#### Installing Azure Arc
Azure Arc can be installed during this phase, but the following checks should be performed to ensure the machines do not attempt to enable the MDE Extension until Phase 2. If you do not install Azure Arc during this Phase then it should be installed in Phase 2.

1. Verify in: Defender for Cloud > Environment settings > {select subscription} > Defender plans > Servers (Settings) > Endpoint protection: Off

#### Enable MDE Features & Updates

1. On Server Operating Systems the Enforce Passive Mode registry key must be applied to all machines (this is NOT automatic like Windows Client OS). This setting prevents active-active conflicts with third party EPPs and minimizes performance degradation.
    1. Deploy via GPO, DSC, PowerShell Script, etc.
    1. [Set Microsoft Defender Antivirus to Passive Mode on Windows Server](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/switch-to-mde-phase-2?view=o365-worldwide#set-microsoft-defender-antivirus-to-passive-mode-on-windows-server)
1. **WSUS Users**: Ensure that local Windows Update Service is configured to sync and deploy MDE Updates
    1. Products & Classifications > Windows Defender is checked
    1. Classifications tab > Definition Updates
    1. **Recommend:** Ensure updates are automatically approved
    1. [Deploy Product & Definition Updates using WSUS](https://learn.microsoft.com/en-us/troubleshoot/mem/configmgr/update-management/deploy-definition-updates-using-wsus)
1. **Server 2016 & Above**: Ensure the machine has the Window Defender Feature Installed and the latest updates have been applied
    1. [Server 2016 Pre-Requisite](https://learn.microsoft.com/en-us/mem/configmgr/protect/deploy-use/defender-advanced-threat-protection#prerequisites-for-windows-server-2016)
    1. **Note:** Reboots may be required for 2016 after some updates have been applied due to other update dependencies
1. **Server 2012 R2**: Ensure the latest Monthly Roll Up has been applied
    1. [Server 2012 Pre-Requisites](https://learn.microsoft.com/en-us/mem/configmgr/protect/deploy-use/defender-advanced-threat-protection#prerequisites-for-windows-server-2012-r2)
    1. **Note:** Reboots may be required for 2012 after some updates have been applied due to other update dependencies

### Phase 2: Onboard Servers

Once all machines are at a state where the MDfS extension can predictably deploy & onboard the following steps should be followed

1. Apply Defender Exclusions to the existing 3rd Party Security tool(s)
    1. [Reference of MDE Exclusion](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/switch-to-mde-phase-2?view=o365-worldwide#step-3-add-microsoft-defender-for-endpoint-to-the-exclusion-list-for-your-existing-solution)
1. In the Security Portal Create a Defender Policy to exclude exiting 3rd Party Security tool(s)
    1. Create an Entra Dynamic Group that applies this policy to machines with a 'Managed By' value of 'MDE' (additional filters for OS, names, etc. can be used)
1. Use Defender for Cloud to push the Endpoint Protection Extension
    1. If you have not already, install Azure Arc. 
    1. **Subscription Level**: Defender for Cloud > Environment settings > {select subscription} > Defender plans > Servers (Settings) > Endpoint protection: On
    1. **Targeted**: Using a Policy Initiative 
        1. Add the appropriate following policies
            1. Deploy Microsoft Defender for Endpoint agent on Windows virtual machines 
            1. Deploy Microsoft Defender for Endpoint Agent on Windows Azure Arc machines
            1. Deploy Microsoft Defender for Endpoint Agent on Linux hybrid machines
            1. Deploy Microsoft Defender for Endpoint Agent on Linux virtual machines
        1. Assign the Policy Initiative
            1. Select the Scope Subscription or Subscription + Resource Group
            1. Select the Exclusions (Resource Group, Virtual Machine, etc.)
            1. Ensure Policy Enforcement is Enabled
            1. Remediation & Non-Compliance messages can be configured as desired
            1. Create the Assignment

### Phase 3: Cut Over

After confirming the machines appear in the Security Portal and are MDE Security Configuration Managed removal of the 3rd party security tool(s) and enabling MDE in Active Protection is possible

1. Remove 3rd Party Security Tools
1. Remove the Enforce Passive Mode registry key or set its value to 0
1. Confirm that Defender reports Defender Antivirus mode as Active