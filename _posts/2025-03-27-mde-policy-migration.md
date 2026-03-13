---
title: MDE Policy Migration
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
image: /assets/images/2025/03/three-knights.jpg
banner: /assets/images/2025/03/three-knights.jpg
theme: dark
excerpt: I have intentionally and reluctantly avoided this topic for a while, but enough customer experience has occurred, and I feel the benefits are balanced with or outweigh the negatives. So, over the last week I wrote and have made available My-MdeMigration a PowerShell Module to help with MDE Migrations.
---

## The Challenges of Migrating Security Products

Migrating security products is notoriously difficult, primarily due to the historic accumulation of configurations within organizations, and the fear that changes will break a critical application or service. Sadly, this means organizations tend to collect configurations but seldom review or clean-up the configurations.

### Accumulation of Configurations Over Time

Organizations often retain security tools for extended periods, during which other products are acquired or upgraded leading to configuration additions. This accumulation is necessary, especially during upgrades and migrations but are seldom reviewed after migration.

There are several reasons security team struggle to clean up the configuration:

  - **Fear of Breaking Systems**: There is often a fear that changing/removing configurations might disrupt system functionality, leading to security being blamed for _another outage_.
  - **Loss of Institutional Knowledge**: Over time, the application ownership changes and the institutional knowledge of how the app works is often lost, so when asked about a configuration being needed the application team can’t answer.
  - **Additive Approach**: Often during migrations security is consulted up front and when something doesn’t work, but once the migration is over there is seldom a follow up to let the security team know the old configs are no longer necessary. We have all read the articles, blogs, and posts about the shortage of Cyber resources, so we shouldn’t expect these understaffed and overworked individuals will chase down every migration team for updates.

### Balancing Import Needs

Migration to a new security product offers an opportunity to review the organization’s configurations and clean up. However, migrations seldom carry luxurious timelines, especially in security where running duplicative tools can create exponentially more work. Therefore, it’s crucial to strike a balance between tedious validation of configurations and a timeline to successfully complete migration. 

This balance is challenging to achieve due to several reasons:

- **Tedious Validation Work**: It is a labor-intensive task to validate whether all exclusions are still necessary. This involves checking if versions have been updated or if a product is still in use.
- **Pressure to Migrate Quickly**: There is often significant pressure to complete the migration swiftly, usually due to the end of the current security vendor contract, and work is often pushed as late as possible.
- **Ensuring Stability and Performance**: Alongside the need for speed, there is also pressure to ensure that the migration does not degrade system performance or cause disruptions, and often the simple solution is: _just bring it all over and figure it out later (maybe)_.

### Complexity of Policies

Creating and translating security policies are not straightforward as each vendor has unique settings, features and functionalities. These differences can add to the complexity of the migration:

- **Vendor-Specific Settings and Capabilities**: Different security vendors have their own configurations, which do not necessarily align with each other. This inconsistency can make it difficult to create a unified policy.
- **Policy Scope**: Organizations must decide between creating a single, overarching policy ("One Policy to rule them all") or multiple, specific policies tailored to individual machines.

## Introducing My-MdeMigration PowerShell Module: Simplifying MDE Migrations

Currently, there are no other generic solutions (FAVE does exist but only for McAfee) that offer a simple and efficient way to migrate AV exclusions, or any Security Configuration policies to MDE. My module addresses this gap by providing a user-friendly method to import these exclusions, saving time in creating AV policies manually.

> **Note** The module uses the PowerShell Graph SDK so you must install the `Microsoft.Graph` module as well as creating an Application in your Entra Tenant to authorize the module to work.

### Focus of Version 1: Importing AV Exclusions

The primary focus of version 1 of my PowerShell module is to facilitate the import of antivirus (AV) exclusions. This feature was driven by a specific need from several customers, including a current customer, who required a straightforward solution for importing AV exclusions. 

To keep the import capability generic there are two text file options available.

#### One file per exclusion type

If you need to create a single policy with a single exclusion type, then `Import-MyMdeExclusions` is a good option. The function assumes the files include one exclusion value per line so the format would be something like this:

```txt
c:\my\data\folder
c:\my\other_data\folder
c:\my\last\exclusion\folder
```

The associated PowerShell command line would be:

```powershell
Import-MyMdeExclusions -ExclusionFile "File Path" -PolicyName "Policy Name Here" -OsFamily [Windows|Mac|Linux] -ExclusionType [Directory|Process|File|FileExt] -ClientId "CLIENT_ID_HERE" -TenantId "TENANT_ID_HERE"
```

#### One file per policy

If you have a mix of exclusions (Folders, Extensions, Processes) then the CSV Import `Import-MyMdeCsvExclusions` command is the best option. The function assumes the file has the following format:

```csv
Exclusion,ExclusionType
c:\my\data\folder, Directory
c:\my\process\process_executable.exe, Process
.mdb, FileExt
```

The `ExclusionType` column uses the same values as the command `Import-MyMdeExclusions` uses for the `ExclusionType` parameter: `Directory | Process | File | FileExt`.

The associated PowerShell command line would be:

```powershell
Import-MyMdeCsvExclusions -CsvFile "File Path" -PolicyName "Policy Name Here" -OsFamily [Windows|Mac|Linux] -ClientId "CLIENT_ID_HERE" -TenantId "TENANT_ID_HERE"
```

### Future Plans for the Module

While version 1 is centered around importing exclusions, I have several exciting features planned for future releases:

1. **Validation Against Automatic Exclusions**: 
   - Future versions will include functionality to validate imported exclusions against automatic exclusions. This will ensure that any exclusions added are not redundant and do not conflict with existing automatic exclusions.

2. **Pre-Canned Exclusions for Popular Products**:
   - I plan to provide pre-canned exclusions for widely used products like SQL Server. This will make it even easier for users to set up their AV exclusions without having to manually configure each one.

3. **Export & Import Existing Policies from the Portal**:
   - Another feature in the pipeline is the ability to export existing AV policies directly from the portal. This will allow users to back up their current configurations or migrate them to new environments seamlessly.

### Conclusion

I'm excited to share this PowerShell module with the community and look forward to your feedback. By focusing on user needs and continuously improving the module, I aim to provide a robust tool that simplifies AV exclusions management. Stay tuned for future updates and enhancements!

You can find the module and installation instrutions on GitHub [here](https://github.com/dmcwee/my-mdemigration/).

