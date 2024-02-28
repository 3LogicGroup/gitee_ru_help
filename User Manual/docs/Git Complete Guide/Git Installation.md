---
title: Git installation
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4106
---

Git was initially developed on Linux and for a long time, it could only run on Linux/Unix systems. As Git became more popular, some developers started porting it to the Windows platform. Currently, Git is a cross-platform tool that can run on Windows/macOS/Linux/Unix.

Download

You can obtain Git installation packages for Windows/macOS/Linux operating systems from [https://git-scm.com/](https://git-scm.com/). Alternatively, you can install it using the following methods.

### Installation on Windows

Download the Windows version of the client from <http://git-scm.com/download>, run it as an administrator, and keep selecting Next for installation. Please note that if you are not familiar with the meaning of each option, keep the default options.

### Install on Ubuntu

```bash
Execute 'apt-get install git' in the terminal.
```

### Centos/Redhat Installation

```bash
Execute yum install git in the terminal
```

### Installing Fedora23

```bash
Execute 'dnf install git' or 'yum install git' in the terminal.
```

### Fedora22/21 Installation

```bash
Execute yum install git in the terminal
```

### SUSE/OPENSUSE Installation

```bash
Execute sudo zypper install git in the terminal
```

### Mac OS X Installation

```bash
Execute 'brew install git' in the terminal (Note: please resolve the environment variable and Brew tool issues on your own).
```

### Compile and Install (Note: Only suitable for non-Windows systems)

Select a version from <https://github.com/git/git/releases> for download, then unzip and enter the Git directory to execute the following code sequentially:

```bash
make configure
./configure
make all
sudo make install
```

Note: If you encounter compilation issues, please search for the dependencies required by Git yourself.

If everything above is normal, open the terminal (on Windows, open the bash that was installed along with Git) and enter 'git --version'. It should display similar information as follows:

```bash
git version 2.5.0
```