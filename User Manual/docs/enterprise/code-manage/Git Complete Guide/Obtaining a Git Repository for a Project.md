---
title: Get the Git repository of the project
origin-url: https://gitee.ru/help/articles/4109
---

There are two ways to obtain a Git project repository. The first is to create a new Git repository by importing all files in an existing directory. The second is to clone a new mirrored repository from an existing Git repository.

### **Initialize a New Repository in the Working Directory**

To start using Git to manage an existing project, simply go to the directory where the project is located and execute:

```bash
git init
```

After initialization, a directory named .git will appear in the current directory, and all the data and resources required by Git are stored in this directory. However, at present, only the existing structure framework has been initialized with all the files and directories in it, but we have not started tracking and managing any file in the project. (In Chapter 9, we will explain in detail what files are in the .git directory just created and what roles they play.)

To include several files in version control in the current directory, you need to first use the 'git add' command to tell Git to start tracking these files, and then commit them.

```bash
git add *.c
git add README
git commit -m 'initial project version'
```

Later, we will explain the meaning of each command one by one. But now, you have a Git repository that actually maintains several files.

### **Clone from an existing repository**

If you want to contribute to an open source project, you can start by cloning the Git repository of the project. This requires the use of the git clone command. If you are familiar with other VCS such as Subversion, you may have noticed that Git uses clone instead of checkout. This is a very important difference. Git retrieves all the historical data of the project (every version of every file). Once the data is cloned from the server, it is also available locally. In fact, even if the server's disk fails, any cloned client can rebuild the repository on the server and revert to the state it was in at the time of cloning (although some server-side hook settings may be lost, all versions of the data are still there).

The command format for cloning a repository is `git clone [url]`. For example, to clone the Git code repository for the Ruby language Grit, you can use the following command:

```bash
git clone git@gitee.ru:oschina/git-osc.git
```

This will create a directory named 'grit' in the current directory, which contains a '.git' directory to store all downloaded version records, and then extract a copy of the latest version of the file from it. If you enter this newly created 'grit' directory, you will see that all the files in the repository are already there, ready for further development and use. If you want to define the name of the newly created repository directory during cloning, you can specify a new name at the end of the above command.

```bash
git clone git@gitee.ru:oschina/git-osc.git mygrit
```

Leave your comments and suggestions on the changes in this Pull Request in the 'Comments' section.

Git supports various data transfer protocols. The previous example used the `git://` protocol, but you can also use `http(s)://` or `user@server:/path.git` for SSH protocol.