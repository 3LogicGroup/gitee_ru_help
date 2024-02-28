---
title: Commit Associated with Issue
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4141
---

> Note that Gitee's new solution no longer uses the issue ID to identify issues, but uses ident instead. [Please check here](https://gitee.ru/oschina/git-osc/issues/IE5CI) for specific instructions. To avoid manually entering the issueident incorrectly, it is recommended to directly copy #issueident.

Explanation:

1. When pushing locally, please ensure that the email configured locally is consistent with the registered email of the Gitee account in order to associate the issue correctly.
2. Difference between Personal and Enterprise versions: Commits in personal repositories can only be associated with tasks in that repository, while commits in enterprise repositories can be associated with tasks in the entire enterprise.
3. A commit message can be associated with multiple tasks at the same time, for example: `fix #issue_ident_1 #issue_ident_2` or `fix #issue_ident_1 fix #issue_ident_2`, please separate different issue_idents with spaces.

### 1. commit message associated task

- Keywords: link, linked, linking, relate, related, relating
- Format: Enter `link #issue_ident` or `link issue_url` in the commit message.

> The result will be as follows

![](Commit%E5%85%B3%E8%81%94Issue.assets/image-1.png)

### 2. Close the task with commit

- Keywords: close, closes, closing, closed, fixed, fix, resolved
- Format: enter 'close #issue_ident' in commit message -

> The effect diagram is shown below

![](Commit%E5%85%B3%E8%81%94Issue.assets/image.png)

### 3. Comment on the task through a commit

- Keywords: comment, reply
- Format: To comment on an issue, you can enter the following in the commit message: `comment #issue_ident` or `comment issue_url`.
- The effect is as follows:
![Image Description](https://static.oschina.net/uploads/img/201806/26162619_VN49.png)

### 4. Change Task Status through Commit

- Keywords: state to, change the state to
- Usage:
  - `#issue_ident state to To Do`
  - Change the state of `#issue_ident` to 'To-do'.
  - Change the state of `issue_url` to 'To-do'.
- Change the `issue_url` status to To-do