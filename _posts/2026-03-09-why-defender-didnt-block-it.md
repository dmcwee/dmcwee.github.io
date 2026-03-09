---
title: Why Microsoft Defender Didn’t Block It
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
From helping customers POC, Pen Test, and creating the Microsoft FastTrack Quick Start for MDE I've had a lot of experience handling when MDE testing fails and determining cause. These lessons aren't just about POCs and Pen-Test, but translate to real world lessons that help prevent breaches.
<!--more-->

### What PoCs, Pen Tests, and Real‑World Investigations Actually Reveal

One of the most common, and emotionally charged, questions I hear during Microsoft Defender for Endpoint (MDE) evaluations is:

> *“Why didn’t Defender block this?”*

The question usually comes after a proof‑of‑concept (PoC), a red‑team exercise, or a customer‑run penetration test where malware executed successfully despite Defender being "on". The assumption is often that the product failed. In reality, most of these scenarios have far less to do with detection gaps and far more to do with **configuration state, testing methodology, and environmental assumptions**.

This post walks through the most common reasons Defender ""didn’t block it", based on real experience across customer PoCs and professional engagements. While this helps avoid drawing the wrong conclusions, the are also important lessons and learns to take away before a real incident happens.

***

## 1. Defender Was On… But the Device Wasn’t Fully Protected

One of the first things we validate in any investigation is whether the device was actually operating in a **fully protected state** at the time of execution. Often customers assume the device onboarded because the script ran successfully, but that doesn't always tell the whole story.

Common issues include:

*   The device was onboarded, but **policy assignment had not completed** or **policy assignment was misconfigured**
*   The device was in a **partial or degraded health state**
*   Communication issues prevented policy or signature updates from applying
*   The device was onboarded, but **key protections (ASR, CFA, Network Protection)** were never enabled

In several PoC investigations, the Defender portal showed the device as onboarded, but deeper inspection revealed that the effective settings on the endpoint did not match the intended configuration.

**Lesson:**  
Onboarding ≠ protected. Always validate *effective settings*, not just portal status.

***

## 2. Local Admin Exclusions Quietly Undermined Protection

A surprisingly common root cause is **locally added exclusions**, often introduced intentionally during testing. During pen-testing its common to see testers given admin access to test machines so they can perform their test, and I'm **not opposed to this**, but that admin access will probably be abused to bypass your security. Likewise, there is often the push to "just add exceptions" to get things working, **I am opposed to this**, and often the asks are for broad segments of the file system to be excluded which leads to major risks. 

Examples include:

*   Folder or process exclusions added to "get the test working"
*   Hash exclusions added temporarily and never removed
*   Admins running malware samples with elevated privileges

In some cases, the **Merge Admin Exclusions** setting was left enabled, allowing local exclusions to override centrally managed Defender policies. From Defender’s perspective, the behavior was allowed by design.

This creates a dangerous testing blind spot:

*   The malware executes
*   Defender behaves exactly as configured
*   The conclusion becomes "Defender missed it"

**Lesson:**  
If you allow local admins to weaken protections, Defender will respect that choice. That’s not a detection failure it’s a configuration decision. Also, if you allow local admins to set their own exclusions you should assume that once they are set they will be forgotten until the wrong people discover them.

***

## 3. The Test Was Designed to Bypass, Not Validate

PoCs can unintentionally test Defender’s *bypassability* rather than its *protective capability*. While I'm not opposed to pen-testers having advanced permissions so they can efficiently perform *their* testing, it is important to understand what the goal and method of the test is and ensure they align.

Common patterns:

*   Malware executed from excluded paths
*   Samples launched with full local admin rights, when user's aren't given full admin rights
*   Protections disabled or relaxed to "see what happens"
*   No baseline test in a clean, locked‑down state

In one recent investigation, we were told that a ransomware sample was successfully executed on the test machine. Yet when we used an "out-of-the-box" Windows install we could not replicate the finding. Once we saw the MDE details of the test machine we immediately identified the ransomwas was staged and executed with the benefit of exclusions.

The difference wasn’t Defender—it was the environment.

**Lesson:**  
If the test environment is already compromised or weakened, the results will reflect that. So be sure you know what your results really mean.

***

## 4. Policy Assignment Failed (Silently)

Another frequent issue is **policy assignment failure**, especially in environments with:

*   Entra groups missing devices
*   Network communication restrictions

Sometimes it really is the obvious things that are the most problematic. Assuming because you created a policy and selected an Entra group that the device is now configured as you expect is incredibly common, and often in correct. Devices missing from the Entra group or lacking access to the necessary service URLs are frequent causes for policy assignment errors.

A few other less, but still common issues:

*   Multi‑management components (ConfigMgr + Intune, Intune + Puppet, Puppet + JAMF)
*   Stale or duplicate Entra device objects
*   Pilot‑scoped workloads unintentionally limiting coverage

In all of these cases it appear like the machine *should* have the desired policy, but in reality the device your actually testing isn't configured as you expect. Without validating assignment paths and workload ownership, it’s easy to assume protections are active when they aren’t.

**Lesson:**  
Always confirm *policy delivery*, not just policy intent. Defender's `Get-MpComputerStatus` and `Get-MpPreference` as well as the device's **effective settings** page are critical go-to's for device configuration.

***

## 5. Clean‑State Validation Changes the Conversation

When there’s disagreement about results, the most effective reset is a **clean‑state validation**:

1.  Reimage the device
2.  Onboard Defender live
3.  Apply required security policies
4.  Re‑run the scenario end‑to‑end

This approach removes ambiguity:

*   No legacy exclusions
*   No stale policies
*   No inherited misconfigurations

In many cases, this single step can resolves weeks of debate.

**Lesson:**  
If you can’t reproduce the result in a clean state, the issue isn’t Defender—it’s drift.

***

## What This Means for Defender Evaluations

If you’re evaluating Microsoft Defender for Endpoint, or defending its results internally, focus on these principles:

*   Validate **effective settings**, not assumptions
*   Treat local admin exclusions as security decisions, not test artifacts
*   Separate **bypass testing** from **protection validation**
*   Confirm policy assignment
*   Use clean‑state testing to eliminate noise

***

### Final Thoughts

I **have** seen Defender miss real detections, it isn't perfect and I'm not claiming it is perfect or that it *never* misses. However, I see Defender **miss for a reason** more, so its important to know where to look.

The most valuable outcome of a PoC isn’t proving that malware can or cannot run, it’s understanding **how**, and **why** so you can ensure your intended security posture is being properly reflected.

