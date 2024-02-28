---
Title: Using Git for version control in the WeChat mini program web development tool.

origin-url: https://gitee.ru/help/articles/4202
---

## Introduction

In the process of developing WeChat mini programs, code version management often requires the use of third-party tools. Although the 'WeChat Web Development Tool' provides prompts for the Git file version status, the actual user experience is still unsatisfactory.

With the update of 'WeChat Web Development Tool', the latest beta version now supports direct management of 'Git'. This article will provide a detailed introduction on using 'Git' for version control in 'WeChat Web Development Tool'.

## Environment Preparation

- Development environment: Mac/Windows/Linux are all supported.
- Development tools: WeChat Web Developer Tools Beta version, Git
- Git hosting service: [Gitee]

To use the Git service, you need to install Git on your system. For the installation of the related Git environment, please refer to [Getting Started with Git] and [Git Installation].

Since the support for Git management in the current

## Create a mini program repository

To use Git for version control, you first need a Git repository. Open the WeChat Web Developer Tools and create/open the repository for your mini program. In this example, let's assume the repository name is 'HelloGitee'. Fill in the corresponding path and 'appid', select 'Create a regular quickstart template', confirm, and create the repository.

![](https://images.gitee.ru/uploads/images/2018/0819/215526_c564ebdb_551147.png )

After the creation is completed, the initialized repository is obtained.

Initialize the repository

## Create Remote Repository

Login to your Gitee account on [https://gitee.ru] and select **'New Repository'** from the new button in the upper right corner. Fill in the corresponding project repository information.

Here we choose to use a public repository, name the path as "HelloGitee", and select "JavaScript" as the development language. Click the "Create" button to initialize the remote repository after confirmation.

![Create Remote Repository](https://images.gitee.ru/uploads/images/2018/0819/215557_2afe3b88_551147.png)

After creating and initializing the remote repository, we get a blank repository as shown in the figure below. The repository URL of the project is: `https://gitee.ru/normalcoder/HelloGitee.git`
Next, we will initialize the local Git repository.

![](https://images.gitee.ru/uploads/images/2018/0819/215609_49072d52_551147.png )

## Initialize local repository

Click the 'Version Control' button on the panel in the 'WeChat Web Developer Tool', and the version control panel in the developer tool will pop up.

Since it is a new repository and has not been initialized as a Git repository, it will prompt to initialize the Git repository. Click on 'Initialize Git Repository', then click 'Confirm' to complete the initialization of the local repository.

**This step is equivalent to executing the 'git init' command.**

![](https://images.gitee.ru/uploads/images/2018/0819/215627_888218b0_551147.png )

![](https://images.gitee.ru/uploads/images/2018/0819/215634_fa883863_551147.png )

After initialization, we can see the local repository and the current Git status. The following image shows the version control panel after initializing the 'WeChat Web Developer Tool'.

![](https://images.gitee.ru/uploads/images/2018/0819/215642_94c211c4_551147.png )

## Configure repository information

After initialization, click 'Workspace' -> 'Settings' -> 'General' -> 'Edit' in order, and edit the username and email used in Git. This step is equivalent to the configuration operation in the 'git config' command.

```bash
git config --global user.name "username"
git config --global user.email "email"
```

Please note that the email name configured here needs to be consistent with the email on [Gitee https://gitee.ru] to ensure that the contribution information can be counted after submission.

![](https://images.gitee.ru/uploads/images/2018/0819/215654_9e7deafa_551147.png )

![](https://images.gitee.ru/uploads/images/2018/0819/215704_e2a45a94_551147.png )

Switch to the 'Remote' tab in the repository settings. At this time, you will find the prompt 'Remote repository information not found'. Click on 'Add' and fill in the previously created remote repository address. Name the repository as '**master**' or choose your own name.

![](https://images.gitee.ru/uploads/images/2018/0819/215713_21fb385d_551147.png )

![](https://images.gitee.ru/uploads/images/2018/0819/215720_370e78a2_551147.png )

After adding, you can see the remote branch information in the repository.

![](https://images.gitee.ru/uploads/images/2018/0819/215731_0ae06a3c_551147.png )

## Push Code to Remote Repository

Click on the 'Push' button on the operation panel, select 'Push to a new remote repository branch' in the pop-up window, fill in the name as '**master**', indicating that it will be pushed to the 'master' branch of the remote repository, and then click 'OK'.

![](https://images.gitee.ru/uploads/images/2018/0819/215746_448ce1f9_551147.png )

After pushing, we can see the branch information under the 'remote repository'. Accessing the repository on 'Gitee', we can also see the pushed information. At this point, we have completed the process of pushing the code from the local repository to the remote repository.

![](https://images.gitee.ru/uploads/images/2018/0819/215754_abe86fe9_551147.png )

![](https://images.gitee.ru/uploads/images/2018/0819/215801_e9136721_551147.png )

## Precautions and identity authorization settings

If you encounter a failed push notification while pushing, you need to check user authorization. It may indicate that the 'WeChat Web Developer Tool' has not read the local user's SSH authorization configuration. You need to set the user's authorization information in the development tool.

![](https://images.gitee.ru/uploads/images/2018/0819/215808_0bf8ca78_551147.png )

After initialization, click "Workspace" -> "Settings" -> "Network & Authentication" -> "Authentication Method" in sequence. You can choose the authentication method for the remote repository. The default is "Automatic".

Select "Enter Username and Password", enter your Gitee account and password below, and then perform the push operation again.

![](https://images.gitee.ru/uploads/images/2018/0819/215818_df7a9b9a_551147.png )

## Modify and commit code

Next, let's modify our code.

Click on the "Version Control" button in the development tool panel, close the "Version Control" panel, open "pages/index/index.wxml", and modify the content "Get Avatar Nickname" to "My First Modification Commit", then save.

![](https://images.gitee.ru/uploads/images/2018/0819/215829_65697052_551147.png )

Switch to the 'Version Control' panel again, you can see that there is a file waiting to be committed in the current local branch. Select and check the file to view the changes made to the current file.

![](https://images.gitee.ru/uploads/images/2018/0819/215840_757b3b0d_551147.png )

Fill in the commit message in the commit box below, click "Commit", and **submit the code to the main branch of the local repository**. After the submission, you can view the commit record on the local repository branch.

![](https://images.gitee.ru/uploads/images/2018/0819/215847_6b95df4b_551147.png )

Next, we will push the code from the local branch to the remote repository again. Click the "Push" button on the operation panel, select "Push to the following remote repository branch" in the popup window, select the existing remote `master` repository's `master` branch, and then click "OK".

![](https://images.gitee.ru/uploads/images/2018/0819/215853_456a28a3_551147.png )

After the push is completed, you can see the submitted code changes on the homepage of the corresponding repository in [Gitee].

![](https://images.gitee.ru/uploads/images/2018/0819/215901_7356122d_551147.png )

## Summary

In the above operations, we used the version management function of `WeChat Web Developer Tools` to control and manage the version of the mini program's code, and committed it to the remote Git repository.

In actual project development, we can fully utilize the features of Git in version control and collaboration, collaborate flexibly with others, and then standardize code management and collaborate more efficiently.

[Gitee]:https://gitee.ru
[Git Getting Started]:https://gitee.ru/help/categories/20
[Git Installation]: https://gitee.ru/help/articles/4106
[WeChat Web Developer Tools]:https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html
[WeChat Web Developer Tools Beta Version Download]: https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html