---
title: Issue and PullRequest templates

origin-url: https://gitee.ru/help/articles/4145
---

Gitee provides default templates for Issue and Pull Request, which facilitate developers to use them in a standard format. Users can use the Issue and Pull Request templates in the following ways.

## Check the template when creating a new repository

When creating a new repository, checking "Use issue template" actually creates a .gitee/ISSUE_TEMPLATE.zh-CN.md file in the root directory of the repository.

![](Issue%E5%92%8CPullRequest%E6%A8%A1%E6%9D%BF.assets/image.png)

## Create .gitee directory in the repository, then add template files

1. .gitee/ISSUE_TEMPLATE.zh-CN.md, issue Chinese template
2. .gitee/ISSUE_TEMPLATE.en.md, issue English template
3. .gitee/ISSUE_TEMPLATE.zh-TW.md, issue traditional Chinese template
4. .gitee/PULL_REQUEST_TEMPLATE.zh-CN.md, PR Chinese template
5. .gitee/PULL_REQUEST_TEMPLATE.en.md, PR English template
6. .gitee/PULL_REQUEST_TEMPLATE.zh-TW.md, PR traditional Chinese template

> Q: What is the purpose of different types of templates?
>
> A: For example, if there are 3 language types of issue templates in your repository, and the user submitting the issue is using the English version, then when the user checks 'Use issue template', the English template will be intelligently used. If the user is using the Chinese version, the Chinese issue template will be intelligently used.

- When creating an issue, check 'Use issue template' to fill the issue content with the template content

![](Issue%E5%92%8CPullRequest%E6%A8%A1%E6%9D%BF.assets/image-1.png)

- When creating a PR, check 'Use Pull Request Template' to populate the PR content with the template.

![](Issue%E5%92%8CPullRequest%E6%A8%A1%E6%9D%BF.assets/image-2.png)