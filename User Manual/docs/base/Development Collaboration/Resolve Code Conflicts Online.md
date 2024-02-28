---
title: Resolve Code Conflicts Online
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4305
---

### Feature Introduction

When encountering code conflicts in the process of using Pull Request, it is often necessary to retrieve the code locally, handle the code conflicts through 'git merge', and then push it back to the repository.

Gitee provides a solution to resolve conflicts online using the WebIDE, allowing conflict resolution to be completed on the webpage without the need for a client operation.

### Resolve conflicts online through WebIDE

1. On the PR page where code conflicts occur, click 'Try to resolve conflicts through WebIDE' to enter WebIDE.
2. Select the corresponding conflicting code file, find the conflicting code segment, and select the appropriate code change and accept it.
3. 'Stash' the modified files, then click 'Commit' to submit the conflict resolved code to the PR source branch, and go back to the Pull Request.