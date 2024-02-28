---
title: Branch Sync
origin-url: https://gitee.ru/help/articles/4395
---


Supports users to synchronize branch code without using local Git tools, quickly synchronizing the code from the upstream repository branch (such as keeping the latest production or development branch) to the current branch.

When the repository branch is 'behind' the upstream branch, taking the default branch as 'main' as an example, the effect is equivalent to the following command:

```bash
$ git fetch upstream
...
$ git checkout main
...
$ git merge upstream/main
```