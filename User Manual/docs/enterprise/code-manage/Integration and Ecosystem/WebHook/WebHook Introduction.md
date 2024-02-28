---
title: WebHook Introduction
origin-url: https://gitee.ru/help/articles/4183
---

## Introduction to WebHook

The Gitee WebHook feature helps to automatically callback a specified HTTP address after a user pushes code.

> This is a general solution, users can write their own script programs according to different needs (such as sending emails, automatic deployment, etc.)

#### Comparison of Enterprise WebHook and Repository WebHook

- Effective for pushing, PR, and Issue (task) in all repositories within the enterprise
Webhooks for repositories are only effective for pushes, PRs, and issues related to the bound repository.

## Data Structures and Types

For information on the data structure and types of WebHooks, refer to the following documentation

- [WebHook push data format description](/help/articles/4186)
- [WebHook secret key verification and verification algorithm](/help/articles/4290)
- [WebHook Push Data Type Description](/help/articles/4271)

## Third-party IM Support

We have added support for the following third-party applications through WebHook to facilitate users to receive Gitee notifications in third-party IM

- DingTalk bot: Set the WebHook URL to the DingTalk group chat bot address.
  - Related documentation: [WebHook adds support for DingTalk](/help/articles/4135)
- Enterprise WeChat bot: Set the WebHook URL to the Enterprise WeChat bot address.
- Related document: [Add support for WeChat Work in WebHook](/help/articles/4296)
- Feishu bot: Set the WebHook URL to the Feishu group chat bot address.
  - Related documentation: [WebHook adds support for Feishu](/help/articles/4297)
- Slack Bot: Set the WebHook URL to the Slack Bot address.