---
title: Custom MDE Threat and Vulnerability Report
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
- Advanced Hunting
- KQL
excerpt: The Threat & Vulnerablity reports in MDE provide nice summary data across your cloud, but when you have to react to what the report says how can you get the details you need?
---
The [secuity portal](https://security.microsoft.com) comes with several nice vulnerability reports for customers to review that show a summary of the risks in their environment.  However, some customers find that these reports are too *general*, so while they show summary data they cannot distribute these to system owners who could then go an patch their systems.

## Advanced Hunting as a Report
Most people are familiar with Advanced Hunting queries for customer alerts, and the obvious: Advanced Hunting of threats in an environment. However, Advanced Hunting is also a great way for organizations to generate reports with specific details of their choosing, and that is exactly what we can do to get specific details for our Vulnerablity report.

There are five key tables that are used by the TVM reports in MDE, but for this example the focus will be on the CVE vulnerabilities so the tables of importance are *DeviceTvmSoftwareVulnerabilities*, *DeviceTvmSoftwareVulnerabilitiesKB*, and *DeviceInfo*.  The *KB* table provides details about each of the CVEs while the other table is a link between the devices that have the CVE and the KBs (this is also how the Security Configuration tables work as well).  

So the basics of what we need to do are: 
1. Join the Software TVM tables together so we get full details of the CVE
1. Join the Device Table with the combined Software TVM tables so each device lists all of the CVEs that impact it.  (You could also flip this concept around if you wanted so all CVEs listed the devices.)

### Advanced Hunting Query

```
let SoftwareVulns = DeviceTvmSoftwareVulnerabilities
| join DeviceTvmSoftwareVulnerabilitiesKB on CveId
| project-rename VulnerabilityName=VulnerabilityDescription, VulnerabilityScore=CvssScore, VulnId=CveId;
let AllVulns = SoftwareVulns;
DeviceInfo
| where OSPlatform !=""
| join kind=innerunique AllVulns on DeviceId
| project Timestamp, VulnerabilityName, VulnerabilityScore, VulnId, DeviceName, PublicIP, OSArchitecture, OSPlatform, OSBuild, OSDistribution, OSVersion, OSVersionInfo
| order by VulnerabilityScore, VulnId, Timestamp
```

**Note:** You will notice I've created the *AllVulns* as well as used *project-rename* which in this scenario isn't really necessary.  However, this will allow you to add the Security Configuration table to this query easily and display results in a single data set.