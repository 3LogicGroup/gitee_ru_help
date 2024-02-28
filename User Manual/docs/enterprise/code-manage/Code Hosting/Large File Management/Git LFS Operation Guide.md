---
title: Git LFS Operation Guide
origin-url: https://gitee.ru/help/articles/4235
slug: /enterprise/code-manage/code-hosting/large-file-manage/git-lfs
---

> Gitee(gitee.ru) now supports Git LFS feature, which is currently available for paid enterprises.

### **Git-LFS**

Git, as the world's best distributed version control tool, is also an excellent file management tool. It gives project members the ability to remotely collaborate on projects, which is why it is loved by more and more professionals in the industry. Many excellent project management platforms, such as domestic ones

So how can we avoid such crash events?

Now let's introduce today's protagonist, Git LFS (Git Large File Storage), which is a technology for storing large files in Git.

In a Git repository, for non-text files such as various media files, software artifact files, binary files, etc., these files often have a large size. Managing them directly with Git will cause the repository size to expand rapidly, leading to slower Git operations and also affecting the upload of the repository to the remote end.

Git LFS is a plugin-based enhancement tool for Git. Simply put, it replaces the actual files used in the Git repository with pointers to the actual files, and stores the actual files on a remote LFS server, while tracking the changes of these files in the local repository in real-time

![Image Description](./assets/143214_bc84b95c_551147.webp)

### **Principle**

According to the official Git LFS documentation:

Git LFS is based on the features of the .gitattributes configuration file in Git. It uses the `smudge` filter to find the content of large files based on the pointer file, and the `clean` filter to create a new version of the pointer file when making changes to large files. Additionally, the `pre-push` hook uploads the large files to the Git LFS server. When pushing to Git and the commit includes large files tracked by LFS, the `pre-push` hook detects it and performs the upload to the Git LFS server.

Therefore, if a repository contains LFS content but you do not want to push such files during a push, just add the `--no-verify` option, like this:

```bash
git push --no-verify
```

The `--no-verify` option tells `git push` to completely skip the `pre-push` hook.

As mentioned earlier, for files managed by LFS, the content stored in the local repository is actually a pointer file, and its format is similar to the following:

```bash
$ git show HEAD:2.svg

version https://git-lfs.github.com/spec/v1
oid sha256:158213f90f8b27012034c6f58db63e1861b12aa122d98910de311bf1cb1e50a0
size 14651
(END)
```

`version` represents the version of LFS

`oid` represents the unique hash value of a file object

`size` represents the file size

### **Installation**

**Note: The following installations and command demonstrations are based on the command line in Linux. The graphical interface operations on Windows are not covered due to time constraints.**

Install dependencies: Git >=1.8.5

Linux System:

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash

sudo apt-get install git-lfs
```

> https://packagecloud.io/github/git-lfs/install#bash

For installation on other operating systems, refer to the official installation documentation:

> https://github.com/git-lfs/git-lfs#installing

### **Configuration**

Step 1: Set up relevant configurations for the repository in the Git repository

```bash
git lfs install
```

> Tips: This command will automatically modify the Git configuration file .gitconfig globally. It will add the following configuration to the file:

```bash
[filter "lfs"]
clean = git-lfs clean -- %f
smudge = git-lfs smudge -- %f
process = git-lfs filter-process
required = true
```

Step 2: Select the files to be tracked by LFS:

```bash
$ git lfs track "*.svg"
# Or specific to a file
$ git lfs track "2.png"
$ git lfs track "example.lfs"
```

> Tips:

> This command will modify the .gitattributes configuration file in the repository (if the file does not exist, it will be automatically created):
> See below:
> $ cat .gitattributes
> *.svg filter=lfs diff=lfs merge=lfs -text
> *.png filter=lfs diff=lfs merge=lfs -text

Curious students may ask, what if you want to know which files you have tracked? How can you do that?

Easy, one command solves it!

You can use `git lfs ls-files` to view the files currently being tracked by LFS at any time:

```bash
$ git lfs ls-files
9a3c7dae41 * 1.png
d61cf5835a * 2.png
158213f90f * 3.svg
```

> The file can only be tracked and viewed after `git add file`

Some people may wonder, what if I don't want LFS to track a certain file?

Good, still solved with one command:

```bash
git lfs untrack "1.png"
```

After selecting the files that need LFS management, it is recommended to save the configuration:

Step 3: Save and commit the configuration:

```bash
git add .gitattributes
git commit -m "add .gitattributes"
```

Configuration Summary:

After installing Git LFS, you only need three steps to configure LFS functionality in the repository:

```bash
#step 1
git lfs install

#step 2
git lfs track files

# step 3
git add .gitattributes
```

In fact, since the first step is a global configuration, it only needs to be executed once. If there are other repositories that need to use LFS, there is no need to execute it again, unless LFS configuration is cancelled along the way.

> Tips: Run `git lfs uninstall` to cancel the global configuration of LFS.

### **Use Cases**

#### **Scenario One:**

One day, you are looking for interesting projects on Gitee. Soon, you find a valuable game project and decide to fork and clone it immediately.

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

You just made a slight modification to an example file example.lfs, and then by the way, use git diff to see the changes:

```bash
$ cd my-project
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

`git diff` shows changes that are not what you expected, why does this difference occur?

If you have read the previous section on principles, you will understand immediately. This is the difference in LFS pointer file, which indicates that the repository you downloaded is using LFS for file management.

At this time, the actual storage file size of the repository is only 132 Bytes, while its actual size is 9.18 MiB, which differs by several orders of magnitude.

