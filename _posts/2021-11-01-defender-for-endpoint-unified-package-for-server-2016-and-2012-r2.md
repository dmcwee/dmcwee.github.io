---
layout: post
title: Defender for Endpoint Unified Package for Server 2016 and 2012 R2
date: 2021-11-01 16:40:29.000000000 -04:00
categories: []
tags:
- Defender for Endpoint
- MDE
- Microsoft
permalink: "/2021/11/01/defender-for-endpoint-unified-package-for-server-2016-and-2012-r2/"
---
Recently Microsoft [announced the public preview of a unified EPP and EDR](https://techcommunity.microsoft.com/t5/microsoft-defender-for-endpoint/defending-windows-server-2012-r2-and-2016/ba-p/2783292) package that allows a similar onboarding approach for these servers as Server 2019, Windows 10, and Windows 11. Recently, a customer I support wanted to test this new method and perform deployment using the GPO methodology.

The documentation for how to set up and configure the GPO is available [here](https://docs.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-server-endpoints?view=o365-worldwide#windows-server-2012-r2-and-windows-server-2016) and provides a great step-by-step guide. However, the guide only addresses linking the GPO to an OU, but for many customers having an OU per Server Version isn't likely. This customer did have their servers were grouped into a couple of OUs, but not by OS version, so we needed to find a WMI Query that would target the correct set of machines.

Below is the WMI Filter for Server 2016 and 2012R2 that I was able to derive using resources listed below. I don't claim this is perfect, but hopefully it is a good starting point for others.

```
Select * from Win32_OperatingSystem Where (Version like "10.0.14%" or Version like "6.3.96%") and ProductType="3"
```

## Useful Resources

Wikipedia has a fantastic [Windows Operating System list](https://en.wikipedia.org/wiki/List_of_Microsoft_Windows_versions) that covers both User and Server OS's. The Version Number column makes up the first two place values of the WMI Operating System's Version value. The Latest Build column makes up the final, third, segment of the WMI Operating System's Version value. However, when you get to the Windows 10 core OS's, Server 2016 and higher, only build numbers are listed in the Version Number column. You should refer to the WMI object that is returned by your machine, but in this scenario all of the OS's (2012R2 and 2016) both use the 10.0 start to their version numbers.

[Get-WmiObject](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-wmiobject?view=powershell-5.1) was a key PowerShell command because it allowed for testing of parts of the WMI filter on the machines. In this scenario because we were working from Windows Versions the WMI Object we needed was Win32\_OperatingSystem so the following command allowed for quick review of the WMI object

```
Get-WmiObject Win32_OperatingSystem
```

Adding the **-Filter** parameter allows for testing of the Where portion of the WMI Filter. If the filter matches the current machine then the WMI Object is returned, and if the filter fails to match then a Null result is returned.

```
Get-WmiObject Win32_OperatingSystem "(Version like '10.0.14%' or Version like '6.3.96%') and ProductType='3'"
```

Finally, using the [WMI Filter documentation](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-wmi-filters-for-the-gpo#to-create-a-wmi-filter-that-queries-for-a-specified-version-of-windows) to target End User OS vs. Server OS vs. AD Servers allowed us to avoid the overlap with End User OS's and avoid automatic deployment on Domain Controllers.