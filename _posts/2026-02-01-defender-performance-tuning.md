---
title: Defender Performance Tuning
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
featured: true
image: /assets/images/2026/02/tuning2.jpg
banner: /assets/images/2026/02/tuning2.jpg
theme: light
---
"AV is causing a performance issue..." is the dreaded statement everyone who has deployed an AV and/or EDR tool fears hearing. Sure the system owners should probably do a better job of stating what is needed to minimize impact, but security professionals need to know how to address this? So let's tune Defender!
<!--more-->

## Is it up to date?

This is alwasy the starting point for any issue you have with a Microsoft product: Update it. Believe it or not Microsoft does release code with performance bugs (I know I'm shocked too...), or you missed a patch for defender but applied a patch to something else and now we have an unexpected situation. Whatever the case may be, having up-to-date Defender Platform, Engine, and Security Intelligence versions may just resolve your issues without the need to read logs.

## Are you sure it's Defender?

**"It's not the Network!"..."It was DNS"**

**"It's not the code!"..."We had to roll back because of a bug"**

I'm not saying Defender isn't the performance bottle neck, but we have all seen the _new_ thing get blamed when in reality there are always lots of moving parts in an IT environment.

The beginning point for all troubleshooting should be with and without Defender enabled. Here are the most common components I recommend you disable to start your performance troubleshooting.

> **Note:** I recommend enabling _Troubleshooting mode_ on the device while you confirm Defender as the cause of performance issues. Troubleshooting mode will allow you to disable the various settings below, but will revert to the originail settings after the troubleshooting time window is over. In addition, if you have tamper protection enabled Troubleshooting mode will allow you to disable tamper protection so you can proceed.

### Real Time Protection 

Real time protection monitors activities as they occur on the device, if there are performance issues with Defender is the most likely cause.

As an admin on the device, or from a script in Live Response, you can use this command to disable Real Time Protection.

```powershell
Set-MpPreference -DisableRealtimeMonitoring $true
```

### Behavior Monitoring

Behavior monitoring is similar to Real Time Protection in that is continuously monitors activites as they happen on the device. Seldom do you see Behavior monitoring as the root cause for performance issues, but it is not impossible.

```powershell
Set-MpPreference -DisableTamperProtection $true
```

### Network Protection

Typically Network Protection has more of an impact on servers who are providing resources across the network vs. clients who are retrieving them. However, Network Protection on endpoint could be the cause of some slow load times, so it is another good component to check.

```powershell
Set-MpPreference -EnableNetworkProtection Disabled
```

## Yes, it is Defender

Since you're up-to-date and aren't going to leave Real-Time Protection, Network Protection, and Network Monitoring turned off here is how you can now determine the next steps. 

> **Note:** Performance Analyzer does require admin permissions to run.

### Defender Performance Analyzer

Built into Defender is a performance analyzer designed to make performance troubleshooting easier for you. To troubleshoot you need to enable the performance analyzer, reproduce the issue, and then review the results.

#### Enable Performance Analyzer

Because performance analyzer is built in enabling it is very easy, but be sure to specify a path you will remember so you can find the etl log.

```powershell
New-MpPerformanceRecording -RecordTo "[path to a file for recording].etl"
```

Once Performance Analyzer is running you can now proceed with reproducing the performance issues you have experienced.

#### Analyze Performance Analyzer Results

After recreating the performance issue, and stopping the recording, its time to analyze the results.

There are lots of options that can be extracted from the performance log, but in general this tool is similar to the Linux `top` command to allow you to see what processes and files were most impacted. The two most common are `-TopFiles` and `-TopScans` which provide insights into processes and files impacted by Defender as well as the period of time impact. This is frequently useful for adding process or path exceptions.