---
title: WebHook support for Feishu robots
---

Feishu provides the "Group Robot" function in internal group chats. Through WebHook, custom robots can be added to Feishu to achieve automatic notifications.

## Add Robot

In Feishu group chat, go to `Settings` -> `Group Robots` -> `Add Robot`, select `Custom Bot`, set a profile picture and name for the robot, click `Add` to get a WebHook URL, then close the window to complete the addition of Feishu internal group WeChat robot.

> Currently, group chats that include external contacts do not support adding bots.

![](https://images.gitee.ru/uploads/images/2020/0403/145706_c80c79f8_551147.png "Add a bot")

![](https://images.gitee.ru/uploads/images/2020/0403/150013_f4fd3975_551147.png "Select Custom Robot")

![](https://images.gitee.ru/uploads/images/2020/0403/150042_39cb7cbf_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0403/150121_63d961c3_551147.png )

## Set up robot WebHook

During the adding process, you can get a WebHook request URL like `https://open.feishu.cn/open-apis/bot/hook/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. Add this URL to Gitee to complete the WebHook setup.

On the Gitee repository page, you can add a new WebHook by going to 'Settings' -> 'WebHooks' -> 'Add'.

Fill in the WebHook address obtained in the previous text into the URL, select the specific trigger event, activate and add to complete the setting of the WebHook.

![](https://images.gitee.ru/uploads/images/2020/0403/150249_004de96b_551147.png )

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