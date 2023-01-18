---
title: MDI Learning Periods
layout: post
categories:
- MDI
- Identity
- Microsoft
tags:
- Defender for Identity
- MDI
- Microsoft
- Security
- Identity
---
MDI alerts have a number of different learning periods, and each is well documented. However, there is not a single list of all the alerts that have learning periods for easy reference, so I have created and will update this list.
<!--more-->

|Alert Category|Alert|External ID|Learning Period|Learning Period Notes|
|---|---|---|---|---|
|Reconnaissance alerts|[Network-mapping reconnaissance (DNS)](https://docs.microsoft.com/en-us/defender-for-identity/reconnaissance-alerts#network-mapping-reconnaissance-dns-external-id-2007)|2007|8 Days|Beginning when the domain controller is becomes monitored|
|Reconnaissance alerts|[Security principal reconnaissance (LDAP)](https://docs.microsoft.com/en-us/defender-for-identity/reconnaissance-alerts#security-principal-reconnaissance-ldap-external-id-2038)|2038|15 Days|Per computer, starting from the first event, observed from the machine|
|Reconnaissance alerts|[User and Group membership recon (SAMR)](https://docs.microsoft.com/en-us/defender-for-identity/reconnaissance-alerts#user-and-group-membership-reconnaissance-samr-external-id-2021)|2021|4 Weeks|Per domain controller starting from the first network activity of SAMR against the DC|
|Compromised Credential Alerts| [Suspected Brute Force attack (Kerberos, NTLM)](https://docs.microsoft.com/en-us/defender-for-identity/compromised-credentials-alerts#suspected-brute-force-attack-kerberos-ntlm-external-id-2023)|2023|1 Week | |
|Compromised Credential Alerts|[Suspicious VPN Connection](https://docs.microsoft.com/en-us/defender-for-identity/compromised-credentials-alerts#suspicious-vpn-connection-external-id-2025)|2025|30 Days|From the first VPN connection, and at least 5 VPN connections in the last 30 days, per user|
|Domain Dominance Alerts| [Suspected Golden Ticket usage (encryption downgrade)](https://docs.microsoft.com/en-us/defender-for-identity/domain-dominance-alerts#suspected-golden-ticket-usage-encryption-downgrade-external-id-2009)|2009|5 Days|From the start of domain controller monitoring|
|Domain Dominance Alerts|[Suspicious additions to sensitive groups](https://docs.microsoft.com/en-us/defender-for-identity/domain-dominance-alerts#suspicious-additions-to-sensitive-groups-external-id-2024)|2024|4 Weeks|Per Domain Controller starting from the first event|

*This table was last updated on March 8th 2022*