---
title: GiteeSVN Support

origin-url: https://gitee.ru/help/articles/4131
---

Gitee currently supports using Subversion to operate on repositories. Below is a guide and notes for usage.

Precautions before use

1. It is not recommended to use Subversion for repositories with a size exceeding 300 MB. When the repository capacity reaches 400 MB or 300 MB and contains a large amount of non-text data, we will disable Subversion support for the repository.
  
2. Since GIT does not support submitting empty directories, whether it is a normal repository or a repository with Subversion enabled, it is stored as a GIT repository on the storage machine. Subversion commits are submitted to the git repository. Therefore, Gitee's Subversion does not support submitting empty directories.

3. When opening Subversion for the first time and operating a repository, if the repository is large or there are many commits, the response time will be longer due to caching.

4. Subversion's Hook mechanism is not supported, please use WebHook instead.

5. Subversion properties are not fully supported.

6. The client needs to enable SASL support, and unsupported clients cannot access.

7. Some svn commands are not supported. You can check the compatibility of the Subversion client.

8. The mapping of version numbers, currently the version number calculation of Subversion is based on the number of commits in this branch minus one, excluding merges. If operations such as forced rollback in git are used, please re-checkout.

*WARNING:*  

> Since git did not consider empty files in its design [Kernel.org: Git FAQ](https://git.wiki.kernel.org/index.php/GitFaq#Can_I_add_empty_directories.3F)

>The principle we designed is not to break or actively modify the user's repository. Our backend stores a complete git repository. If we add it, the commit content will not be consistent. We recommend adding a placeholder file like .keep when adding a directory, an empty file is fine.

When using Git and SVN mixed, try not to use Git force push. [Precautions for using Git and SVN mixed](https://git.mydoc.io/?t=122635)

## About the Revision

The final interpretation of the Subversion feature belongs to OSChina.NET. The rules for accessing Subversion may change in the next revision.

## Enable Method

1. Enable it in the project settings

![Enable svn](https://images.gitee.ru/uploads/images/2020/0924/202415_8b744022_13510.png)

2. If it is an empty repository:

![Image Description](https://images.gitee.ru/uploads/images/2020/0924/202415_443445fc_13510.png)

## User Guide

Gitee supports the SVN protocol. For SVN, checking out is usually used to obtain the code of a repository. In the project homepage, you can usually get the URL.

![svn-url](http://static.oschina.net/uploads/space/2015/0318/152207_DRMJ_139664.png)

The repository address is:

```bash
svn://git.oschina.net/svnserver/newos
```  

### 1. Get repository code

```bash
svn checkout svn://git.oschina.net/svnserver/newos newos
```

**Important Note** Gitee's SVN integration is implemented through a git repository, and the URL rule is

Using the above command, we will get the code of the `default branch` of the project. And we will name the local working directory as *newos*

If not followed by newos, SVN defaults to naming the local working directory as the project name

```bash
svn checkout svn://git.oschina.net/svnserver/newos
```

If you want to `get code from any branch`, for example, get the dev branch of newos, please enter a command similar to the following:

- At this time, the address is: `svn://domain/username/project/branches/branch-name`.

```bash
svn checkout svn://git.oschina.net/svnserver/newos/branches/dev
```

Special note, to get the main branch, which is the master branch, you can use the following branch format

```bash
svn checkout svn://git.oschina.net/svnserver/newos/trunk newos
```

svn trunk branch corresponds to the master branch. Users should try not to use the following format
  
```bash
svn checkout svn://git.oschina.net/svnserver/newos
```

## Operation Instructions

If checking out only a part of the repository, and the repository root directory contains directories like branches/tags/trunk, use the complete path layout as follows:

```bash
svn://git.oschina.net/username/example/trunk/tags/hello
svn://git.oschina.net/username/example/branches/dev/trunk
svn://git.oschina.net/username/example/branches/dev/branches
```

If there is no master branch, there is no trunk branch either. The checked out URL cannot omit the branch name. For example, if there is only one dev branch, you must use the following format, otherwise it will prompt that the repository does not exist.

```bash
svn co svn://git.oschina.net/svnserver/newos/branches/dev  svnserver_dev
```

Open the terminal and enter the above command. The first authentication field is the user's password, which can be left empty. The username is the user's 'email address' used when logging in to Gitee. The password is the password used when logging in to Gitee.

Generally, SVN encrypts and caches the user's username and password, so only the user's email and password need to be entered for repository operations for the first time.

Clear the password cache, the files in the `.subversion/auth/svn.simple` folder under the user's directory.

![image](http://static.oschina.net/uploads/space/2015/0318/153828_ptt4_139664.png)

The following figure shows the successful pull of the project code.

![Image Description](https://images.gitee.ru/uploads/images/2020/0924/202415_c08bc285_13510.png)

View local working directory information:

```bash
svn info
```

![Image Description](https://images.gitee.ru/uploads/images/2020/0924/202415_80c2678b_13510.png)

```bash
cd helloworld
echo "test" > SVNReadMe.md
#svn add SVNReadMe.md
#svn add * --force is similar to git add -A
svn add * --force
svn update .
svn commit -m "first svn commit"
```

Subversion recommends using `svn update` to update the working copy before committing. It is similar to `git pull` followed by `git push`.

For Subversion, the submission is online. If the machine is offline, the submission will fail. In Git terms, this process can be understood as git commit+git push.

Users can also dynamically display when using svn to commit code.

List the contents of directories in the repository:

```bash
svn list svn://git.net/svnserver/newos/trunk
```

Export all files of the specified branch in the repository, without version control information:

```bash
svn export svn://git.net/svnserver/newos/trunk newos
```

## Remarks

### Install Subversion client

On the Apache Foundation's Subversion official website: 

[http://subversion.apache.org](http://subversion.apache.org)

Binary download prompt page:  

[http://subversion.apache.org/packages.html](http://subversion.apache.org/packages.html)

Windows System

Integration with resource management: [TortoiseSVN](http://tortoisesvn.net/downloads.html), commonly known as 'Tortoise', is an SVN client that allows easy management of SVN repositories.

It is strange that TortoiseSVN is not recommended on Apache.

In addition, there is SlikSVN, download address: [https://sliksvn.com/download/](https://sliksvn.com/download/)

The others will not be introduced one by one.

#### Linux system

Generally, the package control software that comes with Linux system can install Subversion. If the version is lower than 1.8, it is recommended to download precompiled binaries or compile Subversion by yourself. No more explanation here.

#### OS X

XCode comes with Subversion version 1.7.x, which is too old, and Gitee only supports SVN clients above version 1.8.

If Homebrew is installed

```bash
brew install subversion
```

Alternatively, you can use the pre-compiled version from WANdisco.

[http://www.wandisco.com/subversion/download#osx](http://www.wandisco.com/subversion/download#osx)

### Compatibility of Subversion Client

We support Apache Subversion 1.8 or higher versions. When installing a Subversion client, if the error message is 'Could not negotiate a verification method', please make sure your client supports SASL verification. For example, on Ubuntu, you can install libsasl2-dev and then compile Subversion, so that the client will support SASL verification.

>sudo apt-get install libsasl2-dev

When using svnkit or SubversionJavaHl IDE integrated clients, make sure to support SASL authentication.

### Converting between GIT and SVN

If a user has a project hosted on Subversion and wants to migrate it to Gitee, they can use git-svn to convert the project into a git-based repository and then push it to Gitee. This way, they can still use SVN to operate on the project. Please remember to create a new project on Gitee first.

```bash
git svn clone http://myhost/repo -T trunk -b branches -t tags 
git remote add oscgit https://git.oschina.net/user/repo
git push -u oscgit --all
```

Usually, if there is a local SVN repository, you can:

```bash
git svn clone file:///tmp/svn-repo -T trunk -b branches -t tags 
git remote add oscgit https://git.oschina.net/user/repo
git push -u oscgit  --all
```

After moving the project to Gitee, use the svn command to checkout and operate on the project.

Advanced Guide:

[http://git-scm.com/book/zh/ch8-2.html](http://git-scm.com/book/zh/ch8-2.html)

### Install git, git-svn

#### Windows

msysgit official website [http://msysgit.github.io/], the version is relatively low.

Github for Windows provides the same git tool as msysgit.

Download MSYS2 git from [http://sourceforge.net/projects/msys2], then start the terminal and install git. The current version is 2.4.3.

```bash
pacman -S git
```

Cygwin git download link: [http://www.cygwin.com/](http://www.cygwin.com/), then use package management software or directly download git source code to compile git.

```bash
make configure
./configure --prefix=/usr/local
make 
make install
```

#### Linux

If there is a package manager, directly install using the package manager.

Such as Ubuntu

```bash
sudo apt-get install git git-svn
```

Also, it can be manually compiled.

#### Mac OSX

Download link: [http://git-scm.com/download/mac](http://git-scm.com/download/mac)