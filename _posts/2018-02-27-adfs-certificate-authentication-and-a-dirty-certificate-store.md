---
layout: post
title: 'ADFS: Certificate Authentication and A Dirty Certificate Store'
date: 2018-02-27 14:12:49.000000000 -05:00





categories:
- Active Directory
- Azure
- Microsoft
- Security &amp; Identity
tags:
- AD FS
- ADFS
- CBA
- Certificate Based Authentication
- Client Certificate
- Login
- TCL
- Timeout
- Trusted Certificate List
- X.509

  
  

  
  
  
  
  
  
  

  
  
  
  
  

  
  
  
  
  
permalink: "/2018/02/27/adfs-certificate-authentication-and-a-dirty-certificate-store/"
---
I often support ADFS configurations that are used to enable Client Certificate Authentication.&nbsp; Typically, these deployments are straight forward: we have certificates that cover the URLs ([sts url] and certauth.[sts url] see [this article](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/overview/ad-fs-requirements) for more details), we enable the client certificate authentication and it works.

Then there are the other deployments.

# The Dirty Certificate Store

## Symptom

After enabling client certificate authentication when the test user selects the X.509 Certificate link they are redirected to the certauth url, but the option to select a client certificate never appears and after an extended period of time, something like 2-5 minutes, the request times out.

## Troubleshooting

The easiest or most obvious cause would be a SSL certificate that doesn't support the auth.[sts url] which would cause ADFS to use port 49443 and the traffic being blocked by the firewall.&nbsp; However, working with the firewall administrator we could see the traffic coming in and going out on 443 and never moving to 49443.&nbsp; Further testing with a client 'inside' the organization showed similar timeout behavior so we eliminated both the firewall and the bad SSL certificate.

I began hunting through the ADFS logs as well as the client logs, but found nothing so I was stuck.&nbsp; Fortunately, I was able to use some of the internal Microsoft resources and was told to try adding the following registry key:

```
KEY: HKLM\system\currentcontrolset\control\securityproviders\schannel\sendtrustedissuerlist
Type: DWORD (32 bit)
Value: 0
```

After adding this to the ADFS server, and performing a reboot, we started getting prompted to pick a client certificate.&nbsp; So doing a little research I came across this TechNet which outlines what the registry key above does.

https://technet.microsoft.com/en-us/library/cc776467(v=ws.10).aspx

The result is this key blocks the ADFS server from sending a list of Trusted Certificate Issuers (TCL) to the client machine.&nbsp; This is desired, normally, because we don't want a user to pick a certificate for authentication that the ADFS server doesn't trust.&nbsp; However, in troubleshooting turning this setting 'off' is useful because we can now validate that ADFS is sending the request to the client for an authentication certificate, and the client can provide a certificate to authenticate with.

SUCCESS, right?

## Fix It

It's not recommended to leave the TCL disabled because a user will eventually try to authenticate with the wrong certificate, fail, and then you'll have to troubleshoot **that** problem...and fix it.

There are two issues that can occur with the TCL. First, if there are too many certificates then the server can't send them all to the client.&nbsp; Second, if there are non-root certificates in the root certificate store, or root certificates in the intermediate certificate store then the list is corrupted.&nbsp; In either case, the client sees no certificate selection prompt and authentication stalls resulting in failure.

To solve the first problem of too many TCL entries you can remove old or unused Certificates from the Root Certificate store to reduce the size of the TCL.

To solve the problem of Certificates in the wrong certificate store you can review each root certificate and verify it's issuer IS itself.&nbsp; You can then review each Intermediate Certificate and verify it's issuer IS NOT itself.&nbsp; Or, you could use the below PowerShell script to help you identify the possible certificate errors.

```
Write-Output "Issued To,Issued By,Certificate Store"

$rootconflicts = Get-ChildItem Cert:\LocalMachine\Root | Where-Object { $_.Issuer -ne $_.Subject }
$rootconflicts | ForEach-Object { 
 $subj = $_.SubjectName.Name.Split(",")[0].Split("=")[1]
 $issr = $_.Issuer.split(",")[0].Split("=")[1]
 Write-Output "$subj,$issr,Root"
}

$conflicts = Get-ChildItem Cert:\LocalMachine\CA | Where-Object { $_.Issuer -eq $_.Subject }
$conflicts | ForEach-Object { 
 $subj = $_.SubjectName.Name.Split(",")[0].Split("=")[1]
 $issr = $_.Issuer.split(",")[0].Split("=")[1]
 Write-Output "$subj,$issr,CA"
}

Write-Output "Found $($rootconflicts.Length) Non-Root Certificates in the Root Certificate Store."
Write-Output "Found $($conflicts.Length) Root Certificates in the Intermediate CA Store."
```

This is also available at my GitHub repository.

https://github.com/dmcwee/azure/tree/master/Scripts

_[3/5/18 Update]: Added link to the AD FS Requirements article on docs.microsoft.com_

