---
title: What is a Release?
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4328
---

## Introduction

Release is a top-level object with Changelogs and binary files, representing all project history before a specific point in time that goes beyond the Git architecture itself.

## Purpose of Release

Through `release`, not only can you view the project history through source code, but you can also further describe the project status at this time through pre-compiled binary files.

"The significance and role of being "beyond the Git architecture itself" are:
>
> 1. Git itself can only record project modifications, and fundamentally is not suitable for recording compiled project binary files.
By using `release`, developers can save the compiled binary files of the project when releasing a version, making it convenient for users to download and search for specific versions of binary files.

## Summary of Release Features

Combining the characteristics described in the previous section `Beyond the Git architecture itself`, we can understand and summarize as follows:

> 1. The release version is not provided by the native capability of Git, but based on the version management capability of Git-based platforms (such as [Gitee]) provided by hosting platforms.
> 2. When users access a project, they can quickly download the corresponding version binary files through `release` without having to download the source code and compile it locally, greatly reducing the learning cost for users to use the software.
> 3. In a release, it generally includes `source code of the corresponding release version`, `source code compression package of the corresponding release version` (provided by the platform with an Archive download address without the need to clone using Git command), and `binary files uploaded by the developer when creating the release` (i.e., attachments).
> 4. `Binary files uploaded by developers when creating releases` (i.e., attachments) are decided by developers whether to upload when publishing a `release`. In general, developers can provide `pre-made installation packages/executable programs`, `patches`, `version-specific usage documents or development documents`, etc. through the release attachment feature.

[gitee]: https://gitee.ru