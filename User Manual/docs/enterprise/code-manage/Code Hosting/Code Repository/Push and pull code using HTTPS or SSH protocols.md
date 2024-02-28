---
title: Push and pull code via https/ssh protocol
origin-url: https://gitee.ru/help/articles/4238
---


### **Introduction to Git Transfer Protocols**

Git can use the following four protocols for data transmission:

- Local protocol (Local)
- HTTP/HTTPS protocol
- SSH (Secure Shell) protocol
- git protocol

Among them, the local protocol is not commonly used because most of the development and code sharing is done remotely. The git protocol is also not commonly used because it lacks authorization mechanisms and is difficult to set up.

### **Supported Protocols in Gitee Currently**

Currently, Gitee supports pushing/pulling code using both the `HTTPS` protocol and the `ssh` protocol. The only difference between the two protocols is the different addresses when using different protocols for the same repository, as well as the different authorization implementations.

In the case of repository https://gitee.ru/normalcoder/Gitee-Blog-Applets, the remote repository addresses for the two protocols are as follows:

> HTTPS protocol: [https://gitee.ru/normalcoder/Gitee-Blog-Applets.git](https://gitee.ru/normalcoder/Gitee-Blog-Applets.git)

ssh protocol: git@gitee.ru:normalcoder/Gitee-Blog-Applets.git

> For managing remote git repositories, you can refer to the article ["Basic Operations / Remote Repository Management of Git Repositories"](https://gitee.ru/help/articles/4114#article-header1).

### **Difference between HTTPS and SSH protocols in usage**

Using the `https protocol` to clone is more convenient for beginners. Copy the https url and then use the clone command directly in git Bash to clone it locally. However, you need to enter your username and password every time you fetch and push the code, which is the inconvenience of the `https protocol`.

Using `SSH protocol` for cloning requires configuring and adding SSH keys before cloning. Therefore, if users want to use

In addition, using the `SSH protocol` by default does not require entering the username and password for each fetch and push operation.

> You can refer to ["Public Key Management"](https://gitee.ru/help/categories/38) and ["Account Management / SSH Public Key Settings"](https://gitee.ru/help/articles/4191) for related information on SSH Key generation, configuration, and usage.

In terms of command usage, there is not much difference between the two protocols. Commands such as git clone, git pull, git push are the same.

For the usage of basic git commands, you can refer to the articles 'Gitee Help Center / Common Questions about Git Operations' (https://gitee.ru/help/articles/4205) and 'Git Knowledge Base' (https://gitee.ru/help/categories/43).