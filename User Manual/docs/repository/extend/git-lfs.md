---
title: GitLFS operation guide
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4235
---

> Gitee(gitee.ru) has supported the `Git LFS` feature, which is currently open to paid enterprises.

### Git-LFS

Git, as the world's best distributed version control tool, is also an excellent file management tool. It gives project members the ability to remotely collaborate on projects, which is why it is becoming increasingly popular among industry professionals. Many excellent project management platforms, such as domestic ones

**So how can we avoid such a crash event from happening?**

Now let's introduce the star of today, Git LFS (Git Large File Storage), which is a technology for storing large files in Git.

In Git repositories, for non-text files such as various multimedia files, software artifacts, binary files, etc., these files often have a large size. Managing them directly with Git will cause the repository size to quickly expand, which in turn affects the speed of many Git operations and the upload of the repository to the remote end.

Git LFS is an enhanced tool for Git, which can be considered as a plugin. Simply put, it replaces the actual files in the Git repository with 'pointers' and stores the actual files on a remote LFS server, while tracking the changes of these files in the local repository in real-time.

<img src="https://git-lfs.github.com/images/graphic.gif" alt="a diagram showing how Git LFS works"  />

### Principle

According to the Git LFS official documentation:

Git LFS is a feature based on the [.gitattributs](http://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E5%B1%9E%E6%80%A7) configuration file of Git. It uses the `smudge` filter to locate the content of large files based on the `pointer file`, and the `clean` filter to create a new version of the pointer file when making changes to large files. It also uses the `pre-push` hook to upload large files to the Git LFS server. In other words, when performing `git-push` and the commit contains large files tracked by LFS, the `pre-push` hook detects it and performs the upload to the Git LFS server.

Therefore, if a repository contains LFS content but you don't want to push such files when pushing, just add the `--no-verify` option, like this:

```bash
git push --no-verify
```

`--no-verify` option tells `git push` to completely skip the `pre-push` hook.

As mentioned earlier, for files managed by LFS, the content stored in the local repository is actually a pointer file, and its format is similar to the following:

```bash
$ git show HEAD:2.svg

version https://git-lfs.github.com/spec/v1
oid sha256:158213f90f8b27012034c6f58db63e1861b12aa122d98910de311bf1cb1e50a0
size 14651
(END)
```

`version` represents the version of LFS

`oid` represents the unique hash value of the file object

`size` represents the size of the file

Installation

**Note: The following installation and command usage demos are based on the command line in Linux. The graphical interface operations in Windows are not involved due to time constraints.**

Install dependencies: Git >=1.8.5

Linux system:

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash

sudo apt-get install git-lfs
```

> <https://packagecloud.io/github/git-lfs/install#bash>

For installation on other operating systems, refer to the official installation documentation:

> <https://github.com/git-lfs/git-lfs#installing>

---

Configuration

+ **Step 1: Set up the relevant configurations for the repository in the Git repository:**

```bash
git lfs install
```

> Tips:
>
> This command will automatically modify the Git configuration file `.gitconfig`, and it is a global change. It will add the following configuration to the file:
>
> [filter "lfs"]
> clean = git-lfs clean -- %f
> smudge = git-lfs smudge -- %f
> process = git-lfs filter-process
> required = true

+ **Step 2: Select the files to be tracked by LFS:**

```bash
$ git lfs track "*.svg"
Or specific to a file
$ git lfs track "2.png"
$ git lfs track "example.lfs"
```

> Tips:
>
This command will modify the `.gitattributes` configuration file in the repository (if the file does not exist, it will be automatically created).
> See below:
> $ cat .gitattributes
> *.svg filter=lfs diff=lfs merge=lfs -text
>*.png filter=lfs diff=lfs merge=lfs -text

Curious students may ask, how do I know which files I am tracking?

Easy, one command solves it!

You can use 'git lfs ls-files' to view the files currently being tracked by LFS.

```bash
$ git lfs ls-files
9a3c7dae41 * 1.png
d61cf5835a * 2.png
158213f90f * 3.svg
```

> After `git add file`, the file may be tracked and visible.

Some may wonder what to do if they don't want LFS to track a certain file?

Easy, just one command solves it:

```bash
git lfs untrack "1.png"
```

To solve the problem of curious students, we continue with the second step mentioned earlier. After selecting the files that need to be managed by LFS, it is best to save the configuration first:

+ **Step 3: Save and submit configuration:**

```bash
git add .gitattributes
git commit -m "add .gitattributes"
```

Configuration Summary:

**After installing Git LFS, you can configure the LFS feature in the repository with just three steps**, namely:

```bash
#step 1
$ git lfs install

#step 2
$ git lfs track files

# step 3
$ git add .gitattributes
```

Actually, since the first step is a global configuration, it only needs to be executed once. For subsequent warehouses that need to use LFS, there is no need to execute it again unless the LFS configuration is cancelled midway.

> Tips: Run `git lfs uninstall` to cancel the global configuration of LFS

---

### Use Cases

##### Scenario 1

One day, while searching for interesting projects on Gitee, you quickly find a valuable game project and decide to fork and clone it immediately:

```bash
$ git clone git@gitee.ru:hightest/lfs-demo.git my-project
Cloning into 'lfs-copy'...
Enter passphrase for key '/home/git/.ssh/id_ed25519':
remote: Enumerating objects: 24, done.
remote: Counting objects: 100% (24/24), done.
remote: Compressing objects: 100% (24/24), done.
remote: Total 24 (delta 7), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (24/24), done.
Resolving deltas: 100% (7/7), done.
Enter passphrase for key '/home/git/.ssh/id_ed25519':
Updating files: 100% (9/9), done.
Enter passphrase for key '/home/git/.ssh/id_ed25519':
Filtering content: 100% (5/5), 1.51 MiB | 257.00 KiB/s, done.
```

You just made a slight modification to an example file example.lfs, and then by the way, git diff to see the changes:

```bash
$cd my-project
# edit example.lfs
$ git diff
diff --git a/example.lfs b/example.lfs
index 9550b5b..8bfca2b 100644
--- a/example.lfs
+++ b/example.lfs
@@ -1,3 +1,3 @@
version https://git-lfs.github.com/spec/v1
-oid sha256:fa3b58d0150ccbaed40ab94fd5574ae8225e83117c076b586ef08ff38be8d923
-size 69
+oid sha256:d8f84506d6b9e804852c3b15b921893606b4c2cbe388d1cc118bd42101eed2a8
+size 63
(END)
```

`git diff` shows changes that are not expected, why does this difference occur?

If you have read the previous section on principles, you will immediately understand that this is the difference in the LFS pointer file, which indicates that the repository you downloaded is using LFS to manage files.

The actual storage file size of the repository is only 132 Bytes, while its actual size is 9.18 MiB, a difference of several orders of magnitude.

The benefits of doing this are very obvious. For very large files, they can be managed with a very small space.

![image.png](https://images.gitee.ru/uploads/images/2021/0928/000246_0b965b05_7670704.png)

---

##### Scenario two

As a game developer, you have always wanted to design and develop a fun game. The project used in Scenario 1 gave you inspiration, and you decided to conduct in-depth development based on it. You added many image files, sound effect files, and other game resource files to this repository, starting with each time

```bash
$ git push origin master

Enter passphrase for key '/home/git/.ssh/id_ed25519':
Locking support detected on remote "origin". Consider enabling it with:
  $ git config lfs.https://gitee.ru/hightest/lfs-demo.git/info/lfs.locksverify true
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 6 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 388.92 MiB | 928.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Powered by gitee.ru [GNK-6.1]
remote: error: File: bcd245bbd11e6b1d71b5d3073f57007c4c002c4a 388.97 MB, exceeds 300.00 MB.
remote: Use command below to see the filename:
remote: git rev-list --objects --all | grep bcd245bbd11e6b1d71b5d3073f57007c4c002c4a
remote: Please remove the file from history and try again. (https://gitee.ru/help/articles/4232)
To gitee.ru:hightest/lfs-demo.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'gitee.ru:hightest/lfs-demo.git'
```

Obviously, the push was rejected because the single file pushed was too large, exceeding the quota of 300 MB.

At the same time, you can also clearly feel that various basic operations of Git become slow and delayed.

At this time, inspired by Scenario 1, you think of using Gitee's LFS service to manage large files, and the repository only stores its pointer information, which can avoid this problem.

+ **Manage large files in history using LFS:**

If some large files have already been committed to a repository, running 'git lfs track' will not be effective.

To apply existing large files in the repository to LFS, you need to import them into LFS using 'git lfs migrate':

```bash
$ git lfs migrate import --include-ref=master --include="biger.zip"
migrate: override changes in your working copy?  All uncommitted changes will be lost! [y/N] y
migrate: changes in your working copy will be overridden ...
migrate: Sorting commits: ..., done.
migrate: Rewriting commits: 100% (11/11), done.
  master        f9be3c554e9010ea5e0e23a6a0c6e53dca6c23b0 -> 53d5e655fe7cfd985f75384b92ac5414ad2ff394
migrate: Updating refs: ..., done.
migrate: checkout: ..., done.
```

> The --include-ref option specifies the branch to import.
>
> Use the --everything option if you want to apply it to all branches
>
> The --include option specifies the files to be imported. Wildcards can be used for batch import.

The above operation will rewrite commit history. If you don't want to rewrite the history, use the `--no-rewrite` option and provide a new commit message.

```bash
git lfs migrate import --no-rewrite -m "lfs import"
```

After including the files from local historical commits into LFS management, if you modify the history again and push the code again, you need to use force push.

Here, select to change the commit history, so you also need to use `--force` to force push:

```bash
$ git push origin master --force

Enter passphrase for key '/home/git/.ssh/id_ed25519':
Locking support detected on remote "origin". Consider enabling it with:
  $ git config lfs.https://gitee.ru/hightest/lfs-demo.git/info/lfs.locksverify true
Uploading LFS objects: 100% (8/8), 419 MB | 0 B/s, done.
Enumerating objects: 38, done.
Counting objects: 100% (38/38), done.
Delta compression using up to 6 threads
Compressing objects: 100% (37/37), done.
Writing objects: 100% (38/38), 136.26 MiB | 943.00 KiB/s, done.
Total 38 (delta 12), reused 10 (delta 0), pack-reused 0
remote: Powered by gitee.ru [GNK-6.1]
To gitee.ru:hightest/lfs-demo.git
 + cefd169...53d5e65 master -> master (forced update)
```

By now, the large files in the historical commits have been migrated to the remote LFS server. Only the pointer file of this large file is kept in the local Git repository. Therefore, pushing will no longer trigger quota limitations. After a successful push, the remote repository will be consistent with the local repository, as shown in the diagram in scenario one. It only manages the pointer file of this large file.

After successful push, you can see on the **Repository Management page**: 

![image.png](https://images.gitee.ru/uploads/images/2021/0928/015631_38f12078_7670704.png)

The displayed size here is the actual size of the files managed by the LFS Server, while the size managed by the Git repository is 134 Bytes!

![image.png](https://images.gitee.ru/uploads/images/2021/0928/100812_6f9ec420_7670704.png)

---

Scenario three

As a heavy user of Git, you must use Git to manage your files in your daily work. However, after experiencing the above process of rewriting historical commits and uploading to the LFS server, you have learned to configure the LFS feature in the repository from the beginning to ensure that each commit and push are perfect.

In a new project, in the initial stage, you have already configured LFS. At this point, there is a larger file called `biggerthanbigger.zip`, which is **778M** in size and far exceeds the limit for individual file size.

Use LFS to manage newly added large files

```bash
cd new-project
git add biggerthanbigger.zip
git commit -m "add bigger than bigger zip file"
```

Then push to the remote repository, because LFS service is used, **this push should not be rejected if there is no unexpected error**.

```bash
$ git push origin master
Enter passphrase for key '/home/git/.ssh/id_ed25519':
Locking support detected on remote "origin". Consider enabling it with:
  $ git config lfs.https://gitee.ru/hightest/new-project.git/info/lfs.locksverify true
Uploading LFS objects: 100% (3/3), 1.2 MB | 0 B/s, done.
Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 6 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (10/10), 1.56 KiB | 1.56 MiB/s, done.
Total 10 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Powered by gitee.ru [GNK-6.1]
To gitee.ru:hightest/new-project.git
   dfe8b09..5f03bab  master -> master
```

**However, accidents are likely to happen in reality!**

Due to the large size of the pushed files, it is possible to exceed the LFS quota and the push may fail. Although LFS is specifically designed for managing large files, there is still a limit to storing large files because it is not a file storage service.

For the restrictions on Gitee LFS large files, please refer to the quota explanation below.

---

### Gitee LFS quota description

Currently, LFS functionality is only available to paid enterprises, and the detailed quota is as follows:

| Free Edition | Basic Edition | Standard Edition | Advanced Edition | Exclusive Edition | Private Deployment Edition |
| ------ | ------ | ------ | ------ | ------ | ------------ |
| 0 GB   | 1 GB   | 1 GB   | 1 GB   | 1 GB   |
  Unlimited         |

> Query Link: <https://gitee.ru/enterprises#price>

For enterprises that have enabled LFS functionality and want to view the LFS usage of each repository, go to the enterprise dashboard. If your enterprise name is My-Enterprise, the URL would be <https://e.gitee.ru/My-Enterprise/dashboard>.

![image.png](https://images.gitee.ru/uploads/images/2021/0928/102835_3598e735_7670704.png)

---

To check the usage of LFS capacity for each repository under the enterprise, go to the enterprise workspace, select the 'Extensions' item in the management panel, and click on 'LFS' to view the details.

![image.png](https://images.gitee.ru/uploads/images/2021/0928/021431_a4e572f1_7670704.png)

You can see the usage of each repository using the LFS feature within the enterprise, as well as the total usage. Clicking on the repository name will also take you to the management page of that repository.

---

If an enterprise has a high demand for large files and the current 1 GB capacity is not enough, don't worry, Gitee has a solution, which is self-expansion.

Still in the enterprise management workspace, at the top level, there is a [Renew/Upgrade/Expand] link, which leads directly to the upgrade and expansion page.

![image.png](https://images.gitee.ru/uploads/images/2021/0928/022039_7e90f00c_7670704.png)

According to enterprise requirements, the maximum configurable LFS space is 100G, which is sufficient for most projects in terms of space.

---

### Summary

Git LFS is an easy-to-install, easy-to-configure, and efficient Git extension tool that effectively manages large files in repositories, avoiding excessive repository size and affecting project management efficiency. At the same time, Gitee

---

### Reference Links

<https://git-lfs.github.com/>

<https://git-scm.com/docs/gitattributes>

<https://zzz.buzz/zh/2016/04/19/the-guide-to-git-lfs/>