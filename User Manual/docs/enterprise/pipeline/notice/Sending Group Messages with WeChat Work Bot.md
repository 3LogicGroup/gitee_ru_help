---
title: Send group messages using Enterprise WeChat bots
description: Send group message using WeChat Work bot
slug: /enterprise/pipeline/notice/weixin
keywords:
 - Gitee
 - Enterprise WeChat
 - Robot
 - Notification
---

Users can configure enterprise WeChat group notifications in pipeline tasks to push pipeline task running information to specified enterprise WeChat groups.

## Add Enterprise WeChat Group Robot

Add a group robot by going to Group Settings -> Add Group Robot -> Create Robot.

![Enterprise WeChat Robot](./assets/enterprise-wechat-robot.png)

You can refer to the following document: [https://open.work.weixin.qq.com/help2/pc/14931?person_id=1&from=homesearch# Sending Messages with Group Robots](https://open.work.weixin.qq.com/help2/pc/14931?person_id=1&from=homesearch# Sending Messages with Group Robots)

Copy the webhook URL and configure it in the pipeline [Enterprise WeChat Notification Certificate](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-通讯).

## Pipeline Task Configuration DingTalk Group Notification

1. In the pipeline task node, select to add DingTalk group notification.

2. Add WeChat Work credentials, please refer to the credential management [WeChat Webhook](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-communication)

![Add WeChat Work Credentials](./assets/add-wechat-work-credentials.png)

3. Select notification events, when the task of this pipeline enters the selection state, it will trigger message notifications.

4. Select the notification content, the selected notification content will be automatically added to the push message.

5. Support filling in custom content, support referencing environment variables, such as ${GITEE_PIPELINE_NAME}, support enterprise WeChat [Markdown](https://developer.work.weixin.qq.com/document/path/91770#markdown type) syntax

6. Please enter the user_id (Enterprise WeChat user_id) of the member to be @, or enter all

Obtain user_id through Enterprise WeChat Admin -> Address Book

![Enterprise WeChat User ID](./assets/Enterprise-WeChat-User-ID.png)

## Trigger Pipeline Run

Trigger pipeline execution. When the pipeline task enters the running state configured in the notification plugin, trigger message notification.

![Enterprise WeChat notification message example](./assets/Enterprise WeChat notification message example.png)