---
title: Repository Status Function Description

origin-url: https://gitee.ru/help/articles/4343
---

# Repository status function description

## Pause and close the repository

This function is used to change the repository status, which helps to ① optimize enterprise resource display; ② reduce enterprise costs; ③ improve developer work efficiency

### Functional Impact Scope is as follows

| Module   | Function Point / Specific Operation | Open | Pause | Close |
|:-------:|-----------------------|:--:|:--:|:--:|
| Interface Display | Dashboard, project list, dropdown filter list | Show | Hide | Hide
|
| Code   | View code, Pull              | ✅  | ✅  | ✅  |
|       | Delete code, Push             | ✅  | ❌  | ❌  |
| File    | Create new file / folder / upload attachment     | ✅  | ❌  | ❌  |
| Branch | Create, edit, delete | ✅ | ❌ | ❌ |
| Tag    | Create, import, edit              | ✅  | ❌  | ❌  |
| Distribution | Create, edit, delete | ✅ | ❌ | ❌ |
| Milestone   | Associated repository                  | ✅  | ✅  | ❌  |
| PR    | Create, merge, rollback, close, edit, assign     | ✅  | ❌  | ❌  |
|       | Review, Test, Comment          | ✅  | ✅  | ❌  |
| Wiki   | Create, Modify, Delete         | ✅  | ❌  | ❌  |
| Issue | Create, edit, comment, assign, change status, link repositories | ✅ | ✅ | ❌ |
| Repository | Access repository, modify repository status | ✅ | ✅ | ✅ |
|       | Comments, settings         | ✅  | ✅  | ❌  |
|       | Delete                    | ✅  | ✅  | ✅  |

> **The scope of changes only includes the above content, and other functionalities not mentioned will remain unchanged**.

#### 1. Repository Visibility

In the `Workspace`, `Project List`, and `Dropdown Filter List`, all repositories with the status of `Paused` and `Closed` will be hidden.

#### 2. Repositories in Suspended State

`Paused` repositories will have the following operations limited:

1. Code: Restrict `View/Pull code`, not restrict `Push/Delete code`;
2. Files: Limit `new file creation, new folder creation, attachment upload`;
3. Branch: restrict `create, modify, edit, delete`;
4. Tags: Limit `create, import, edit`;
5. Release: Restrict `Create, Edit, Delete`
6. PR: Limit `create, merge, revert, close, edit, assign`, not limit `comment, review, test`;
7. Wiki: Limit `create, modify, delete`, allow `view`;
8. Repository: Restrict `deletion`, not restrict `access, comments, and other settings except deletion`;

#### 3. Repositories in closed state

The 'Closed' state of the repository will further limit the repository functions, only retaining the functions of **viewing / pulling code, accessing the repository, modifying the repository status**.
 
> This feature is not available in the old version of Enterprise Edition, please use the new version of Enterprise Edition

![Image Description](https://images.gitee.ru/uploads/images/2021/0708/132129_03b42b7c_62561.png )