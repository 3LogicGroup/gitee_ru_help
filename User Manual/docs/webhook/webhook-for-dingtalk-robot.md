---
title: WebHook support for DingTalk bots
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4135
---

DingTalk provides the "Smart Group Assistant" function in group chats. Through WebHook, you can add custom robots in DingTalk to achieve automatic notifications.

## Add Robot

In a DingTalk group chat, go to 'Group Settings' -> 'Intelligent Group Assistant' -> 'Add Robot' and select 'Custom' robot. Set a profile picture and name for the robot, click 'Add' to get a WebHook address, and click 'Complete' to finish adding the DingTalk robot.

![](https://images.gitee.ru/uploads/images/2019/1219/194453_7c7ae14c_551147.png )

![](https://images.gitee.ru/uploads/images/2019/1219/194509_8cdbd130_551147.png )

![](https://images.gitee.ru/uploads/images/2019/1219/195953_08539aca_551147.png )

Set up robot WebHook

In the previous adding process, you can obtain a WebHook request URL like 'https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx'. Add this URL to Gitee to complete the WebHook configuration.

On the Gitee repository page, go to "Manage" -> "WebHooks Settings" -> "Add" to add a new WebHook.

Fill in the URL with the obtained WebHook address. Choose 'Signing Key' for 'WebHook Password/Signing Key' and fill in the corresponding signing key content provided by 'Signing Key'. Select specific trigger events, activate and add to complete the WebHook configuration.

![](webhook-for-dingtalk-robot.assets/image.png)

## Security Settings

Dingtalk robots support 'Custom Keywords', 'Signing', and 'IP Address (Range)' on WebHook, which are used to enhance the security of robot request acceptance and prevent malicious requests.

### Custom Keywords

After setting the custom keywords, only WebHook requests that contain the specified custom keywords will trigger the bot. Up to 10 can be defined.

![](https://images.gitee.ru/uploads/images/2019/1219/195006_2a5c79ea_551147.png )

### Counter-signing

By setting the signature, you can support the request signature of the DingTalk robot to obtain higher security.

![](https://images.gitee.ru/uploads/images/2019/1219/195809_ac4c9a91_551147.png )

### IP address (range)

By setting the request IP address (range), you can restrict the IP whitelist of the triggering robot. Since the IP range of Gitee service requests is not fixed, it is not recommended to set the IP address (range) whitelist to avoid the DingTalk robot from being triggered normally.

![](https://images.gitee.ru/uploads/images/2019/1219/195750_17d422d1_551147.png )

Trigger DingTalk WebHooks

WebHook requests to DingTalk are triggered through setting up a robot in the following scenarios.

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create tag, delete tag
- Issue: Create, close, reopen, delete tasks, or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues, pull requests, commits

![Image Description](https://images.gitee.ru/uploads/images/2019/1009/161438_04ff173d_551147.png)

## Related Readings

- [Gitee WebHook supports WeChat Work](/help/articles/4296)
- [Gitee WebHook supports Feishu group chat bot](/help/articles/4297)