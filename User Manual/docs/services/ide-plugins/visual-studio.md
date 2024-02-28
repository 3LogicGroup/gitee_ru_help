---
title: VisualStudio Plugin

origin-url: https://gitee.ru/help/articles/4118
---

# Gitee Visual Studio Extension

Note: Visual Studio 2013, 2015, and 2017 all have Community Editions. Gitee's Visual Studio extension supports the Community Edition, Professional Edition, and Enterprise Edition of Visual Studio 2017.

The community edition has the same basic functions as the professional edition, provided it is only used for non-commercial projects and open-source projects. The Express edition can be used for commercial projects or only download the Visual Studio C++ Build Tools, which can be used without limitations.

## Installation

Go [https://marketplace.visualstudio.com/items?itemName=GiteeInc.GiteeExtension](https://marketplace.visualstudio.com/items?itemName=GiteeInc.GiteeExtension)

Note: Gitee.VisualStudio only supports Visual Studio 2015/2017.

## Usage

Visual Studio version management-related functions are centralized in Team Explorer Gitee.VisualStudio. Various functions are interspersed in the workflow of Team Explorer.

### Connect page

After opening Visual Studio, expand the Team Explorer panel, which defaults to the Connect page (you can also click the plug icon in the toolbar of the Team Explorer panel to navigate to the Connect page).

If the user is not logged in to Gitee, they can click the 'Connect' button in the Gitee section on the Connect page to log in. If they are not registered on Gitee, they can click the 'Register' button in the same section to register on the Gitee website.

After logging in to Gitee, in the Gitee area, the repositories cloned to the local machine through Visual Studio will be displayed. You can perform clone, clone and exit operations in the toolbar of the Gitee area. Double-clicking on a repository in the repository list in this area will open the repository.

#### Clone

In the toolbar of the Gitee area, click on the Clone button, which will display all Gitee repositories owned by the current user, including repositories owned by groups. Select one of them and click the Clone button below.

Note: By default, the selected repository will be cloned to %USERPROFILE%\Source\Repos, and you can modify the clone path using the browse button below. The clone button will be unavailable if there is a folder with the same name as the project in that directory.

Creating a repository

In the toolbar of the Gitee area, click the create repository button, fill in the repository name, description, select Git ignore and license, and then click the create button below.

Exit

In the Gitee area's toolbar, click the logout button to log out the current user.

Note: Login information will be cleared from the system, but the cloned repository will still remain and will be available for the next login.

#### Push to Gitee

In the Team Explorer's Synchronization/Publish page, through the Gitee section, you can publish the current Git repository to Gitee (need to fill in the repository name, description, protocol, and ownership). If the current repository is not a Git repository, you can click Add to Source Control / Git in the bottom right corner of Visual Studio to convert it into a Git repository, and then publish it.

#### Commit changes

Team Explorer itself integrates Git operations such as commit, pull, and sync. You can use the small house button in the Team Explorer toolbar to navigate to the Home page for these operations. The Gitee.VisualStudio plugin integrates Gitee-specific features like attachment, pull request, issues, statistics, and wiki into that page. By clicking on the corresponding buttons, you can navigate to the respective pages.

## Demo Animation

![](https://gitee.ru/GitGroup/CodeCloud.VisualStudio/raw/master/docs/images/option.gif "option.gif")

License Agreement and History

This software was initially developed by @dilly through a bounty program, and the code was borrowed from the Github for Visual Studio source code. We would like to express our gratitude to all the relevant developers.