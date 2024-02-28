---
title: Basic concepts, common commands, and examples of Git
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4110
---

What is a repository

In the concept of Git, a repository is the folder where you have the `.git` directory and all its contents, including hidden files. Git will search for the `.git` file in the current directory and its parent directories. If it exists, all files under the directory where the `.git` directory is located will be treated as the files you want to manage. Therefore, if you want to treat a specific folder as a Git repository, you can execute the command in that folder using a terminal (Cmd, PowerShell, or Bash in Windows).

```bash
git init
```

In this way, the desired folder becomes a Git-managed repository

### What is a version

Strictly speaking, Git does not have the concept of versions. However, people have developed this thing called versions in Git. In Git, the counting basis is commits, which we often refer to as commits.

### What is a branch

This is one of the most important and commonly used concepts and features in Git. The branch feature solves the problem of conflicting stability between the version under development and the deployed version. In Git, our default branch is usually Master, but this can be modified. When we complete a development in the Master branch and generate a stable version, if we need to add new features or make modifications, we only need to create a new branch, develop on that branch, and then merge it into the main branch.

### What is submission

Commit is also a very important concept in Git. Git manages versions through commits. In the entire Git repository, the code exists not as individual code snippets, but as individual commits. Git uses a 40-character hexadecimal string to identify each commit, which ensures that each commit is uniquely identified. By organizing a sorted list of commits based on time, we form the branches we talk about. Please note that branches are essentially just indexes, so we can freely roll back and make corrections. Even if they are lost for some reason, they can be rebuilt. In addition, regarding Git's storage method: Git only stores the modified parts and does not store the entire file. Therefore, please do not delete the contents of a folder unless you are sure you no longer need it.

What is Synchronization

Sync, also known as pull, is a very frequent operation in Git. Unlike SVN, all repositories in Git are equal. Therefore, to ensure code consistency, it is recommended to sync before each operation. To do this, execute the following command in the working directory:

```bash
git pull origin master
```

The `origin` represents your remote repository, which can be viewed by the command `git remote -v`. `master` is the branch name, if you have a different local branch, please replace it with the name of the other branch. Also, because there may be conflicts between the remote repository and your local repository, please refer to the advanced article on how to handle conflicts when conflicts occur.

### What is Push

Just like pulling, pushing is also a very frequent operation. When you have updates in your code, you need to update it to the remote repository, which is called pushing. The command to execute is the same as pulling, just change the word 'pull' to 'push'. Similarly, if there are updates in the remote repository that your local repository does not have, you need to synchronize before pushing. If you are sure that you don't need the remote updates, you can use the '-f' option to force push. Note: I do not recommend doing this in collaborative development because it may overwrite other people's code.

Code push example:

```bash
git push origin master
```

Force push code example:

```bash
git push origin master -f
```

What is a conflict

When using Git for development, conflicts are normal in collaborative development, especially when multiple people are working on the same project. To learn how to handle conflicts, please refer to the Advanced section on [how to handle code conflicts](${domain}?v=${version}&t=83148).

### What is merge

This command is usually used to merge two branches, commonly used for local branches. Pull command is often used for remote branches. The function of this command is to merge the branch to be merged with the target branch. Note that this command will only merge the differences before the current version. The commit history of the two branches will be reorganized based on the commit time, so there may only be one conflict but it will generate a commit. If you don't want to generate this commit, add the '--base' parameter.

### What is Staging

This is both a concept and a command. Its meaning is literal, and its purpose is to temporarily store your current work and do something else. When you finish doing something else, you can switch back to continue. Note that the stash is only for the last change, which means it applies to all changes in the current version. The specific execution command is:

##### Stash the changes

```bash
git stash
```

Restore the last saved changes

```bash
git stash pop
```

##### View how many staged

```bash
git stash list
```

What is revert

The undo command is used very frequently because for some reason, we no longer need our changes or the new changes have some problems, and we need to revert to a certain version. At this time, we need to use the undo command, or it should be translated as reset more appropriately. The specific command is as follows:

##### Revert the current modifications

```bash
git reset --hard
```

Please note: The above command will completely reset your modifications. If you want to keep certain files, use the checkout + file path command to undo the modifications one by one.

If you want to reset to a specific version, you can change `--hard` to the specific commit ID

```bash
git reset 1d7f5d89346
```

Please note that your modifications still exist at this point, but the version number of your most recent commit has been changed to the version you want to reset. If you want to completely discard the modifications, just add the --hard parameter.

##### This only explains some basic concepts and terms of Git that are often used in work, and does not include all the terms and concepts of Git. If there are terms not mentioned in this document, please use a search engine to search for them. In addition, the document author tried to find standard explanations as much as possible. If there are any errors or omissions in the explanations, please point them out and provide the correct explanations. Thank you.

##### Also, this article only mentions some commonly used concepts and commands, but Git has much more than that. Therefore, if you cannot find the content you are looking for in this article, please search for it on your own. Here are some recommended resources: Git Official Documentation (both in Chinese and English, maintained by the official and volunteers): <http://git-scm.com/book/zh/v2>, Liao Xuefeng's Blog: <http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000>