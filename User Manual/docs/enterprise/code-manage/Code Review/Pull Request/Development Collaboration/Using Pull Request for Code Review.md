---
title: Using Pull Request Feature for Code Review
origin-url: https://gitee.ru/help/articles/4304
---

If your team adopts the "Fork + Pull" collaboration model recommended by Gitee, we also recommend using the Pull Request feature for code review within the team, with the following steps:

### **Repository Manager: Code Review Setup**

> After setting specific individuals as the default code reviewers/testers for a repository, whenever a new Pull Request with the target branch within this repository is created, the system will notify the specified individuals to review the submitted Pull Request (i.e., the modified code content). At the same time, thresholds for merging Pull Requests can be set (e.g., whether all specified individuals need to agree before merging).

### **Developer Submit Pull Request**

> Developers can initiate a code review request by submitting a Pull Request from a forked branch to the source branch of the repository or from a working branch within the same repository to the source branch, in order to update the code in the source branch.

### **Reviewers Conduct Code Review/Testing**

> Specify personnel to view the Pull Request content submitted by developers and decide whether to accept the changes made by the developer.

### **Repository Admin Merges Pull Request**

After the reviewers agree, the repository administrators can merge the developer's file changes to the source branch by merging the Pull Request.

Illustration as follows:

![Image Description](./assets/095737_47c0f42b_5370906.webp)

### **Repository Manager: Code Review Setup**

- Code review is based on repositories. Members with repository administrator or higher roles can access the [Repository Details] - [Code Review Settings] page
- Set the corresponding code reviewers/testers according to the requirements.

![Image Description](../../../../../../assets/image175.png)

Once set up, whenever a developer submits a Pull Request to a branch in the repository, the relevant personnel will receive a notification to start the code review process.

### **Developer Submits Pull Request**

- Developer forks the target repository, makes modifications on the corresponding branch, and pushes to their own forked repository. Click '+' and then 'Pull Request' from their own repository.

![Image Description](../../../../../../assets/image176.png)

### **Reviewers Conduct Code Review/Testing**

In the enterprise view [Dashboard] - [Pull Request] of the specified reviewer, the [Assigned to Me] tab is the Pull Request that the reviewer needs to review.

![Image Description](../../../../../../assets/image177.png)

> Note: Paying enterprise users automatically enable code defect scanning, which will automatically scan defects and specification issues in any submitted Pull Request.

- Reviewers can view the details of the Pull Request
 
- The only difference is that the newly created directory is now named mygrit, everything else is the same as above.
![Image Description](../../../../../../assets/image178.png)

- Also supports code line comments in "File Changes"
![Image Description](../../../../../../assets/image179.png)
、、

- View the report content in 'Bug Report' and 'Specification Report'
![Image Description](./assets/pull_request_6.png)

The reviewer's suggestions will be notified to the developer who submitted the pull request through messages, etc., and the developer can discuss with the reviewer in the 'Comments' section according to the situation.

### **Repository Admin Merges Pull Request**

After the Pull Request review is completed and meets the code review rules set by the repository administrator, members with the permission to merge Pull Requests (usually repository administrators, please refer to protected branch rules for special cases) can merge the Pull Request into the target branch.
![Image Description](../../../../../../assets/image182.png)

After the merge is complete, the developer's changes to the target branch take effect. If there are any other issues, please refer to how to roll back to a previous version