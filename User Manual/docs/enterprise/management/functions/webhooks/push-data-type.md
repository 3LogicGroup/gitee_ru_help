---
title: WebHook Push Data Type Explanation
---

Webhook hooks contain rich JSON aggregation information in the push data, which can be roughly divided into several types according to the aggregation unit of information.

**Explanation:**
**1. The key-value pairs in [] depend on the data situation, and their existence is uncertain.**
**2, \*user, \*commit, etc. indicate references to the corresponding JSON data aggregation**
**3. This document is for reference only. Please refer to the actual data received for accuracy.**
If you find any errors in the documentation, please go to the Gitee feedback center and create an issue.

```bash
Labels: issue and pull request corresponding labels
label: {
  id: Number,
name: String,        # Tag name. eg: fixbug
  color: String        # The color of the label. eg: 000000
}

# Company Information
enterprise: {
  name: String,        # Company name. eg: Open Source China
  url: String          # Enterprise's url on Gitee. eg: https://gitee.ru/oschina
}

# Comment Information
note: {
  id: Number,
  body: String,            # Comment content. eg: Good things should be open source...
  user: *user,             # Information about the author of the comment.
created_at: String,      # The creation time of the comment. eg: 2020-01-01T00:00:00+08:00
updated_at: String, # The update time of the comment. eg: 2020-11-11T11:11:11+08:00
  html_url: String,        # The URL of this comment on Gitee. eg: https://gitee.ru/oschina/git-osc#note_1
[position: String],      # Corresponds to the code position in the code commit comment. eg: 76ec1c6df700af34ae5f8dd00bd7bcb56c1bd706_9_9
[commit_id: String]      # Corresponds to the code commit comment


 As a software engineer, translate above yaml content into English. Output in key-value pairs json format, return only the translated result
}

# User Information
user： {
  [id: Number],
  name: String,                   # User's nickname. eg: Sweet Potato
  email: String,                  # User's email. eg: git@oschina.cn
[username: String],             # User's Gitee personal space address. eg: gitee
[user_name: String],            # Consistent with the username above
  [url: String],                  # User's Gitee personal homepage
  URL. eg: https://gitee.ru/gitee
[login: String],                # same as the above username
  [avatar_url: String || null],   # User's avatar url. eg: https://gitee.ru/assets/favicon.ico
[html_url: String],             # Same as the above url.
[type: String],                 # User type, currently fixed as User.
[site_admin: Boolean],          # Is it an administrator.
[time: String],                 # Time in git commit. eg: 2020-01-01T00:00:00+08:00
[remark: String]                # User's nickname. eg: Ruby
  Genius
}

# Information in git commit
commit: {
  id: String,
  tree_id: String,                  # commit tree oid。eg：db78f3594ec0683f5d857ef731df0d860f14f2b2
  parent_ids: [String],             # commit parent_ids。eg：['a3bddf21a35af54348aae5b0f5627e6ba35be51c']
message: String,                  # The commit message. e.g. fix(cache): Fixed the cache issue
timestamp: String,                # commit time. e.g. 2020-01-01T00:00:00+08:00
  url: String,                      # The Gitee url corresponding to the commit. eg: https://gitee.ru/mayun-team/oauth2_dingtalk/commit/664b34859fc4a924cd60be2592c0fc788fbeaf8f
author: *user,                    # Author information.
committer: *user,                 # Committer information.
distinct: Boolean, # Special commit with no changes such as tag
  added: [String] || null,          # The newly added file names. e.g.: ['README.md']
removed: [String] || null,        # List of removed file names. eg: ['README.md']
  modified: [String] || null        # The modified file name. eg: ['README.md']
}

# Milestone Information
milestone: {
html_url: String,                 # The URL on Gitee. e.g., https://gitee.ru/oschina/git-osc/milestones/1
  id: Number,
  number: Number,                   # Consistent with the above id
title: String,                    # Title of the milestone. eg: Open Source Plan
  description: String || null,      # Detailed description of the milestone. eg: Heading towards the world
number of open issues
closed_issues: Number,            # Number of closed issues
state: String,                    # Status of the milestone. eg: open
created_at: String, # The time when the milestone was created. eg: 2020-01-01T00:00:00+08:00
updated_at: String,               # The time when the milestone was updated. eg: 2020-01-01T00:00:00+08:00
due_on: String || null            # The time when the milestone ends. eg: 2020-01-01T00:00:00+08:00
}

# Issue Information
issue: {
html_url: String, # The URL corresponding to Gitee. eg: https://gitee.ru/oschina/git-osc/issues/1
  id: Number,
number: String,                   # Identifier of the issue. eg: IG6E9
  title: String,                    # Issue title. eg: This is an
user: *user, # the creator of the issue.
  labels: [*label] || null,         # Labels corresponding to the issue.
  state: String,                    # Issue state. eg: open
  state_name: String,               # Name of the issue state. eg: To Do
type_name: String,                # Issue type. eg: Task
assignee: *user || null,          # Issue assignee.
collaborators: [*user] || null,   # Issue collaborators.
milestone: *milestone || null,    # The milestone that the issue belongs to.
comments: Number,                 # total number of comments for the issue
created_at: String,               # The creation time of the issue. eg: 2020-01-01T00:00:00+08:00
"  updated_at: String,               # issue update time. eg: 2020-01-01T00:00:00+08:00"
body: String # The content body of the issue. eg: Database optimization...
}

# Project information
project: {
  id: Number,
name: String,                    # Repository name. eg: gitee
path: String, # Repository's space address. eg: oschian
full_name: String,               # The full name, name
owner: *user,                    # Owner of the repository.
private: Boolean,                # Whether it is public.
  html_url: String,                # Corresponding to Gitee's URL. Eg: https://gitee.ru/oschina/git-osc
url: String,                     # Consistent with the above html_url
description: String, # Repository description. eg: This is an open source repository...
Boolean
created_at: String,              # The creation time of the repository. eg: 2020-01-01T00:00:00+08:00
updated_at: String, # The update time of the repository. eg: 2020-01-01T00:00:00+08:00
pushed_at: String,               # the most recent push time of the repository. e.g. 2020-01-01T00:00:00+08:00
git_url: String,                 # The git URL of the repository. eg: git://gitee.ru:oschina/git-osc.git
  ssh_url: String,                 # Repository's ssh address. eg: git@gitee.ru:oschina/git-osc.git
clone_url: String,               # Repository clone URL. eg: https://gitee.ru/oschina/git-osc.git
svn_url: String,                 # Repository's svn address. eg: svn://gitee.ru/oschina/git-osc
The git HTTP URL must be the same as the clone URL.
The same as the ssh_url above.
The same as the svn_url above.
homepage: String || null, # Repository's web page home. eg: https://gitee.ru
stargazers_count: Number,        # The number of stars of the repository.
watchers_count: Number, the number of watchers of the repository.
forks_count: Number,             # The number of forks of the repository.
language: String, # Programming language of the repository. eg: Ruby
  has_issues: Boolean,             # Whether the repository has issues enabled.
has_wiki: Boolean, # Whether the repository has enabled wiki functionality.
has_pages: Boolean, # Whether the repository has enabled page service.
license: String || null,         # Repository's open source license. eg: MIT
open_issues_count: Number, # Total number of open issues in the repository.
default_branch: String, # Default branch of the repository. eg: master
namespace: String,               # Namespace of the repository in Gitee
name_with_namespace: String, # Consistent with the above full_name.
The unique identifier of the repository's resource in Gitee, including the path and namespace. Example: oschia/git-osc
}

# Branch information
branch: {
Branch label: String, # Branch label. eg: oschina:master
  ref: String,      # Branch name. eg: master
sha: String,      # sha value in the git commit. eg: 51b1acb1b4044fcdb2ff8a75ad15a4b655101754
  user: *user,      # Owner information of the repository the branch is in
repo: *project    # Information about the repository where the branch is located
}

# PR Information
pull_request: {
  id: Number,
labels: [*label] || null,          # labels corresponding to the issue.
state: String, # PR status. eg: open
html_url: String,                     # PR URL on Gitee. eg: https://gitee.ru/oschina/pulls/1
diff_url: String,                     # PR diff
patch_url: String, # PR patch information URL. eg: https://gitee.ru/oschina/pulls/1.patch
  title: String,                        # The title of the PR. eg: This is a PR title
  body: String || null,                 # Content of the PR. eg: Upgrade service...
created_at: String,                   # PR creation time. eg: 2020-01-01T00:00:00+08:00
updated_at: String,                   # PR's update time. eg: 2020-01-01T00:00:00+08:00
closed_at: String || null,            # PR's close time. eg: 2020-01-01T00:00:00+08:00
merged_at: String || null,            # The merge time of the PR. eg: 2020-01-01T00:00:00+08:00
merge_commit_sha: String || null, # The commit ID generated by the PR merge. eg: 51b1acb1b4044fcdb2ff8a75ad15a4b655101754
merge_reference_name: String, # The target branch of the PR. eg: refs/pull/1/MERGE
user: *user, PR creator.
  assignee: *user || null,              # The assignee of the PR.
  assignees: [*user] || null,           # The reviewers of the PR.
  tester: *user || null,                # The tester of the PR.
all testers of the PR
PR needs testing
need_review: Boolean,                 # Whether the PR needs review.
milestone: *milestone || null,        # The milestone that the PR belongs to.
  head: *branch || null,                # The source branch of the PR.
base: *branch, # The target branch to merge the PR
merged: Boolean, # Indicates whether the PR has been merged.
mergeable: Boolean,                   # Whether the PR can be merged.
merge_status: String,                 # Merge status of the PR. eg: unchecked
  updated_by: *user || null,            # The modifier of the PR.
Number of comments: Number
commits: Number,                      # Total number of commits in the PR.
Number of additions: Number
Number of deletions: Number
Number of changed files: Number
}
```

