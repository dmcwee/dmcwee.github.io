---
title: MDE Linux Management from the Security Portal
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
image: /assets/images/2023/11/mde_linux.jpg
banner: /assets/images/2023/11/mde_linux.jpg
---
Recently the MDE Attach capability was updated to include managing the MDE service on Linux, and MacOS, to provide a similar experience for configuring and managing the MDE service on these non-windows platforms. There are several questions that this new capability raises which I will attempt to address in this post.
<!--more-->

## Local File vs. Portal - What Wins?

If a Linux device has a local configuration file, `mdatp_management.json`, and is targeted by an MDE policy from the portal, then the portal's policy will be applied over the local management file. 

## How is the policy applied/pushed to the device?

On a Linux device in the `/etc/opt/microsoft/mdatp/managed` folder, the same location where the local configuration file was placed, a new `mdeattach_managed.json` will be created with the settings from the security portal. Based on comparing the two files they appear to use the same json format.

## Can I layer policies?

No. If the machine is MDE managed it will NOT respect the local security policy file.

## No policy targeting the device, but my local policy being ignored?

While writting this I found that once a device becomes MDE Attached it will communicate with the defender service and generate the `mdeattach_managed.json` file in the managed folder, this **includes even if no policy is targeting the device**. Since no policy is applied then the content of the file will only be `{}`, and as mentioned above once the `mdeattach_managed.json` file is present this will be the devices configuration. Because the policy file is essentially empty MDE will revert back to the default policy file `/etc/opt/microsoft/mdatp/wdavcfg`.