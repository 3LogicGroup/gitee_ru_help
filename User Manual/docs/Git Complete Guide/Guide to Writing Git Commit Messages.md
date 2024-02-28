---
title: Guidelines for writing Git commit messages
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4231
---

## Introduction

In Git, every time you commit code, you need to write a commit message, otherwise the commit will not be allowed. This operation will be done through git commit.

```bash
git commit -m "hello world"
```

> The -m parameter in the above code is used to specify the commit message.

If one line is not enough, you can just execute `git commit`, and it will bring up a text editor for you to write multiple lines.

```bash
git commit
```

## Format

Commit message consists of three parts: Header, Body, and Footer. Its structure can be represented using the format below.

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

> The Header is required, the Body and Footer can be omitted (default ignored). Generally, the '-m' parameter specified when committing with 'git commit' is equivalent to specifying the default Header.

> Regardless of which section, no line should exceed 72 characters (or 100 characters). This is to avoid automatic line breaks affecting the aesthetics.

### Header

The Header part consists of only one line, including three fields: type (required), scope (optional), and subject (required).

#### type

- **feat**: new feature
- **fix**: Patch bug
- **docs**: Documentation
- **style**: format (changes that do not affect the code execution)
- refactor: Refactor (code changes that are not new features or bug fixes)
- **test**: Add tests
- **chore**: Changes to the build process or auxiliary tools

If the type is feat or fix, this commit will definitely appear in the Change log. For other cases (docs, chore, style, refactor, test), it is up to you to decide whether to include them in the Change log. It is recommended not to include them.

#### scope

scope is used to indicate the scope of the commit, such as data layer, control layer, view layer, etc., which varies depending on the repository.

#### subject

subject is a brief description of the commit purpose, not exceeding 50 characters.

- Start with a verb, use first person present tense, e.g., change, not changed or changes.
- First letter lowercase
- Do not end with a period (.)

### Body

The body section is a detailed description of this commit, and it can be split into multiple lines. Here is an example.

> More detailed explanatory text, if necessary. Wrap it to about 72 characters or so. Further paragraphs come after blank lines.- Bullet points are okay, too- Use a hanging indent

There are two points to note.

- Use the first-person present tense, such as using 'change' instead of 'changed' or 'changes'.
- Should explain the motivation behind code changes and compare them to previous behavior.

### Footer

The Footer section is only used for two cases.

#### 1, Incompatible Changes

If the current code is not compatible with the previous version, the Footer section starts with BREAKING CHANGE, followed by a description of the changes, the reasons for the changes, and migration methods.

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

#### 2. Close Issue

If the current commit is related to an issue, you can close the issue in the Footer section.

> Closes #234

You can also close multiple issues at once.

>Closes #123, #245, #992

### Revert

There is another special case where if the current commit is used to undo a previous commit, it must start with revert: followed by the Header of the commit being undone.

> revert: feat(pencil): add 'graphiteWidth' option
>
> This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

The format of the Body section is fixed and must be written as 'This reverts commit <hash>.,' where the hash is the SHA identifier of the commit being reverted.

If the current commit and the commit being reverted are in the same release, they will not appear in the Change log. If they are in different releases, the current commit will appear under the Reverts subsection of the Change log.

This article is excerpted from Ruanyifeng's blog post ['A Guide to Writing Git Commit Messages'](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)