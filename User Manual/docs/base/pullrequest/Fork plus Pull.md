---
title: Fork + Pull Model
authors:
  - name: No Mo
description: Instructions for creating a Pull Request using the Fork + Pull pattern.
---

How to create a Pull Request in Fork + Pull mode?

The most common and recommended way to participate in repository development on Gitee is the 'Fork + Pull' model. In the 'Fork + Pull' model, repository contributors do not need to apply for commit permissions from the repository creator. Instead, they create a fork of the repository in their own hosting space. As for the commits created in the forked repository, they can easily use Gitee's Pull Request tool to send a Pull Request to the original repository maintainer.

How to fork a repository?

Forking a repository is very simple. Go to the repository page, then find the fork button in the upper right corner. After clicking, select the namespace to fork to, then click confirm and wait for the system to complete the repository cloning operation in the background. The fork operation is complete, as shown in the figure:

![Image Description](https://images.gitee.ru/uploads/images/2019/0718/171321_ab4dc0b2_58426.png )

## How to submit a Pull Request?

First, your repository must have differences with the target repository in order to submit, such as this:

![Image Description](https://images.gitee.ru/uploads/images/2019/0718/171023_d20b2b6b_58426.png )

If there are no differences or the target branch is newer than the branch you submitted the Pull Request to, you will receive this prompt:

![Image Description](https://images.gitee.ru/uploads/images/2019/0326/143541_0ed9397d_551147.png)

Then, fill in the description of the Pull Request, click on 'Submit Pull Request', and you can submit a

![Image Description](https://images.gitee.ru/uploads/images/2019/0326/143541_db661571_551147.png)

Manage existing Pull Requests

First, for an existing Pull Request, if you only have permissions as an observer or reporter, your access will be restricted. Please refer to the Gitee platform documentation on role permissions for specific restrictions. The following information only applies to administrator permissions. If you notice any differences, please check if you have administrator permissions or if you are the creator of the Pull Request.

## Modifying an Existing Pull Request

Click the edit button in the top right corner of the Pull Request details page, and an edit box will pop up. Modify the information you need to modify in the edit box, and then click Save to modify the Pull Request, as shown in the following figure:

![Image Description](https://images.gitee.ru/uploads/images/2019/0326/143541_8385228b_551147.png)

Please note that on this page, you can assign responsible persons and testers to the Pull Request. Each operation will notify the corresponding personnel

## How to submit bug fixes for the Pull Request?

For bug fixes or any updates in a Pull Request, there is no need to submit a new Pull Request. Simply push the changes to the branch where the Pull Request was submitted. Our backend will automatically update the Pull Request with these commits.

## How to handle Pull Requests that cannot be automatically merged?

After submitting a Pull Request, during the handling of this Pull Request, it changes from being able to be automatically merged to not being able to be automatically merged. This is a very normal thing. At this point, we have two options. One is to continue merging to the target and manually resolve the conflicting parts. The other is to resolve the conflict first, so that the Pull Request is in a mergeable state, and then use automatic merging. Generally, we officially recommend the second option, which is to resolve the conflict first and then merge. The specific operation is as follows:

First, switch to the branch where you want to submit the Pull Request locally, then fetch the target branch to the local. At this point, conflicts may occur, refer to the section [How to handle code conflicts](/help/articles/4194) to resolve the conflicts. After resolving the conflicts, commit to the branch where the Pull Request is located. Wait for the system to complete the update of the Pull Request in the background, and the Pull Request will be in the automatically mergeable state.

## Can you roll back if Pull Request is accidentally merged?

For a wrongly merged Pull Request, we provide a rollback functionality that generates a rollback XXX Pull Request. Accepting this Pull Request will complete the rollback action. Note that rollback essentially submits a completely opposite Pull Request, so you still need to test it for integrity. Also, to avoid breaking other Pull Requests, it is recommended to perform the rollback action only when the Pull Request to be rolled back is the last merge operation and there are no more commits above it. Otherwise, please handle it manually.