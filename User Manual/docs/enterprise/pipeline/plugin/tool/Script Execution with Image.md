---
title: Image-based Script Execution
description: Script execution based on the image
slug: /enterprise/pipeline/plugin/image-script-run
keywords:
 - Gitee
 - Docker
- Script Execution
---

- **Repository Credentials**: Select the type of Docker Registry credentials to obtain permissions for pulling images.

- **Image Address**: The image address is the Docker image name for the custom runtime environment. The current task will use the custom image as the command's runtime environment, such as docker.io/bash:latest.

- **Build Command**: The build command is the user-defined command run in the container, for example: 'mvn clean package'. Supports ${parameterKey} to access environment variables.

```shell
# Please enter the script you want to execute here
echo 'Hello Gitee!'
```