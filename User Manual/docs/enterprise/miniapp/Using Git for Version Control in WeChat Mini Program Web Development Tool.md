---
title: Using Git for version control in Mini Program Web Development Tool
origin-url: https://gitee.ru/help/articles/4202
---

### **Preface**

In the process of developing WeChat mini programs, code version management often requires the use of third-party tools. Although the WeChat Web development tool provides prompts for the Git file version status, the actual user experience is still unsatisfactory.

With the update of WeChat Web Development Tools, the latest beta version now supports direct management of Git. This article will provide a detailed introduction on using Git for version control in WeChat Web Development Tools.

### **Environment Setup**

- Development environment: Mac/Windows/Linux are all applicable
- Development Tools: WeChat Web Developer Tools Beta Version, Git
- Git hosting service: Gitee

To use Git service, you need to install Git on your system. For details on installing Git and related Git environments, please refer to Git Getting Started and Git Installation.

As the support for Git management functionality is currently in beta testing, this article will use the Beta version of the WeChat Web Developer Tools as an example. Access https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html to download the WeChat Web Developer Tools Beta version (referred to as WeChat Web Developer Tools in the following text)

### **Create mini program repository**

To use Git for version control, you first need a Git repository. Open WeChat DevTools and create/open the repository for the mini-program. In this example, let's assume the repository name is HelloGitee. Fill in the necessary path and appid, choose the regular quick start template, confirm, and create the repository.

![Image Description](./assets/215526_c564ebdb_551147.webp)

After creation, an initialized repository is obtained.

![Image Description](./assets/215536_ecaa6ef9_551147.webp)

### **Create Remote Repository**

Log in to your Gitee account on [https://gitee.ru](https://gitee.ru/). Click on the new button in the upper right corner and select **'New Repository'**. Fill in the relevant project repository information.

![Image Description](./assets/repo_1.png)

After creating and initializing the remote repository, we get an empty repository as shown in the figure. The repository address for the project is: https://gitee.ru/normalcoder/HelloGitee.git
Next, we will initialize the local Git repository.

![Image Description](./assets/repo_13.png)

### **Initialize local repository**

In the `WeChat Web Developer Tools`, click the "Version Control" button on the panel to bring up the version control panel in the developer tools.

Since it is a new repository and the Git repository has not been initialized, it will prompt to initialize the Git repository. Click on **"Initialize Git Repository"**, then click "Confirm" to complete the initialization of the local repository.

**This step is equivalent to executing the "git init" command.**

 - "Version Control" - "Initialize git repository"

![Image Description](./assets/wechart_1.png)

After initialization, we can see the local repository and the current Git status. The following image shows the version control panel of WeChat Web Developer Tools after initialization.

![Image Description](./assets/wechart_2.png)

### **Configure Repository Information**

After initialization, click 'Workspace' -> 'Settings' -> 'General' -> 'Edit' in order to edit the username and email address used in Git. This step is equivalent to the configuration operation in the git config command.

```bash
git config --global user.name "username"
git config --global user.email "email"
```

**Note: The email name configured here needs to be consistent with the email on the Gitee https://gitee.ru in order to ensure that the submitted contribution information can be counted in Git.**

![Image Description](./assets/wechart_3.png)
 
Switch to the 'Remote' tab in the repository settings. At this point, you will find the prompt 'Remote repository information not found.' Click 'Add' and enter the previously created remote repository address. Name the repository as 'master' or choose your own name.

![Image Description](./assets/wechart_4.png)

After adding, you can see the remote branch information in the repository.

### **Push code to remote repository**

Click the "Push button" on the operation panel, select "Push to a new remote repository branch" in the popup window, and fill in the name as "master" to indicate pushing to the remote repository's

![Image Description](./assets/wechart_5.png)

After the push is complete, we can see the branch information under 'Remote Repository'. Access the repository on Gitee and you can also see the pushed information. At this point, we have successfully completed the process of pushing code from the local repository to the remote repository.

### **Considerations and Identity Authorization Settings**

If you encounter a push failure prompt when pushing, you need to check user authorization. It indicates that WeChat Web Developer Tools may not have read the local user's ssh authorization configuration, and you need to set the user's authorization information in the development tool.
![Image Description](./assets/wechart_6.png)

After initialization is complete, click on "Workspace" -> "Settings" -> "Network & Authentication" -> "Authentication Method" in order, and you can choose the authentication method for remote repositories. The default is "Automatic".

Select 'Enter username and password', enter your Gitee account and password below, and then perform the push operation again.
![Image Description](./assets/wechart_7.png)

### **Modify and submit code**

Next, let's modify our code.

1. Click the 'Version Control' button on the development tool panel, close the 'Version Control' panel, open 'pages/index/index.wxml', make any changes, and save.

2. Switch back to the "Version Management" panel, and you can see that there is a file waiting to be committed in the current local branch. Select and check the file to view the changes made in the current file.

3. Fill in the commit message in the submission box below, click "Submit", and the code will be submitted to the main branch of the local repository. After the submission, you can view the commit records on the branch of the local repository.

4. Next, we push the code from the local branch to the remote repository again. Click the 'Push' button on the operation panel, select 'Push to the following remote repository branch' in the pop-up window, choose the master branch of an existing remote repository, and then click 'OK'.

5. After the push is complete, you can see the submitted code changes on the corresponding repository page in Gitee.

### **Conclusion**

In the above operations, we used the version management feature of the WeChat Web Developer Tools to control the version of the mini program's code and submitted it to the remote Git repository.

In actual project development, we can fully utilize the features of Git in version management and collaboration, collaborate flexibly with others, and thereby standardize code management and efficiently collaborate on development.