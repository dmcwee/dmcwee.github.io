---
title: Advanced Hunting Repository
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
image: /assets/images/2025/08/AdvancedHunting.png
banner: /assets/images/2025/08/AdvancedHunting.png
theme: dark
---
I've been collecting some common queries often requested by customers I work with. Many of these are related to Vulnerability Management reporting, but some get into various threat detection activities.
<!--more-->

## Useful Queries

Within the UsefulQueries folder there are queries to help you determine the state characteristics like last scan times and last update applied times, and queries to help you determine if a device is onboarded.

### Device State

Customers often ask "How do we know if _______ ran or was updated recently?" and the good news is the data is all there. While there are reports in MDVM the trouble is that these reports don't provide simple lists of details that can be shared across an organization.

These two queries [DeviceState](https://github.com/dmcwee/AdvancedHunting/blob/main/UsefulQueries/DeviceState.kql) and [DeviceState2](https://github.com/dmcwee/AdvancedHunting/blob/main/UsefulQueries/DeviceState2.kql) are designed to provide a per-machine display of device state details, usually burried in the Additional Fields field such as: Last Scan Type & Time, Versions & Last Update Time, and Sensor Health State.

## Monitoring Onboarding & Offboarding

A common ask from customers is "How do I know if a device was onboarded or offboarded from my tenant?" and unfortunately the answer here isn't great. There are events that are recorded on an endpoint during onboarding and offboarding, but those events are not transmitted to the MDE Service.

The best work around I've been able to come up with, [LastSeenAlert](https://github.com/dmcwee/AdvancedHunting/blob/main/UsefulQueries/LastSeenAlert.kql), is using the Vulnerability tables to compare the `Last Seen` date & time against the current date & time. The benefit, and disadvantage, of using the TVM table is that it is updated once every 24 hours, and only a single entry per device which significantly helps simplify the logic. The disadvantage is that the the table only updates once in a 24 hour period, so you aren't getting *real time* detections or alerts.

> My query is desiged to alert for items that have not reported in a day, but you can update this to meet your desired time window as long as it is over 1 day.

## Detect Account Creation

Detect Account Creation is a sequence of queries (1-7) I used when working to determine if an account was created on a local machine and then added to the local admin group. The idea is this helps detect if an attacker is attempting to establish persistence in the environment, and I use these queries with customers when we are demonstrating MDE's Advanced Hunting & Custom Alert capabilti  es.

> This query uses fields that are available when Defender & Sentinel have been integrated, so some tweaks may be necessary if you do not have this integration.

The [final query](https://github.com/dmcwee/AdvancedHunting/blob/main/CreateAccount/CreateAccount-QueryFinal.kql) is designed so it can be used to create a custom alert that can even take actions like, disabling the account creating the persistent account or isolating the machine.

## Vulnerabilities

The last group of queries are related to Vulnerability detections.

The [Most Critical CVE](https://github.com/dmcwee/AdvancedHunting/blob/main/Vulnerabilities/MostCriticalCVEs.kql) and [Most CVE](https://github.com/dmcwee/AdvancedHunting/blob/main/Vulnerabilities/MostCVEsAssociated.kql) queries show the machine(s) with the most vulnerabilities associated with the machine.

The [CVE Last Seen](https://github.com/dmcwee/AdvancedHunting/blob/main/Vulnerabilities/CVEsLastSeen.kql) query allows organizations to check or validate that steps they took to resolve the CVE have addressed the vulnerability.
