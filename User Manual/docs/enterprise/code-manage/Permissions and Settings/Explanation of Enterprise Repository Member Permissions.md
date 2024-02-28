---
title: Enterprise Warehouse Member Permissions Explanation
origin-url: https://gitee.ru/help/articles/4159
---

> Enterprise repository members can have the following types:

| Member Role | Permissions |
| --- | --- |
| Visitor (Logged-in User) | For public repositories: Create Issue, Comment, Clone and Pull Repository, Download Code as Zip, Fork Repository, Fork Repository and Submit Pull Request, Download Attachments
| Reporter | Inherits the permissions of a visitor. Private repositories: cannot view code, cannot download code, cannot push, cannot fork, cannot submit pull requests, can download attachments, cannot upload attachments, cannot delete attachments |
| Observer | Inherit the reporter's permission for private repositories: create Wiki, can clone and download code, can pull, cannot
| Developer | Create issues, comment, clone and pull repositories, fork repositories, package and download code, create pull requests, create branches, push branches, delete branches, create tags (milestones), create wikis, can upload attachments, can delete their own uploaded attachments, cannot delete attachments uploaded by others, |
| Administrator | Create issues, comment, clone and pull repositories, package and download code, create pull requests, create branches, push branches, delete branches, create tags (milestones), create wikis, add repository members, force push branches, edit repository properties, can upload attachments, can delete attachments uploaded by themselves or others, cannot transfer/clear/delete the repository |
 
> In Gitee Go, the permissions of the pipeline are fully inherited from the repository role permissions, and the specific permission details are as follows:

| Member Role | Permissions |
|------   |-----------------------------|
| Reporter | Inherits visitor permissions. Private repository: Cannot view pipeline execution records and details, cannot view pipeline configurations, cannot view artifact repositories, cannot download artifacts, i.e., pipeline-related content is not visible.
| Observer | Inherits reporter permissions. Private repository: Can view pipeline execution records and details, can download artifacts, can view artifact repositories, i.e., all pipeline-related content is visible, but cannot make changes.
| Developer | Inherits the observer's permissions. Can execute pipelines, view pipeline configurations, update pipelines, and delete pipelines. |
| Administrator | Inherits developer permissions. |