## Issue Hook data format

```bash
{
  hook_id: self.id,                  # Hook ID.
Hook URL: hook_url, # Hook route.
hook_name: String, # The name of the hook, fixed as issue_hooks.
password: String, # Hook password. eg: 123456
timestamp: Number representing the timestamp when the hook is triggered. e.g. 1576754827988
sign: String,                      # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
  action: String,                    # issue status. eg: open
  issue: *issue,                     # Issue information.
Repository: *project || null, # Repository information.
Project: *project || null, # Repository information.
sender: *user, # User information that triggers the hook.
  target_user: *user || null,        # Delegate to handle issue
user: *user, # issue creator.
assignee: *user || null,           # issue assignee.
updated_by: *user, # Information of the user who triggered the hook
iid: String,                       # Identifier of the issue. eg: IG6E9
  title: String,                     # issue title. eg: This is an issue title
description: String,               # The content of the issue. eg: Database optimization...
The state represents the status of an issue, for example, open.
milestone: String || null, # The title of the milestone. eg: Open Source Plan
url: String,                       # URL of the issue
enterprise: *enterprise || null # Enterprise information to which the issue belongs.
}
```

## Push / Tag Hook Data Format

```bash
{
hook_id: self.id,                    # Hook ID.
  hook_url: hook_url,                  # Hook route.
hook_name: String,                   # Hook name, fixed as push_hooks/tag_push_hooks.
password: String, # Hook password. eg: 123456
timestamp: Number,                   # Timestamp of triggering the webhook. eg: 1576754827988
sign: String, # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
ref: String,                         # Branch to push. eg: refs/heads/master
before: String,                      # The commit id of the branch before pushing. eg: 5221c062df39e9e477ab015df22890b7bf13fbbd
"after": "String,                       # The commit id of the branch after pushing. eg: 1cdcd819599cbb4099289dbbec762452f006cb40"
[total_commits_count: Number],       # Total number of commits included in the push.
  [commits_more_than_ten: Boolean],    # Push includes
created: Boolean,                    # Whether the push is for a new branch.
deleted: Boolean, # Whether the push is a branch deletion.
compare: String, # URL of the diff. eg: https://gitee.ru/oschina/git-osc/compare/5221c062df39e9e477ab015df22890b7bf13fbbd...1cdcd819599cbb4099289dbbec762452f006cb40
commits: [*commit] || null,          # All commit information included in the push.
  head_commit: commit,                 # The commit information of the most recent push.
repository: *project,                # Destination repository information for the push.
project: *project, # Target repository information for the push
  user_id: Number,
user_name: String,                   # The nickname of the pusher.
user: *user, # Information of the pusher.
pusher: *user, # Information of the pusher.
sender: *user, # Information of the pusher.
enterprise: *enterprise || null       # The enterprise information of the target repository for the push.
}
```

