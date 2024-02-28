---
title: Fork+PullRequest mode
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4128
---

The most common and recommended way to participate in repository development on Gitee is the 'Fork + Pull' model. In the 'Fork + Pull' model, repository contributors do not need to apply for commit permissions from the repository creator. Instead, they create a fork of the repository in their own hosting space. As for the commits created in the forked repository, they can easily use Gitee's Pull Request tool to send a Pull Request to the original repository maintainer.

### 1. What is Pull Request?

A Pull Request is a way to submit changes between two repositories, usually used for submitting differences between forked and original repositories. It is also a very good way for team collaboration. Now, let's explain how to submit a Pull Request on the Gitee platform:

Note: Gitee platform requires the source repository and the target repository to have a fork relationship in order to submit a Pull Request. So, if you want to submit a Pull Request, you must first fork a repository and then submit the Pull Request to that repository. Additionally, you can also submit Pull Requests to all repositories that have the fork relationship with that parent repository.

### 2. How to fork a repository

Forking a repository is very simple. Go to the repository page, then find the fork button in the upper right corner. After clicking, select the namespace to fork to, then click confirm and wait for the system to complete the repository cloning operation in the background. The fork operation is complete, as shown in the figure:

![](Fork+PullRequest%E6%A8%A1%E5%BC%8F.assets/image.png)

### 3. How to submit a Pull Request

First, your repository must have differences with the target repository in order to submit, such as this:

![](Fork+PullRequest%E6%A8%A1%E5%BC%8F.assets/image-1.png)

If there are no differences or the target branch is newer than the branch you submitted the Pull Request to, you will receive this prompt:

![](Fork+PullRequest%E6%A8%A1%E5%BC%8F.assets/image-2.png)

Then, fill in the description of the Pull Request, click on 'Submit Pull Request', and you can submit a

![](Fork+PullRequest%E6%A8%A1%E5%BC%8F.assets/image-3.png)

4. How to manage existing Pull Requests

First, for an existing Pull Request, if you only have permissions as an observer or reporter, your access will be restricted. Please refer to the Gitee platform documentation on role permissions for specific restrictions. The following information only applies to administrator permissions. If you notice any differences, please check if you have administrator permissions or if you are the creator of the Pull Request.

### 5. How to modify an existing Pull Request

Click the edit button in the top right corner of the Pull Request details page, and an edit box will pop up. Modify the information you need to modify in the edit box, and then click Save to modify the Pull Request, as shown in the following figure:

![](Fork+PullRequest%E6%A8%A1%E5%BC%8F.assets/image-4.png)

Please note that on this page, you can assign responsible persons and testers to the Pull Request. Each operation will notify the corresponding personnel

### 6. How to submit bug fixes to a Pull Request

For bug fixes or any updates in Pull Requests, there is no need to submit a new Pull Request. Just push to the branch where you submitted the Pull Request, and later our backend will automatically update these commits and add them to this Pull Request.

### 7. What to do if a Pull Request cannot be automatically merged

After submitting a Pull Request, during the handling of this Pull Request, it changes from being able to be automatically merged to not being able to be automatically merged. This is a very normal thing. At this point, we have two options. One is to continue merging to the target and manually resolve the conflicting parts. The other is to resolve the conflict first, so that the Pull Request is in a mergeable state, and then use automatic merging. Generally, we officially recommend the second option, which is to resolve the conflict first and then merge. The specific operation is as follows:

First, switch to the branch where you want to submit the Pull Request locally, then fetch the target branch to the local. At this point, conflicts may occur, refer to the section [How to handle code conflicts](/help/articles/4194) to resolve the conflicts. After resolving the conflicts, commit to the branch where the Pull Request is located. Wait for the system to complete the update of the Pull Request in the background, and the Pull Request will be in the automatically mergeable state.

### 8. What if a Pull Request was accidentally merged? Can it be rolled back?

For a wrongly merged Pull Request, we provide a rollback functionality that generates a rollback XXX Pull Request. Accepting this Pull Request will complete the rollback action. Note that rollback essentially submits a completely opposite Pull Request, so you still need to test it for integrity. Also, to avoid breaking other Pull Requests, it is recommended to perform the rollback action only when the Pull Request to be rolled back is the last merge operation and there are no more commits above it. Otherwise, please handle it manually.