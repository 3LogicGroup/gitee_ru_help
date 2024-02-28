---
title: Repo tool introduction
authors:
  - name: Zoker
    url: https://gitee.ru/kesin
origin-url: https://gitee.ru/help/articles/4316
---

### Workflow Introduction

Note: The content containing {*} in the following instructions represents variables.

1. Configure the manifest.xml file
2. repo boot command download
3. repo init initialization
4. Repo Sync Repository Sync
5. repo start {BRANCH} [project1, project2] Start development for multiple branches...
6. repo stage/repo forall -c git add . or commit manually
7. repo config repo.token {ACCESS_TOKEN} Configure personal API token for Gitee
8. repo config repo.pullrequest {True/False} configures whether to enable the feature of submitting a PR to the specified branch after pushing.
9. repo push -p --br={BRANCH} --d={DEST_BRANCH}
--new_branch push and associate with the specified branch from the local repository to remote, after successful push, batch commit to the specified branch
10. Use 'repo sync' or 'repo forall -c git pull' to perform bulk code synchronization.

### Manifest Configuration Example

Create a 'default.xml' file as the basis for initializing 'repo' in a repository named 'manifest'.
The following is the `repo init` initialization command, which needs to use the `-u` parameter to specify the git repository of the manifest.

```shell
repo init -u git@gitee.ru:{namespace}/manifest.git
```

`default.xml file case`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <remote  name="gitee"
           fetch="git@gitee.ru:{namespace}"     
           autodotgit="true" /> <!--fetch=".." represents the relative path specified by repo init -u can also use the complete path, example:https://gitee.ru/MarineJ/manifest_example/blob/master/default.xml-->
  <default revision="master"
           remote="gitee" /><!--revision is the default branch to pull, follow-up 提

<project path="repo_test1" name="repo_test1" />
<!--git@gitee.ru:{namespace}/{name}.git name item is related to the clone url-->
  <project path="repo_test2" name="repo_test2" /> 

</manifest>
```

1. It should be noted that the 'revision' attribute of 'default' represents the target branch for subsequent PR submissions.
2. Different projects can have different revisions. In other words, the target branch for submitting the pull request can also be different. The priority of the revision is from low to high.
3. Currently, fetch only supports SSH for Gitee.

### 1. Repo Boot Command Installation

```shell
# Python 3 Version Backward Compatibility
curl https://gitee.ru/oschina/repo/raw/fork_flow/repo-py3 > /usr/local/bin/repo
# Give Script Executable Permission
chmod a+x /usr/local/bin/repo
# Install requests dependency or automatically install according to prompts when executing commands
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

If the installation is successful but still prompts an error, it is recommended to use PyEnv to manage the Python environment.
https://gitee.ru/mirrors/pyenv
```

### 2. Repo Initialization and Initial Repository Sync

```shell
mkdir your_project && cd your_project
repo init -u git@gitee.ru:{namespace}/manifest.git
repo sync
```

### 3. Repo + Gitee Local Development Process

```shell
repo start {branch} --all # Switch to development branch, when specified for certain repositories, it will trigger the pre-forking of the repositories

Branch development........

repo forall -c git add ./git add/repo stage # Bulk add to staging area or add individually
repo forall -c git commit/git commit  #  Batch commits or individual commits

repo config --global repo.token {TOKEN} # Configure gitee access_token, get access_token connection [https://gitee.ru/profile/personal_access_tokens]
  
repo config repo.pullrequest {True/False} # Configure whether to trigger PR
repo push --br={BRANCH} --d={DEST_BRANCH} # Push and generate PR and review. After execution, the projects available for push will be displayed. Comment out the branches that do not need to be pushed for subsequent push.

repo gitee-pr --br={BRANCH} # Get the list of PRs for the specified branch after the project is pushed

```

 `repo push` Parameter Introduction
![Image Description](https://images.gitee.ru/uploads/images/2020/0904/191114_41c2e24f_1332572.png )
1. It is worth noting that the `--dest_branch` and `--br` parameters, if not filled with the corresponding branch, will operate based on the default branch.
2. When pushing to the repo, it will default to the user's personal namespace associated with the token.
3. By default, repo push uses the SSH method to the namespace associated with the user's token.

 `repo`  Result details
![Image Description](https://images.gitee.ru/uploads/images/2020/0727/153908_dcd3f625_1332572.png )

repo gitee-pr parameter introduction
![Image Description](https://images.gitee.ru/uploads/images/2020/0906/230859_93627600_1332572.png )  
Returns the PRs that have already been submitted on the Gitee platform under the specified branch when the --br={BRANCH} parameter is provided.