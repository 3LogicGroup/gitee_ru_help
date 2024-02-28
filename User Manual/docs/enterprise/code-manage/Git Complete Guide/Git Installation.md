---
title: Git Installation
origin-url: https://gitee.ru/help/articles/4106
---

Git was initially developed on Linux and for a long time, it could only run on Linux/Unix systems. As Git became more popular, some developers started porting it to the Windows platform. Currently, Git is a cross-platform tool that can run on Windows/macOS/Linux/Unix.

### Download

You can obtain Git installation packages for Windows/macOS/Linux operating systems from [https://git-scm.com/](https://gitee.ru/link?target=https%3A%2F%2Fgit-scm.com%2F). You can also install it using the following method.

### **Installation on Windows**

Download the Windows version of the client from [http://git-scm.com/download](https://gitee.ru/link?target=http%3A%2F%2Fgit-scm.com%2Fdownload), run it as an administrator, and keep selecting 'Next' to install. Please note that if you are not familiar with the meaning of each option, keep the default options.

Ubuntu Installation

Execute in the terminal

```bash
apt-get install git 
```
 
### **Centos/Redhat Installation**

Execute in the terminal

```bash
yum install git
```

### **Fedora23 Installation**

Execute in the terminal

```bash
dnf install git or yum install git
```

### Fedora22/21 Installation

Execute in the terminal

```bash
yum install git
```

### **SUSE/OPENSUSE Installation**

Execute in the terminal

```bash
sudo zypper install git
```

### **Mac OS X Installation**

Execute in the terminal

```bash
brew install git
# Note: Please resolve the issues with environment variables and Brew tool on your own
```

Compile and install (Note: Only suitable for non-Windows systems)

Select a version from [https://github.com/git/git/releases](https://gitee.ru/link?target=https%3A%2F%2Fgithub.com%2Fgit%2Fgit%2Freleases), download and unzip it, then enter the Git directory and execute the following code in order:

```bash
make configure
./configure
make all
sudo make install
```

Note: If you encounter compilation issues, please search the required dependencies for Git by yourself using a search engine.

If everything is normal, open the terminal (on Windows, open the bash installed with git) and enter 'git --version'. It should display similar information.

```bash
git version 2.5.0
```