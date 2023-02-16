---
title: How to map AAD Groups to MDE Device Groups
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
- MDM
- Intune
---
I've seen a lot of asks from customer about how they can use Azure AD Groups with MDE Device Groups. Unfortunately, there isn't a direct way to use Azure AD groups with the MDE Device groups, but there is an approach that provides a similar capability.
<!--more-->

This approach is primarily works really well with client OS (Windows 10/11, etc.) and the scenario I'll outline assumes:

- Devices are managed with Intune
- Devices are or will be onboarded to MDE

> This solution can be utilize with other device management tools, but because we are trying to associate AAD Device Groups with MDE Device Groups then Intune is the most likely management tool.

## MDE Registry Keys for Device Tags

[MDE - Create and manage device tags](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/machine-tags?view=o365-worldwide)

MDE has multiple ways you can create and manage device tags. One method is to set a [registry key](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/machine-tags?view=o365-worldwide#add-device-tags-by-setting-a-registry-key-value), so that once the device onboards, or syncs with MDE, the portal will 'receive' the machine tags from an onboarded device.

## Intune

Since Intune is integrated with Azure AD it is able to leverage the Azure AD groups we are trying to bridge with MDE. Also, because Intune is the device management solution we can utilize it to push configurations to the device, like the registry keys, that MDE can then utlize. Thus Intune functions as a bridge technology for this scenario.

>In the instructions below I have an AAD Device Group `US Devices` that I will use to target the Configuration Policy. I will use the name of the AAD Device Group as the MDE Tag value so I can clearly map from `AAD Device Group => Device Tag`. I will also use the same MDE Device Group name as the AAD Device Group and MDE Device Tag to make the obvious transition of `AAD Device Group => MDE Device Tag => MDE Device Group`.

### Windows 10/11 Configuration Policy

[Endpoint Manager](https://endpoint.microsoft.com)

Create a **Windows Device Configuration Profile** in Endpoint Manager.

1. In [Endpoint Manager](https://endpoint.microsoft.com) click on **Devices**, then under **By platform** click on **Windows**
    ![Intune Step 1](/assets/images/2023/02/Intune-Step1.png)
1. Choose **Configuration profiles**
    ![Intune Step 2](/assets/images/2023/02/Intune-Step2.png)
1. Click **+ Create Profile** and in the Fly Out select
    1. **Platform:** *Windows 10 and later*
    1. **Profile type:** *Tempaltes*
    1. **Template name:** *Custom*
    ![Intune Step 3](/assets/images/2023/02/Intune-Step3.png)
1. Provide a name for your Configuration Profile like `US Devices` and click **Next**
1. Click **Add** to create an OMA-URI setting
    1. Provide a name like `US Devices MDE Tag`
    1. (Optional) Provide a description
    1. Input `./Device/Vendor/MSFT/WindowsAdvancedThreatProtection/DeviceTagging/Group` as the **OMA-URI** value
    1. Select `String` for the **Data Type**
    1. Input your desired tag value like `US Devices`
    1. Click **Save**
    ![Intune Step 5](/assets/images/2023/02/Intune-Step5.png)
1. Click **Next**
1. Click **Add Group** to the **Included Groups** section and pick your device group then click **Select**
    ![Intune Step 7](/assets/images/2023/02/Intune-Step7.png)
1. Click **Next** and apply any Applicability Rules that are necessary, then click **Next** again
1. Click **Create**

Now, any devices added to the AAD group you targeted will have the proper MDE Device Tag registry key pushed to them. Repeat these steps for other AAD groups you want to target.

### Defender for Endpoint

[Security Portal](http://security.microsoft.com)

Create a **Device Group** in Defender for Endpoint that will match the devices in the AAD Group by using the Device Tag

1. In the [Security Portal](http://security.microsoft.com) click on **Settings** and **Endpoints**
    ![Security Portal Step 1](/assets/images/2023/02/security-step1.png)
1. Select **Device Groups** and then click **+ Add device group**
    ![Security Portal Step 2](/assets/images/2023/02/security-step2.png)
1. Provide a **Device group name** like `US Devices` and select the desired **Remediation level** and click **Next**
1. On the **Devices** condition for **Tag** select **Equals** for the condition and input the Device Tag value used in the above Intune section on Step 5.4 then click **Next**
    ![Security Portal Step 4](/assets/images/2023/02/security-step4.png)
1. On the **Preview Devices** you can view the machines, if the device tags have had time to propigate, that will be added to this Device Group, then click **Next**
1. On the **User Access** page select the groups you wish to manage the devices if applicable, then click **Submit**
1. Click **Done**

Now, any device with the Device Tag that matches you condition will be added to this Device Group. Repeat these steps for any other Device Group mappings you want to include.

## Wrapping Up

With the instructions you can see how it is possible to replicate the device membership from an AAD group to an MDE Device Group eventhough it is not possible to directly map AAD Groups to MDE Device Groups. Be aware that there are propigation times realted to Intune pushing the Registry Key policy and a seperate propigation time for MDE Reading and Pushing the Device tag to the security portal.

### Reference Documents

The following documents were used as references for creating this approach.

[MDE - Create and manage device tags](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/machine-tags?view=o365-worldwide)

[MDE - Device Tag registry key](https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/machine-tags?view=o365-worldwide#add-device-tags-by-setting-a-registry-key-value)

[Microsoft Defender for Endpoint Adding Tags for Multiple Devices from CSV List](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/microsoft-defender-for-endpoint-adding-tags-for-multiple-devices/ba-p/2082666)
