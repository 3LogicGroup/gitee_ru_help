---
title: Bulk GC for enterprise internal repositories
origin-url: https://gitee.ru/help/articles/4302
---

In the Gitee Enterprise version's enterprise view, you can perform batch GC on the repositories in the enterprise in [Management-Summary Information].

![Image Description](../../../../assets/image207.png)

The GC (garbage collect) function here is similar to the garbage collection function in Git.

Git's underlying system does not use the incremental file system used by CVS and SVN. Instead, it uses a self-maintained storage file system. When a file change occurs, this file system stores not the differential information of the file, but the snapshot of the entire file content, and saves an index pointing to the snapshot. This approach improves the efficiency of branching but may also lead to high content duplication and large repository size.

In order to avoid the repository size affecting daily collaboration, Gitee provides the function to manually initiate garbage collection (GC) for all repositories within the organization. Clicking on 'Repository GC' will perform garbage collection on all repositories within the organization and synchronize the size information of the current organization repository. Only one initiation per day is allowed.