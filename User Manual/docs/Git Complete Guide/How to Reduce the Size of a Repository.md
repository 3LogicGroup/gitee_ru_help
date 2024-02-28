---
title: How to Reduce Repository Size
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4199
---

Because our Gitee platform currently only provides 500M of repository size, and the single file is limited to 100M. If you accidentally include a large binary file in your repository, the repository will quickly exceed our specified size. In this case, you need to streamline your repository to prevent the repository from being inaccessible due to exceeding the specified size. Here is the command to streamline the repository size:

View large files in the repository

```bash
git rev-list --objects --all | grep -E `git verify-pack -v .git/objects/pack/*.idx | sort -k 3 -n | tail -10 | awk '{print$1}' | sed ':a;N;$!ba;s/
/|/g'`
```

Rewrite history, remove large files

```bash
git filter-branch --tree-filter 'rm -f path/to/large/files' --tag-name-filter cat -- --all
git push origin --tags --force
git push origin --all --force
```

And inform all team members that before pushing code, they need to pull rebase instead of merge. Otherwise, it will introduce the repository from the team member's local repository to the remote repository, causing the repository to be blocked by the Gitee system.

For more specific operations, you can click [here](http://my.oschina.net/jfinal/blog/215624?fromerr=ZTZ6c38X) to view.