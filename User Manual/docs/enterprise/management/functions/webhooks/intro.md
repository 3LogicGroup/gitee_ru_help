---
Title: Introduction to WebHooks
---

Gitee WebHook feature helps to automatically callback a specified HTTP address after a user pushes code.

> This is a general solution. Users can write their own script programs based on different needs (such as sending emails, automatic deployment, etc.).

Comparison of Enterprise WebHook and Repository WebHook:

- Enterprise WebHooks are effective for all repositories within the enterprise for push, PR, and issue (task) events.
- WebHooks for repositories only work for push, PR, and Issue (task) events bound to the repository.

You can manage Webhooks for enterprises, projects, and repositories on the "WebHooks Management" page.

![Image Description](assets/image351.png)

## Data Structures and Types

For the data structure and type of WebHook, please refer to the following document:

- [WebHook Push Data Format Guide](./push-data-format.md)
- [WebHook Secret Verification and Verification Algorithm](./verify.md)
- [WebHook Push Data Type Explanation](./push-data-type.md)

## Third-party IM support

We have enabled WebHook to support the following third-party applications for users to receive Gitee's push notifications on third-party IM platforms.

DingTalk Robot:

Set WebHook URL to the Dingtalk group chat robot address.

Related document: WebHook adds support for DingTalk

**Enterprise WeChat Bot:**

Set WebHook URL to the Enterprise WeChat robot address.

Related documentation: WebHook adds support for WeChat Work

Feishu Robot:

Set the WebHook URL to the Feishu group chat robot address.

Related document: WebHook adds support for Feishu

Slack Bot:

Set the WebHook URL to the Slack bot address.