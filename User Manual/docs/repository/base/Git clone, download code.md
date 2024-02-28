---
title: git clone, download code
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4192
---

When users access a project on Gitee and need to download the repository/code to their local machine, they can do so by cloning/downloading the ZIP file.

![Repository Clone Address/Download Area](https://images.gitee.ru/uploads/images/2018/0815/115602_7e40b5ff_551147.png "Repository Clone Address/Download Area")

## Clone the repository using `git clone`

> Users can find the "Repository Clone Address/Download Area" on the project's homepage to find the corresponding repository address.

Here, we take the repository named 'HelloGitee' under the user account 'gitee' as an example. The corresponding repository URL is 'https://gitee.ru/gitee/HelloGitee.git'. Assuming the user has permission to access the project repository code, you can clone the repository to the local machine by executing the command 'git clone repository URL' in the command line.

```bash
git clone https://gitee.ru/gitee/HelloGitee.git # Clone the remote repository to local.
```

Note: During the cloning process, if the repository is a private repository, the user may be prompted to enter their Gitee account username and password. Follow the prompts to enter the information. For specific configuration and operations, please refer to: [Quick Start/Creating Your First Project Repository](/help/articles/4120)

## Downloading Code via ZIP

Users can find the download area on the project repository homepage (see the position of the download button in the above figure), click 'Download ZIP', enter the verification code on the redirected verification page to start downloading after confirmation.

> Downloading the ZIP package downloads the content of the current branch/commit, excluding the Git version. Refer to the `git archive` command for more details: [https://git-scm.com/docs/git-archive](https://git-scm.com/docs/git-archive)

Download ZIP