---
title: Support for WebHook in Enterprise WeChat
---

Enterprise WeChat provides the 'Group Robots' feature in internal group chats. WebHooks can be used to add custom robots in Enterprise WeChat to achieve automatic notifications.

## Add Robot

In the WeChat group chat, you can add a group robot by right-clicking on the chat window in the internal group and selecting 'Add Group Robot'->'Create a new robot'. Set a profile picture and name for the robot, and click 'Add' to obtain a WebHook address. You can close the window after adding the WeChat robot in the internal WeChat group.

> Currently, group chats that include external contacts do not support adding bots.

![](https://images.gitee.ru/uploads/images/2020/0327/092629_5890bc35_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0327/092810_d7943138_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0327/092827_ce2ff74a_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0327/093031_727106a2_551147.png )

## Set up robot WebHook

In the previous process of adding, you can obtain a WebHook request address like https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx, add this address to Gitee, and complete the setting of the WebHook.

On the Gitee repository page, you can add a new WebHook by going to 'Settings' -> 'WebHooks' -> 'Add'.

Fill in the WebHook address obtained in the previous text into the URL, select the specific trigger event, activate and add to complete the setting of the WebHook.

![](https://images.gitee.ru/uploads/images/2020/0327/093313_1f59cac5_551147.png )

## IP whitelist

By setting the request IP address (range), you can restrict the IP whitelist for triggering the robot. Since the IP range of Gitee service requests is not fixed, it is not recommended to set the IP address (range) whitelist to avoid the robot from being triggered incorrectly.

![](https://images.gitee.ru/uploads/images/2020/0327/093557_a03e2928_551147.png )

## Trigger WebHooks

WebHook requests to WeChat Work are triggered by setting up a robot for the following scenarios.

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create a new tag, delete a tag
- Issue: Create, close, reopen, delete tasks or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues (tasks), pull requests, commits

## Relevant Readings

- [Gitee WebHook supports DingTalk group chat bots](/help/articles/4135)
- [Gitee WebHook supports Feishu group chat robots](/help/articles/4297)