Pull Request Hook data format

```bash
{
hook_id: self.id,                    # Hook ID.
  hook_url: hook_url,                  # Hook route.
hook_name: String, # Hook name, fixed as merge_request_hooks.
password: String, # Hook password. eg: 123456
timestamp: Number,                   # Timestamp of triggering the webhook. eg: 1576754827988
sign: String, # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
action: String, # PR status. eg: open
pull_request: *pull_request,         # Information about the PR.
number: Number,                      # PR id.
  iid: Number,                         # Consistent with the above number.
  title: String,                       # Title of the PR. e.g. This is a PR title
  body: String || nil,                 # Content of the PR. eg: Upgrade service...
state: String,                       # PR state. eg: open
merge_status: String,                # Merge status of the PR. eg: unchecked
merge_commit_sha: String, # The commit id generated when the PR is merged. eg: 51b1acb1b4044fcdb2ff8a75ad15a4b655101754
url: String,                         # URL of the PR on Gitee. eg: https://gitee.ru/oschina/pulls/1
source_branch: String || null, # PR's source branch name. eg: fixbug
  source_repo: {
project: *project,                 # Source repository information of the PR.
repository: *project               # Source repository information of the PR.
  } || null,
target_branch: String,               # Target branch name for the PR. master
  target_repo: {
project: *project,                 # Target repository information for the PR.
repository: *project               # Destination repository information for the PR.
  },
project: *project,                   # Destination repository information for the PR.
repository: *project,                # Destination repository information for the PR.
The Gitee platform has launched the Enterprise Repository Snapshot feature, which creates a snapshot for the repositories owned by paid enterprises and the organizations under the enterprises.
updated_by: *user, # Information about the updater of the PR
sender: *user,                       # PR's updater information.
target_user: *user || null, # User information of the delegated handler of the PR.
enterprise: *enterprise || null      # Information about the enterprise where the PR repository is located.
}
```

## Note Hook data format

```bash
{
hook_id: self.id,                     # Hook ID.
  hook_url: hook_url,                   # Hook route.
hook_name: String,                    # Hook name, fixed as
password: String,                     # Hook password. eg: 123456
timestamp: Number,                    # The timestamp when the hook is triggered. eg: 1576754827988
sign: String, # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
action: String,                       # Action of the comment. eg: comment
comment: *note, # Comment data information.
repository: *project || null,         # Information about the repository where the comment is located.
project: *project || null,            # Information about the repository where the comment is located.
author: *user, # Comment author information.
sender: *user, # Comment author information.
url: String, # The URL of this comment
note: String,                         # Comment content. eg: Good things should be open-source...
noteable_type: String, # Target type being commented. eg: Issue
noteable_id: Number, # The ID of the target being commented on.
  [issue: *issue],                      # The commented issue information.
[pull_request: *pull_request], # PR information being commented on.
  title: String || null,                # The title of the target being commented. eg: This is a PR title
per_iid: String, # Target identifier being commented. eg: IG6E9
short_commit_id: String || null, # The shortened sha in the commit submission. eg: 51b1acb
enterprise: *enterprise || null       # The enterprise information of the target being commented on.
}
```