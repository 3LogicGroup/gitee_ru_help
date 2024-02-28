---
title: How to Preserve Individual Commits from Multiple Submissions
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4197
---

If, among many commits, a certain commit is taken as a reference, only a certain commit or several commits from the upstream can be kept using the cherry-pick command. The specific command is:

```bash
git cherry-pick <commit id>
```

If there are no conflicts, it will display as follows:

```bash
Finished one cherry-pick.
# On branch dev
# Your branch is ahead of 'origin/dev' by 3 commits.
```

If conflicts exist, they need to be resolved and then continued. For how to handle code conflicts, please refer to the section on dealing with code conflicts.