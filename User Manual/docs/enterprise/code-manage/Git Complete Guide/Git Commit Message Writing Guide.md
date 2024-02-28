---
title: Git Commit Message Writing Guide
origin-url: https://gitee.ru/help/articles/4231
---

### **Introduction**

In Git, every time you commit code, you need to write a Commit message, otherwise the commit will not be allowed. This operation will be done by

```bash
git commit -m "hello world"
```

> The -m parameter in the above code is used to specify the commit message.
If a line is not enough, you can only execute git commit, it will bring up a text editor for you to write multiple lines.

```bash
git commit
```

### **Format**

Commit message consists of three parts: Header, Body, and Footer. It can be represented by the following structure.

```bash
<type>(<scope>): <subject>// Empty line<body>// Empty line<footer>
```

The Header is required, while the Body and Footer can be omitted (ignored by default). Generally, when we specify the -m parameter in the git commit command, it is equivalent to specifying the Header by default.
> Regardless of which part, no line should exceed 72 characters (or 100 characters). This is to avoid automatic line breaks affecting the aesthetics.

### **Header**

The header section only has one line, including three fields: type (required), scope (optional), and subject (required).

#### **type**

- feat: new feature
- fix: Fixing a bug
- docs: Documentation
style: formatting (changes that do not affect code execution)
- refactor: Refactoring (i.e., code changes that are neither adding new features nor modifying bugs)
- test: Add test
- chore: changes in build process or auxiliary tools

If the type is feat or fix, this commit will definitely appear in the Change log

#### **scope**

The scope is used to indicate the scope of the commit's impact, such as data layer, control layer, view layer, etc., depending on the repository.

#### **subject**

subject is a brief description of the commit's purpose, not exceeding 50 characters.

- Start with a verb, use the first person present tense, such as change, instead of changed or changes.
- First letter lowercase
- Do not end with a period (.)

### **Body**

The body section is a detailed description of this commit, which can be divided into multiple lines. Here is an example.

> More detailed explanatory text, if necessary. Wrap it to about 72 characters or so. Further paragraphs come after blank lines.- Bullet points are okay, too- Use a hanging indent

There are two important points.

- Use the first person present tense, for example, use 'change' instead of 'changed' or 'changes'.
- The motivation for code changes should be explained, as well as a comparison with previous behavior.

### **Footer**

Footer is only used for two situations.

#### **1. Incompatible changes**

If the current code is not compatible with the previous version, the Footer section starts with BREAKING CHANGE, followed by a description of the changes, the reason for the changes, and migration methods.

```bash
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### **2. Close Issue**

If the current commit is related to an issue, it can be closed in the Footer section.

> Closes #234

You can also close multiple issues at once.

> Closes #123, #245, #992

### **Revert**

There is also a special case where if the current commit is used to revert a previous commit, it must start with 'revert:', followed by the Header of the commit being reverted.

> revert: feat(pencil): add 'graphiteWidth' option

> This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

The format of the body section is fixed and must be written as 'This reverts commit <hash>', where the hash is the SHA identifier of the commit being reverted.

If the current commit and the commit being reverted are in the same release, they will not appear in the Change log. If they are in different releases, the current commit will appear under the Reverts section in the Change log.

This article is excerpted from Ruanyifeng's blog ["Git Commit message writing guide"](https://gitee.ru/link?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2016%2F01%2Fcommit_message_change_log.html)