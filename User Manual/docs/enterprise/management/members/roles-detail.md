---
title: Role permission description
origin-url: https://gitee.ru/help/articles/4288
---

## Feature module permissions

The functional module permissions are divided into two categories: [Global Data] and [Related to Me]

- 'Global Data' is the relevant permission that grants members roles access to all resources within an enterprise. When selected, it will include permissions related to 'With Me' (excluding the 'View' permission), and when unselected, it will not disable the permissions related to 'With Me'.
- "Related to me" is the current existing permission control for member roles. For example, after an outsourcing person becomes a repository member/project member, the scope of their operations (pushing/pulling code, creating resources, deleting resources, etc.) can be limited.
Enterprise Edition 'Public Repositories' and 'Community Edition Repositories' are not controlled by 'Member Role Permissions'.

The priorities of "Lock enterprise members", "Enterprise whitelist", and "Set read-only files" are still higher than "Member role permissions".

[Global Data] has a higher priority than [Related to Me] (except for [View] permission, [View] is the most basic permission, and if [View] permission is closed in [Related to Me], the entire feature page will be hidden).

### Weekly Report

**Related to me:**

| Option | Description |
| ------------ | ------------------------------------------------------------ |
| View | Allow viewing the "My Weekly Report" module on the "Workbench" page in the company view. |
| Create | Allows creating weekly reports on the 'Workspace' page under the Enterprise view.<br/>Allows creating weekly reports on the 'Members' page under the Project view.
| Edit Historical Weekly Report | Allows editing all weekly report records in the "My Weekly Report" module on the "Workbench" page under the enterprise view. |

**Global data:**

| Option | Description |
| ------------ | ------------------------------------------------------------ |
| View | Allow viewing the 'My Weekly Report' and 'Member Weekly Report' modules on the 'Dashboard' page of the Enterprise View. |

### Task

**Related to me:**

Options   Description
| -------- | ------------------------------------------------------------ |
| View     | Allow viewing:<br/>1. Enterprise view: All tasks without associated projects or repositories.<br/>2.
| New | Allow creating tasks within the following scope: <br/>1. Projects participated in or created by the enterprise you are in. <br/>2. Repositories with [Reporter] or higher permissions you participated in. <br/>3. Repositories under the enterprise organization you manage or own.
| Modify Properties | Allow editing the attributes of tasks within the following scope (attributes are all fields in the task except for title and description):<br/>1. All tasks created, assigned, or collaborated by me in my enterprise.<br/>2. Tasks in projects that I create or participate in.<br/>3. Tasks in repositories that I participate in or manage.<br/>4. Tasks in repositories of enterprise organizations that I manage or own. |
| Modification Content | Allow editing the title and description of the tasks within the following scopes:<br/>1. All tasks created, assigned, or collaborated by me in the enterprise I belong to.<br/>2. Tasks created or participated by me in projects.<br/>3. Tasks participated or managed by me in repositories.<br/>4. Tasks in repositories managed or owned by me in the enterprise organization. |
| Delete | Allow deletion:<br/>1. I can delete tasks that I created.<br/>2. Tasks in repositories that I manage or own.<br/>3. Tasks in repositories of organizations that I manage or own.

**Global data:**

Options   Description
| -------- | ------------------------------------------------------------ |
| View | Allow access to all pages related to [Tasks] in the enterprise view and project view. |
| New      | Allow creating tasks anywhere within the enterprise.                               |
| Modify attributes | Allow editing attributes of all tasks within the enterprise (attributes are all fields in a task except for the title and description). |

| Modification | Allow editing the titles and content of all tasks within the enterprise. |
| Delete | Allow deleting all tasks within the enterprise. |

### Project

**Related to me:**

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow viewing projects that you are involved in or created. |
| New | Allow creating new projects for the enterprise. |
| Allow me to delete created projects | Allow deleting projects created by oneself. |
Manage projects I created (member management, modify description). Allow editing of settings content for projects created by myself, add, delete, modify, and search for members in projects created by myself.

**Global data:**

| Option | Description                                 |
| ---- | -------------------------------------------- |
| View | Allow viewing all projects within the enterprise. |
| New | Allows creating a project for the enterprise. |
| Delete | Allows the deletion of any project within the enterprise. |
| Management | Allow editing any project within the enterprise, add, delete, modify, and query its project members. |

### Warehouse

**Related to me:**

| Option                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| View | Allows me to view the repositories I participate in or manage, as well as their PRs that I review and test. <br/> `【View】 permission represents the ability to view repository and PR information, but it does not allow viewing the actual code content. If the 【Pull Code】 permission is disabled, the repository code cannot be seen within the organization, and the community entry of the enterprise repository will redirect to the repository's issue page`. |
| New                       | Allow creating repositories for enterprises.                                         |
| Allow deleting repositories I created                       | Allow deleting repositories created within the enterprise                                          |
| Management (members, repository basic settings) | Allow editing of the repository settings created by me, managed by me, and responsible for me under the organization in the enterprise. Allow adding, deleting, modifying, and querying repository members. <br/> Allow editing/closing of the repositories created by me, managed by me, and responsible for me under the organization in the enterprise.
Allow performing related operations based on the role permissions I have in the participating repository.
| Push Code | Allow me to push code, upload files, and create new files in repositories where my role is Developer or higher. |
| Merge Pull Request           | Allows merging of non-protected branches in repositories with roles of 'Developer' and above.

**Global data:**

