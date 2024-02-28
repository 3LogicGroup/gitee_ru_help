---
title: GiteeSVN adds SSH support

origin-url: https://gitee.ru/help/articles/4251
---

Gitee SVN module has recently added support for SSH, which means that the code repository can be accessed using the svn+ssh method. There are two benefits of using SSH:

- More secure
- Support passwordless push and pull of code (using certificates)

![Image Description](https://images.gitee.ru/uploads/images/2019/0604/110508_23520888_669935.png )

#### Usage

Gitee repositories do not have SVN access support enabled by default. You need to enable SVN access in the project's management interface. The configuration options are shown in the following figure:

![Image Description](https://images.gitee.ru/uploads/images/2019/0604/110530_c6de24ba_669935.png )

After enabling SVN access, you can access it in two ways, taking the J2Cache project as an example:

1. svn://gitee.ru/ld/J2Cache
2. svn+ssh://gitee.ru/ld/J2Cache

As shown in the figure below:

![Image Description](https://images.gitee.ru/uploads/images/2019/0604/110611_9b3bffe7_669935.png )

The first way is a regular SVN operation address, which does not support encryption. You need to provide your Gitee account and password to submit code.

The second method combines SVN and SSH, and requires configuring the certificate before using it. Please refer to the documentation for configuration instructions. This allows for secure and passwordless code push and pull.

(Please note that using svn+ssh requires the developer to be a member of the repository for both pushing and pulling code)

------------------

Finally, due to Gitee's SVN support, its underlying storage is still Git. Therefore, Gitee's SVN

![Image Description](https://images.gitee.ru/uploads/images/2019/0604/110651_1905c195_669935.png )

Therefore, it is recommended to use Git!