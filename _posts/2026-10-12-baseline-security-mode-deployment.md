---
title: Baseline Security Mode Deployment
author: David McWee
categories:
- Entra
- SharePoint
- Exchange
- M365 Office Apps
tags:
- Entra
- SharePoint
- Exchange
- M365 Office Apps
image: /assets/images/2026/10/BSM_Secured_Doors.jpg
banner: /assets/images/2026/10/BSM_Secured_Doors.jpg
theme: light
excerpt: Baseline Security Mode is an often overlooked capability in the Microsoft Admin Center that helps organizations identify and address security vulnerabilities not necessary exposed in other areas of the M365 Tenant.
---

## What is Baseline Security Mode

Baseline Security Mode (BSM) is Microsoft’s secure-by-default deployment experience for Microsoft 365, designed to help organizations quickly adopt a curated set of foundational security controls across *Microsoft Entra*, *Exchange Online*, *SharePoint*, *OneDrive*, *Teams-related scenarios*, and *Microsoft 365 Apps* from a single location in the Microsoft 365 admin center. Rather than simply measuring security posture like Secure Score, BSM focuses on security control adoption, allowing administrators to run impact assessments, understand dependencies, simulate changes, deploy recommended protections, and roll back settings if required.

### Two deployment paths, one readiness conversation

The BSM portal provides a direct route to enabling settings, and because the settings are independent different teams can work on their individual areas without having to apply all the settings at one time. Each setting also comes with its own impact report, which should be run before enabling the setting, and can help orgainzations identify contol they believe are low to high impact. Once the impact is understood teams can then prioritize settings and resolve critical dependencies before enforcement.

The BSM portal is a convenient way to apply settings in a tenant, but it uses an *all-or-nothing* approach which many organizations tend to avoid. However, because BSM relies on native tools and capabilities you aren't locked into the all-or-nothing approach and can instead implement the same or similar policies in those native tools for **most** of BSMs settings. Using the native tools can result in "green" indicators in BSM **if** the settings are applied as BSM expects, but there is a possibility that individual implementations may be *the same* but not seen as such by BSM. The details below explain how the settings can be individually applied to still qualify as BSM wins.

## Don't forget your change control

Change control is a critical practice for customers to ensure that random changes are not applied **and** to ensure a change can be rolled back if there is a problem. Organizations have a range of strictness for change so consider the following items that may, or may not, count as changes to your organization's environment.

### BSM Logging Change

When activating BSM for the first time there are two logging enablement check boxes **View reports with end-user identifiable data (EUII)** and **Generate audit logs for Word, Excel, PowerPoint, and OneNote** that are necessary so BSM reports can accurately identify and report on impacted workloads, users, and files. These check boxes do not impact user experience, but do enhance information captured in the logs used by BSM.

### Entra Reports

When the Entra Phishing Resistant Authentication reports are activted two **Report-only** Conditional Access policies are created:

- **Baseline Security Mode: Phishing-resistant multifactor authentication for admins**
- **Baseline Security Mode: Block legacy authentication**

Report-only policies do not enforce their controls, but because the new CA policies are created this should still pass through the organization’s change review where required. If BSM creates the rules for you, as of now, there is **no way to delete them** in Entra, but they can be turned off if necessary.

### BSM Control enablement

Enabling BSM controls will change settings in Office Config Policy, Entra CA Policies, and some service level settings accessible by Powershell only. Before enabling/changing any of these policies be sure to have completed the Change Management process of your organization, and a plan for roll back if necesary.

## Enable BSM without using the BSM Portal

Most of the BSM controls can be configured individually in their respective products. The tables below details how those controls can be enabled, the Scope you can use when testing the impact & piloting the enablement, the BSM Scope or what BSM expects for a "green" indicator, and the permissions necessary to set these control values. This table is also useful if you have enabled a control in BSM and now need to roll-back those settings.

