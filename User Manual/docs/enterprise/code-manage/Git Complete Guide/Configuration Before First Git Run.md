---
title: Configuration before running Git for the first time
origin-url: https://gitee.ru/help/articles/4107
---

On a new system, we generally need to configure our Git working environment first. The configuration work only needs to be done once, and the current configuration will be used when upgrading later. Of course, if necessary, you can modify the existing configuration at any time using the same command.

Git provides a tool called `git config` (note: actually git-config command, but it can be called using git plus a name), specifically used to configure or read corresponding working environment variables. It is these environment variables that determine the specific working methods and behaviors of Git in various stages. These variables can be stored in the following three different places:

- /etc/gitconfig file: The configuration that is universally applicable to all users in the system. If the --system option is used when using git config, this file is read and written.
- ~/.gitconfig file: The configuration file in the user's home directory is only applicable to that user. If you use the git config command with the --global option, it reads from and writes to this file.
> - The configuration file in the Git directory of the current repository (i.e., the .git/config file in the working directory): This configuration is only valid for the current repository. Each level of configuration overrides the same configuration in the higher level, so the configuration in .git/config will override the same-named variables in /etc/gitconfig.

On Windows systems, Git will look for the .gitconfig file in the user's home directory. The home directory is usually C:\Documents and Settings\$USER, which is specified by the $HOME variable. In addition, Git will also try to find the /etc/gitconfig file, but it depends on the directory where Git was installed.

### **User Information Configuration**

The first thing to configure is your personal username and email address. These two configurations are important as they will be referenced with each Git commit to indicate who made the update. Therefore, they will be permanently included in the commit history along with the update content.

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

If the --global option is used, the configuration file that is changed is located in your user's home directory. All your repositories will default to using the user information configured here. If you want to use a different name or email in a specific repository, simply remove the --global option.

If you are using https for repository push and pull, you may need to configure the client to remember the password to avoid entering it every time.

```bash
git config --global credential.helper store
```

### **Text Editor Configuration**

Next, you need to set the default text editor to use. Git will automatically call an external text editor for you to enter additional messages. By default, it will use the default editor specified by the operating system, which is usually Vi or Vim. If you have other preferences, such as Emacs, you can reset it:

```bash
git config --global core.editor emacs
```

Differential Analysis Tool

Another commonly used option is which diff analysis tool to use when resolving merge conflicts. For example, if you want to use vimdiff:

```bash
git config --global merge.tool vimdiff
```

Git can understand the output information of merge tools such as kdiff3, tkdiff, meld, xxdiff, emerge, vimdiff, gvimdiff, ecmerge, and opendiff. Of course, you can also specify to use your own developed tool.

### **View configuration information**

To check the existing configuration information, you can use the 'git config --list' command.

```bash
$ git config --list
user.name=Scott Chacon
user.email=schacon@gmail.com
color.status=auto
color.branch=auto
color.interactive=auto
color.diff=auto
...
```

Sometimes you may see duplicate variable names, which means they come from different configuration files (e.g., /etc/gitconfig and ~/.gitconfig). However, Git ultimately uses the last one.

You can also directly check the setting of a specific environment variable by appending its name, like this:

```bash
$ git config user.name
Scott Chacon
```