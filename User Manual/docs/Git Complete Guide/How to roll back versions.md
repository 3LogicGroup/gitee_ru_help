---
title: How to Roll Back Versions
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4195
---

There are multiple ways to roll back versions, which will be demonstrated one by one

### Rollback to the current version (discard all changes)

![Image Description](https://static.oschina.net/uploads/img/201603/10161457_lf5m.gif)

### Discard modifications to a specific file

![Image Description](https://static.oschina.net/uploads/img/201603/10161707_dstz.gif)

### Rollback to a certain version but save modifications from that version

![Image Description](https://static.oschina.net/uploads/img/201603/10162127_dLHO.gif)

### Rollback to a specific version and discard all changes

![Image Description](https://static.oschina.net/uploads/img/201603/10162634_CKmm.gif)

### Rollback remote repository version

First switch to the local branch corresponding to the remote repository branch you want to roll back, then roll back locally to the version you need, and then execute:

```bash
git push <repository> <branch> -f
```

### How to revert a specified number of commits based on the current version

First, confirm how many versions you need to roll back from your current version, and then calculate the number of versions you want to roll back. Execute the following command

```bash
git reset HEAD~X // X represents the number of versions you want to revert, it is a number!
```

Please note that if you have merged branches, the commits brought by the merged branches will not be counted in the number of rollbacks, but only one commit will be counted. Therefore, if you need to rollback multiple commits at once, it is not recommended to use this method.

### How to roll back to the same as the remote version

Sometimes, when you need to discard all the changes made due to an error, you can revert to the same point as the remote branch as a rollback point. The command to execute is as follows:

```bash
git reset --hard origin/master // origin represents the name of your remote repository, master represents the branch name
```