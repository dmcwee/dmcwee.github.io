---
title: MDE Exclusion Checker (BETA) Help
layout: page
---

This page provides helpful information abou the MDE Exclusion checker currently under development.

## Getting Started
MDE Exclusion Checker is currently in development, so it is not yet available in the Office App Store.  To load the application follow these steps:

1. Download the MDE Exclusion Checker Manifest XML file from [here]({{ "/mdeexclusionchecker/dist/manifest.prod.xml" | relative_url}}).
1. Launch Microsoft Excel, either browser or thick client will work.
1. On the **Insert** tab click the **Office Add-ins** *(web)* or **Get Add-ins** *(if using thick client)* button.
![Office Ribbon Add-In]({{ "/assets/images/mdeexclusionchecker/office_ribbon.png" | relative_url }})
1. In the **Office Add-ins** Popup in the upper right corner click **Upload My Add-in**
![Upload Add-In]({{"/assets/images/mdeexclusionchecker/upload_addon.png" | relative_url}})
1. In the **Upload Add-in** click the **Browse...** button.
1. Find the MDE Exclusion Checker Manifest file downloaded in Step 1 and click **Ok**
![File Dialog]({{ "/assets/images/mdeexclusionchecker/file_dialog.png" | relative_url }})
1. Click the **Upload** button.
1. When the Add-In loads properly you will see a new button appear on your home ribbon with a message.
![Office Add-In Uploaded Successfully]({{ "/assets/images/mdeexclusionchecker/addin_loaded_success.png" | relative_url}})
1. Select two consecutive columns, the first with the list of exclusions, and the second with empty.  Once run the MDE Exclusion tool will populate the second column with the match determination.
![Excel Selected Range]({{"/assets/images/mdeexclusionchecker/selected_columns.png" | relative_url}})
1. Click the Show MDE AV Chceker from the ribbon and in the task panel (you will likely need to scroll down) click *Check Exclusions*.
![Exclusion Checker Task Panel]({{ "/assets/images/mdeexclusionchecker/taskpanel.png" | relative_url }})
1. The Excel sheet will update the second column with *No Match* or the match rule that the exclusion applied to.
![Results]({{"/assets/images/mdeexclusionchecker/results.png" | relative_url }})