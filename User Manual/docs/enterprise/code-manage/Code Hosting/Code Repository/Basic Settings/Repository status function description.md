---
title: Repository status function description
origin-url: https://gitee.ru/help/articles/4343
---



## Repository status function description

### Pausing and closing repositories

This feature is used to change the repository status, which helps ① optimize enterprise resource display; ② reduce enterprise costs; ③ improve the efficiency of developers' work.

### **The scope of functional impact is as follows:**

| Feature Module | Feature Point / Specific Operation | Enable | Pause | Disable |
|------|-------------------|----|----|----|---|
| Interface Display | Dashboard, Project List, Dropdown Filter List | Show | Hide | Hide |
| Code | View Code, Pull | ✅ | ✅ | ✅ |
|      | Delete Code, Push | ✅ | ❌ | ❌ |
| Files | Create File / Folder / Upload Attachment | ✅ | ❌ | ❌ |
| Branches | Create, Edit, Delete | ✅ | ❌ | ❌ |
| Tags | Create, Import, Edit | ✅ | ❌ | ❌ |
| Distribution | Create, Edit, Delete | ✅ | ❌ | ❌ |
| Milestone  | Associated Repository  | ✅  | ✅  | ❌  |
| PR  | Create, merge, rollback, close, edit, assign	      | ✅  |
  ❌  | ❌  |
|     | Review, Test, Comment  | ✅  | ✅  | ❌  |
| Wiki | Create, modify, delete | ✅ | ❌ | ❌ |
| Issue | Creating, editing, commenting, assigning, transitioning status, associating repositories | ✅ | ✅ | ❌ |
| Repository | Access repository, modify repository state | ✅ | ✅ | ✅ |
|   | Comment, settings | ✅ | ✅ | ❌ |
|    | Delete              | ✅  | ✅  | ✅  |
> The scope of changes only includes the above content, and other functions not mentioned are not modified by default.

### **1. Repository visibility:**

In the workbench, project list, and drop-down filter list, all repositories with statuses of 'Paused' and 'Closed' will be hidden

### **2. Repositories in suspended state:**

Paused repositories will be subject to the following operation restrictions:

1. Code: Limit access/view/pull code, no restrictions on push/delete code;
2. Files: Limit new file, new folder, upload attachment;
3. Branches: Limit new, modify, edit, delete;
4. Tags: Limit new, import, edit;
5. Distribution: Limit new, edit, and delete;
6. PR: Limit new, merge, revert, close, edit, assign; do not limit comment, review, test;
7. Wiki: Limitations on creating, modifying, and deleting, but not on viewing
8. Repository: Limit deletion, no restriction on access, comments, and other settings except deletion;

### **3. Repositories in closed state:**

Repositories in the closed state will further restrict repository functionality, only retaining the ability to view/pull code, access the repository, and modify repository status.