---
title: Protect Branch and Review Mode of Protected Branch
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4239
---

## How to Set Up Branch Protection

"Protected branch" is a feature of Gitee for managing code permissions in team collaborations. It is used to reduce losses caused by members' accidental operations. It protects critical branches from being destroyed. After protection, only the repository administrator can modify, merge, and perform other operations on this branch.

Go to the repository, then click on 'Code' -> 'Branch' -> 'Protected Branch' to enable protected branches.

![Image Description](https://images.gitee.ru/uploads/images/2018/1224/114942_833faf97_669935.png )

![Image Description](https://images.gitee.ru/uploads/images/2018/1224/124035_26d7b115_669935.png )

> Gitee can now set a protected branch to **Review Mode**, where any push to this branch without permission will automatically create (or update) a Pull Request.

I don't know if you developers have had this experience. After we receive a task, we need to go through the following process to complete it:

1. Update the main branch locally, create and switch to a new branch based on the main branch
2. Coding...
3. Push this branch to the remote
4. Open Gitee and go to the 'Create Pull Request' page.
5. Select the target branch
6. Fill in the Title and Description
7. Click 'Submit Pull Request'

At this time, some students feel cumbersome:

- 'Even though the tasks and subsequent test cases to be done have been clearly stated, why do I have to write them again?'
- 'I have already provided detailed commit information, no need to repeat'
- "Can't you automatically create a pull request for me if I can't push, and then automatically associate it with the branch-related tasks?"
- **...**

So, is there a way to quickly create a Pull Request?

The answer is: **Yes!**

## Protected Branch Review Mode

### New Feature: Review Mode for Protecting Branches

To solve the problem of the cumbersome process of creating a pull request mentioned above, we have extended protected branches and divided them into two modes:

- Standard mode: consistent with the logic of the original protected branch, strictly follow the permissions for pushing and merging, if no permission, the push will be rejected.
- **Review mode:** The only difference from the standard mode is that **if the user does not have push permissions, their push will automatically create (or update) a Pull Request**.

![Image Description](https://images.gitee.ru/uploads/images/2021/0714/153335_36e33ed4_62561.png )

Here, in **Repository Management - Protected Branch Settings**, I added a protected branch rule `review` and set it to review mode and prohibit anyone from pushing. So, no matter who (provided they are repository members) pushes code to the `review` branch, it will automatically create a Pull Request:

![Image Description](https://images.gitee.ru/uploads/images/2021/0714/150632_2426aa33_62561.png "1.png")

You can see that the server found that the `review` branch is a protected branch in review mode, and I don't have permission to push to this branch (because it is set to prohibit anyone from pushing). Gitee automatically created a Pull Request for the commit I pushed to the `review` branch and provided the address for access.

If I make another commit and push again, Gitee detects that I have already been automatically created on this branch.

![Image Description](https://images.gitee.ru/uploads/images/2021/0714/154106_2ca73096_62561.png "3.png")

At this time, we can go to Gitee and see that the automatically created Pull Request has been updated

![Image Description](https://images.gitee.ru/uploads/images/2021/0714/154449_07a6958a_62561.png "4.png")

In addition, you can also update the Pull Request directly through the automatically created source branch, which is the 'auto-62561-review-1625833887273' branch created above. The specific steps are as follows

```bash
git fetch
git checkout auto-62561-review-1625833887273
// Coding...
git add {xxfile}
git commit -m "update auto pr"
git push origin auto-62561-review-1625833887273
```

### Automatic creation & updating of Pull Request rules

"To update a Pull Request on a protected branch in review mode, the commit pushed must fully include the diff commit of the Pull Request. Otherwise, a new Pull Request will be created." This statement may seem very convoluted, so let's break it down. Below is a detailed explanation of automatically creating and updating Pull Requests.

We make the following agreements

The `remote` indicates the remote
- `local` represents local
- `result` represents the result
- `1-2-3-4` represents four commits, with the latest being `4`
- `PR stands for Pull Request`

We agreed that there are four commits in the remote repository: `remote: 1-2-3-4`

```text
Case1
local: 1-2-3-4-5
result: Created PR-a containing 5

Case2
local: 1-2-3-4-5-6
result: Updated PR-a contains 5-6 (because there is already a PR, and this version is the parent set of the diff of this PR, so it can be updated).

Case3
local: 1-2-3-4-5-7 modified commit 6 and became commit 7 (revert or commit --amend operation)
result: Created PR-b includes 5-7 (the existing PR is not a subset of this version, so create a new PR).
```

### Recommended Usage

Although the automatic creation of Pull Requests provided by the review mode is convenient, it can confuse developers if they keep switching branches. Therefore, two recommended usage methods are: 1) Using 'Lightweight PR', developers can contribute code (add, delete, modify code, etc.) directly on the web and submit a Pull Request to the open-source project repository with just one click, eliminating the need for many intermediate steps.

**One, Local Branch Development**

![Image Description](https://images.gitee.ru/uploads/images/2021/0714/163512_b2692312_62561.png "5.png")

**Two, Local Trunk Development**

![Image Description](https://images.gitee.ru/uploads/images/2021/0714/163759_e32154c4_62561.png "6.png")

Come and experience it!