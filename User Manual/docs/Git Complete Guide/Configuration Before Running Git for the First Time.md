---
title: Configuration before first Git run
authors:
  - name: Zoker
    url: https://gitee.ru/kesin
origin-url: https://gitee.ru/help/articles/4107
---

On a new system, we usually need to configure our Git working environment. The configuration only needs to be done once and will be used for future upgrades. Of course, if needed, you can modify the existing configuration using the same command at any time.

Git provides a tool called `git config` (note: actually git-config command, but it can be called using git plus a name), specifically used to configure or read corresponding working environment variables. It is these environment variables that determine the specific working methods and behaviors of Git in various stages. These variables can be stored in the following three different places:

> - /etc/gitconfig file: Configuration that is universally applicable to all users in the system. If using git



> - ~/.gitconfig file: The configuration file in the user's directory is only applicable to that user. If the --global option is used with git config, it reads and writes to this file.
> - Configuration file in the Git directory of the current repository (i.e., the .git/config file in the working directory): The configuration here is only valid for the current repository. Each level of configuration will override the same configuration in the upper level, so the configuration in .git/config will override the same-named variable in /etc/gitconfig.

On Windows systems, Git will search for the .gitconfig file in the user's home directory. The home directory is the directory specified by the $HOME variable, which is usually `C:\Documents and Settings\$USER`. In addition, Git will also try to locate the /etc/gitconfig file based on the directory where Git was installed.

#### User information configuration

The first thing to configure is your personal username and email address. These two configurations are very important. They will be referenced every time you make a Git commit, indicating who made the update. Therefore, they will be permanently included in the history along with the update content.

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

If the --global option is used, the configuration file being changed is the one located in your user's home directory, and from then on, all your repositories will use the user information configured here by default. If you want to use a different name or email in a specific repository, just remove the --global option and reconfigure it, and the new settings will be saved in the .git/config file of the current repository.

If you are using `https` for repository push/pull, you may need to configure the client to remember the password to avoid entering it every time.

```bash
git config --global credential.helper store
```

#### Text Editor Configuration

Next, you need to set the default text editor to use. When Git requires you to enter additional messages, it will automatically invoke an external text editor for you to use. By default, it will use the default editor specified by the operating system, which may be Vi or Vim. If you have other preferences, such as Emacs, you can reset it:

```bash
git config --global core.editor emacs
```

Differential Analysis Tool
Another commonly used one is which diff analysis tool to use when resolving merge conflicts. For example, if you want to switch to vimdiff:

```bash
git config --global merge.tool vimdiff
```

Git can understand the output information of merge tools such as kdiff3, tkdiff, meld, xxdiff, emerge, vimdiff, gvimdiff, ecmerge, and opendiff. Of course, you can also specify to use your own developed tool.

#### View Configuration Information

To check the existing configuration information, you can use the git config --list command:

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

Sometimes you may see duplicate variable names, which means they come from different configuration files (such as /etc/gitconfig and ...

You can also directly check the setting of a specific environment variable by appending the specific name like this:

```bash
$ git config user.name
Scott Chacon
```