---
title: WebHook supports Slack
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
---

Gitee WebHook supports message notifications through Slack Robot.

## Add a bot to get WebHook

1. Visit <https://api.slack.com/apps>, choose "Create New App" and select the corresponding Slack Workspace to create a Slack APP.
2. After creation, select a channel as the conversation channel for notification sending through `Features`->`Incoming Webhooks`->`Add New Webhook to Workspace`, and authorize the group to obtain a WebHook address.

![](https://images.gitee.ru/uploads/images/2020/0628/124622_44f9e339_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0628/125434_39135ea1_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0628/125740_e9e93408_551147.png )

Set up robot WebHook

In the previous step of adding, you can get a WebHook request URL like `https://hooks.slack.com/services/xxxxxxxx/xxxxxxxx/xxxxxxxx`, add this URL to Gitee to complete the WebHook configuration.

Click on 'Management' in the enterprise navigation menu, then click on 'WebHooks Management', and then click on the 'New WebHook' button in the upper right corner to enter the new WebHook page.

Fill in the webhook address obtained from the previous section into the URL, select the specific trigger event, activate and add to complete the setup of the webhook.

![Image Description](../assets/image.png)

## Trigger WebHooks

By setting up a bot, the following scenarios will trigger WebHook requests to Feishu.

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create tag, delete tag
- Issue: Create, close, reopen, delete tasks, or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues, pull requests, commits