---
title: Introduction to WebHook

origin-url: https://gitee.ru/help/articles/4183
---

## WebHook Introduction

Gitee WebHook feature helps to automatically callback a specified HTTP address after a user pushes code.

> This is a general solution, and users can write their own script programs based on different needs (such as sending emails, automatic deployment, etc.).

#### Comparison of Enterprise WebHook and Repository WebHook

- Enterprise WebHooks are effective for all repositories within the enterprise for push, PR, and issue (task) events.
- WebHooks for repositories only work for push, PR, and Issue (task) events bound to the repository.

## Data Structures and Types

About the data structure and type description of WebHook, please refer to the following document

- [WebHook Push Data Format Description](/enterprise/code-manage/integration-ecosystem/webhook/webhook-push-data-format-description)
- [WebHook Key Verification and Verification Algorithm](/enterprise/code-manage/integration-and-ecology/WebHook/WebHook Key Verification and Verification Algorithm)
- [WebHook Push Data Type Description](/enterprise/code-manage/integration-and-ecology/WebHook/WebHook%20Push%20Data%20Type%20Description)

## Third-party IM support

In order to facilitate users to receive Gitee's push in third-party IM, we have supported the following third-party applications through WebHook

- DingTalk Robot: Set the WebHook URL to the DingTalk group chat robot address.
- Related documentation: [WebHook Support for DingTalk](/enterprise/code-manage/integration-and-ecosystem/webhook/webhook-dingtalk-support)
- Enterprise WeChat bot: Set the WebHook URL to the Enterprise WeChat bot address.
  - Related documentation: [WebHook adds support for WeChat Work](/enterprise/code-manage/integration-and-ecosystem/webhook/webhook-support-for-wechat-work)
- Feishu Robot: Set the WebHook URL to the Feishu group chat robot address.
  - Related documentation: [WebHook adds support for Feishu](/enterprise/code-manage/integration-ecosystem/WebHook/WebHook%20support-for-feishu-robot)
- Slack Bot: Set the WebHook URL to the Slack bot address.
- Related document: [WebHook adds support for Slack](/enterprise/code-manage/integration-and-ecology/webhook/webhook-for-slack)