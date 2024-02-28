---
title: Git Read-only File Support
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4256
---

As an application project, there are usually some files to describe the configuration information in the production environment, such as service connection information, environment configuration information, etc. However, during the local development process, it is necessary to adjust the configuration of these files according to the local service environment. If these modifications are accidentally committed, it may directly cause the application in the production environment to fail to run properly.

Therefore, SVN has a very useful feature that allows certain files to be configured as read-only and not allow modifications to be submitted.

However, Git itself does not have this feature. Mainstream Git platforms generally provide read-only branches, but cannot achieve read-only restrictions on individual files or folders

The usage is as follows:

1. Go to the repository page, right-click on the file or folder that you want to set as read-only, and select 'Mark as Read-Only' (only repository administrators have permission).
![Image Description](https://images.gitee.ru/uploads/images/2019/0618/164916_d5bbd348_4764813.png "Screenshot_20190618_164105.png")
![Image Description](https://images.gitee.ru/uploads/images/2019/0618/165006_76435672_4764813.png "Screenshot_20190618_164151.png")
2. Go to the repository management page to view and manage all the read-only settings of the repository.
![Image Description](https://images.gitee.ru/uploads/images/2019/0618/165746_d75a7620_4764813.png "readonly-list.png")
3. If pushing code contains modifications to read-only files, an error will occur:

Code Submission Error:

![Image Description](https://images.gitee.ru/uploads/images/2019/0618/172009_01d60e4e_4764813.png "push.png")

PR code merge error: 

![Image Description](https://images.gitee.ru/uploads/images/2019/0618/170248_fda5e3dd_4764813.png "pr-merge.png")

4. There are three ways to resolve read-only errors

- Change the content of read-only files back to their original state

> Modify the content of the corresponding read-only file to match the online version to push normally.

- `git reset --hard <tree-ish>` command

> Use the command 'git reset --hard <tree-ish>' to discard changes to read-only files after committing, and then you can push normally.

Cancel the read-only flag of the corresponding file (only repository administrators can operate)

> Users with repository management permissions can remove the read-only mark for the corresponding file in the repository directory or repository management page.

This feature is currently available for paid Enterprise Edition users only.