| Option                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| View | Allows viewing all repositories and PRs within the enterprise. |
| New                       | Allow creating repositories for enterprises.                                         |
| Delete | Allows deleting any repository within the enterprise, but without the "Manage" permission for the repository, cannot access the "Repository Settings" page for deletion operation.|
| Manage (members, repository basic settings) | Allow editing all repository settings within the organization, add, delete, modify, and view repository members.<br/>Allow editing/closing all PRs within the organization. |
| Pull Code | Allows browsing/pulling code from all repositories within the enterprise (including forks).<br/>Allows creating PR within the enterprise. |
| Push Code | Allows pushing code, uploading files, and creating files to all repositories within the organization. This will ignore repository role permissions and protected branch rules.
| Enterprise Open Source Management | Allows editing the open source attributes of the enterprise's global repositories, but without repository management permission, you cannot access the management page to make modifications.
| Merge Pull Request | Allows merging PRs from any repository within the enterprise. In this case, repository role permissions and protected branch rules are ignored.
| Access Internal Open Source Repositories | Allow access to internal open source repositories within the enterprise. |

### Documentation

**Related to me:**

Options   Description
| -------- | ------------------------------------------------------------ |
| View | Allow viewing documents that I have created or have 'Read Only' or 'Read and Write' permissions set. |
| New      | Allow the enterprise to create new documents.                       |
| Edit    | Allows editing of documents in the enterprise with "Read and Write" document permissions. |
| Delete | Allow deleting documents with "read-write" document permissions within the company. |
| Permission Settings | Allows modifying the "Read/Write" permission of documents in the enterprise that are set as "Read/Write". |

**Global data:**

| Option   | Description                           |
| -------- | -------------------------------------- |
| View     | Allow viewing all documents within the enterprise.               |
| New | Allow enterprise to create new documents. |
| Edit     | Allow editing all documents within the enterprise.               |
| Delete | Allow deleting all documents within the enterprise. |
Set Permissions

### Members

Selecting this option allows viewing the [Members] page within the Enterprise View. It also allows configuring the [Enterprise Member Management] option in [Enterprise Management Permissions].

## Enterprise management permissions

Enabling it means allowing access to the [Management] page in the enterprise view and viewing the [Enterprise Statistics Overview].

### Enterprise Member Management

| Option                  | Description                                                |
| ------------------------ | ------------------------------------------------------------ |
| Add Enterprise Members         | Allow inviting external personnel to join the enterprise. |
| Remove Enterprise Member | Allow removing any member within the organization (except super administrators). |
| Change Role | Allow changing the role of enterprise members. |
| Manage (edit, lock members, etc.) | Allow editing of enterprise member profiles, locking of enterprise members, sending reset password emails to members.
|
| Add Team | Allows creating teams within the enterprise. |
| Management Team               | Allow editing team information within the company and deleting teams. |

### Operation Log

Check this option to allow access to the [Operation Log] page under the [Management] menu in the enterprise view

### Alarm Records

Checking this option means allowing access to the "Alarm Records" page under the "Management" menu in the enterprise view.

### Git LFS

Checking this option means allowing access to the 'Git LFS' page under the 'Management' menu in the enterprise view.

### Order Invoice Management

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the [Order Invoice Management] page under the [Management] menu in the enterprise view. |
| Manage | Allow interaction with the "Order Invoice Management" page under the "Manage" menu in the enterprise view. |

### WebHooks

| Option | Description |
| ---- | -------------------------------------------------------- |
| View | Allow access to the [WebHooks] page under the [Management] menu in the enterprise view. |
| Manage | Allows interaction with the "WebHooks" page under the "Manage" menu in the enterprise view. |

### Deploy Public Key

| Option | Description |
| ---- | -------------------------------------------------------- |
| View | Allow access to the "Deploy Keys" page in the "Manage" menu within the enterprise view. |
| Management | Allows interaction with the 'Deploy Public Key' page under the 'Management' menu in the enterprise view. |

### Task Types and Status Management

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the "Task Type and Status Management" page under the "Manage" menu in the enterprise view. |
| Manage | Allow interaction with the "Task Type and Status Management" page under the "Management" menu in the enterprise view. |

### Tag Management

| Option | Description |
| ---- | -------------------------------------------------------- |
| View | Allow access to the [Management] menu in the enterprise view, [Tag Management] page. |
| Management | Allows interaction with the "Tag Management" page under the "Management" menu in the enterprise view. |

Enterprise Information Settings

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the "Enterprise Information Settings" page under the "Management" menu in the enterprise view. |
| Manage | Allow interaction with the "Enterprise Information Settings" page under the "Manage" menu in the enterprise view. |

### Member Role Permission Settings

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the "Member Role and Permission Settings" page under the "Management" menu in the enterprise view. |
| Manage | Allows interaction with the "Member Role and Permission Settings" page under the "Manage" menu in the enterprise view. |

Notification and Alert Settings

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the "Notification and Alert Settings" page under the "Management" menu in the enterprise view. |
| Manage | Allow interaction with the "Notification and Alert Settings" page under the "Manage" menu in the enterprise view. |

### Security settings

| Option | Description |
| ---- | -------------------------------------------------------- |
| View | Allow access to the "Security Settings" page under the "Management" menu in the enterprise view. |
| Management | Allows interaction with the "Security Settings" page under the "Management" menu in the enterprise view. |

### Company announcement

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the [Enterprise Announcement] page under the [Management] menu in the enterprise view. |
| Publish | Allows editing and publishing new announcements within the "Enterprise Announcement" page under the "Manage" menu in the enterprise view. |

### Send private message

| Option | Description |
| ---- | ------------------------------------------------------------ |
| View | Allow access to the [Mass Private Message] page under the [Management] menu in the enterprise view. |
| Publish | Allows editing and publishing new broadcast private messages in the "Manage" menu under the enterprise view. |