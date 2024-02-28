---
title: Push and Pull Code via HTTPS and SSH Protocols

origin-url: https://gitee.ru/help/articles/4238
---


## Introduction to Git Transfer Protocol

Git can use the following four protocols for data transmission:

- Local Protocol (Local)
Using HTTP/HTTPS Protocol
- SSH (Secure Shell) protocol
- Git Protocol

Among them, the local protocol is not commonly used because most of the time, remote development and code sharing are conducted. The 'git protocol' is also not commonly used because it lacks authorization mechanisms and is difficult to set up.

## Currently supported protocols by Gitee

Currently, Gitee supports pushing/pulling code using the 'HTTPS protocol' and 'ssh protocol'. The difference between the two protocols is only in the different addresses when using the same repository with different protocols, and the corresponding authorization implementation.

Using the repository **<https://gitee.ru/normalcoder/Gitee-Blog-Applets>** as an example, the remote repository addresses (remote) for the two protocols are as follows:

> **HTTPS Protocol**: [https://gitee.ru/normalcoder/Gitee-Blog-Applets.git](https://gitee.ru/normalcoder/Gitee-Blog-Applets.git)
>
The SSH protocol: [git@gitee.ru:normalcoder/Gitee-Blog-Applets.git](git@gitee.ru:normalcoder/Gitee-Blog-Applets.git)

> About managing remote repositories in git, you can refer to the article **["Basic Operations of Git Repositories / Remote Repository Management"](/help/articles/4114#article-header1)**.

## Difference between HTTPS and SSH protocols in usage

Using the `https protocol` to clone is more convenient for beginners. Just copy the https URL and use the clone command directly in Git Bash to clone it locally. However, **you need to enter your username and password every time you fetch and push code**, which is the inconvenience of the `https protocol`.

To clone using the SSH protocol, you need to configure and add SSH keys before cloning. Therefore, if a user wants to clone using the SSH URL, they must be the owner of this repository.

Also, when using the SSH protocol, it is not necessary to enter the account and password each time for fetching and pushing code.

> For more information on generating, configuring, and using SSH Keys, please refer to **["Public Key Management"](/help/categories/38)** and **["Account Management / SSH Public Key Setting"](/help/articles/4191)**

In terms of commands, there is not much difference between the two protocols. Commands such as `git clone`, `git pull`, `git push` are the same.

For basic git command usage, you can refer to the articles "Gitee Help Center / Common Git Questions" and "Git Knowledge Base".