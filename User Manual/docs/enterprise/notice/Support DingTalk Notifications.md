---
title: Support DingTalk Notifications
authors:
  - name: South Drifting All the Way
    url: https://gitee.ru/kangxiok
origin-url: https://gitee.ru/help/articles/4278
---

> #### Due to the optimization of DingTalk group robots, custom robots cannot be added temporarily, existing custom robots are not affected

> #### We will continue to follow up on the availability of this feature

### 1. Add robot

Select 'Custom' robot on the DingTalk robot management page, enter the robot name, and select the group to send messages to. If necessary, you can set an avatar for the robot, and then click 'Next'.

![](https://images.gitee.ru/uploads/images/2019/1009/161438_2abc0bb1_551147.png)

![Image Description](https://images.gitee.ru/uploads/images/2019/1009/161438_247e230f_551147.png)

Click the "Copy" button to get the WebHooks address corresponding to this bot, in the following format:

```bash
https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx
```

### 2. Set up WebHooks for the repository in Gitee

Go to your Gitee repository, click on "Manage", and then click on "WebHooks" on the left. Enter the WebHooks URL in the URL field, **do not select old format**, and you can set a password or leave it unset.

![Image Description](https://images.gitee.ru/uploads/images/2019/1009/161438_bce6551e_551147.png)

### 3. The following actions will trigger DingTalk WebHooks

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create tag, delete tag
- Issue: Create, close, reopen, delete tasks, or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues, pull requests, commits

![Image Description](https://images.gitee.ru/uploads/images/2019/1009/161438_04ff173d_551147.png)