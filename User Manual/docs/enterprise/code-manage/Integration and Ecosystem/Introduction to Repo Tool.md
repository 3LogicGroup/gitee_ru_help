---
title: Introduction to Repo Tools
origin-url: https://gitee.ru/help/articles/4316
---

### **Introduction to the Usage Process**

Note: The content with {*} in the following instructions represents variables

1. Configure manifest.xml file
2. Download the repo bootstrap command
3. repo init initialization
4. repo sync repository synchronization
5. repo start {BRANCH} [project1, project2] for batch branch switching to start development...
6. repo stage/repo forall -c git add . or submit it manually
7. repo config repo.token {ACCESS_TOKEN} configures the Gitee personal API token
8. repo config repo.pullrequest {True/False} configures whether to enable the feature of submitting a PR to the specified branch after a push.
9. repo push -p --br={BRANCH} --d={DEST_BRANCH} --new_branch uses the specified local branch to push and associate with the remote branch, and after successful push, submit in bulk to the specified branch
10. repo sync or repo forall -c git pull to synchronize code in batches

### **Manifest Configuration Example**

Create a default.xml file in the repository named 'manifest' as the basis for repo initialization
The following is the repo init initialization command, which needs to use the -u parameter to specify the git repository for the manifest.

```bash
repo init -u git@gitee.ru:{namespace}/manifest.git
```

default.xml File Case

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
  <remote  name="gitee"
           fetch="git@gitee.ru:{namespace}"     
'autodotgit="true" /> <!--fetch=".." represents using the relative path specified by repo init -u can also use the complete path, for example: https://gitee.ru/MarineJ/manifest_example/blob/master/default.xml-->'
  <default revision="master"
<!--revision is the default pull branch, and subsequent pull requests will also target the revision as the default target branch-->

<project path="repo_test1" name="repo_test1" /> <!--git@gitee.ru:{namespace}/{name}.git name item is related to the clone URL-->
  <project path="repo_test2" name="repo_test2" /> 

</manifest>
```

1. The revision attribute of default should be noted as the target branch for subsequent PR submissions
2. Different projects can also have different revisions, which means the target branch for submitting PR can also be different. The priority of revisions is from low to high.
3. fetch currently only supports gitee's ssh

### **1. Repo Bootstrap Installation**

```bash
# Python3 version backward compatible
curl https://gitee.ru/oschina/repo/raw/fork_flow/repo-py3 > /usr/local/bin/repo
# Grant executable permission to the script
chmod a+x /usr/local/bin/repo
"# Install the requests dependency, or automatically install it according to the prompt when executing the command"
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests

# If the installation is successful but you still get an error message, it is recommended to use PyEnv for Python environment management.
https://gitee.ru/mirrors/pyenv
```

### **2. Repo Initialization and Initial Repository Sync**

```bash
mkdir your_project && cd your_project
repo init -u git@gitee.ru:{namespace}/manifest.git
repo sync
```

### **3. Repo + Gitee Local Development Process**

```bash
repo start {branch} --all # Switch to the development branch. When specifying certain repositories, it will trigger the pre-fork of the repository.

Branch development........

repo forall -c git add ./git add/repo stage # Batch add to staging area or add individually
Batch or individual submission with 'repo forall -c git commit/git commit'

repo config --global repo.token {TOKEN} # Configure Gitee access_token, access_token acquisition link https://gitee.ru/profile/personal_access_tokens
  
'repo config repo.pullrequest {True/False}' - Configures whether to trigger a PR.
repo push --br={BRANCH} --d={DEST_BRANCH}  # Push and create a PR and review. After execution, the projects available for push will be displayed. Uncommented branches will be pushed in the next step.

repo gitee-pr --br={BRANCH} # Get the list of PRs for the specified branch after project push
```

Introduction to repo push parameters

![Image Description](./assets/191114_41c2e24f_1332572.webp)

1. It is worth noting the --dest_branch and --br parameters. If the corresponding branches are not specified, the operations will be based on the default branch. --br will use the current branch for submission, and --dest_branch will use the default revision in manifest.xml as the default target branch.
2. When pushing to the repository with repo push, it will by default push to the repository under the user's personal namespace associated with the token. If the branch was not forked beforehand, then if the repo push fails, it will fork the upstream repository again using the user associated with the token, and then push again.
3. The repo push command will by default push the repository to the user's namespace using the ssh method associated with the token. If you want to change it to https, you can configure the repo.pushurl to the user's namespace address such as [https://gitee.ru/xxxx].

repo result details

![Image Description](./assets/153908_dcd3f625_1332572.webp)

Introduction to gitee-pr parameters in the repository

![Image Description](./assets/230859_93627600_1332572.webp)

return the specified branch that has already been submitted on the Gitee platform under the --br={BRANCH} parameter