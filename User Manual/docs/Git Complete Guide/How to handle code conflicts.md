---
title: How to handle code conflicts
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4194
---

Conflict merging usually occurs when there are differences between the local commits and the commits on the server, and Git cannot automatically merge the file changes in these differences, so manual merging is required.

For example, I execute `git pull origin master`

"#### If Git can merge automatically, then the process looks like this"

![Image Description](http://git.oschina.net/uploads/images/2016/0226/113507_cca8cd22_62561.gif)

During the fetch, Git automatically merges and generates a commit.

#### If Git cannot merge automatically, it will prompt

![Image Description](http://git.oschina.net/uploads/images/2016/0226/113621_dbc985b5_62561.png)

At this point, we can see that there is a conflict with `README.MD` and we need to resolve it manually by modifying `README.MD` to resolve the conflict.

![Image Description](http://git.oschina.net/uploads/images/2016/0226/113823_fffe18cf_62561.png)

It can be seen that there is a conflict on the line of code 1+1=?, the goal of resolving the conflict is to keep the desired code, here keep 1+1=2, then save and exit

![Image Description](http://git.oschina.net/uploads/images/2016/0226/114159_426b8d65_62561.png)

After exiting, make sure all conflicts are resolved, and then you can use

```bash
git add .
git commit -m "fixed conflicts"
git push origin master`
```

You can complete a merge conflict by

The entire process looks like this

![Image Description](http://git.oschina.net/uploads/images/2016/0226/114058_429e8b54_62561.gif)