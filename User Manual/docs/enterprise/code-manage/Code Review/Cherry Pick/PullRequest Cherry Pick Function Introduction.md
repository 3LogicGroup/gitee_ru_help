---
title: Introduction to PullRequest Cherry Pick feature
origin-url: https://gitee.ru/help/articles/4337
---


### **Background**

In daily development work, after merging a PullRequest, sometimes we want to take out one or more commits from this PullRequest and submit them as a new PullRequest, then merge them into a new target branch.

### **Introduction to Cherry Pick feature usage**

#### **1. First, enter a Pull Request**

Go to the commit history, click on cherry-pick mode, select one or more commits to bring out as a new commit for a Pull Request, as follows:
![Image Description](../../../../../assets/image168.png)

Select the relevant Commit

#### **3. Click the Cherry-pick button to select the target branch**

![Image Description](../../../../../assets/image169.png)

It is important to note that there may be several scenarios here. If the creation fails, please pay attention to the prompt in the upper right corner.

- CherryPick failed: CherryPick operation conflicts, please handle locally.
- CherryPick Failed: The target branch of CherryPick already contains the selected commit content.
- ...

#### **4. Enter the create PullRequest interface**

After completing the information, click create

At the same time, the original PullRequest will also leave a comment