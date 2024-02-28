---
title: Add SSH support to Gitee SVN
origin-url: https://gitee.ru/help/articles/4251
---

Recently, Gitee SVN module has added support for SSH, which means that code repositories can be accessed using svn+ssh. There are two advantages of using SSH:

- More secure
- Support passwordless code push and pull (using certificate)

![Image Description](./assets/110508_23520888_669935.webp)

### **Usage:**

Gitee repositories do not have SVN access support enabled by default. You need to enable SVN access in the project management interface, with the following configuration:

![Image Description](../../../../../assets/image30.png)

After enabling SVN access, you can access it in two ways, taking the J2Cache project as an example:

1. svn://gitee.ru/ld/J2Cache
2. svn+ssh://gitee.ru/ld/J2Cache

As shown in the figure below:
![Image Description](../../../../../assets/image31.png)

The first method is a regular SVN operation address, which does not support encryption, and requires the Gitee account and password to submit code.

The second method combines SVN and SSH. Before using it, you need to configure the certificate. Please refer to the help documentation for configuration methods. This way, you can achieve secure and password-free code push and pull.

(Please note that using svn+ssh, whether pushing or pulling code, requires the developer to be a repository developer member)

<hr />

Finally, due to Gitee's SVN support, its underlying storage is still Git, so Gitee's SVN cannot completely replace SVN. It implements the overlapping functionality of Git and SVN. The intention of providing SVN support is not to replace existing SVN services, but to provide a smooth transition solution for SVN developers migrating to Git.

![Image Description](./assets/110651_1905c195_669935.webp)

Therefore, it is recommended to use Git!