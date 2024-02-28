---
title: WebHook support for WeChat Work
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4296
---

Enterprise WeChat provides the 'Group Robot' feature in internal group chats. By using WebHooks, you can add custom robots to implement automatic notifications in Enterprise WeChat.

## Add Robot

In the enterprise WeChat group chat, select 'Add Group Robot'->'Create a new robot' from the right-click menu of the internal group in the chat window. Set an avatar and name for the robot, and click 'Add' to get a WebHook address. Close the window to complete the addition of the WeChat robot in the enterprise WeChat internal group.

> Currently, group chats containing external contacts do not support adding robots.

![](https://images.gitee.ru/uploads/images/2020/0327/092629_5890bc35_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0327/092810_d7943138_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0327/092827_ce2ff74a_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0327/093031_727106a2_551147.png )

Set up robot WebHook

During the above-mentioned adding process, you can obtain a WebHook request URL in the form of 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'. Add this URL to Gitee to complete the WebHook setup.

On the Gitee repository page, go to "Manage" -> "WebHooks Settings" -> "Add" to add a new WebHook.

Fill in the webhook address obtained from the previous section into the URL, select the specific trigger event, activate and add to complete the setup of the webhook.

![](webhook-for-wecom-robot.assets/image.png)

## IP Whitelist

By setting the request IP address (range), you can limit the IP whitelist of the triggering robot. Since the IP range of Gitee service requests is not fixed, it is not recommended to set the IP address (range) whitelist to avoid the robot from being triggered incorrectly.

![](https://images.gitee.ru/uploads/images/2020/0327/093557_a03e2928_551147.png )

## Trigger WebHooks

WebHook requests to WeChat Work are triggered by setting up a robot in the following scenarios.

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create tag, delete tag
- Issue: Create, close, reopen, delete tasks, or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues, pull requests, commits

## Related Readings

- [Gitee WebHook supports DingTalk group chat robot](/help/articles/4135)
- [Gitee WebHook supports Feishu group chat bot](/help/articles/4297)