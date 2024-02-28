---
title: How to Rollback to a Previous Version
origin-url: https://gitee.ru/help/articles/4195
---

## There are multiple ways to roll back the version, as shown below:

### **Rollback to Current Version (Discard all changes)**

![Image Description](./assets/10161457_lf5m.gif)

Abandon changes to a specific file

![Image Description](./assets/10161707_dstz.gif)

### **Rollback to a Version while Preserving Changes Made Since that Version**

![Image Description](./assets/10162127_dLHO.gif)

### **Roll back to a certain version and discard all modifications**

![Image Description](./assets/10162634_CKmm.gif)

### **Rollback remote repository version**

First switch to the local branch corresponding to the remote repository branch you want to roll back, then roll back locally to the version you need, and then execute:

```bash
git push <repository name> <branch name> -f
```

How to revert a specific number of commits based on the current version

First, confirm how many versions you need to rollback in your current version, then calculate the number of versions you want to rollback, and execute the following command

```bash
git reset HEAD~X //X represents the number of versions you want to rollback, it is a number!
```

Note that if you have merged branches, the commits brought by merging branches will not be counted in the rollback count, but only counted as one. Therefore, if you need to rollback multiple commits at once, it is not recommended to use this method.

### **How to roll back to the same version as the remote version**

Sometimes, when it is necessary to abandon all changes made to fix an error, you can revert to the same point as the remote branch by using the remote branch as a fallback point. The command to execute is as follows

```bash
git reset --hard origin/master // 'origin' represents the name of your remote repository, 'master' represents the branch name
```