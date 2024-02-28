---
title: IDEA Plugin

origin-url: https://gitee.ru/help/articles/4117
---

# Plugin installation

Latest plugin version: 2018.3.1. (Released on 2019-01-10)
**Note: The Gitee IDEA plugin has been renamed to `gitee` from `gitosc`.**
**The new version plugin Gitee menu has been merged with the Git menu**

## Install through "Plugin Management"

1. Launch IDEA
2. Select the menu "Configure" -> "Plugins" on the startup screen.
3. Search for the keyword "Gitee" in the popup plugin market and find the "Gitee" plugin in the search results. Click "Install" to install the plugin.
4. Restart IDEA to make the plugin effective

![](https://images.gitee.ru/uploads/images/2019/0111/164940_57b7170b_551147.png)

## Install through "Preferences->Plugins"

1. Launch IDEA and go to Preferences (*On macOS, open Preferences from the menu, on Windows, open Settings from the File menu*), select Plugins
2. Search for the keyword 'Gitee' in the popped up plugin market. Find the 'Gitee' plugin in the search results and click 'Install' to install the plugin.
3. Restart IDEA to make the plugin effective

![](https://images.gitee.ru/uploads/images/2019/0111/165953_373293a9_551147.png)

## Install by Downloading the Plugin Pack

The plugin address is: [https://plugins.jetbrains.com/plugin/11491-gitee](https://plugins.jetbrains.com/plugin/11491-gitee) Download directly and install manually.

You can also download and install it by accessing the plugin's open-source repository: [https://gitee.ru/oschina/intellij-gitosc](https://gitee.ru/oschina/intellij-gitosc).

Login and pull repository code

## Operation through the startup interface

**1. Launch idea and select `Check out from Version Control` - `Gitee`**

![](https://images.gitee.ru/uploads/images/2019/0111/171225_637ab921_551147.png)

There have been changes in the latest version, the options for Gitee and Git have been merged:

![](https://images.gitee.ru/uploads/images/2019/0111/171225_9c157122_551147.png)

**2. Enter username and password to log in**

![](https://images.gitee.ru/uploads/images/2019/0111/162438_7236a7d2_551147.png)

**3. Click the downward arrow in the checkbox to display all repositories the current user has on Gitee**

![](https://images.gitee.ru/uploads/images/2019/0111/171226_f5157195_551147.png)

**4. Select any repository for cloning**

![](https://images.gitee.ru/uploads/images/2019/0111/171225_8458dfb7_551147.png)

## Through 'Preferences' Operations

### Account login settings

**1. Select `File` - `settings`**

![](https://images.gitee.ru/uploads/images/2019/0111/171226_90e3721e_551147.png)

2. Select Version Control - Gitee

![](https://images.gitee.ru/uploads/images/2019/0111/171225_3c99e0a0_551147.png)

If a public key is configured, you can choose SSH method to pull the repository.

The Test button can be used to test if the username and password are correct.

### Pull repository code

1. Select `VCS` - `Checkout from Version Control` - `Gitee`

![](https://images.gitee.ru/uploads/images/2019/0111/171226_05132db9_551147.png)

The latest version of Gitee options has been merged with git.

![](https://images.gitee.ru/uploads/images/2019/0111/171226_d38db5a4_551147.png)

![](https://images.gitee.ru/uploads/images/2019/0111/171226_a8ee3a5a_551147.png)

**2. Other steps are the same as above**

![](https://images.gitee.ru/uploads/images/2019/0111/171226_45ef0497_551147.png)

# Push code

**1. Add File**

Right-click the file or folder to be added

![](https://images.gitee.ru/uploads/images/2019/0111/171226_1120af29_551147.png)

**2. Select commit**

Right-click to select file or folder

![](https://images.gitee.ru/uploads/images/2019/0111/171226_3d64d0fa_551147.png)

**3. Fill in the commit information**

![](https://images.gitee.ru/uploads/images/2019/0111/172713_2d0c3c31_551147.png)

4. Choose push

![](https://images.gitee.ru/uploads/images/2019/0111/171226_e9fd0e5f_551147.png)

**5. Push the code to the online environment**

![](https://images.gitee.ru/uploads/images/2019/0111/172713_a0b316fc_551147.png)

# Host a local repository to Gitee

Local repositories can be directly hosted on Gitee without the need to create repositories on the web.

**1. Choose `VCS` - `Import into Version Control` -

Host the local repository on Gitee

**2. Fill in the repository information, you can choose public or private**

Host the local repository on Gitee

**3. Select the file and fill in the commit message. Click `OK` to proceed.**

Host the local repository to Gitee

# Tasks associated with Gitee Issue

By using plugins, you can associate IDEA Tasks with Gitee Issue.

**The steps to associate repository with Tasks are as follows**

1. Select `Tools` -> `Tasks && Contexts` -> `Configure Servers...`
2. Click on `+` and select `GitOSC`, enter the username and repository name, these two names need to be consistent with the names in the repository URL.
3. Click 'Create API Token', enter your email and password, click 'Login', and a Token will be generated.
4. Finally, click on confirm.

![](https://images.gitee.ru/uploads/images/2019/0111/172713_e432d911_551147.gif)

Open Tasks as follows

1. Select `Tools` -> `Tasks && Contexts` -> `Open Task...`
1. The repository's issues will be displayed in the list, double-click.
1. Set up repository branches, etc., and finally confirm

![](https://images.gitee.ru/uploads/images/2019/0111/172714_e1c1793b_551147.gif)

**Manage Issues**

1. 'Open Task...' Establish a relationship between Task and Issue.
1. `Close Active Task` can update the issue status.
1. `Show '***' Description` can display the description information of the Issue.
1. `Open '***' In Browser` can open the issue page in the browser.
![](https://images.gitee.ru/uploads/images/2019/0111/172714_9d311cbe_551147.png)

# Create Code Snippets

Open the source code file, right-click on the file window, and select 'Create Code Snippet...' to do it.

![](https://images.gitee.ru/uploads/images/2019/0111/172714_86bc368f_551147.png)

# Pull Request Management

Involves PR related operations, you can perform them through the menu "VCS"->"Git". The following are screenshots of the relevant interface.

![](https://images.gitee.ru/uploads/images/2019/0111/170948_d64bf9a3_551147.png)

Create Pull Request

![](https://images.gitee.ru/uploads/images/2019/0111/162524_47320a4c_551147.png)

View Pull Request

![](https://images.gitee.ru/uploads/images/2019/0111/162538_3a9931c2_551147.png)

Update Log

## 2019-01-10 Version 2018.3.1 Release

Now version 2018.3.1 has been released, which supports the latest version of IntelliJ IDEA. The main updates are as follows:

- The file may only be tracked and visible after using `git add file`.
- Use Kotlin language to write new HTTP interfaces
- IDEA Task functionality compatibility modification
- Provides functionality to create and view pull requests