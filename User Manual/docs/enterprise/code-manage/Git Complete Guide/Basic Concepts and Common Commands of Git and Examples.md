---
title: Basic Concepts/Common Commands and Examples of Git
origin-url: https://gitee.ru/help/articles/4110
---

### **What is a Repository**

In the concept of Git, a repository refers to all the files in the folder where the .git directory is located, including hidden files. The Git program searches for the .git file in the current directory and the parent directory. If it exists, all the files in the folder where the .git directory is located will be treated as the files you need to manage. Therefore, if you want to treat a certain folder as a Git repository, you can execute the commands in the terminal (Cmd, PoewrShell, or Bash for Windows) under that folder.

```bash
git init
```

In this way, the desired folder becomes a Git-managed repository.

### **What is a Version**

Strictly speaking, Git does not have the concept of versions. However, people have developed this thing called versions in Git. In Git, the counting basis is commits, which we often refer to as commits. Every time we make a change, we can generate a commit. When commits accumulate, they can be marked as a product version. We can put a tag on the current commit and call this tag version X. Please note that in Git, a version is just a tag for a commit and has no other meaning. Git itself only has the tagging function and does not have versioning functionality. The versioning functionality is extended based on tags. Git itself does not have it.

### What is a branch

This is one of the most important and commonly used concepts and features in Git. The branch feature solves the problem of conflicts between the version being developed and the stable version that is deployed. In Git, our default branch is usually Master, but this can be modified. After completing a development on the Master branch and generating a stable version, when we need to add new features or make modifications, we only need to create a new branch and develop on that branch. Once completed, we can merge it into the main branch.

### What is a commit

Commit is also a very important concept in Git. Git manages versions through commits. In the entire Git repository, the code exists not as individual code snippets, but as individual commits. Git uses a 40-character hexadecimal string to identify each commit, which ensures that each commit is uniquely identified. By organizing a sorted list of commits based on time, we form the branches we talk about. Please note that branches are essentially just indexes, so we can freely roll back and make corrections. Even if they are lost for some reason, they can be rebuilt. In addition, regarding Git's storage method: Git only stores the modified parts and does not store the entire file. Therefore, please do not delete the contents of a folder unless you are sure you no longer need it.

### What is a sync

Synchronization, also known as pulling, is a very frequent operation in Git. Unlike SVN, all repositories in Git are equal, so to ensure code consistency, it is recommended to perform a synchronization operation before each operation. Specifically, execute the following command in the working directory:

```bash
git pull origin master
```

The `origin` represents your remote repository, which can be viewed by the command `git remote -v`. `master` is the branch name, if you have a different local branch, please replace it with the name of the other branch. Also, because there may be conflicts between the remote repository and your local repository, please refer to the advanced article on how to handle conflicts when conflicts occur.

### What is a push

Pushing is also a very frequent operation. When your code is updated, you need to update it to the remote repository. This action is called pushing and the command executed is the same as pulling, except that the word 'pull' is changed to 'push'. Similarly, if there are updates in the remote repository that your local repository doesn't have, you need to synchronize before pushing. If you are sure that you don't need the remote updates, you can force push by adding the -f option when pushing, but I do not recommend doing this in collaborative development because it may overwrite others' code.

Example of pushing code:

```bash
git push origin master
```

Force Push Code Example:

```bash
git push origin master -f
```

### What is a conflict

When using Git for development, if only one person is using it, conflicts are unlikely to occur. However, in the case of collaborative development with multiple people, conflicts are a normal occurrence. Please refer to the 'Handling Code Conflicts' section in the Advanced Guide for information on how to handle conflicts.

### What is a merge

The merge command is usually used to merge two branches, typically used for local branches, and remote branches are mostly merged using the Pull command. The function of this command is to merge the branch to be merged with the target branch. Note that this command will only merge the differences before the current version. The commit history of the two branches will be reorganized based on the submission time, so there may only be one conflict but it will generate a commit. If you don't want to generate this commit, add the --base parameter.

### What is staging

This is both a concept and a command. Its meaning is literally as described. Its function is to temporarily store your current work and then do other things. When you finish doing other things, you can switch back and continue. Note that the stash is only for the last change, that is, all changes to the current version. The specific command is:

#### **Stash the current changes:**

```bash
git stash
```

#### **Restore the last staged changes**

```bash
git stash pop
```

#### **Check how many files are in staging**

```bash
git stash list
```

What is a rollback?

Undoing a command is very common because for some reason, we no longer need our changes or the new changes have some problems. We need to revert to a previous version. At this time, we need to use the undo command, or it should be translated as reset. The specific command is as follows:

#### **Revert the Current Modifications:**

```bash
git reset --hard
```

Please note: The above command will completely reset your modifications. If you want to keep certain files, please use the 'checkout + file path' command to undo the modifications individually.

#### If you want to reset to a specific version, you can change --hard to the specific Commit ID like:

```bash
git reset 1d7f5d89346
```

Please note that your changes still exist, but the version number of your most recent commit has been reset to the version you want to reset. If you want to completely discard the changes, just add the --hard parameter.

**The explanations provided here are only some basic concepts and terms of Git that are frequently used in work. They do not include all the terms and concepts of Git. Therefore, if there are terms not mentioned in this document, please use a search engine to find their explanations. Also, please point out any incorrect or missing explanations and provide the correct ones. Thank you.**

Furthermore, this article only mentions some commonly used concepts and commands, but Git has much more than that. Therefore, if you cannot find the content you are looking for in this article, please search on your own. Here, I recommend Git's official documentation (both in Chinese and English, maintained by the official and volunteers): http://git-scm.com/book/zh/v2, and the blog of Liao Xuefeng: http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000.