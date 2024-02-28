---
title: Credential Management
description: Credential management
slug: /enterprise/pipeline/enterprise-setup/certificate/introduce
keywords:
 - Gitee
 - Credential Management
---

## What is a Voucher

Credentials are authentication information uniformly managed and centralized by Gitee. They are referenced in Gitee services through the issuance of tokens, such as K8S certificates, account passwords, Alibaba Cloud AKSK, Docker repository account passwords, etc.

## What Can You Do

- Credentials can help you manage authentication information uniformly and reduce duplicate configuration costs.
- After configuring the credentials, they can be referenced only in the Gitee Go pipeline, such as K8S deployment and Helm deployment tasks that can reference K8S certificates
- Certificates can help protect core accounts from leakage and reduce security risks
After configuring credentials, Gitee will issue a token (i.e. unique identifier) and map it to authentication information. In Gitee, the token is used to obtain authentication information, eliminating the risk of directly configuring account passwords.

Credential Features

1. Support configuring credentials for various cloud services (Alibaba Cloud/Tencent Cloud, etc.), IM communication (DingTalk/Feishu/Enterprise WeChat, etc.), other services (Kubernetes/Docker Repository/Jenkins Master/Maven Settings, etc.).

2. All credentials support setting the usage scope: project visible, repository visible. Project or repository members can use other people's credentials to create pipeline calls to external services.

3、Voucher invalidation issues caused by member resignation or other reasons can be modified by configuring the information in the voucher, without the need to modify the configuration in the pipeline repeatedly.

Go to Enterprise Settings -> Credential Management to view all credentials within the enterprise.

![Enterprise Credential Management](assets/cloud_service.png)

### Cloud Service

Currently supported cloud services include:

- Alibaba Cloud
 - Tencent Cloud
 - Huawei Cloud

![Cloud Service](./assets/cloud-service.png)

:::info**Note, the permissions that need to be granted for Alibaba Cloud AKSK:**

In the multi-cloud deployment scenario, the required permissions are as follows:

Read permission: Read ECS instances, read Cloud Assistant status, read Cloud Command execution results

Write permission: Install cloud assistant on ECS instances, restart ECS instances, execute cloud assistant commands

The write permissions do not include the permission to modify instance information

Authorization path: Permission => Permission policy => RAM role => RAM user

These 6 permissions are the minimum permission policies required for the RAM role, which is based on the minimum trust of the user. Users need to customize the created permission policies.
:::

IM Communication

Currently supported communication services include:

- Feishu
- DingTalk
- WeChat Work

![IM Communication](./assets/IM Communication.png)

Others

Currently supported other services include:

- Kubernetes
- Docker Registry
- Generic username and password
- Jenkins Master
- Maven Settings

![k8s credentials](./assets/k8s credentials.png)