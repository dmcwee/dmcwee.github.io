---
layout: post
title: Azure - PowerShell Capabilities I Love
date: 2016-07-01 13:02:29.000000000 -04:00
categories:
- Azure
tags: []
permalink: "/2016/07/01/azure-powershell-capabilities-i-love/"
---
I use Azure for Development and Testing very heavily with my job as a consultant for Microsoft. Since most of my work is done deploying systems On-Premises I usually have to build environments for testing of deployment scripts etc. This means I have the option to go through the Azure Portal and create machine after machine, or I can use PowerShell to script these processes. As such I have gone through many of the IAAS PowerShell commands and thought I would share some of my commonly used commands.
<!--more-->

# IAAS Commands I Always Use

## Set-AzureRmVMCustomScriptExtension

So, you create a VM and now you want to configure it before you actually log in, like make it a domain controller or join it to a domain. No problem, the Set-AzureRmVMCustomScriptExtension allows you to push and run a script file on the Azure VM without needing to log in, and you can even pass arguments to the script.This command does require a bit of information (Resource Group Name, Storage Account Name, Container, and others) but being able to create a VM AND set it up as the domain controller without ever logging in first...you can't beat that.

## Set-AzureStorageBlobContent

This command isa MUST KNOW because it allows you to move content from your local machine to an Azure Storage Blob, and if you want to use Set-AzureRmCustomScriptExtentions, your scripts have to be in an Azure Storage Blog. This command is actually pretty straight forward, give it the filename (blob), Container, Storage Account Context and the local file path and upload away.

## New-AzureRmResourceGroup

Every time I create a new "Environment" I create a new resource group partly because I'm lazy, but also because I'm really picky. I don't like having 2, 3, 4, ... environments inside of one resource group because when I script things I really just want to say something like "Start My Resource Group xyz" and let the script handle the rest. Also when I'm done with an environment I can easily clean it up by using the Remove-AzureRmResourceGroup, and poof its gone.

## New-AzureRmVm

Need a new VM, here you go. This command isn't as straight forward as it seems, really to use New-AzureRmVm you must create the Azure RM Config object and all the necessary elements, but this inside of a simple ForEach-Object loop can save you hours of entering information into the Azure Portal forms.

# Runbooks - Stay under that spending limit

Azure Runbooks are one of my favorite capabilities available. First, the interface is web based so you can write and test your PowerShell directly in the Azure Portal which is a really nice capability. Second, you can schedule these books to run so if you forget to shutdown and environment, the scheduler will do it for you. Third, if there was a problem your output from each run is available for review so you can always go back and review the Runbook output and check the script health. Finally, Runbooks have access to variables stored Outside of the Runbook, so no need to include the admin account's info in your PowerShell script, just save it in the Runbook's variables (as a Credential, so the password is hashed) and make nice generic runbooks.

I highly recommend using runbooks to at least stop your development, and possibly test, environment on a daily basis. My Stop-Daily runbook is configured to run every day at 6PM so I know all of my VMs will be shutdown. I typically keep my runbook(s) in a separate Resource Group from the different Development/Test environments I create, this way I can destroy the environment without losing the runbooks.

Runbook(s) work within a single subscription, so if you have multiple Subscriptions you will need to create runbooks for each.