### Entra Portal Settings

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Scope</th>
      <th>BSM Scope</th>
      <th>Manual Configuration</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Protect admin access to Microsoft admin portals with phishing-resistant authentication</td>
      <td>By Role</td>
      <td>CA policy created from the Require phishing-resistant multifactor authentication for admins Template in "On"</td>
      <td>Microsoft Entra Conditional Access policy requiring phishing-resistant MFA for privileged administrative roles. <br><br><b>Enable:</b> Create an CA policy based on the Require phishing-resistant multifactor authentication for admins and enable the policy.<br><br><b>Report:</b> Create an CA policy based on the Require phishing-resistant multifactor authentication for admins and set the policy to Report-only.<br><br><b>Disable:</b> Switch the policy to Report-only, Off, or delete it.</td>
      <td>Security administrator or Conditional Access administrator</td>
    </tr>
    <tr>
      <td>Block legacy authentication flows</td>
      <td>By User</td>
      <td>CA policy created from the the Block legacy authentication template in “On”.</td>
      <td>Microsoft Entra Conditional Access policy blocking legacy authentication clients. <br><br><b>Enable:</b> Create a CA policy based on the Block legacy authentication and enable the policy. <br><br><b>Report:</b> Create a CA policy based on the Block legacy authentication and set the policy to Report-only. <br><br><b>Disable:</b> Switch the policy to Report-only, Off, or delete it. <br></td>
      <td>Security administrator or Conditional Access administrator</td>
    </tr>
    <tr>
      <td>Restrict end-user consent to Microsoft 365 certified and single-tenant apps with low-risk permissions</td>
      <td>Global</td>
      <td><b>Must be set with BSM</b></td>
      <td>There is <b>no equivalent setting</b> in the Entra UI that aligns with BSM’s policy. However, enabling the following settings are close, but BSM does have additional restrictions.<br><br><b>Set:</b> Entra Admin -> Enterprise Apps -> Consent and permissions -> Select Allow user consent for apps from verified publishers, for select permissions<br><br><b>Unset:</b> Return user consent to <b>Let Microsoft manage your consent settings (Recommended)</b>.<br></td>
      <td>Security administrator or Privileged role administrator</td>
    </tr>
  </tbody>
</table>

### Office Cloud Policies

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Scope</th>
      <th>BSM Scope</th>
      <th>Manual Configuration</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Block basic authentication (Microsoft 365 Apps)</td>
      <td>By User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Group Policy or Office Cloud Policy Policies:
