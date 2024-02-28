---
title: Host Deployment
description: Host deployment
slug: /enterprise/pipeline/plugin/host-deploy
keywords:
 - Gitee
 - Host
 - Deploy
---

## Form Introduction

- **Execution Host Group**: You can go to [Host Management](/) to add your host group.

- **Download upstream output files or artifacts to the host before deployment (supports multiple configurations)**:
- Deployment filename: The name of the artifact downloaded to the host
    - **Download Path**: The path where the artifact is downloaded to the host machine
    - **File Source**: Deployment files can come from upstream build outputs or the general artifact repository.

- **Deployment Script**: A script used for host deployment, supports retrieving environment variables using ${parameterKey}.

## Usage Example

1. Fork a SpringBoot code repository from the example code repository: [https://gitee.ru/gitee-go/spring-boot](https://gitee.ru/gitee-go/spring-boot), which includes a deployment script deploy.sh: [https://gitee.ru/gitee-go/spring-boot/blob/master/deploy.sh](https://gitee.ru/gitee-go/spring-boot/blob/master/deploy.sh).

2. Install Java runtime environment on the deployment machine

3. Build artifacts in the pipeline

To perform deployment, it is necessary to first build artifacts. The artifacts in Gitee Pipeline are tar.gz compressed packages. In the build task, you can specify one or more files (folders) to be included in the artifact.

In this example, you need to package the target/application.jar and deploy.sh files into the artifact. Therefore, you need to configure the build task as follows:

![Host Deployment - Artifact Configuration](./assets/Host Deployment - Artifact Configuration.png)

4, Host deployment configuration

![Host Deployment Configuration](./assets/Host_Deployment_Configuration.png)

Deployment script:

Because the actual deployment script has been packaged into the compressed package of the build output, the deployment script can be simply unpacked and executed.

```shll
mkdir -p /home/admin/application
tar zxvf ~/gitee_go/deploy/output.tgr.gz -C /home/admin/application/
sh /home/admin/application/deploy.sh restart
```