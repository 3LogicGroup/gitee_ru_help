---
title: Batch GC for enterprise internal repositories
origin-url: https://gitee.ru/help/articles/4302
---

In the enterprise view of Gitee Enterprise, you can perform batch GC on repositories in 【Management - Summary Information】.

![Image Description](image664.png)

The GC (garbage collect) function here is similar to the garbage collection function in Git.

Git's underlying layer does not use the incremental file system used by CVS and SVN, but uses a self-maintained storage file system. When a file change is committed, the file system stores not the diff information of the file, but the file snapshot, that is, the entire file content, and saves the index pointing to the snapshot. This approach improves the efficiency of using branches, but it can also lead to excessive duplication of content in the code repository, resulting in a large repository size.

In order to avoid the repository size affecting daily collaboration, Gitee provides the function to manually initiate GC for all repositories within the organization. After clicking "Repository GC", garbage collection will be performed on all repositories within the organization and the volume information of the current organization's repositories will be synchronized and refreshed. Only one initiation is allowed per day.