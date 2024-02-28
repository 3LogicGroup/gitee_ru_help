---
title: Jenkins Plugin
origin-url: https://gitee.ru/help/articles/4193
---

# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#Introduction)
- [Supported Features](#Supported Features)
  - [Planned Features](#Planned-Features)
- [Plugin Installation](#Plugin Installation)
- [Plugin Configuration](#Plugin Configuration)
  - [Add Gitee link configuration](#add-gitee-link-configuration)
    - [Create a New Build Task](#Create-a-New-Build-Task)
- Global Task Configuration
- Source Code Management Configuration
    - [Trigger Configuration](#trigger-configuration)
    - [Post-build Steps Configuration](#post-build-steps-configuration)
      - [Build Result Feedback to Gitee](#build-result-feedback-to-gitee)
      - [Automatically merge PR on successful build](#automatically-merge-pr)
- [Create Gitee Project WebHook](#create-gitee-project-webhook)
- [Test push to trigger build](#test-push-to-trigger-build)
      - [Test PR Trigger Build](#test-pr-trigger-build)
- [Environment Variables](#Environment Variables)
- [User Support](#User Support)
- [Contribution](#Contribution)
  - [Packaging or running tests](#Packaging-or-running-tests)

Introduction

Gitee Jenkins Plugin is a Jenkins plugin developed by Gitee based on [GitLab Plugin](https://github.com/jenkinsci/gitlab-plugin). It is used to configure Jenkins triggers to receive WebHook sent by Gitee platform for automated continuous integration or continuous deployment, and can provide feedback on the build status to Gitee platform.

Currently supported features

- When pushing code to Gitee, the configured WebHook triggers a Jenkins job build.
- Comment submit record triggers corresponding version Jenkins task build
- When submitting a Pull Request to the Gitee project, it triggers Jenkins through the configured WebHook
- Support [ci-skip] instruction filtering or [ci-build] instruction triggering the build.
- Filter already built Commit versions. If it is a branch push, then filter the same branch push. If it is a PR, then filter the same PR.
- Filter triggers by branch name.
- Regular expression filtering for triggering branches.
- Set WebHook Verification Password.
- Configurable post-build actions to comment the build result triggered by PR to the corresponding PR in Gitee.
- The post-build action can be configured to automatically merge the corresponding PR when the build triggered by the PR is successful.
For all events related to PR, if the PR code conflicts cannot be automatically merged, do not trigger the build; and if the function to comment on PR is configured, comment on the PR to indicate the conflict.
- PR comments can trigger builds through WebHooks (can be used to trigger builds again from Gitee platform comments if build fails)
- Support configuring PR to not require testing and filter trigger builds. (Can be used for not building and deploying test environment if no testing is required)
- Supports canceling the ongoing unfinished build for the same PR when triggering a build, and proceeds with the current build (multiple builds for the same PR do not queue, multiple different builds are not queued either).

## Planned Features

1. PR review and test pass trigger build (can be triggered by users for deployment, and can be combined with the feature of automatically merging PRs to improve workflow.)
2. Check the trigger method to automatically add WebHook to Gitee.

# Plugin installation

1. Online Installation
    - Go to Manage Jenkins -> Manage Plugins -> Available
  - Right side Filter input: Gitee
    - Check Gitee in the optional list below (if Gitee is not in the list, click Check now
- Click Download now and install after restart

![Image Description](https://images.gitee.ru/uploads/images/2018/0723/112748_b81a1ee3_58426.png )

2. Manual Installation
   - From the [release](https://gitee.ru/oschina/Gitee-Jenkins-Plugin/releases) list, enter the latest release version and download the corresponding XXX.hpi file.
- Go to Manage Jenkins -> Manage Plugins -> Advanced
- Select the downloaded XXX.hpi file in "Upload Plugin File" and click Upload
    - On the subsequent page, check the box for 'Restart Jenkins when installation is complete and no jobs are running.'

![Image Description](https://images.gitee.ru/uploads/images/2018/0723/113303_2a1d0a03_58426.png )

# Plugin configuration

## Add Gitee link configuration

1. Go to Jenkins -> Manage Jenkins -> Configure System -> Gitee Configuration -> Gitee connections
2. Enter 'Gitee' or any name you want in 'Connection name'
3. Enter the Gitee complete URL address in 'Gitee host URL': 'https://gitee.ru' (Domain name of Gitee private deployment entered by the Gitee private deployment customer)
4. If Gitee APIV5 personal token is not configured in `Credentials`, click `Add` and select `Jenkins`.
1. Select ``Domain`` and choose ``Global credentials``.
2. Select "Kind" as "Gitee API Token"
    3. ``Scope`` Select the scope you need
4. Enter your Gitee personal token for the 'Gitee API Token', get the address: <https://gitee.ru/profile/personal_access_tokens>
5. Enter the desired ID and description in the `ID` and `Description` fields.
5. Select ``Credentials`` and choose the configured Gitee APIV5 Token.
6. Click `Advanced` to configure whether to ignore SSL errors (depending on your Jenkins environment) and set the link measurement timeout (depending on your network environment).
7. Click ``Test Connection`` to test if the link is successful. If it fails, please check the above steps 3, 5, 6.

After successful configuration, it should look like this:
![Gitee link configuration](https://images.gitee.ru/uploads/images/2018/0716/185651_68707d16_58426.png)

### Create New Build Task

Go to Jenkins -> New Item, enter 'Gitee Test' as the name, select 'Freestyle project' and save to create the build project.

### Task Global Configuration

In the task global configuration, you need to select the Gitee link from the previous step. Go to the Configure -> General of a specific task (e.g. 'Gitee Test'), choose the Gitee connection configured earlier, as shown in the figure:

![Task Global Configuration](https://images.gitee.ru/uploads/images/2018/0716/191715_9660237b_58426.png )

### Source Code Management Configuration

Go to a task (e.g. 'Gitee Test') Configure -> Source Code Management tab

1. Click *Git*
2. Enter your repository address, for example ``git@your.gitee.server:gitee_group/gitee_project.git``
1. Click the *Advanced* button, enter ``origin`` in the *Name* field, and enter ``+refs/heads/*:refs/remotes/origin/* +refs/pull/*/MERGE:refs/pull/*/MERGE`` in the *Refspec* field.
Note that the new version of Jenkins no longer accepts multiple refs descriptions that simultaneously contain the * wildcard. If you only want to trigger on a push, you can write the first part only; if you only want to trigger on a PR, you can write the second part only. See the following image for details: ![Image Description](https://images.gitee.ru/uploads/images/2020/0601/220940_0ce95dd0_58426.png )
3. In the Credentials section, enter the username and password credentials corresponding to the https URL of the git repository or the ssh key credentials for ssh. Note that the Gitee API Token credentials cannot be used for source code management, they are only used for API calls in the Gitee plugin.
4. *Branch Specifier* option:
1. For single-repository workflow input: ``origin/${giteeSourceBranch}``
2. For PR workflow input: 'pull/${giteePullRequestIid}/MERGE'
Additional Behaviours options
1. For single-repository workflows, if you want to merge the default branch (release branch) before building the pushed branch, you can do the following:
        1. Click on *Add* dropdown
2. Select *Merge before build*
        3. Set *Name of repository* to ``origin``
4. Set *Branch to merge to* as ``${ReleaseBranch}``, which is the default branch to merge (release branch)
    2. For PR workflow, Gitee server has already pre-merged the original branch and the target branch of the PR. You can directly build it. If the target branch is not the default branch (release branch), you can also merge it before the build.

Configuration as shown in the figure:

![Source Code Management Configuration](https://images.gitee.ru/uploads/images/2018/0716/191913_ef0995f4_58426.png )

### Trigger Configuration

Go to the trigger build of the task configuration: Configure -> Build Triggers tab

1. Check the `Enabled Gitee triggers` for the build trigger rules you need, such as `Push Event` and `Opened Merge Request Events`. The checked events will receive WebHooks and trigger the build. Currently supported trigger events include:
    - Push Events: Code push event
Commit Comment Events: Comment submission record events
    - Opened Merge Request Events: PR submission event
    - Updated Merge Request Events: Update PR events
Accepted Merge Request Events: Accept/merge PR events
Closed Merge Request Events: Close PR event
    - Approved Pull Requests: Event for approved PR
    - Tested Pull Requests: Triggered by a successful PR event.
2. `Build Instruction Filter` :
    - `None`: No filter
    - `[ci-skip] skip build`: Skip the build trigger when the commit message or PR description contains `[ci-skip]`.
- `[ci-build] trigger build`: commit message
  or when the PR description includes `[ci-build]`, trigger the build.
3. 'Ignore last commit has build' option allows skipping already built Commit versions.
4. Cancel incomplete build on same Pull Requests
5. `Ignore Pull Request conflicts` This option determines whether to build when a Pull Request has conflicts.
6. Allowed branches can be configured to allow building on specific branches, currently supporting branch names and regular expressions for filtering.
7. `Secret Token for Gitee WebHook` This option can configure the password for WebHook, which needs to be consistent with the password configured in Gitee WebHook to trigger the build.
8. Note: If the PR status is not auto-mergeable, the build will not be triggered.
![Trigger Configuration](https://images.gitee.ru/uploads/images/2021/0107/171932_e25c8359_2102225.png )

### Post-Build Steps Configuration

Go to the post-build configuration of the task: Configure -> Post-build Actions tab

#### Build Results Feedback to Gitee

1. Click on the 'Add post-build action' dropdown and select: 'Add note with build status on Gitee pull requests'
2. In `Advanced`, you can configure:
- Add message only for failed builds: Only comment back for failed builds to Gitee
- Customize the review content for each status (the content can reference Jenkins environment variables or custom environment variables).
3. If this feature is enabled, the status that cannot be automatically merged can also be reviewed to Gitee

#### Automatically merge PR on successful build

Click `Add post-build action` dropdown and select: `Accept Gitee pull request on success`

![Build after step configuration](https://images.gitee.ru/uploads/images/2018/0716/192304_0e323bc0_58426.png)

### Create Gitee Project WebHook

Enter the Gitee project set in the source code management configuration, and go to Management -> WebHooks

1. Add a WebHook, and fill in the URL with the URL shown in `Trigger Configuration: Build when a change is pushed to Gitee. Gitee webhook URL`, for example: <http://127.0.0.1:8080/jenkins/project/fu>.
2. Password: Fill in the WebHook password configured in point 5 of the trigger configuration. If no password is set, it can be left blank.
3. Check PUSH, Pull Request

#### Test push triggers build

1. Select the PUSH WebHook in Gitee's WebHook management and click on test to observe the build status of the Jenkins task.
2. Edit a file and submit it on the Gitee project page, and observe the build status of the Jenkins task.

#### Test PR Trigger Build

1. Select the Pull Request WebHook in the WebHook management of Gitee. Click on test and observe the build status of the Jenkins job.
2. Create a Pull Request in the Gitee project and observe the build status of the Jenkins job.

Environment Variables

Currently, the supported environment variables are as follows. Please note that different WebHook triggers may result in some variables being empty. For more details, please install the EnvInject Plugin and check the Environment Variables during the build.

```java
    public Map<String, String> getBuildVariables() {
        MapWrapper<String, String> variables = new MapWrapper<>(new HashMap<String, String>());
        variables.put("giteeBranch", branch);
        variables.put("giteeSourceBranch", sourceBranch);
        variables.put("giteeActionType", actionType.name());
        variables.put("giteeUserName", userName);
        variables.put("giteeUserEmail", userEmail);
        variables.put("giteeSourceRepoHomepage", sourceRepoHomepage);
        variables.put("giteeSourceRepoName", sourceRepoName);
        variables.put("giteeSourceNamespace", sourceNamespace);
        variables.put("giteeSourceRepoURL", sourceRepoUrl);
        variables.put("giteeSourceRepoSshUrl", sourceRepoSshUrl);
        variables.put("giteeSourceRepoHttpUrl", sourceRepoHttpUrl);
        variables.put("giteePullRequestTitle", pullRequestTitle);
        variables.put("giteePullRequestDescription", pullRequestDescription);
        variables.put("giteePullRequestId", pullRequestId == null ? "" : pullRequestId.toString());
        variables.put("giteePullRequestIid", pullRequestIid == null ? "" : pullRequestIid.toString());
        variables.put("giteePullRequestTargetProjectId", pullRequestTargetProjectId == null ? "" : pullRequestTargetProjectId.toString());
        variables.put("giteePullRequestLastCommit", lastCommit);
        variables.put("giteePushCreated", created ? "true" : "false");
        variables.put("giteePushDeleted", deleted ? "true" : "false");
        variables.putIfNotNull("giteePullRequestState", pullRequestState);
        variables.putIfNotNull("giteeMergedByUser", mergedByUser);
        variables.putIfNotNull("giteePullRequestAssignee", pullRequestAssignee);
        variables.put("giteeTargetBranch", targetBranch);
        variables.put("giteeTargetRepoName", targetRepoName);
        variables.put("giteeTargetNamespace", targetNamespace);
        variables.put("giteeTargetRepoSshUrl", targetRepoSshUrl);
        variables.put("giteeTargetRepoHttpUrl", targetRepoHttpUrl);
        variables.put("giteeBefore", before);
        variables.put("giteeAfter", after);
        variables.put("giteeBeforeCommitSha", before);
        variables.put("giteeAfterCommitSha", after);
        variables.put("giteeRef", ref);
        variables.put("ref", ref);
        variables.put("beforeSha", beforeSha);
        variables.put("isTag", isTag);
        variables.put("sha", sha);
        variables.put("status", status);
        variables.put("stages", stages);
        variables.put("createdAt", createdAt);
        variables.put("finishedAt", finishedAt);
        variables.put("duration", buildDuration);
        variables.put("jsonBody", jsonBody);
        variables.put("noteBody", noteBody);
        variables.putIfNotNull("giteeTriggerPhrase", triggerPhrase);
        return variables;
    }

```

User Support

If you have any questions during use, please feel free to provide feedback in [Gitee Jenkins Issue](https://gitee.ru/oschina/Gitee-Jenkins-Plugin/issues).

To get more logs for troubleshooting, you can follow the steps below before providing feedback:

1. Go to Jenkins -> Manage Jenkins -> System Log
2. Click on Add new log recorder.
3. Enter 'Gitee Jenkins Plugin'.
4. In the next page, click on Add in the Logger section, enter 'com.gitee.jenkins' in the input box, and select All in the Log level, then save.
5. After completing the above steps, you can view the translated result in the 'Gitee Jenkins Plugin' log.

Contributions

Feel free to submit CI scenario feature suggestions or directly submit a PR to contribute code.

## Packaging or Running Tests

Pack the hpi file and execute in the repository directory: `mvn package`

Run tests directly: ``mvn hpi:run``