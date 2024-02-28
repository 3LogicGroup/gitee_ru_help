---
title: Git Repository Basic Operations
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4114
---


## Repository Basic Management

#### Initialize a Git repository (using the '/home/gitee/test' folder as an example)

```bash
cd /home/gitee/test    # Go to the git folder
git init # Initialize a Git repository
```

#### Add the file to the Git staging area

```bash
git add "readme.txt"
```

Note: Use `git add -A` or `git add .` to commit all changes in the current repository.

#### Check the current file submission status of the repository (A: submission successful; AM: file has been modified after being added to the cache)

```bash
git status -s
```

#### Submit the version from the Git staging area to the repository, the parameter `-m` is followed by the remarks for this submission

```bash
git commit -m "1.0.0"
```

#### Push the local Git repository information to the server

```bash
git push https://gitee.ru/***/test.git
```

#### View Git commit logs

```bash
git log
```

## Remote Repository Management

#### Modify Repository Name

By default, the repository name is 'origin' when performing clone or other operations. If we want to change the name, for example, if we don't like the name 'origin' and want to change it to 'oschina', we need to execute the command in the repository directory:

```bash
git remote rename origin oschina
```

Now your remote repository name has been changed to 'oschina'. Similarly, the command to execute when pushing is no longer 'git push origin master', but 'git push oschina master'. The same applies to pulling

#### Add a Repository

To add a remote repository to a local repository without performing a clone operation, you can execute

```bash
git remote add origin Repository URL

```

Note: 1. 'origin' is the alias of your repository and can be changed arbitrarily, but please make sure it does not conflict with existing repository aliases. 2. The repository address generally supports http/https/ssh/git protocols, do not add addresses of other protocols.

#### View the remote repository address corresponding to the current repository

```bash
git remote -v
```

This command can display the repository names already added in your current repository and their corresponding repository addresses. Generally, there will be two identical records, fetch and push. Fetch is used to synchronize from the remote, and push is used to push to the remote.

#### Modify the remote repository address corresponding to the repository

```bash
git remote set-url origin repository address

```