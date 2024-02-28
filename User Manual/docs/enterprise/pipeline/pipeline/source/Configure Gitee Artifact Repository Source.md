---
Configure Gitee Package Repository Source
description: Configure Gitee artifact repository source
slug: /enterprise/pipeline/source/artifact-repo
keywords:
 - Gitee
 - Artifact Repository Source
---

During the code build process, artifacts are usually stored in the artifact repository under the code repository through two plugins: Upload and Publish. So how do we deploy these artifacts in the future? The steps are as follows:

1. Select the Gitee artifact repository source, configure the code repository, artifact repository, artifact version, and trigger events you need.

![Configure Gitee artifact source](./assets/Configure Gitee artifact source.png)

2. Select the host deployment plugin, configure the self-owned host, choose the source of the file as the workspace, and pull the artifact to the host for deployment.

![Configure artifact source host deployment](./assets/Configure artifact source host deployment.png)