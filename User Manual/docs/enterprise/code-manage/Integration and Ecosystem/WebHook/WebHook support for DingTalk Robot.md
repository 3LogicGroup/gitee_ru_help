---
title: WebHook support for DingTalk robots
---

DingTalk provides the 'Intelligent Group Assistant' function in group chat. By using WebHook, you can add custom robots to DingTalk for automatic notifications.

## Add Robot

In the Dingtalk group chat, go to 'Group Settings' -> 'Intelligent Group Assistant' -> 'Add Robot' and select 'Custom' robot. Set a profile picture and name for the robot, click 'Add' to get a WebHook address, and click 'Finish' to complete the addition of the Dingtalk robot.

![](https://images.gitee.ru/uploads/images/2019/1219/194453_7c7ae14c_551147.png )

![](https://images.gitee.ru/uploads/images/2019/1219/194509_8cdbd130_551147.png )

![](https://images.gitee.ru/uploads/images/2019/1219/195953_08539aca_551147.png )

## Set up robot WebHook

In the previous adding process, you can obtain a WebHook request URL like `https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx`. Add this URL to Gitee to complete the WebHook configuration.

On the Gitee repository page, you can add a new WebHook by going to 'Settings' -> 'WebHooks' -> 'Add'.

Fill in the URL with the WebHook address obtained from the previous text, `WebHook password/signing key`. Choose to use "signing key" and fill in the corresponding "signing key" content provided by "signing", select specific trigger events, activate and add to complete the WebHook setting.

![](https://images.gitee.ru/uploads/images/2019/1219/200445_db950b4e_551147.png )

## Security Settings

DingTalk robot on WebHook supports 'custom keywords', 'signature', 'IP address (range)' to enhance the security of robot request reception and prevent malicious requests.

Custom Keywords

After setting custom keywords, only WebHook requests that contain the specified custom keywords will trigger the robot, up to a maximum of 10.

![](https://images.gitee.ru/uploads/images/2019/1219/195006_2a5c79ea_551147.png )

### Counter-sign

By setting a signature, you can support request signature for DingTalk robots, which provides higher security.

![](https://images.gitee.ru/uploads/images/2019/1219/195809_ac4c9a91_551147.png )

### IP address (range)

By setting the request IP address (range), you can limit the IP whitelist for triggering the DingTalk robot. Since the IP range of Gitee service requests is not fixed, it is not recommended to set the IP address (range) whitelist.

![](https://images.gitee.ru/uploads/images/2019/1219/195750_17d422d1_551147.png )

## Trigger DingTalk WebHooks

WebHook requests to DingTalk will be triggered by setting up the robot in the following scenarios.

- Push: Repository pushes code, pushes branches, deletes branches
- Tag push: Create a new tag, delete a tag
- Issue: Create, close, reopen, delete tasks or modify task assignees
- Pull request: Create pull request, update pull request, merge pull request
- Comment: Comment on repositories, issues (tasks), pull requests, commits

![Image Description](https://images.gitee.ru/uploads/images/2019/1009/161438_04ff173d_551147.png)

## Relevant Readings

- [Gitee WebHook supports Enterprise WeChat](/help/articles/4296)
- [Gitee WebHook supports Feishu group chat robots](/help/articles/4297)