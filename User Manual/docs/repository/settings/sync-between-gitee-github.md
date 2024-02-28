---
title: Repository Image Management (Gitee<->Github Bidirectional Synchronization)
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4336
slug: /repository/settings/sync-between-gitee-github
---

Function Introduction

The repository mirror management function is used to configure and manage repository mirrors. Configuring repository mirrors can automatically synchronize repository branches, tags, and commit information between different platforms.

> Currently, this feature is open until August 31, 2022. Before the end of the limited opening period, we will update the relevant product policies.

Gitee supports setting two types of mirrors:

- [Push](#%E6%B7%BB%E5%8A%A0-push-%E6%96%B9%E5%90%91%E7%9A%84%E9%95%9C%E5%83%8F): Used to automatically mirror the `Gitee` repository to `GitHub`.

> When you configure this mirror, when you submit code to the repository on Gitee, Gitee will automatically synchronize the repository to GitHub
  >
  > ![Push](https://images.gitee.ru/uploads/images/2021/0609/151053_e2fe166f_8249553.png )

- [Pull](#Adding-pull-direction-images): Used to mirror the repository from 'GitHub' to 'Gitee'.

  > You can choose automatic mirroring or manual mirroring according to your needs;
  >
> Auto Mirroring: When you commit code to the GitHub mirror repository, Gitee will automatically sync the repository from GitHub;
  >
  > ![Pull](https://images.gitee.ru/uploads/images/2021/0609/151115_83062169_8249553.png )
  >
  > Manual mirror: Gitee will only synchronize the repository from GitHub when you manually click the update button.

The repository image will synchronize the following content:

- Branches
- Tags
- Commit Records (Commits)

Configuring repository mirroring can help you manage GitHub repositories and reduce the time cost of maintaining repositories on different platforms.

If you encounter any problems during use, please go to [User Feedback Repository](https://gitee.ru/oschina/git-osc) to give us feedback.

# Configure repository images

## Add mirror for Push direction

A push direction mirror is used to automatically mirror the `Gitee` repository to `GitHub`.

- **Run (Build):** Represents an execution of the pipeline. After the run is completed, you will get all the logs related to stages and tasks, as well as the results of the run.

You can add a mirror in the Push direction in the following ways:

1. Enter the repository where the image feature needs to be used, go to 'Settings' and find the 'Repository Mirroring' option, click on 'Add Mirroring'.

   > If you haven't bound your GitHub account yet, please follow the pop-up prompt to bind your GitHub account;

   ![Image Description](https://images.gitee.ru/uploads/images/2021/0609/110626_76a3ab9b_8249553.png "12.png")

2. Add image;

   ![Image Description](https://images.gitee.ru/uploads/images/2021/0608/154110_68e97f15_8249553.png "6.png")

1. Select the Push direction in the "Image Direction";

   2. Select the repository to be mirrored from the "Mirror Repository" dropdown list;

3. Enter your GitHub personal token in "Personal Access Tokens".
      - The personal token must include authorization to access 'repo', otherwise the added image will not be available.

   4. Click 'Add' to save the image configuration.

After the configuration is completed, you can trigger image operations (Gitee synchronizes repositories to GitHub) in the following ways:

- Commit code to Gitee repository
- [Manually update the mirror](#%E6%89%8B%E5%8A%A8%E6%9B%B4%E6%96%B0)

> The minimum interval for triggering a mirror is 5 minutes.

If only the Push direction mirror is configured, it is recommended to submit the latest code to the Gitee repository.
>
> Gitee automatically synchronizes repositories (branches, tags, commits) with GitHub.

## Add mirror for Pull direction

Pull direction mirrors the repositories from GitHub to Gitee.

You can choose automatic mirroring or manual mirroring according to your needs.

You can configure a mirror in the Pull direction in the following ways:

1. Enter the repository where the image feature needs to be used, go to 'Settings' and find the 'Repository Mirroring' option, click on 'Add Mirroring'.

   > If you haven't bound your GitHub account yet, please follow the pop-up prompt to bind your GitHub account;

   ![Image Description](https://images.gitee.ru/uploads/images/2021/0609/110626_76a3ab9b_8249553.png "12.png")

2. Add image;

   ![Image Description](https://images.gitee.ru/uploads/images/2021/0609/111013_4806d22e_8249553.png "13.png")

1. Select Pull direction in the 'Mirror Direction';

   2. Select the repository to be mirrored from the "Mirror Repository" dropdown list;
3. Enter your GitHub personal token in "Personal Access Tokens".
      - The personal token must include authorization to access 'repo', otherwise the added image will not be available.
   4. Choose whether to select "Automatically sync repository from GitHub" based on your needs;
      - If selected, we will automatically generate a webhook in the mirrored repository for automatic mirroring;
- This feature requires your personal access token to include access authorization for `admin:repo_hook`, otherwise it will fail to add;
   5. Click 'Add' to save the image configuration;
 - If the addition fails, please reapply for a personal token according to the process provided in [How to Apply for a GitHub Personal Token](#how-to-apply-for-a-github-personal-token).
      - If the addition still fails after reapplying the personal token, please uncheck "Automatically sync repositories from GitHub" and click "Add" to save the image.

After the configuration is complete, you can trigger image operations through the following methods (Gitee synchronizes repositories from GitHub):

- Push code to GitHub mirror repository
- [Manually update the mirror](#%E6%89%8B%E5%8A%A8%E6%9B%B4%E6%96%B0)

> The minimum interval for triggering a mirror is 5 minutes.

> If only the Pull direction of the image is configured, it is recommended to submit the latest code to the GitHub image repository.
>
Gitee will automatically sync repositories (branches, tags, commits) from GitHub.

Bidirectional Mirroring

Bidirectional mirroring refers to configuring two types of mirroring for the same GitHub repository.

> After configuring bidirectional mirroring, the code you submit on any platform will be synchronized to the other platform.
>
> Note: Bidirectional mirroring currently carries the risk of code loss, please use with caution!

To prevent code loss, please follow the rules when using bidirectional mirroring

1. Do not submit code to the Gitee repository and GitHub mirrored repository at the same time.

2. Try to ensure that the time interval between the Gitee repository and the GitHub mirrored repository is greater than 30 minutes for code submissions.

# Manage repository images

## Precautions

Please pay attention to the following information when using the repository mirroring feature:

1. Only supports repositories that have authorized access with a GitHub account;

2. Once an update request is sent, it cannot be interrupted unless [force stopped](#force-stop);

3. Synchronization of Git-LFS is not currently supported;

4. Synchronization time exceeding 30 minutes is considered as timeout. It is not recommended to use mirror synchronization for large repositories;

5. Image operations will overwrite the branches, tags, and commit records of the target repository. Please backup and use with caution.

Manual Update

At any time, you can manually initiate an update request by using the "Update" button on the "Repository Mirroring Management" page.

> Once the update request is initiated, it cannot be manually stopped, so please proceed with caution.
>
> The minimum update interval for each mirror is 5 minutes.

Force Stop

After the image update request is initiated, if the image fails 5 times in a row, the image operation will be forcibly stopped.

> You can see the error message returned by the last failed image in the image list.
>
> After forced stop, you can initiate an update request again in at least 5 minutes.

# Frequently Asked Questions

## How to request a GitHub private token?

> GitHub personal token is used to grant Gitee permission to read and write Github repositories.

You can apply for a GitHub personal token by following these steps:

1. Log in with the GitHub account associated with Gitee;

2. Enter "Developer setting" by clicking on "User Avatar" -> "Settings" -> "Developer setting";

3. Select the 'Personal access tokens' option and click 'Generate new token';

4. The "Note" field can be filled in randomly; for example, Gitee_Mirror;

5. Please check the "Select scopes" field according to your needs;
      - The `repo` field is a required field, please check it directly;
      - The `admin:repo_hook` field is optional and is used to automatically generate webhooks;
        > When you need Gitee to automatically synchronize the repository from GitHub, it is recommended to select this option.

6. Click on 'Generate token' to generate a personal token;

7. Copy the private token and keep it properly.

![Personal Token](https://images.gitee.ru/uploads/images/2021/0607/102945_c25b7fc1_8249553.png "5.png")

## Why does pushing to GitHub fail?

If your GitHub account has enabled the 'Keep my email addresses private' feature and you push code using your email on Gitee, the push through Gitee will be subject to this restriction.

## How to manually configure Webhook?

> Webhook is used to achieve automatic synchronization of Pull direction images.

If you are unable to use the automatically generated webhook feature provided by us, or if you accidentally delete the automatically generated webhook;

You can manually configure webhooks using the following methods:

### 1. Apply for a private token from Gitee

> If your existing personal token includes 'project' permission, you can skip this step.

1. Go to 'User Avatar' -> 'Settings' to find the 'Personal Access Token' option;

![Personal Token](https://images.gitee.ru/uploads/images/2021/0608/113341_ea5547fd_8249553.png "9.png")

2. Generate a personal token according to the following steps;

   ![Image Description](https://images.gitee.ru/uploads/images/2021/0608/113402_9a4908f8_8249553.png "10.png")

- The 'Private Token Description' field can be filled in at will; for example, Gitee_Mirror;
   - Check the `project` permission;
   - Click "Submit" to generate a personal token;

3. Copy the personal token and keep it safe.

### 2. Configure webhook

1. Enter the mirror repository of GitHub, go to 'Settings', find the 'Webhooks' option, and click 'Add webhook';

2. Fill in the `Payload URL` field in the following format;

   ```JavaScript
   https://gitee.ru/api/v5/repos/:owner/:repo/remote_mirror/pull?access_token=:personal access token
   ```

   - `:owner`: Indicates the ownership of the repository
   - `:repo`: Specifies the repository name
   - `:personal access token`: Refers to your Gitee personal token

3. Select 'Just the push event.';

   - If you need to customize the trigger behavior, please select 'Let me select individual events.' and define it yourself;

4. After ensuring that "Active" is checked, click "Add webhook" to save the webhook;

### 3. Webhook connectivity test

After saving the webhook, GitHub will automatically send a test request, you can check if the webhook is working properly by looking at the `icon` in the list.

- Normal:

![Normal](https://images.gitee.ru/uploads/images/2021/0924/105302_29a750fc_8249553.png)

- Abnormal:

![Abnormal](https://images.gitee.ru/uploads/images/2021/0924/105210_58266444_8249553.png)

- In this case, please carefully check if the 'Payload URL' is correct and try again.

## Common Errors

- Repository not found: Please check if the mirrored repository has been deleted or renamed.

Invalid personal token: Please check if the personal token is entered correctly.

- Insufficient permissions for personal tokens: Please check if the personal token includes 'repo' authorization;

- The repository is being read or written, please try again later: Pull or Push image is being updated, please retry after the update is complete.