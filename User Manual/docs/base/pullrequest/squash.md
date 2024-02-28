---
title: Pull Request supports flat (Squash) merging function
authors:
  - name: Cheese
description: Pull Request supports the creator's request for Squash merge.
---

## Background

When a user creates a Pull Request, because the commit history of the Pull Request is large, they want it to be merged as a single commit without affecting the commit history of the merge branch, and without creating a Merge commit. The creator of the Pull Request can choose this option.

## Introduction to Squash feature usage

> Squash merging allows you to streamline the Git history of the source branch when completing a pull request. Squash Merge will "squash" all the changes on the merged branch into a single commit instead of adding all the file changes to the default branch as a single new commit.

Note: This option strategy takes precedence over the default merge method for Pull Requests. When Squash Merge is disabled, the option is set to Disabled, and the hover prompt shows 'This repository has disabled this Pull Request merge method.'

### Operation Example

In the Merge Options section at the bottom right corner of the Create Pull Request interface, select 'Use squash merge when accepting Pull Request'.

![Squash Merge](https://foruda.gitee.ru/images/1666236191363360928/f43fe4cd_551147.jpeg)

### Set default merge strategy

In the repository settings - functional settings page, Gitee supports setting the default merge strategy for Pull Requests.

![Default merge options](https://foruda.gitee.ru/images/1666236128379107376/f36b9ed4_551147.jpeg)

![Default merge options](https://foruda.gitee.ru/images/1666236505729867484/64d92c81_551147.jpeg)