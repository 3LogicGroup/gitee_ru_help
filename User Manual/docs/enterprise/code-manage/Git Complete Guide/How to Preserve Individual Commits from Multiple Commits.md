---
title: How to keep individual commits from multiple submissions
origin-url: https://gitee.ru/help/articles/4197
---

If, among numerous commits, a specific commit is taken as a reference and only certain commits from the upstream are to be kept, the cherry-pick command can be used. The specific command is:

```bash
git cherry-pick <commit id>
```

If there is no conflict, it will be displayed as follows:

```bash
Finished one cherry-pick.
# On branch dev
# Your branch is ahead of 'origin/dev' by 3 commits.
```

If there is a conflict, you need to resolve the conflict and continue. Please refer to the section on how to handle code conflicts for more information.