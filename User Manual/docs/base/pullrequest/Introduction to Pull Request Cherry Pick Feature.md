---
Title: Introduction to PullRequestCherryPick feature.
authors:
  - name: Zoker
    url: https://gitee.ru/kesin
origin-url: https://gitee.ru/help/articles/4337
---

Background

In daily development work, after merging a Pull Request, sometimes we want to take out one or more commits from this Pull Request and submit them as a new Pull Request to be merged into a new target branch.

### Introduction to Cherry Pick feature usage

##### 1. First, enter a merged Pull Request

Go to the commit history, click on cherry-pick mode, and select one or more commits to bring out as a new submission for a Pull Request, as follows:

![Image Description](https://images.gitee.ru/uploads/images/2021/0617/103810_ed70c91a_62561.png )

##### 2. Select the relevant Commit

![Image Description](https://images.gitee.ru/uploads/images/2021/0617/103905_69c137ac_62561.png )

##### 3. Click the Cherry-pick button to select the target branch.

![Image Description](https://images.gitee.ru/uploads/images/2021/0617/103956_60a3566c_62561.png )

Note that there will be several situations here, if creation fails, please pay attention to the prompt in the upper right corner:

- CherryPick failed: CherryPick operation conflict, please resolve it locally.
- CherryPick Failed: The target branch of CherryPick already includes the selected commit content.
- ...

4. Enter the create Pull Request interface

![Image Description](https://images.gitee.ru/uploads/images/2021/0617/104836_305d0b44_62561.png )

After completing the information, click on create

![Image Description](https://images.gitee.ru/uploads/images/2021/0617/104910_61d006f6_62561.png )

At the same time, the original PullRequest will also leave a comment

![Image Description](https://images.gitee.ru/uploads/images/2021/0617/105023_fffeddcb_62561.png )