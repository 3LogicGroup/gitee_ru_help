---
title: Repository member permission explanation
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4140
---

In Gitee platform, repository member permissions can have the following options:

| Member Role | Permissions |
| --- | --- |
| Visitor (Logged-in User) | For public repositories: create issues, comment, clone and pull repositories, download code packages, fork repositories, fork repositories and submit pull requests, download attachments.
| Reporter | Inherits visitor's permissions. Private repository: cannot view code, cannot download code, cannot push, cannot fork, cannot submit pull requests, can download attachments, cannot upload attachments, cannot delete attachments |
| Observer | Inherits Reporter's permissions Private repository: Create Wiki, Clone and Download code, Pull, cannot
| Developers | Create Issues, Comment, Clone and Pull Repositories, Fork Repositories, Download Code Packages, Create Pull Requests, Create Branches, Push Branches, Delete Branches, Create Issue Labels (Milestones), Create Wiki, Can Upload Attachments, Can Delete Their Own Attachments, Cannot Delete Others' Attachments. |
As an administrator, I can create issues, comment, clone and pull repositories, package and download code, create pull requests, create branches, push branches, delete branches, create issue/pull request labels (milestones), create wikis, add repository members, force push branches, edit repository properties, upload attachments, delete attachments uploaded by myself or others, but I cannot transfer/clear/delete repositories.