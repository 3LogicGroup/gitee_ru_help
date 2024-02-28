---
title: Quickly Import GitHub Repositories to Gitee and Synchronize Updates
origin-url: https://gitee.ru/help/articles/4284
---

### 1. Repository Import

Log in to the Gitee account, click the "+" button in the upper right corner, click "Import repository from GitHub", and authorize Gitee access on the redirected page.

![Image Description](https://images.gitee.ru/uploads/images/2020/1228/112528_a7793116_7722649.png )

Integration with GitHub.

![Image Description](https://images.gitee.ru/uploads/images/2019/1219/181219_db79b8bd_669935.png )

Import your Github projects to Gitee selectively

![Image Description](https://images.gitee.ru/uploads/images/2019/1219/181957_1fb4eeac_669935.png )

- If it is an open source repository, simply click create, and after the import is completed, you will be taken to the corresponding Gitee repository page (import speed may vary depending on the repository size and network conditions, please be patient).

- If it is a private repository, you need to log in with a GitHub account that has permission to operate the repository and authorize it. The result is the same as above.

Sync updates between Gitee and Github

#### Method 1 (recommended): For repositories with fewer branches

If it is a local repository, only add the remote repositories for Gitee and Github with different names as needed on the command line.

`git remote add remote_name remote_address`

![Image Description](https://images.gitee.ru/uploads/images/2019/1219/182224_d5066b4d_669935.png )

The specific method of operation is as follows:

1. First, use 'git remote -v' to check the remote repository list of the repository you want to sync. If the Gitee remote repository address is not in the list, you need to add a new address.

```bash
git remote add remote_repo_name remote_repo_url
# eg: git remote add gitee git@github.com:xxx/xxx.git
```

If you encounter the error 'Could not remove config section' while adding

2. Pull the latest code from GitHub to your local machine.

```bash
git pull repository_name branch_name
# eg：git pull origin master
```

3. Push the latest local code to Gitee

```bash
git push remote_repo_name branch_name
# eg：git push gitee master
```

If there are any differences, you need to resolve them manually.

#### Method 2 (Recommended): Comparing multiple branch repositories

1. Clone the GitHub repository to the local machine, using the following command

```bash
git clone git@github.com:xxx/xxx.git
# Enter the repository directory
cd xxx
```

2. Pull all branches of the repository at once, the command is as follows:

`$ for b in`git branch -r | grep -v -- '->'`; do git branch --track ${b##origin/} $b; done`

Command Simple Explanation:

- | Represents a channel, which means that the output of the previous command is the input of the next command.
- for xxx in xxxs; do xxx; done is a shell for loop statement.
- The backticks `` indicate that the content inside is a command.
- git branch -r lists remote branches.
- grep -v – ‘->’, grep command to search for lines that do not contain '->'.
- git branch -r | grep -v – '->', which together means to view remote branches excluding those containing '->'.
- $b represents the name of the remote branch, for example: origin/dev.
- ${b##origin/} means to extract the content after `origin/` in the remote branch name, for example: dev, and use it as the local branch.
- git branch --track ${b##origin/} $b, similar to method 1: git branch dev origin/dev. The --track parameter is optional.

Check all branches (including local and remote repository branches)

```bash
git branch --all
```

4. Push local repository to Gitee

#### Method 3: Compare repositories with multiple branches

Click the sync update button on the Gitee repository homepage!

![Image Description](https://images.gitee.ru/uploads/images/2019/1219/182244_d97d6aa2_669935.png )

The synchronization function here is set to force synchronization (new code will directly overwrite the existing one)

--------------------------

Reference article link:

Gitee Official Blog: <https://blog.gitee.ru/2018/06/05/github_to_gitee/>