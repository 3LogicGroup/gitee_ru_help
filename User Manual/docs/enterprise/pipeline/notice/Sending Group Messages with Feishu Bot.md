---
title: Send group message via Feishu robot
description: Send group message using Feishu robot
slug: /enterprise/pipeline/notice/feishu
keywords:
 - Gitee
 - Feishu
 - Robot
 - Notification
---

Users can configure Feishu group notifications in pipeline tasks to push pipeline task execution information to specified Feishu groups.

Add Feishu group robot

Add a custom robot by going to Group Settings -> Group Robots -> Add Robot -> Select Custom Robot.

![Feishu Robot](./assets/Feishu Robot.png)

Refer to the following document: [https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=zh-CN](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN?lang=zh-CN)

Copy the webhook address and configure it in the pipeline [Feishu notification credentials](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-通讯).

:::info **Note that Feishu group robots can choose whether to enable security settings:**
If "signature" is enabled, please record and save the signature key, and configure it in the notification credentials of the Feishu pipeline.
:::

Configure Lark group notification for pipeline tasks

1. In the pipeline task node, select Add Feishu Group Notification.

![Add Feishu configuration](./assets/AddFeishuConfiguration.png)

2. Add Feishu credentials, please refer to Credential Management [Feishu Webhook](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-communication)

![Add Feishu credentials](./assets/AddFeishuCredentials.png)

3. Select notification events, when the task of this pipeline enters the selection state, it will trigger message notifications.

4. Select the notification content, the selected notification content will be automatically added to the push message.

5. Supports filling in custom content, supports referencing environment variables like ${GITEE_PIPELINE_NAME}, supports Feishu [Markdown](https://open.feishu.cn/document/ukTMukTMukTM/uADOwUjLwgDM14CM4ATN) syntax

## Trigger Pipeline Run

Trigger pipeline execution. When the pipeline task enters the running state configured in the notification plugin, trigger message notification.

![Feishu Notification Message Example](./assets/feishu-notification-message-example.png)