This approach has obvious advantages. For large files, it can be managed with very little space.

#### **Scenario Two:**

As a game developer, you have always wanted to design and develop a fun game. The project used in Scene 1 has inspired you, and you decide to do in-depth development based on it. You have added many image files, sound effect files, and other game resource files to this repository. Initially, every git add/commit/push was smooth. However, one time, you packaged these files into biger.zip and tried to push them to the remote repository, but the push failed, and the system displayed the following message:

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

Clearly, the push was rejected because the single file being pushed is too large and exceeds the quota of 300 MB.

At the same time, you can also clearly feel that various basic operations of Git become sluggish and delayed.

At this time, inspired by Scenario 1, you think of using Gtiee's LFS service to manage large files, where the repository only stores the pointer information to avoid this problem.

- Use LFS to manage large historical files:
If a repository has already committed some large files, running `git lfs track` at this time will not be effective.

To apply the existing large files in the repository to LFS, use 'git lfs migrate' to import them into LFS.

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

`--include-ref` option specifies the imported branch

> If it applies to all branches, use the `--everything` option.

> - The `-include` option specifies the file to be imported. Wildcards can be used for batch import.

The above operation will rewrite the commit history. If you do not want to rewrite the history, use the --no-rewrite option and provide new commit information:

```bash
git lfs migrate import --no-rewrite -m "lfs import"
```

After the files in the local commit history are included in LFS management, if the history is modified again, a force push is required when pushing the code again.

To change the commit history, you need to use `--force` option to push forcefully.

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

By now, the large files in the historical commits have been migrated to the remote LFS server. The local Git repository only keeps the pointer file of this large file, so pushing will no longer trigger quota limitations. After a successful push, the remote repository will be consistent with the local repository, as shown in Scenario 1, it only manages the pointer file of this large file.

After a successful push, you can see it in the **Repository Management page**:
 
![Image Description](./assets/lfs_1.png)

#### **Scenario Three:**

As a heavy user of Git, you must use Git to manage your files in your daily work. However, if you have experienced rewriting historical commits and uploading to the LFS server, you have learned to configure the LFS feature in the repository from the beginning to ensure that every commit and push is perfect.

In a new project, in the initial stage, you have already configured LFS. At this time, there is a larger file 'biggerthanbigger.zip' with a size of 778M, which far exceeds the limit of the individual file size.

- Use LFS to manage newly added large files

```bash
cd new-project
git add biggerthanbigger.zip
git commit -m "add bigger than bigger zip file"
```

Then commit to the remote repository, because LFS service is used, **if there are no unexpected issues, this commit will not be rejected**.

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

But in fact, accidents are very likely to happen!

Because the pushed file is too large, it is likely to fail to push due to exceeding the LFS quota. Although LFS is specifically used for managing large files, it cannot store large files without restrictions as it is not a file storage service.

Regarding the limitations on large files with Gitee LFS, please refer to the quota explanation below.

<hr />

### **Gitee LFS Quota Explanation**

Currently, the LFS feature is only available to paid enterprises, with the following quotas:

| Free Version | Basic Class | Standard Edition | Advanced Edition | Exclusive Edition | Private Deployment Version |
| ------ | ------ | ------ | ------ | ------ | ------------ |
| 0 GB   | 1 GB   | 1 GB   | 1 GB   | 1 GB   |
  Unlimited         |

Query link: [https://gitee.ru/enterprises#price](https://gitee.ru/enterprises#price)

To view the usage of LFS capacity for each repository in an enterprise that has enabled LFS feature, go to the enterprise dashboard (Dashboard). Assuming your enterprise name is My-Enterprise, the address is https://e.gitee.ru/My-Enterprise/dashboard:

![Image Description](./assets/lfs_2.png)

<hr/>

To view the LFS capacity usage of each repository within the enterprise, go to the enterprise dashboard, select the extension application, and click on LFS for details:

![Image Description](./assets/lfs_1.png)

You can see the usage of quota for each repository using LFS feature within the enterprise, as well as the total usage. Clicking on the repository name will also redirect you to the management page of that repository.

<hr/>

If the enterprise has a high demand for large files and the current 1 GB capacity is not enough, don't worry, Gitee has a solution, which is self-expansion.

Still in the enterprise management dashboard, at the top level, there is a [Renew/Upgrade/Expand] link that leads directly to the upgrade and expansion interface:

![Image Description](./assets/order_1.png)
![Image Description](./assets/order_2.png)

According to enterprise requirements, up to 100G of LFS space can be configured, which is sufficient for most projects.

<hr/>

### **Summary:**

Git LFS is an easy-to-install, easy-to-configure, and efficient Git extension tool that effectively manages large files in repositories, avoiding the problem of large repository size and affecting project management efficiency. At the same time, Gitee platform provides good support for Git LFS functionality, coupled with flexible space quota management, making it easy for enterprises to achieve automatic scaling, and conveniently solve the problem of large repository files encountered in project development.

Reference links

[https://git-lfs.github.com/](https://gitee.ru/link?target=https%3A%2F%2Fgit-lfs.github.com%2F)

[https://git-scm.com/docs/gitattributes](https://gitee.ru/link?target=https%3A%2F%2Fgit-scm.com%2Fdocs%2Fgitattributes)

[https://zzz.buzz/zh/2016/04/19/the-guide-to-git-lfs/](https://gitee.ru/link?target=https%3A%2F%2Fzzz.buzz%2Fzh%2F2016%2F04%2F19%2Fthe-guide-to-git-lfs%2F)