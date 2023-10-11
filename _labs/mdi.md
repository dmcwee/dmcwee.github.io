---
title: Defender for Identity Security Alert Lab
categories:
  - MDI
  - Identity
  - Microsoft
  - Labs
tags:
  - Defender for Identity
  - MDI
  - Microsoft
  - Security
  - Identity
  - Labs
image: "/assets/images/labs/MDI_Lab.jpg"
github: "https://github.com/dmcwee/labs/tree/master/MDILab"
layout: post
theme: dark
date: 2022-12-01
---

Based on the Defender for Identity [Security Alert Lab](https://docs.microsoft.com/en-us/defender-for-identity/playbook-lab-overview), this will create an isolated lab environment where you can safely install, configure, and test the MDI learning scenarios. 
<!--more-->

## Deployment Instructions

> ### Updates
>
> **29 Nov 2022 - MDI Event 1644 DSC**
>
> Added the [Registry settings recommended by MDI](https://learn.microsoft.com/en-us/defender-for-identity/configure-windows-event-collection#event-id-1644) to the AD Desired State Configuration. The specific settings are also available in a [standalone DSC file](./DSC/MDIEventDsc.ps1) which can be deployed to other environments.

1. Generate a root and child certificate for the Gateway VPN using [these instructions](../VPN-Setup)
1. Open the Azure Portal in a seperate tab in your browser
1. Use the Deploy to Azure button below to deploy the lab to your Azure Environment
    1. **Required:** Specify a Resource Group where the lab will be deployed
    1. **Required:** Provide an Admin Password
    1. *Recommended:* Select the region where the lab should be deployed if using a new resource group
    1. *Recommended:* Update the Admin User Name to your desired name
    1. *Recommended:* Specify a Gateway Cert Name
    1. *Recommended:* Specify the Gateway Cert Data

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdmcwee%2Flabs%2Fmaster%2FMDILab%2Fazuredeploy.json){:target="_blank"}

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
    1. Add `10.0.24.4`, the DC Server's IP Address, as a DNS Server
    1. Click **Save**
    1. Reboot all VMs in the resource group
1. RDP to VictimPC and domain join it to the contoso.com domain
1. RDP to AdminPC and domain join it to the contoso.com domain

### Return to MS Documentation

After completing the above sections you can return to the process oulined in the [Alert Lab](https://docs.microsoft.com/en-us/defender-for-identity/playbook-setup-lab#-base-lab-environment) beginning with the **Configure SAM-R capabilities from ContosoDC** to complete the lab setup and learning.

## VMs Created

VM Name | Operating Sytem | IP Address | Scheduled Shutdown
------- | --------------- | ---------- | ------------------
ContosoDC1 | Windows Server 2012 R2 | 10.0.24.4 | 7PM EST
Victim-PC | Windows 10 | 10.0.24.5 | 7PM EST
Admin-PC | Windows 10 | 10.0.24.6 | 7PM EST

## Accounts and Groups Created

The deployment script and Active Directory DSC script set up the following accounts and groups for use with the Security Alert Lab

Account | From | OU | Details
------- | ---- | -- | -------
labadmin | deployment script | Users | This is the admin setup account on all VMs created. This account can be updated/changed/modified as part of the deployment.
jeffl | AD DSC | LabUsers | Jeff Leatherman Account from Alert Lab
ronhd | AD DSC | LabUsers | Ron HelpDesk account from Alert Lab
samiraa | AD DSC | LabUsers | Samira Abbasi account from Alert Lab
aatpservice | AD DSC | LabUsers | Defender for Identity Service Acount
Helpdesk | AD DSC | LabUsers | Security Group which ronhd is member
