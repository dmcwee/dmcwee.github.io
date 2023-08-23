---
title: Defender for Endpoint Scurity Lab
---

This is a lab environment for testing of MDE scenarios including onboarding, offboarding, device configuration, monitoring, and generating events for advanced hunting.

## Deployment Instructions

1. Generate a root and child certificate for the Gateway VPN using [these instructions](../VPN-Setup.html)
1. Open the Azure Portal in a seperate tab in your browser
1. Use the Deploy to Azure button below to deploy the lab to your Azure Environment
    1. **Required:** Specify a Resource Group where the lab will be deployed
    1. **Required:** Provide an Admin Password
    1. *Recommended:* Select the region where the lab should be deployed if using a new resource group
    1. *Recommended:* Update the Admin User Name to your desired name
    1. *Recommended:* Specify a Gateway Cert Name
    1. *Recommended:* Specify the Gateway Cert Data

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdmcwee%2Flabs%2Fdev%2FMDELab%2Fazuredeploy.json){:target="_blank"}

## Post Deployment Setup

### Configure Point-to-Site VPN

> If you did not specify the VPN Root Cert and provide the Certificate Datat then you need to follow these steps. Otherwise you can skip these steps and go to the Install VPN Client section below.

1. Use the New-P2SCertificate.ps1 script, found [here](https://raw.githubusercontent.com/dmcwee/labs/master/Common/scripts/New-P2SCertificate.ps1) to create a new Root & Child certificate pair for use with the Point-to-Site Gateway
    1. Copy the text from the rootcert.txt file that the script generates in the folder where it is run or from the console's on-screen output
1. In the Azure Portal go to the Resource Group where the lab was created and find the Virtual Network Gateway Resource that was created and click on it
    1. Go to the Point-to-Site Configuration
    1. Provide a name for the Root Certificate
    1. Paste the output from the above step into the Public certificate data field
    1. Save the changes

### Install VPN Client

1. In the Azure Portal go to the Resource Group where the lab was created and find the Virtual Network Gateway Resource that was created and click on it
    1. Go to the Point-to-Site Configuration
    1. Click the Download VPN client button
1. Install the appropriate VPN client for your OS
1. Connect the to the Point-to-Site VPN

### Domain Join Machines

1. In the Azure Portal go to the Resource Group where the lab was created and find the Virutal Network Resource and click on it. It should be named `[resource group name]-vnet`
1. In the left navigation click on **DNS servers**
    1. On the DNS Servers page select the **Custom** radio button
    1. Add `10.0.2.5`, the DC Server's IP Address, as a DNS Server
    1. Click **Save**
    1. Reboot all VMs in the resource group
1. RDP to each of the Windows boxes and join them to the domain

## Deployment Details

The following table details the Virtual Machines that are deployed in this lab.

VM Name | Operating System | IP Address | Scheduled Shutdown
--- | --- | --- | ---
MDEDC | Server 2019 | 10.0.2.5 | 7PM ET
Win2012R2 | Server 2012 R2 | 10.0.2.10 | 7PM ET
Win2016 | Server 2016 | 10.0.2.11 | 7PM ET
Win2019 | Server 2019 | 10.0.2.12 | 7PM ET
WinClient10 | Windows 10 | 10.0.2.20 | 7PM ET
WinClient11 | Windows 11 | 10.0.2.21 | 7PM ET
LinuxManager | Ubuntu 20.04 LTS | 10.0.2.30 | 7PM ET
LinuxTunnel | Ubuntu 20.04 LTS | 10.0.2.31 | 7PM ET
LinuxUbuntu1 | Ubuntu 20.04 LTS | 10.0.2.32 | 7PM ET
LinuxUbuntu2 | Ubuntu 20.04 LTS | 10.0.2.33 | 7PM ET
LinuxCentOs1 | CentOS 8 | 10.0.2.34 | 7PM ET
LinuxCentOs2 | CentOS 8 | 10.0.2.35 | 7PM ET

## Scenarios

The scenarios listed here are the most basic but fully supportable as-is onboarding options. You could spin up an SCCM instance to also perform onboarding. However, this lab's template does not pre-establish an SCCM instance so adding (or allocating) that VM, installation, configuration, etc. would be something you must do as additional actions.

### Onboarding & Offboarding Windows Servers

Using the Windows Server machines you can use the Unified Solution (Server 2012 & 2016) as well as the built in Defender solution (Server 2019+) to onboard and offboard the machines using the [local script](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-script?view=o365-worldwide) or [GPO](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-gp?view=o365-worldwide).

### Onboarding & Offboarding Windows Clients

Using the Windows 10 and 11 Client machines you can try onboarding and offboarding using a [local script](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-script?view=o365-worldwide), [GPO](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-gp?view=o365-worldwide), or [Intune](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-endpoints-mdm?view=o365-worldwide).

>**Note** I've struggled to log into VMs over RDP that I've Azure AD joined. For the Intune scenario I typically just use the Intune managed option rather than trying to do an AADJ. This still gives a good management result for the experimental lab.

### Onboarding & Offboarding Linux

Using the Linux machines you can experiment with onboarding and offboarding [manually](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-manually?view=o365-worldwide), or using a machine management solutions like [Ansible](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-with-ansible?view=o365-worldwide), [SaltStack](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-with-saltack?view=o365-worldwide), [Chef](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-deploy-defender-for-endpoint-with-chef?view=o365-worldwide),or [Puppet](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-with-puppet?view=o365-worldwide).
