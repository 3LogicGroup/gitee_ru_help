---
title: Set protected branches
authors:
  - name: Roger
    url: https://gitee.ru/yuriluo
origin-url: https://gitee.ru/help/articles/4295
---

In the actual process of production development collaboration, for internal control considerations, it is often necessary to customize a group of people who have push and merge permissions for certain critical branches. At this time, you can use the 'Protected Branch' feature in the 'Branch Status'.

After being set as a protected branch, only the repository members selected in the corresponding protected branch rules are allowed to merge/push to this branch, as shown in the following figure:

![Image Description](image649.png)

In Gitee Enterprise Edition, the 'Super Administrator', 'Enterprise Owner', and 'Administrator' roles have default repository permissions.

Here are three ways to set up protected branches:

**Method 1**

After creating a branch, select the branch from the Branches page and change the Branch Status to Protected Branch.

![Image Description](image651.png)

The default branch protection rule is that only repository administrators can push code to this branch and merge pull requests made to this branch. If you want to customize the rules, you can click on the settings button on the right side of the 'Protected Branches' dropdown box to enter the editing page for this protection rule.

![Image Description](image652.png)

**Method 2**

1. Go to the **Branch Protection Settings** page and click on **Create Rule**.

![Image Description](image653.png)

2. Enter the name/wildcard rules of the branch to be protected and set the protection rules content.

![Image Description](image654.png)

3. Go to the "Branches" page and set the branch to be protected as "Protected Branch", and the created rule will take effect.

![Image Description](image656-1.png)

If only protection rules are created and the corresponding branch status is not manually set to "Protected Branch", the branch will still be a "Regular Branch".

**Method 3**

Create a branch in the page and push it in the command line with a name that complies with the existing protected branch rules.


Protect branch rules only affect branches with the status of 'Protected Branch', and do not affect 'Regular Branches' and 'Read-only Branches'.

Only one rule can be effective for a branch at the same time, and the earliest effective rule takes priority. When the rule that is effective for the branch itself is changed (no longer meets the effectiveness conditions) or deleted, the branch will automatically match the rule that meets the effectiveness conditions according to the order of creation time.