---
title: Gitee SVN Support
origin-url: https://gitee.ru/help/articles/4131
---

Currently, Gitee supports using Subversion to operate on repositories. Here is a usage guide and precautions.

### **Precautions before Use**

1. It is not recommended to use Subversion for repositories that exceed 300 MB in size. When the repository capacity reaches 400 MB or 300 MB and contains a large amount of non-text data, we will disable Subversion support for the repository.

2. Because GIT does not support committing empty directories, whether it is a normal repository or a repository with Subversion access enabled, it is stored as a GIT repository on the storage machine. Subversion commits are made to the git repository, so Gitee's Subversion does not support committing empty directories.

3. The first time to start Subversion, operate a repository. If the repository is large or there are many commits, the response time will be longer.

4. Subversion Hook mechanism is not supported, please use WebHook instead.

5. Subversion incomplete support for attributes.

6. The client needs to enable SASL support, and clients that do not support it cannot access.

7. Some svn commands are not supported. You can check the compatibility of the Subversion client.

8. The mapping of version numbers, currently the calculation of the version number in Subversion is based on the total number of commits in this branch minus one, excluding merges. If operations like forced rollback are used in git, please check out again.

WARNING:

> Since Git was not designed to consider empty files [Kernel.org: Git FAQ](https://gitee.ru/link?target=https%3A%2F%2Fgit.wiki.kernel.org%2Findex.php%2FGitFaq%23Can_I_add_empty_directories.3F)

> Our design principle is not to destroy, not to actively modify the user's repository. Our backend stores a complete git repository. If we add it, the commit content will not be consistent. It is recommended to add a placeholder file like .keep when adding a directory, an empty file is fine.

> When using Git and SVN together, try not to use Git force push. [Notes on using Git and SVN together](https://gitee.ru/link?target=https%3A%2F%2Fgit.mydoc.io%2F%3Ft%3D122635)

### **About the Redesign**

The final interpretation of the Subversion feature belongs to OSChina.NET. The rules for Subversion integration may change in the next version.

### **Activation Method**

1. Enable it in the project's settings interface

![Image Description](../../../../../assets/image33.png)
2. If it is an empty repository:

![Image Description](../../../../../assets/image32.png)

User Guide

Gitee supports the svn protocol. For svn, getting the code of a repository is usually done through checkout. On the project homepage, we can usually obtain the URL.

This repository address is:
![Image Description](../../../../../assets/image34.png)

```bash
svn://git.oschina.net/svnserver/newos
```

### Getting repository code:

```bash
svn checkout svn://git.oschina.net/svnserver/newos newos
```

**Note** Gitee's SVN integration backend is implemented through a git repository, and the URL rule is svn://domain/username/project name.

Using the above command, we will get the code of the default branch of the project. And name the local working directory as 'newos'.

If the "newos" is not included at the end, SVN will default to naming the local working directory as the project name.

```bash
svn checkout svn://git.oschina.net/svnserver/newos
```

Special note, to get the main branch, which is the master branch, you can use the following branch format

```bash
svn checkout svn://git.oschina.net/svnserver/newos/trunk newos
```

svn trunk branch corresponds to the master branch. Users should try not to use the following format.

```bash
svn checkout svn://git.oschina.net/svnserver/newos 
```

### **Operation Instructions**

If only a part of the checkout repository is used, and the repository root directory contains directories named branches/tags/trunk, please use the complete path layout as follows:

```bash
svn://git.oschina.net/username/example/trunk/tags/hello
svn://git.oschina.net/username/example/branches/dev/trunk
svn://git.oschina.net/username/example/branches/dev/branches 
```

If there is no master branch, there is no trunk branch either. The checked out URL cannot omit the branch name. For example, if there is only a dev branch, you must use the following format, otherwise it will prompt that the repository does not exist.

```bash
svn co svn://git.oschina.net/svnserver/newos/branches/dev  svnserver_dev  
```

Open the terminal and enter the above command. The first authentication domain is the user's password, which can be left empty. The username is the email address used by the user to log in to Gitee. The password is the one used to log in to Gitee.

Generally, SVN encrypts and caches the user's username and password, so only the user's email and password need to be entered for repository operations for the first time.

Clear the password cache, the files in the '.subversion/auth/svn.simple' folder under the user directory.

![Image Description](./assets/153828_ptt4_139664.png)

The following image shows a successful project code pull.
![Image Description](./assets/202415_c08bc285_13510.webp)

View local working directory information:

```bash
svn info
```

![Image Description](./assets/202415_80c2678b_13510.webp)

```bash
cd helloworld
echo "test" > SVNReadMe.md
#svn add SVNReadMe.md
#svn add * --force is similar to git add -A
svn add * --force
svn update .
svn commit -m "first svn commit"
```

Subversion suggests using svn update to update the working copy before committing. It is similar to git pull and then git push.

Subversion commits are done online. If the machine is offline, the commit will fail. This process can be understood using the git approach.

Users can also see dynamic display when using svn to submit code.

List the contents of the directory in the version control repository:

```bash
svn list svn://git.net/svnserver/newos/trunk
```

Export all files of specified branch in the repository, without version control information:

```bash
svn export svn://git.net/svnserver/newos/trunk newos
```

## **Note**

### **Install Subversion Client**

On the Apache Foundation's Subversion official website:

[http://subversion.apache.org](https://gitee.ru/link?target=http%3A%2F%2Fsubversion.apache.org)

Binary Download Prompt Page:

[http://subversion.apache.org/packages.html](https://gitee.ru/link?target=http%3A%2F%2Fsubversion.apache.org)

#### **Windows System:**

Integration with resource management: [TortoiseSVN](https://gitee.ru/link?target=http%3A%2F%2Ftortoisesvn.net%2Fdownloads.html), commonly known as "Tortoise", is an MSI installation package. It can be extracted using [ExtractMSI](https://gitee.ru/link?target=http%3A%2F%2Fpan.baidu.com%2Fs%2F1szHIn).

It is strange that TortoiseSVN is not recommended on Apache.

In addition, there is SlikSVN, download address: [https://gitee.ru/link?target=https%3A%2F%2Fsliksvn.com%2Fdownload%2F]

I won't introduce the others one by one.

#### **Linux System**

Generally, the package control software that comes with Linux systems can install Subversion. If the version is lower than 1.8, it is recommended to download the precompiled binary or compile Subversion yourself.

#### **OS X**

XCode's built-in Subversion version is 1.7.x, which is too old, while Gitee only supports SVN clients 1.8 and above.

If Homebrew is installed

```bash
brew install subversion
```

Alternatively, use the pre-compiled version of WANdisco

[http://www.wandisco.com/subversion/download#osx](https://gitee.ru/link?target=http%3A%2F%2Fwww.wandisco.com%2Fsubversion%2Fdownload%23osx)

### **Compatibility of Subversion clients**

We support Apache Subversion 1.8 or higher versions. When you install a Subversion client, if the error message is 'Could not negotiate authentication mechanism', please make sure your client supports SASL authentication. For example, on Ubuntu, you can install libsasl2-dev and then compile Subversion to make the client support SASL authentication.

> sudo apt-get install libsasl2-dev

When you use IDE-integrated clients like svnkit or SubversionJavaHl, please make sure to support SASL authentication.

About the conversion between GIT and SVN

If a user has a project hosted on Subversion and wants to migrate to Gitee, they can use git-svn to convert the project into a git-based repository and then push it to Gitee. This way, you can still operate the project using SVN. Remember to create a new project on Gitee first.

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

After transferring the project to Gitee, use the svn command to check out and operate on the project.

Advanced Guide:

[http://git-scm.com/book/zh/ch8-2.html](https://gitee.ru/link?target=http%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fch8-2.html)

### **Install git, git-svn**

#### **Windows**

msysgit official website [http://msysgit.github.io/](https://gitee.ru/link?target=http%3A%2F%2Fmsysgit.github.io%2F), the version is relatively low.

Github for Windows provides the same git tool as msysgit.

MSYS2 git download link: [http://sourceforge.net/projects/msys2](https://gitee.ru/link?target=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fmsys2), then launch the terminal and install git, the current version is 2.4.3.

```bash
pacman -S git
```

Cygwin git download address: [http://www.cygwin.com/](https://gitee.ru/link?target=http%3A%2F%2Fwww.cygwin.com%2F), and then use package management software or download directly

```bash
make configure
./configure --prefix=/usr/local
make 
make install 
```

#### **Linux**

Install using package manager if available

such as Ubuntu

```bash
sudo apt-get install git git-svn
```

You can also compile it manually.

#### **Mac OSX**

Download address: http://git-scm.com/download/mac (https://gitee.ru/link?target=http%3A%2F%2Fwww.cygwin.com%2F)