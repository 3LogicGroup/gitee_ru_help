---
title: What is a Release
---
 

## Introduction

`Release` is a top-level object with `Changelogs` and binary files, representing all project history up to a specific point in time beyond the Git architecture itself.

## Purpose of Release

By using `release`, not only can you view the project history through source code, but you can also further describe the project state through pre-compiled binary files.

The meaning and significance of "beyond the Git architecture itself"
>
> 1. git itself can only record project modifications, and it is not suitable for recording compiled binary files of projects.
> 2. **Through `release`, developers can save the compiled binary files of the project when releasing a version, making it convenient for users to download and search for specific versions of binary files.**
>  

## Summary of Release Features

Combining the characteristics described in the previous section `beyond the Git architecture itself`, the following can be understood and summarized:
>
> 1. Release versions are not a native capability provided by Git, but a version management capability based on Git provided by platforms (such as [Gitee]) that offer hosting capabilities.
2. Users can quickly download the corresponding version binary files through `release` when accessing the project, without downloading the source code and compiling it locally, greatly reducing the learning cost for users to use the software.
In a release, it generally includes `the source code of the corresponding release version`, `the compressed package of the source code of the corresponding release version` (which can be downloaded from the platform's Archive without using Git command to clone and check out), and `the binary files uploaded by the developer when creating the release` (i.e., attachments).
> 4. `Binary files uploaded by developers when creating releases` (i.e., attachments) are uploaded by developers in the release

## Use and Management of Releases

You can create releases on [Gitee] to package software, release notes, and attachments for others to download.

By creating a distribution, you can deliver iterations of your project to users.

> Repository collaborators and people with write access to the repository can create, edit, and delete releases.