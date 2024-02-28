---
title: Set IP Whitelist
authors:
  - name: Zoker
    url: https://gitee.ru/kesin
origin-url: https://gitee.ru/help/articles/4274
---

Gitee Enterprise version launched the IP whitelist function, which is mainly used for enterprises to prohibit non-designated IP access to code repositories.

> If you were able to pull the code before but now cannot, it is possible that the enterprise to which the repository belongs has enabled the IP whitelist function, and the IP address used for pulling the code is not in the whitelist. Contact the administrator to add it.

As shown in the following figure:

![Image Description](https://images.gitee.ru/uploads/images/2019/1018/142040_69712d2a_669935.png )

#### Usage

1. Enter the enterprise workspace -> Manage -> Security Settings

2. Add IP addresses allowed to access the Git repository

3. Enable security options: Only allow pushing and pulling code within the trusted range