<ul><li>"Allow specified hosts to show Basic authentication prompts to Office apps"</li><li>"Allow Basic authentication prompts from network proxies".</li></ul>Basic authentication is already blocked by default; the setting prevents users overriding it in the Trust Center. <br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the Allow specified hosts to show Basic authentication prompts to Office apps and Allow Basic authentication prompts from network proxies policies in a user or tenant policy.<br><br><b>Unset:</b> Turn the toggle off or enable the host policy with hosts listed (semicolon separated).</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Block insecure protocols for file opens (HTTP and FTP)</td>
      <td>By User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy: "Block Insecure Protocols". <br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the Block Insecure Protocols policy in a user or tenant policy<br><br><b>Unset:</b> Turn the toggle off or set the policy to not configured.</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Block FrontPage Remote Procedure Call (FPRPC) protocol for file opens</td>
      <td>By User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy: "Restrict Apps from FPRPC Fallback". <br><br>FPRPC is already blocked by default in favour of HTTPS; the setting prevents users overriding it.<br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the *Restrict Apps from FPRPC Fallback* policy in a user or tenant policy<br><br><b>Unset:</b> Turn the toggle off or set the policy to not configured.</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Open ancient legacy formats in Protected View and disallow editing</td>
      <td>User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy<br><br><b>Set:</b><br>M365 Apps Admin Center -> Customize -> Policy Management -> Enable the following policies in a user or tenant level policy<br><ul><li>File Block includes trusted files</li><li>File Block includes external link files</li></ul>M365 Apps Admin Center -> Customize -> Policy Management -> Set the following policies to Open in Protected View in a user or tenant level policy<br><ul><li>Word 2 and earlier binary documents and templates</li><li>Word 6.0 binary documents and templates</li><li>Word 95 binary documents and templates</li><li>Excel 2, 3 and 4 macrosheets and add-in files</li><li>Excel 2, 3 and 4 worksheets</li><li>Excel 4 workbooks</li></ul><b>Unset:</b> Set the above policies to Not Configured in the tenant or user policy or delete the tenant or user policy.</td>
      <td>Office Apps adminitrator</td>
    </tr>
    <tr>
      <td>Open old legacy formats in Protected View and allow editing (the article title uses "and save as modern format")</td>
      <td>User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy<br><br><b>Set:</b><br>M365 Apps Admin Center -> Customize -> Policy Management -> Enable the following policies in a user or tenant level policy<ul><li>File Block includes trusted files</li><li>File Block includes external link files</li></ul><br>M365 Apps Admin Center -> Customize -> Policy Management -> Set the following policies to Allow editing and open in Protected View in a user or tenant level policy<ul><li>Word 2007 and later binary documents and templates</li><li>Word 2003 and plain XML documents</li><li>Word XP, 2000 and 97 binary documents and templates</li><li>Legacy converters for Word</li><li>PowerPoint 97-2003 presentations, shows, templates and add-in files</li><li>Legacy converters for PowerPoint</li><li>Excel 97-2003 workbooks and templates</li><li>Excel 95-97 workbooks and templates</li><li>Excel 95 workbooks</li><li>Legacy converters for Excel</li></ul><br>M365 Apps Admin Center -> Customize -> Policy Management -> Set Excel 97-2003 add-in files to Save Blocked in a user or tenant level policy<br><b>Unset:</b> Set the above policies to Not Configured in the tenant or user policy or delete the tenant or user policy.</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Block ActiveX controls</td>
      <td>User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy<br><br>The default is already "Disable all controls without notification" but a user can change it in the Trust Center; enabling the policy enforces it and greys the option out. Unset: set the policy to not configured.<br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the Disable All ActiveX policy in a user or tenant level policy<br><br><b>Unset:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Not configured the Disable All ActiveX policy in a user or tenant level policy</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Block OLE Graph and OrgChart objects</td>
      <td>User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy<br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the Block OrgChart policy in a user or tenant level policy<br><br><b>Unset:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Not Configured the Block OrgChart policy in a user or tenant level policy</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Dynamic Data Exchange (DDE) server launches are blocked in Excel for Windows</td>
      <td>User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy<br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the Don't allow Dynamic Data Exchange (DDE) server launch in Excel policy in a user or tenant level policy<br><br><b>Unset:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Set the Don't allow Dynamic Data Exchange (DDE) server launch in Excel policy to Microsoft recommended baseline or Not Configured in a user or tenant level policy</td>
      <td>Office Apps administrator</td>
    </tr>
    <tr>
      <td>Block Microsoft Publisher</td>
      <td>User</td>
      <td>Office Cloud Policy with <b>Tenant</b> scope</td>
      <td>Configure with Office Cloud Policy<br><br>When enabled, Publisher does not launch and the user is told it could not start because of a security policy set by the organization. Publisher will not be included in Microsoft 365 from October 2026.<br><br><b>Set:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Enable the Disable Publisher policy in a user or tenant level policy<br><br><b>Unset:</b> M365 Apps Admin Center -> Customize -> Policy Management -> Not Configured the Disable Publisher policy in a user or tenant level policy</td>
      <td>Office Apps administrator</td>
    </tr>
  </tbody>
</table>

### PowerShell

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Scope</th>
      <th>BSM Scope</th>
      <th>Manual Configuration</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Block legacy client authentication connections to SharePoint and OneDrive (IDCRL)</td>
      <td>Global</td>
      <td><i>LegacyAuthProtocolsEnabled</i> is <i>$false</i></td>
      <td>Configure with SharePoint Online PowerShell. Changes take up to 24 hours to apply.<br><br>
      <b>Set using PowerShell:</b>
      <div class="language-powershell highligher-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">Set-SPOTenant</span><span class="w"> </span><span class="nt">-LegacyAuthProtocolsEnabled</span><span class="w"> </span><span class="nx">$false</span></code></pre></div></div>
      <b>Unset using PowerShell:</b>
      <div class="language-powershell highligher-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">Set-SPOTenant</span><span class="w"> </span><span class="nt">-LegacyAuthProtocolsEnabled</span><span class="w"> </span><span class="nx">$true</span></code></pre></div></div>
      </td>
      <td>SharePoint Admin</td>
    </tr>
    <tr>
      <td>Disable organization-wide access to Exchange Web Services (EWS)</td>
      <td>Global</td>
      <td><i>EwsEnabled</i> is <i>$false</i><br><br><b>-OR-</b><br><br>AppID AllowList is not empty</td>
      <td>Configure with Exchange Online PowerShell<br><br>The parameter globally enables or disables EWS access for the entire organization regardless of what application is making the request; the EWS allow and block lists provide partial scoping. <b>See below for details of the October 1 Deprecation of EWS.</b><br><br><b>Set:</b>
      <div class="language-powershell highligher-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">Set-OrganizationConfig</span><span class="w"> </span><span class="nt">-EwsEnabled</span><span class="w"> </span><span class="nx">$false</span></code></pre></div></div>
      <b>Unset:</b>
      <div class="language-powershell highligher-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">Set-OrganizationConfig</span><span class="w"> </span><span class="nt">-EwsEnabled</span><span class="w"> </span><span class="nx">$true</span></code></pre></div></div>
      </td>
      <td>Exchange Admin</td>
    </tr>
  </tbody>
