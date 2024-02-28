---
title: How to use Azure Pipeline to build projects on Gitee

origin-url: https://gitee.ru/help/articles/4230
---

Before we start
- [Azure Pipeline Introduction](#azure-pipeline-introduction)
Prepare environment
- [Pipeline Integration Process](#pipeline-integration-process)
  - [Associate with Git repository](#associate-git-repository)
  - [Set up the build process](#set-up-the-build-process)
  - [Complete the first build](#complete-the-first-build)
- [Referencing build status information in Gitee repositories](#referencing-build-status-information-in-gitee-repositories)
Enable Continuous Integration
- [Summary](#Summary)

## Introduction

In continuous integration, a 'Pipeline' breaks down build/deployment tasks into several parts and connects them to form a pipeline job, which is automatically triggered/executed by programs on a scheduled basis to achieve task automation.

There are already many platforms that support the functionality of `Pipeline`. This article will focus on how `Gitee` can integrate with `Azure` to automatically build, test, and deploy the code, manage versions of code, artifacts, and test reports, and perform testing and deployment with different levels of granularity.

## Azure Pipeline Introduction

`Azure Pipeline` is the CI part of `Azure Devops` launched by Microsoft, formerly known as `VSTS`. Currently, `Azure Pipeline` supports building and deploying languages such as `Node.js`, `Python`, `Java`, `PHP`, `Ruby`, `C`/`C++`, `.NET`, `Android`, `iOS` on cloud platforms running `Linux`, `macOS`, and `Windows`. It is very powerful.

In addition, Azure Pipelines provides CI/CD unlimited time service and 10 parallel jobs for open source projects for free. All open source projects run for free on the same infrastructure, which means they have the same performance and service quality. This is extremely convenient and saves developers the cost they need to pay for.

More information and details can be obtained by visiting [Azure Pipeline Introduction].

## Setup Environment

Before learning how to use [Azure Pipeline] for project building in [Gitee], we need to prepare the following content:

- A [Gitee] account
- A Microsoft account
- Host a project ready for building on Gitee. In this article, we will take layui as an example.

> The general workflow of a common Pipeline is as follows:
>
> - User submits code to Git repository
> - The Pipeline service pulls the latest code from the Git repository
> - The Pipeline service executes build/deployment tasks sequentially based on the configured workflow.

## Pipeline Integration Process

Access and log in with your Microsoft account on the Azure Devops homepage. It will prompt you to create an organization when you visit for the first time.

![](https://images.gitee.ru/uploads/images/2018/1105/105541_3cbff4f6_551147.png )

![](https://images.gitee.ru/uploads/images/2018/1105/105548_ded0910a_551147.png )

After clicking on "Continue", enter the organization name and region as prompted, and click on create. You will be prompted to create a Devops project. Here, you only need to fill in the "Project Name" and "Description", select "Public" for the project type, and click on "Create Project".

![](https://images.gitee.ru/uploads/images/2018/1105/105604_b31f6928_551147.png )

After creation, we get the following console, and this article will focus on the 'Pipelines' section's features and functionality.

![](https://images.gitee.ru/uploads/images/2018/1105/105614_bab2fc03_551147.png )

Click on the menu **"Pipelines"** -> **"Builds"**, and when you create the first `Pipelines`, it will prompt that there are no `Pipelines` yet. So click on **"Create pipeline"** to enter the `Pipelines` creation process.

![](https://images.gitee.ru/uploads/images/2018/1105/105620_fe4e6c60_551147.png )

### Associate Git Repository

When creating Pipelines for the first time, you need to associate a Git repository with the project. In this article, we will use [layui] as an example. We have already forked the [layui] project to the Gitee account in advance, and the address is: [https://gitee.ru/normalcoder/layui](https://gitee.ru/normalcoder/layui).

At the same time, we added an SSH Key for integrated build and deployment in the repository homepage by going to "Manage" -> "Deploy Key Management" -> "Add Key". For specific SSH Key operations, you can visit [Gitee Help Center - SSH Key Settings] for more information. We will not go into detail here.

![](https://images.gitee.ru/uploads/images/2018/1105/105631_674a0466_551147.png )

Go back to Azure Pipeline and click on "Use the visual designer" in the first step of creating a pipeline. In the custom repository view, select "External Git" and add our Git repository information and authorized deployment SSH Key through "Add connection".

![](https://images.gitee.ru/uploads/images/2018/1105/105640_3c6f9cf4_551147.png )

![](https://images.gitee.ru/uploads/images/2018/1105/105645_81a12c1a_551147.png )

![](https://images.gitee.ru/uploads/images/2018/1105/105655_3bbbce88_551147.png )

After the configuration is complete, we will receive a prompt for successful access to the repository and be asked to choose the branch information for the build. Here, the default selection is **'master'**, click **'Continue'** to proceed.

![](https://images.gitee.ru/uploads/images/2018/1105/105706_97a21531_551147.png )

Set up Build Process

Next, we will select the build process. `Azure Devops` provides many build process templates, and we can also define our own build and deployment processes. Since

![](https://images.gitee.ru/uploads/images/2018/1105/105743_d360972a_551147.png )

After selecting the build type, we need to further configure the build details, including specifying the operating system of the build environment, etc. In this case, I choose to build based on macOS. Since the build of [layui] is not complicated, we can use the default build solution directly. Click **"Save & queue"** -> **"Save"** to save.

![](https://images.gitee.ru/uploads/images/2018/1105/105751_d8db191f_551147.png )

### Completed the First Build

Go back to **"Pipelines"** -> **"Builds"**, select the pipeline we created, and choose **"Queue"** or **"Run"** to start our first build.

![](https://images.gitee.ru/uploads/images/2018/1105/105759_12e10623_551147.png )

Select the build environment based on macOS. The default is to use the 'master' branch. Here, we need to specify a 'commit' for this build version.

![](https://images.gitee.ru/uploads/images/2018/1105/105807_5fe88569_551147.png )

After clicking on the build, we can see the current status of the build task in the **"History"** section on the right. Clicking on the task details allows you to view the content during the build process.

![](https://images.gitee.ru/uploads/images/2018/1105/105816_51096e36_551147.png )

## Reference build status information in Gitee repository

Go back to the build task list, on the `pipeline` details page, we can associate and provide real-time build status feedback on the repository using the **"Status Badge"**.

![](https://images.gitee.ru/uploads/images/2018/1105/105903_3e4963ed_551147.png )

Copy the "Sample Markdown" column in **"Status Badge"** and add the `Markdown` information to the **Readme.md** file of the Git repository. After adding, the effect will be as shown in the figure.

![](https://images.gitee.ru/uploads/images/2018/1105/105912_ac703851_551147.png )

## Enable Continuous Integration

After completing the implementation of transferring the project from 'Gitee' to 'Azure Devops', in order to update the code and

Enable continuous integration for the repository by opening the "Enable continuous integration" option in the "Triggers" tab of the project's Pipeline details. The options are explained below:

Polling interval (seconds): Azure will periodically build the repository based on the configured time interval in seconds.
- Branch filters: Used to determine which branches to build during the CI process, supports conditional composition.

![](https://images.gitee.ru/uploads/images/2018/1105/105923_06dcc257_551147.png )

## Summary

By integrating the code repository of Gitee with Azure Devops Pipelines, developers can easily complete the continuous integration (CI) work of the project. They can receive feedback on the project on an ongoing basis and make improvements, thereby improving development efficiency and shortening the development cycle. They don't have to wait until the later stages of the development cycle to find and fix defects. Continuous integration plays a crucial role in the development process of modern software development technologies and is worth everyone's attention and learning.

[Gitee]:https://gitee.ru
[Gitee]:https://gitee.ru
[Azure Devops Homepage]: https://dev.azure.com/
[Azure Pipeline]:https://azure.microsoft.com/zh-cn/services/devops/pipelines/
Introduction to Azure Pipeline: https://azure.microsoft.com/zh-cn/services/devops/pipelines/
[layui]:https://gitee.ru/sentsin/layui
[Gitee Help Center - SSH Public Key Settings]:https://gitee.ru/help/articles/4191