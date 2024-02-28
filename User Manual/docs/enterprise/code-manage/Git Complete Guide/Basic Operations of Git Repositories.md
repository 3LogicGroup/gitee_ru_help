---
title: Git repository basic operations
origin-url: https://gitee.ru/help/articles/4114
---

Basic repository management

Initialize a Git repository (using "/home/gitee/test" folder as an example)

```bash
cd /home/gitee/test    # Go to the git folder
'git init               #initialize a Git repository'
```

### **Add files to Git staging area**

```bash
git add "readme.txt" 
```

Note: Use `git add -A` or `git add .` to commit all changes in the current repository.

### **View the current file submission status of the repository (A: submission succeeded; AM: file has changed after being added to the cache)**

```bash
git status -s
```

### **Committing versions from the staging area of Git to the repository, parameter -m is followed by the comment for the current commit**

```bash
git commit -m "1.0.0"
```

### **Push the local Git repository information to the server**

```bash
git push https://gitee.ru/***/test.git
```

### **View git commit logs**

```bash
git log
```

## **Remote Repository Management**

### **Modify Repository Name**

By default, when cloning or performing other operations, the repository name is usually origin. If we want to change its name, such as not liking the name origin and wanting to change it to oschina, we need to execute the command in the repository directory:

```bash
git remote rename origin oschina
```

This way, your remote repository name will be changed to oschina. Similarly, the command to execute when pushing will no longer be git push origin master, but git push oschina master. The same applies to pulling.

### Add a repository

If you want to add a remote repository to a local repository without performing a clone operation, you can execute

```bash
git remote add origin Repository address
```

Attention:

1. origin is the alias for your repository, it can be changed, but please make sure it does not conflict with existing repository aliases
2. Repository addresses generally support http/https/ssh/git protocols, do not add addresses for other protocols.

View the remote repository URL corresponding to the current repository

```bash
git remote -v
```

This command can display the names and corresponding repository addresses of the repositories already added in your current repository. In general, there will be two identical records, fetch and push, where fetch is used to synchronize from remote and push is used to push to remote.

### **Modify the remote repository address for the repository**

```bash
Change the repository URL using `git remote set-url origin repository_url`.
```