</table>


### BSM Portal Only

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Scope</th>
      <th>BSM Scope</th>
      <th>Manual Configuration</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Do not allow new custom scripts in SharePoint sites</td>
      <td>Site</td>
      <td>Global</td>
      <td>Configure with SharePoint admin center custom script controls and SharePoint Online PowerShell.<br><br><b>Blocking with BSM is not reversible: the setting permanently removes the ability to add new custom scripts in OneDrive and SharePoint sites.</b> Using the SharePoint admin center will allow testing and roll back, but will not meet the BSM policy.<br><br><b>Set:</b> SharePoint Admin -> Active Sites -> {Site} -> Settings -> Custom Scripts: Blocked<br><br><b>Unset:</b> SharePoint Admin -> Active Sites -> {Site} -> Settings -> Custom Scripts: Allowed</td>
      <td>SharePoint Admin</td>
    </tr>
    <tr>
      <td>Disable access to Microsoft Store for SharePoint</td>
      <td>Global</td>
      <td>Global</td>
      <td>Configure with SharePoint admin center store settings. <br><br><b>Set:</b> SharePoint Admin -> More features -> Apps (Open) -> More Features -> Configure store settings (Open) -> App Purchase: No and Apps for Office from the Store: No<br><br><b>Unset:</b> SharePoint Admin -> More features -> Apps (Open) -> More Features -> Configure store settings (Open) -> App Purchase: Yes and Apps for Office from the Store: Yes</td>
      <td>SharePoint Admin</td>
    </tr>
  </tbody>
</table>

### On By Default

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Scope</th>
      <th>BSM Scope</th>
      <th>Manual Configuration</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Block legacy browser authentication connections to SharePoint and OneDrive (RPS)</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Legacy browser authentication was deprecated for enterprise tenants as of October 2025, the value can no longer be set to true, and the RPS protocol no longer functions.</td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

### Restrict end-user consent to Microsoft 365 certified and single-tenant apps with low-risk permissions

The actual policy implemented by BSM is more strict that what can be selected in the Entra Portal. However, using the policy as described above is close to this setting. The impact of activating this in BSM may be an increase in Application Approval requests for an organization's admin, but will not have immediate impact on a user's ability to perform normal day-to-day activities.

## Deprecation of EWS

Exhange Web Services was deprecated as of October 1, 2026. The capability still works if the AppID AllowList is populated, but EWS is now disabled by default. In line with this change if the tenant is now configured with `EWSEnabled=$true` **and** *AppID AllowList* is not empty then the BSM criteria is met because only the Apps with the added IDs will be able to access EWS.

Microsoft plans to remove EWS by April 1, 2027 and organizations should shift to using the Graph API instead of EWS.

## Irreversible Decision

Keep in mind that the **SharePoint custom-script controls** can be toggled on and off temporarily in the SharePoint Admin center, but BSM permanently blocks adding new custom scripts cannot be undone. Temporary site permission changes are not a rollback mechanism for that permanent action. 

## Further reading

These public references are reproduced from the source guidance; they have not been independently verified for this draft.

- [Baseline Security Mode settings](https://learn.microsoft.com/en-us/microsoft-365/baseline-security-mode/baseline-security-mode-settings)
- [Overview of Cloud Policy](https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/overview-cloud-policy)
- [Configure application management policies](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-app-management-policies)
