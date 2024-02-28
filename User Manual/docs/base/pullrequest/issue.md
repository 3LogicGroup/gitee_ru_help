---
title: PullRequest associated with Issue
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4142
---

By associating an issue with a pull request, users can close the issue when closing the pull request. The association feature has the following characteristics:

1. A PR can be associated with multiple issues, for example, simultaneously associated with issue1, issue2 in the format: `#issue1ident, #issue2dent`
2. After PR is associated with an issue, the status of the issue will automatically change to 'In Progress'. When the PR is merged, the issue will be closed.
3. Difference between Personal and Enterprise versions:
>
> - Personal version, PR can only associate tasks from the current repository.
> - Enterprise version, PP can be associated with tasks of all enterprises.

## The specific steps to associate an Issue with a Pull Request are as follows

#### 1. Specify the ident of the issue that needs to be closed in the content of the PR, for example

![Image Description](https://images.gitee.ru/uploads/images/2021/0820/014040_20105e6c_551147.png)

#### 2. You can see the association on the issue details page

![Image Description](https://images.gitee.ru/uploads/images/2021/0820/014040_08507522_551147.png)

#### 3. When the associated issue of the PR is closed after it is merged

![Image Description](https://images.gitee.ru/uploads/images/2021/0820/014040_5d7b8f12_551147.png)