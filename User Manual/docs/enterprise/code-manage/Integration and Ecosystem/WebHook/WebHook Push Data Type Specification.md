---
title: Описание типа данных отправки вебхука
---

### Данные отправки вебхука содержат богатую агрегированную информацию в формате JSON, которую можно условно разделить на несколько типов в зависимости от единицы агрегирования информации.

**Дополнительные примечания:**
1. Пары ключ-значение внутри [] зависят от данных и могут не сохраняться
**2, *пользователь, *фиксация и т.д. представляют соответствующую агрегацию данных json**
**3. Этот документ предназначен только для справки. В целях обеспечения точности ознакомьтесь с фактическими полученными данными**
Если в документе обнаружена ошибка, мы приносим извинения и просим перейти в [Центр обратной связи Gitee](https://git.ru/oschina/git-osc/), чтобы сообщить о проблеме.

```bash
# Tags. Labels for issues and pull requests
label: {
  id: Number,
  name: String,        # Tag name. eg: fixbug
  color: String        # The color of the label. eg: 000000
}

# Company Information
enterprise: {
  name: String,        # Company name. e.g.: Open Source China
url: String          # The URL of the company on Gitee. eg: https://gitee.ru/oschina
}

# Comment Information
note: {
  id: Number,
body: String,            # Comment content. eg: Good things should be open source...
user: *user, # Comment author information.
created_at: String,      # The creation time of the comment. eg: 2020-01-01T00:00:00+08:00
updated_at: String,      # The update time of the comment. eg: 2020-11-11T11:11:11+08:00
html_url: String,        # The URL of this comment on Gitee. eg: https://gitee.ru/oschina/git-osc#note_1
[position: String],      # Corresponding code position in code commit comment. eg: 76ec1c6df700af34ae5f8dd00bd7bcb56c1bd706_9_9
[commit_id: String]      # The commit id corresponding to the code commit comment. eg: 611de62f634d353bb75a290f59fa238ff2d8d3c7
}

# User Information
user： {
  [id: Number],
  name: String, # User's nickname. eg: Sweet Potato
email: String,                  #User's email address. eg: git@oschina.cn
  [username: String],             # User's Gitee personal space address. eg: gitee
[user_name: String],            # Consistent with the username above.
[url: String],                  # User's Gitee personal homepage URL. eg: https://gitee.ru/gitee
[login: String],                # Consistent with username above.
[avatar_url: String || null],   # User avatar url. eg: https://gitee.ru/assets/favicon.ico
String
[type: String],                 # User type, currently fixed to User.
  [site_admin: Boolean],          # Whether it is an administrator.
time: String,                 # Time in the git commit. eg: 2020-01-01T00:00:00+08:00
User nickname. eg: Ruby
}

# Information in git commit
commit: {
  id: String,
  tree_id: String,                  # commit tree oid。eg：db78f3594ec0683f5d857ef731df0d860f14f2b2
  parent_ids: [String],             # commit parent_ids。eg：['a3bddf21a35af54348aae5b0f5627e6ba35be51c']
message: String,                  # commit message. eg: fix(cache): Fixed cache issue
"  timestamp: String,                # commit time. eg: 2020-01-01T00:00:00+08:00"
url: String,                      # commit corresponds to Gitee url. eg: https://gitee.ru/mayun-team/oauth2_dingtalk/commit/664b34859fc4a924cd60be2592c0fc788fbeaf8f
  author: *user,                    # Author information.
  committer: *user,                 # Committer information.
  distinct: Boolean,                # Special commit with no changes, such as a tag
added: [String] || null,          # Newly added file names. eg: ['README.md']
removed: [String] || null,        # The name of the removed file(s). eg: ['README.md']
modified: [String] || null # Modified file names. eg: ['README.md']
}

# Milestone Information
milestone: {
html_url: String,                 # The corresponding URL on Gitee. eg: https://gitee.ru/oschina/git-osc/milestones/1
  id: Number,
Number
title: String, # The title of the milestone. eg: Open Source Plan
The detailed description of the milestone. eg: Towards the World
open_issues: Number,              # The number of open issues
closed_issues: Number,            # The number of closed issues
state: String,                    # The state of the milestone. eg: open
created_at: String,               # The created time of the milestone. eg: 2020-01-01T00:00:00+08:00
updated_at: String,               # The updated time of the milestone. eg: 2020-01-01T00:00:00+08:00
due_on: String || null            # The due date of the milestone. eg: 2020-01-01T00:00:00+08:00
}

# Issue Information
issue: {
html_url: String,                 # Corresponding URL on Gitee, e.g. https://gitee.ru/oschina/git-osc/issues/1
  id: Number,
  number: String,                   # Identifier of the issue. eg: IG6E9
title: String,                    # issue title. eg: This is a
  user: *user,                      # issue creator.
The labels of the issue, or null if there are no labels.
state: String,                    # issue status. eg: open
state_name: String,               # issue status name. eg: to-do
type_name: String,                # issue type. eg: Task
  assignee: *user || null,          # Issue assignee.
  collaborators: [*user] || null,   # Issue collaborators.
milestone: *milestone || null,    # The milestone that the issue belongs to.
comments: Number, # Total number of comments on the issue
created_at: String,               # The creation time of the issue. eg: 2020-01-01T00:00:00+08:00
updated_at: String,               # issue's update time. eg: 2020-01-01T00:00:00+08:00
body: String                      # The content of the issue. eg: Database optimization...
}

# project information
project: {
  id: Number,
name: String, # Repository name. eg: gitee
  path: String,                    # Repository's space address. eg: oschian
full_name: String, # The full name, name + path. eg: gitee/oschian
owner: *user,                    # Owner of the repository.
  private: Boolean,                # Whether it is public.
html_url: String,                # Corresponding to Gitee's
url: String,                     # Consistent with html_url above
description: String,             # Repository description. eg: This is an open source repository...
fork: Boolean, # Whether it is a fork repository.
created_at: String,              # Repository creation time. eg: 2020-01-01T00:00:00+08:00
updated_at: String,              # The update time of the repository. eg: 2020-01-01T00:00:00+08:00
pushed_at: String,               # The latest push time of the repository. eg: 2020-01-01T00:00:00+08:00
  git_url: String,                 # Repository's git address. eg: git://gitee.ru:oschina/git-osc.git
ssh_url: String,                 # Repository ssh address. eg: git@gitee.ru:oschina/git-osc.git
  clone_url: String,               # Repository clone URL. eg: https://gitee.ru/oschina/git-osc.git
svn_url: String,                 # The svn address of the repository. eg: svn://gitee.ru/oschina/git-osc
git_http_url: String,            # consistent with the clone_url above.
git_ssh_url: String,             # Consistent with ssh_url above.
git_svn_url: String,             # Consistent with svn_url above.
  homepage: String || null,        # Homepage of the repository. eg: https://gitee.ru
stargazers_count: Number,        # Number of stars for the repository.
watchers_count: Number,          # Number of watch for the repository.
forks_count: Number, the number of forks of the repository.
language: String,                # Repository programming language. eg: Ruby
has_issues: Boolean, # Indicates whether the repository has issues functionality.
has_wiki: Boolean, # Whether the repository has the wiki feature.
has_pages: Boolean, # Whether the repository has the page service.
license: String || null,         # The open source license of the repository. eg: MIT
The total number of open issues in the repository.
  default_branch: String,          # The default branch of the repository. eg: master
namespace: String,               # The Gitee namespace of the repository. eg: oschina
name_with_namespace: String, # Consistent with the above full_name.
path_with_namespace: String # The unique identifier of the repository in Gitee. e.g. oschia/git-osc
}

# Branch Information
branch: {
  label: String,    # Branch label. eg: oschina:master
  ref: String,      # Branch name. eg: master
sha: String,      # The sha value in the git commit record. eg: 51b1acb1b4044fcdb2ff8a75ad15a4b655101754
  user: *user,      # Owner information of the repository where the branch is located
  repo: *project    # Information about the repository where the branch is located
}

# PR Information
pull_request: {
  id: Number,
number is consistent with the id above
state: String,                        # PR status. eg: open
  html_url: String,                     # PR's url on Gitee. eg: https://gitee.ru/oschina/pulls/1
diff_url: String,                     # PR diff
patch_url: String,                    # PR patch
Information URL. eg: https://gitee.ru/oschina/pulls/1.patch
title: String,                        # PR title. e.g.: This is a PR title
body: String || null,                 # The content of the PR. eg: Upgrade service...
created_at: String,                   # The creation time of the PR. eg: 2020-01-01T00:00:00+08:00
updated_at: String,                   # PR update time. eg: 2020-01-01T00:00:00+08:00
closed_at: String || null,            # PR closing time. eg: 2020-01-01T00:00:00+08:00
merged_at: String || null,            # The merge time of the PR. eg: 2020-01-01T00:00:00+08:00
merge_commit_sha: String || null, # The commit id generated by merging the PR. eg: 51b1acb1b4044fcdb2ff8a75ad15a4b655101754
merge_reference_name: String,         # The target branch of the PR. eg: refs/pull/1/MERGE
user: *user,                          # The creator of the PR.
assignee: *user || null,              # The assignee of the PR.
assignees: [*user] || null,           # The reviewers of the PR.
tester: *user || null,                # The tester of the PR.
testers: [*user] || null,             # All testers of the PR.
need_test: Boolean,                   # Whether the PR needs testing.
Whether the PR needs to be reviewed or not.
milestone: *milestone || null, # Milestone to which the PR belongs.
The source branch of the pull request, or null if there is no source branch.
base: *branch,                        # Target branch for merging the PR
PR merged: Boolean, # Whether the PR has been merged.
mergeable: Boolean, # Whether the PR can be merged.
merge_status: String,               # The merge status of the PR. eg: unchecked
updated_by: *user || null,            # Modifier of the PR.
comments: Number, # Total number of comments on the PR.
commits: Number, # Total commit count of the PR
additions: Number, # Number of lines added in the PR.
deletions: Number, # Number of lines deleted in the PR.
changed_files: Number                 # Number of lines modified in the PR.
}
```

### Поддерживаемые в настоящее время хуки вебхуков от Gitee

#### Формат данных хука задачи

```bash
{
  hook_id: self.id,                  # Hook ID.
hook_url: hook_url,                # Hook route.
hook_name: String,                 # Hook name, fixed to issue_hooks.
password: String,                  # Hook password. eg: 123456
timestamp: Number,                 # The timestamp when the hook was triggered. eg: 1576754827988
sign: String, # The signature calculated by the hook based on the secret key. eg:


As a software engineer, translate above yaml content into English. Output in key-value pairs json format, return only the translated result
action: String,                    # issue status. eg: open
issue: *issue, # issue information.
repository: *project || null,      # Repository information.
  project: *project || null,         # Repository information.
sender: *user,                     # User information that triggered the hook.
target_user: *user || null, # User information delegated to handle the issue
user: *user, issue creator.
assignee: *user || null, issue assignee.
updated_by: *user,                 # User information that triggered the hook.
iid: String,                       # Identifier of the issue. eg: IG6E9
title: String,                     # issue title. eg: This is an issue title
description: String,               # issue content. eg: database optimization...
state: String,                     # Issue status. eg: open
milestone: String || null,         # Title of the milestone. eg: Open source plan
url: String,                       # The URL corresponding to the issue on Gitee. eg: https://gitee.ru/oschina/git-osc/issues/1
The enterprise information to which the issue belongs.
}
```

#### Формат данных отправки/хуков тегов

```bash
{
hook_id: self.id,                    # Hook ID.
hook_url: hook_url,                  # Hook route.
hook_name: String,                   # Hook name, fixed as push_hooks/tag_push_hooks.
password: String, # Hook password. eg: 123456
timestamp: Number,                   # Timestamp when the hook is triggered. eg:
sign: String, # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
ref: String,                         # The branch to push. eg: refs/heads/master
before: String, # The commit id of the branch before the push. eg: 5221c062df39e9e477ab015df22890b7bf13fbbd
after: String, # The commit id of the branch after the push. eg: 1cdcd819599cbb4099289dbbec762452f006cb40
[total_commits_count: Number], # The total number of commits included in the push.
  [commits_more_than_ten: Boolean],    # Whether the total number of commits in the push is greater than twelve.
created: Boolean,                    # Whether the push is for a new branch.
deleted: Boolean, # Whether the push is a branch deletion
compare: String, # URL of the diff. eg: https://gitee.ru/oschina/git-osc/compare/5221c062df39e9e477ab015df22890b7bf13fbbd...1cdcd819599cbb4099289dbbec762452f006cb40
commits: [*commit] || null,          # All pushed commit information.
head_commit: commit,                 # Push the frontmost commit information.
repository: *project,                # The target repository to push to.
project: *project,                   # The target repository to push to.
  user_id: Number,
  user_name: String,                   # The nickname of the pusher.
user: *user,                         # User information of the pusher.
pusher: *user,                       # User information of the pusher.
The information about the sender of the push.
enterprise: *enterprise || ull # The information of the enterprise where the target repository is located.
}
```

#### Формат данных хука запроса на слияние

```bash
{
hook_id: self.id,                    # Hook ID.
hook_url: hook_url,                  # Hook route.
hook_name: String,                   # Hook name, fixed as merge_request_hooks.
password: String, # Hook password. eg: 123456
timestamp: Number,                   # Timestamp when the hook is triggered. eg:
sign: String, # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
The action represents the state of a pull request, for example, open.
pull_request: *pull_request,         # PR information.
number: Number,                      # PR id.
iid: Number, # Consistent with the 'number' mentioned above.
title: String,                       # PR title. eg: This is a PR title
body: String || nil, # PR content. eg: Upgrade service...
state: The status of the PR. eg: open
  merge_status: String,                # Merge status of the PR. eg: unchecked
merge_commit_sha: String, # The commit ID generated by PR merging. eg: 51b1acb1b4044fcdb2ff8a75ad15a4b655101754
url: String,
# PR URL on Gitee
source_branch: String || null,       # Source branch name of the PR. eg: fixbug
  source_repo: {
    project: *project,                 # Source repository information for the PR.
    repository: *project               # Source repository information for the PR.
  } || null,
- **Jenkins Credentials**: Select the credentials of the Jenkins Master type to obtain permissions for Jenkins.
  target_repo: {
project: *project, # Target repository information for the PR.
repository: *project               # Target repository information for the PR.
  },
project: *project, # Target repository information of the PR.
repository: *project,                # Target repository information for the PR.
PR author: *user
updated_by: *user,                   # Information of the PR updater.
sender: *user,                       # Information of the PR updater.
target_user: *user || null, # User information of the delegate to handle the PR.
enterprise: *enterprise || null      # Information about the enterprise where the PR repository is located.
}
```

#### Обратите внимание на формат данных хука

```bash
{
self.id
hook_url: hook_url,                   # Hook URL.
  hook_name: String,                    # Hook name, fixed as
password: String, # Hook password. eg: 123456
timestamp: Number, # Timestamp when the hook is triggered. eg: 1576754827988
sign: String, # The signature calculated by the hook based on the key. eg: "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA="
  action: String,                       # Action of the comment. eg: comment
comment: *note, # Data information for the comment
repository: *project || null,         # Information about the repository where the comment is located.
project: *project || null,            # Information about the repository where the comment is located.
The information about the author of the comment.
The information about the author of the comment.
url: String, # The url of this comment on Gitee. eg: https://gitee.ru/oschina/git-osc#note_1
  note: String,                         # Comment content. e.g.: Good things should be open source...
noteable_type: String, # The type of the target being commented. eg: Issue
noteable_id: Number,                  # The ID of the target being commented on.
  [issue: *issue],                      # The issue being commented on. 
Pull request information that is being commented on.
  title: String || null,                # Title of the target being commented on. eg: This is a PR title.
per_iid: String, # The identifier of the target being commented. eg: IG6E9
  short_commit_id: String || null,      # The abbreviated sha of the commit that was squashed. eg: 51b1acb
  enterprise: *enterprise || null       # The enterprise information where the target being commented on is located. 
}
```