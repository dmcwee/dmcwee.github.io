---
title: Ocean Lotus
categories:
  - MDE
  - Microsoft
  - Security
tags:
  - MDE
  - Labs
  - Mac
image: "/assets/images/2025/08/oceanlotus.jpg"
github: "https://github.com/dmcwee/labs/tree/master/MDELab"
layout: post
theme: dark
date: 2025-08-11
---
The **Ocean Lotus** lab is an Azure deployable template designed to support the [Ocean Lotus](https://github.com/center-for-threat-informed-defense/adversary_emulation_library/tree/master/ocean_lotus) scenario available in the [**Center for Threat Informed Defense**](https://ctid.mitre.org/) adversary emulation library.
<!--more-->

## Deployment Details

The following table details the Virtual Machines that are deployed in this lab.

VM Name | Operating System | IP Address | Scheduled Shutdown
--- | --- | --- | ---
vhagar | Server 2019 | 10.90.30.20 | 7PM ET
drogon | Ubuntu 22.04 | 10.90.30.7 | 7PM ET
kali | Kali Linux | 10.90.30.26 | 7PM ET

## Instructions

1. Generate a root and child certificate for the Gateway VPN. This should support both Mac and Windows VPNs.
1. Open the Azure Portal in a seperate tab in your browsers
1. Use the Deploy to Azure button below to deploy the lab to your Azure Environment
    1. **Required**: Specify the Resource Group where the lab will be deployed
    1. **Required**: Specify the password for the admin account
    1. **Required**: Provide the root certificate's public key data
    1. *Recommended:* Select the region where the lab should be deployed if using a new resource group
    1. *Recommended:* Update the Admin User Name to your desired name

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdmcwee%2Flabs%2Frefs%2Fheads%2Fmaster%2FOceanLotus%2FOceanLotus.json){:target="_blank"}

### Post Deployment Setup

#### Configure Point-to-Site VPN

1. Export with the private key and install the Child Certificate, created in Step 1 of Deployment Instructions, on your Mac Device.
1. In the Azure Portal go to the Resource Group where the lab was created and find the Virtual Network Gateway Resource that was created and click on it
    1. Go to the Point-to-Site Configuration
    1. Click the Download VPN client button
1. Install the appropriate VPN client for your OS
1. Connect the to the Point-to-Site VPN

## Scenario Execution

Once the environment is ready and you can continue with the [Ocean Lotus](https://github.com/center-for-threat-informed-defense/adversary_emulation_library/tree/master/ocean_lotus) set up of the C2 server as well as staging the attack components on the test Mac device.
