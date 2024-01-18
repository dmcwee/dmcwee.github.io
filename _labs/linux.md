---
title: Defender for Linux
categories:
  - MDE
  - Microsoft
  - Security
tags:
  - MDE
  - Labs
  - Linux
image: "/assets/images/2023/11/mde_linux.jpg"
github: "https://github.com/dmcwee/labs/tree/master/linux"
layout: post
theme: dark
date: 2024-01-18
---

**Linux Lab** is based on my larger MDE lab but is purely focused on MDE with Linux. The goal of this lab is to help familiarize people with deploying MDE on various Linux distros.
<!--more-->

## Deployment Instructions

1. Generate a root and child certificate for the Gateway VPN using [these instructions](../VPN-Setup)
1. Open the Azure Portal in a seperate tab in your browser
1. Use the Deploy to Azure button below to deploy the lab to your Azure Environment
    1. **Required:** Specify a Resource Group where the lab will be deployed
    1. **Required:** Provide an Admin Password
    1. *Recommended:* Select the region where the lab should be deployed if using a new resource group
    1. *Recommended:* Update the Admin User Name to your desired name
    1. *Recommended:* Specify a Gateway Cert Name 
    1. *Recommended:* Specify the Gateway Cert Data (Generated in Step 1)

[![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fdmcwee%2Flabs%2Fdev%2FLinux%2Fazuredeploy.json){:target="_blank"}

## Post Deployment Setup

### Configure Point-to-Site VPN

> If you did not specify the VPN Root Cert and provide the Certificate Data then you need to follow these steps. Otherwise you can skip these steps and go to the Install VPN Client section below.

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

## Deployment Details

The following table details the Virtual Machines that are deployed in this lab.

VM Name | Operating System | IP Address | Scheduled Shutdown
--- | --- | --- | ---
LinuxManager | Ubuntu 20.04 LTS | 10.0.2.30 | 7PM ET
LinuxUbuntu1 | Ubuntu 20.04 LTS | 10.0.2.31 | 7PM ET
LinuxCentOs1 | CentOS 8 | 10.0.2.32 | 7PM ET
LinuxSuseOs1 | SUSE 12 | 10.0.2.33 | 7PM ET

## Scenarios

The scenarios listed here are the most basic but fully supportable as-is onboarding options. You could spin up an SCCM instance to also perform onboarding. However, this lab's template does not pre-establish an SCCM instance so adding (or allocating) that VM, installation, configuration, etc. would be something you must do as additional actions.

### Manual Onboarding & Offboarding of Linux Servers

If you are new to Linux, MDE, or both it is best if you start with manual onboarding so you can understand the various steps and procedures. This is also very useful if you are planning to deploy MDE at your organization to identify and plan for challenge you may experience.

* [Manually Onboard](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-manually?view=o365-worldwide)

### Onboarding & Offboarding of Linux Servers with Management Solutions

There are a number of great, and free, Linux Management solutions like Ansible and SaltStack that are supported for onboarding & offboarding Linux machines.

#### Getting Started with Management Tools

If you are unfamiliar with Linux managment solutions like Ansible, SaltStack, Chef, Puppet, etc. then you should start with one of their tutorials. My personal preference of management solutions is Ansible or SaltStack, and I've found their processes for configuration management translate relatively well to other management solutions.

* [SaltStack: Getting Started - Configuration Management](https://docs.saltproject.io/en/getstarted/config/index.html)
* [Ansible: Getting Started](https://docs.ansible.com/ansible/latest/getting_started/index.html)

#### Deploying with Management Tools

There are specific articles to help with the deployment of MDE using the various management tools that provide good guidance and example playbooks, scripts, etc. to get onboarding quickly.

* [Ansible](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-with-ansible?view=o365-worldwide)
* [SaltStack](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-with-saltack?view=o365-worldwide)
* [Chef](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-deploy-defender-for-endpoint-with-chef?view=o365-worldwide)
* [Puppet](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-install-with-puppet?view=o365-worldwide)

### Managing/Configuring Defender

After onboarding the next common scenario is to manage and configure MDE on Linux which include actions like adding exclusions, configuring run mode, enabling/disabling various services/settings. There are two different ways to manage MDE on a device, but understanding how both works is helpful.

#### Local Defender Configuration Management

Local Defender Configuration Management utilizes the `mdatp_management.json` file to control the various settings. This file can be deployed manually or using one of the above deployment/configuration management tools. 

* [Set preferences for Defender for Linux](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-preferences?view=o365-worldwide)
* [Configure Exclusions](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-exclusions?view=o365-worldwide)
* [Configure Proxy](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-static-proxy-configuration?view=o365-worldwide)

#### MDE Security Configuration Management

MDE supports Security Configuration Management, and this support is available for Linux as well, so organizations can use the portal rather than deploying an individual file to each machine. There are some limitations about the Linux versions required to support this, but the machines in this lab are all supported.

* [MDE Security Configuration Management](https://learn.microsoft.com/en-us/mem/intune/protect/mde-security-integration?view=o365-worldwide)

What is great is that if your machines are onboarded enabling the Security Management is done from the portal without having to change/update/access the machine.

* [Enable MDE Security Configuration Management](https://learn.microsoft.com/en-us/mem/intune/protect/mde-security-integration?view=o365-worldwide#configure-your-tenant-to-support-defender-for-endpoint-security-settings-management)

**Something of interest:** After enabling Security Configuration Management and targeting a VM you should review the folder where the Local Defender Configuration Management file was places `/etc/opt/microsoft/mdatp/managed/`. What you should find is a new `mdeattach_management.json` file with the same format as the `mdatp_management.json` file.

### Configure a Scanning Schedule

Now that you have onboarded your devices and applied a configuration the next common activity is to set up a scanning schedule. MDE uses the standard Linux task scheduling service CRON, but it does not currently support setting this up via the portal. Instead you may need to revert to your Linux Management tool to handle this configuration.

* [Schedule Scans](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-schedule-scan-mde?view=o365-worldwide)

### Manage MDE Updates

Based on observation, the MDE Package is updated monthly (sometime more, seldom less) and per documentation it is valid for 9-months. For many customers I've supported their Linux systems are not updated nearly as frequently as their Windows systems. Personally, I've seen a range of customers who update their Linux environment somewhere between quarterly and yearly based on the system's criticality. Therefore, planning for and implementing a controlled update schedule for MDE on Linux is critical.

Again, MDE utilizes the CRON services here if you want to perform automatic updates of the platform.

* [Manually Update MDE](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-updates?view=o365-worldwide)
* [Schedule MDE Updates](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-update-mde-linux?view=o365-worldwide)

#### Security Intelligence Updates

I'll return to this scenario in the future, but for now lets just stick with the automatic updates.

### Performance

Performance tuning is one of the most important scenarios customers run into often because the system is poorly performing and impacting their business. Due to the limited useage and scale of this lab there isn't much to do here for the scenario, but here are a few useful troubleshooting links.

* [Standard Performance Troubleshooting Guidance](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/run-analyzer-macos-linux?view=o365-worldwide)
* [eBPF Usage and Tuning](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/linux-support-ebpf?view=o365-worldwide)