---
title: How to handle code conflicts
origin-url: https://gitee.ru/help/articles/4194
---

Conflict merging usually occurs when there are differences between the local commits and the commits on the server, and Git cannot automatically merge the file changes in these differences. Therefore, manual merging is required.

For example, I execute `git pull origin master`

If Git can merge automatically, the process looks like this:

![Image Description](./assets/113507_cca8cd22_62561.gif)

When pulling, Git automatically merges and generates a commit.

### **If Git cannot merge automatically, it will prompt**

![Image Description](./assets/113621_dbc985b5_62561.png)

At this time, we can know that README.MD has conflicts and needs to be resolved manually by modifying README.MD

![Image Description](./assets/113823_fffe18cf_62561.png)

It can be seen that there is a conflict in the code on the line where 1+1= is written. The goal of resolving conflicts is to keep the desired code, here we keep 1+1=2, and then save and exit.

![Image Description](./assets/114159_426b8d65_62561.png)

After exiting, make sure all conflicts are resolved and then you can use

```bash
git add .
git commit -m "fixed conflicts"
git push origin master`
```

You can complete a conflict merge.

The whole process looks like this

![Image Description](./assets/114058_429e8b54_62561.gif)