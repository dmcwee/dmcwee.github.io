---
title: MDE Offline Update Container
categories:
- MDE
- Security
tags:
- MDE
- Microsoft Defender for Endpoint
image: /assets/images/2025/02/defender_container.jpg
banner: /assets/images/2025/02/defender_container.jpg
excerpt: MDE Offline update provides the ability for organizations to locally source MDE Security Intelligence Updates rather than using the provided Microsoft SIU service. Considering the repeat scripting and static file web server requirements it seemed that this could conventiently be addressed by containerization.
---

While my intenet is not to recommend that everyone should use the offline security update feature provided by Microsoft I have worked with several customers who required this. After talking with one customer who worked on a containerized implementation of this solution I realized the elegance of this approach.

## Why Containerize the Offline Updates?

The key component neessary to support the Offline Update capability is a web server that can host static files (a json and a zip file) for machines to retrieve. In general, the the storage requirements for hosting these are minimal especially if there is not a requirement to maintain historic updates. Further there are a few steps that are required to download the updates that can be easily incorporated into Docker's build process, and we can ensure that the necessary files have been staged in the proper locations on the web server for consistency.

## Offline Container Implementation

The Dockerfile is available today in my [**Labs** github repository](https://github.com/dmcwee/labs/tree/dev/MDELab/Offline) for anyone to use.

The implementation assumes a regular container build process which allows alignment with your organization's update schedule. During the build process the container will perform all the necessary steps outlined in the [Configure offline security intelligence update for Microsoft Defender for Endpoint on Linux](https://learn.microsoft.com/en-us/defender-endpoint/linux-support-offline-security-intelligence-update) document. The container will then take the resulting SIU file structure and copy it to a new clean NGinx container to be hosted.

The container **does not** include any automation internally to retrieve new SIUs or to archive old ones. Therefore, if the container is not rebuilt on a regular basis no new SIUs will ever be exposed to your organization.

Once the container is built and running there is a customized web page at the default site. This web page provides links to the Linux and Mac manifest and update zip files so you can verify they exist and are the desired version. The web page also generates a sample `mdatp_managed.json` file's content so you can apply this to your Linux machines.

## Building and Running the Container

Building and running the container uses standard docker commands.

```bash
$> docker build -t [YOUR BUILD TAG HERE] .
...
$> docker run -p [YOUR DESIRED PORT]:80 d [YOUR BUILD TAG HERE]
```

