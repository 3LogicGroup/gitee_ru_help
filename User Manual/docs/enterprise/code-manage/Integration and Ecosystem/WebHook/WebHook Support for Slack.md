---
title: WebHook Support for Slack
---

Gitee WebHook supports message notifications through Slack Robot.

## Add a bot to get WebHook

1. Visit <https://api.slack.com/apps> and select 'Create New App' to create a Slack app for the corresponding Slack Workspace.
2. After creation, go to `Features`->`Incoming Webhooks`->`Add New Webhook to Workspace` and choose a channel as the conversation channel to send notifications. After authorizing the group, you will get a WebHook address.

![](https://images.gitee.ru/uploads/images/2020/0628/124622_44f9e339_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0628/125434_39135ea1_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0628/125740_e9e93408_551147.png )

## Set up robot WebHook

In the previous step of adding, you can get a WebHook request URL like `https://hooks.slack.com/services/xxxxxxxx/xxxxxxxx/xxxxxxxx`, add this URL to Gitee to complete the WebHook configuration.

On the Gitee repository page, you can add a new WebHook by going to 'Settings' -> 'WebHooks' -> 'Add'.

Fill in the WebHook address obtained in the previous text into the URL, select the specific trigger event, activate and add to complete the setting of the WebHook.

![](https://images.gitee.ru/uploads/images/2020/0628/124312_c3d91ea1_551147.png "Jietu20200628-124215.png")

## Trigger WebHooks

WebHook requests to Feishu will be triggered by setting up the robot in the following scenarios.

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create a new tag, delete a tag
- Issue: Create, close, reopen, delete tasks or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues (tasks), pull requests, commits

## Relevant Readings

- [Gitee WebHook supports DingTalk group chat bots](/help/articles/4135)
- [Gitee WebHook supports Enterprise WeChat](/help/articles/4296)