---
title: Send group message with DingTalk robot
description: Send group messages using DingTalk bots
slug: /enterprise/pipeline/notice/dingtalk
keywords:
 - Gitee
 - DingTalk
 - Robot
 - Notification
---

Users can configure DingTalk group notifications in the pipeline task to push the running information of the pipeline task to the specified DingTalk group.

## Add DingTalk Group Robot

To add a group robot, go to Group Settings -> Intelligent Group Assistant -> Add Group Robot -> Select Custom Webhook Robot.

![DingTalk Robot 1](./assets/DingTalk Robot 1.png)

![DingTalk Robot 2](./assets/DingTalk Robot 2.png)

You can refer to the following documents: [https://open.dingtalk.com/document/robots/custom-robot-access](https://open.dingtalk.com/document/robots/custom-robot-access)

Copy the webhook address and configure it in the pipeline [DingTalk notification certificate](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-communication).

:::info**Note, DingTalk group robot must enable security settings:**
If "Signature" is enabled, please record and save the signature secret key, and configure it in the DingTalk notification credential of the pipeline.
:::

## Pipeline Task Configuration DingTalk Group Notification

1. In the pipeline task node, select to add an Enterprise WeChat group notification.

![Add DingTalk Configuration](./assets/Add_DingTalk_Configuration.png)

2. Add the DingTalk credentials, please refer to the credential management [DingTalk Webhook](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-communication)

3. Select notification events, when the task of this pipeline enters the selection state, it will trigger message notifications.

4. Select the notification content, the selected notification content will be automatically added to the push message.

5. Supports filling in custom content, supports referencing environment variables, such as ${GITEE_PIPELINE_NAME}, supports DingTalk [Markdown](https://open.dingtalk.com/document/robots/custom-robot-access) syntax.

6. Please enter the mobile phone number (DingTalk mobile phone number) of the member that needs to be mentioned, or enter all.

## Trigger Pipeline Run

Trigger pipeline execution. When the pipeline task enters the running state configured in the notification plugin, trigger message notification.

![DingTalk group notification message example](./assets/DingTalk group notification message example.png)