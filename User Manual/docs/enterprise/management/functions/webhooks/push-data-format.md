---
title: Формат данных для отправки вебхука
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
---

Тип данных вебхука. Для более подробной информации обратитесь к: [Описание типов данных для отправки вебхука](./push-data-type)

Пользователи могут получать сообщения от вебхука Gitee через свои собственные сервисы. Ниже приведено объяснение формата данных для передачи вебхука:

### Заголовки запроса

Заголовки запроса вебхука содержат некоторые ключевые данные

```bash
"Content-Type: application/json # Default is application/json, for old version hooks (no longer maintained) it is application/x-www-form-urlencoded"

User-Agent: git-oschina-hook # Fixed as git-oschina-hook, used to identify requests from Gitee.

X-Gitee-Token: webhook password/sign # The password provided when creating a new WebHook or the signature calculated based on the provided signing key

X-Gitee-Timestamp: 1576754827988  # The timestamp when the WebHook was triggered

'X-Gitee-Event: Merge Request Hook # Indicates the triggered hook type.'
```

> Алгоритм реализации для вычисления подписи с использованием ключа подписи `X-Gitee-Token` можно найти в следующем документе: "[Алгоритм проверки и верификации ключа вебхука](./verify)".

### Загрузка запроса

Загрузка запроса вебхука разделяется на 4 типа, в зависимости от различных хуков. Ниже приведены примеры данных, отправляемых каждым хуком (для ознакомления, обратитесь к фактическим полученным данным).

### Хуки отправки/тега 

Ниже приведены данные хука, вызванного отправкой кода.

```json
{
  "hook_name": "push_hooks", 
  "password": "pwd",
  "hook_id": 1,
  "hook_url": "http://gitee.ru/liwen/gitos/hooks/1/edit",
  "timestamp": "1576754827988",
  "sign": "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA=",
  "ref": "refs/heads/change_commitlint_config",
  "before": "0000000000000000000000000000000000000000",
  "after": "1cdcd819599cbb4099289dbbec762452f006cb40",
  "created": true,
  "deleted": false,
  "compare": "https://gitee.ru/oschina/gitee/compare/0000000000000000000000000000000000000000...1cdcd819599cbb4099289dbbec762452f006cb40",
  "commits": [
    {
      "id": "1cdcd819599cbb4099289dbbec762452f006cb40",
      "tree_id": "db78f3594ec0683f5d857ef731df0d860f14f2b2",
      "distinct": true,
      "message": "Update README.md",
      "timestamp": "2018-02-05T23:46:46+08:00",
      "url": "https://gitee.ru/oschina/gitee/commit/1cdcd819599cbb4099289dbbec762452f006cb40",
      "author": {
        "time": "2018-02-05T23:46:46+08:00",
        "name": "robot",
        "email": "robot@gitee.ru",
        "username": "robot",
        "user_name": "robot",
        "url": "https://gitee.ru/robot"
      },
      "committer": {
        "name": "robot",
        "email": "robot@gitee.ru",
        "username": "robot",
        "user_name": "robot",
        "url": "https://gitee.ru/robot"
      },
      "added": null,
      "removed": null,
      "modified": [
        "README.md"
      ]
    }
  ],
  "head_commit": {
    "id": "1cdcd819599cbb4099289dbbec762452f006cb40",
    "tree_id": "db78f3594ec0683f5d857ef731df0d860f14f2b2",
    "distinct": true,
    "message": "Update README.md",
    "timestamp": "2018-02-05T23:46:46+08:00",
    "url": "https://gitee.ru/oschina/gitee/commit/1cdcd819599cbb4099289dbbec762452f006cb40",
    "author": {
      "time": "2018-02-05T23:46:46+08:00",
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "committer": {
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "added": null,
    "removed": null,
    "modified": [
      "README.md"
    ]
  },
  "total_commits_count": 0,
  "commits_more_than_ten": false,
  "repository": {
    "id": 120249025,
    "name": "Gitee",
    "path": "gitee",
"full_name": "Open Source China/Gitee"
    "owner": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "private": false,
    "html_url": "https://gitee.ru/oschina/gitee",
    "url": "https://gitee.ru/oschina/gitee",
    "description": "",
    "fork": false,
    "created_at": "2018-02-05T23:46:46+08:00",
    "updated_at": "2018-02-05T23:46:46+08:00",
    "pushed_at": "2018-02-05T23:46:46+08:00",
    "git_url": "git://gitee.ru:oschina/gitee.git",
    "ssh_url": "git@gitee.ru:oschina/gitee.git",
    "clone_url": "https://gitee.ru/oschina/gitee.git",
    "svn_url": "svn://gitee.ru/oschina/gitee",
    "git_http_url": "https://gitee.ru/oschina/gitee.git",
    "git_ssh_url": "git@gitee.ru:oschina/gitee.git",
    "git_svn_url": "svn://gitee.ru/oschina/gitee",
    "homepage": null,
    "stargazers_count": 11,
    "watchers_count": 12,
    "forks_count": 0,
    "language": "ruby",
    "has_issues": true,
    "has_wiki": true,
    "has_pages": false,
    "license": null,
    "open_issues_count": 0,
    "default_branch": "master",
    "namespace": "oschina",
"name_with_namespace": "Open Source China/Gitee"
    "path_with_namespace": "oschina/gitee"
  },
  "sender": {
    "id": 1,
    "login": "robot",
    "avatar_url": "https://gitee.ru/assets/favicon.ico",
    "html_url": "https://gitee.ru/robot",
    "type": "User",
    "site_admin": false,
    "name": "robot",
    "email": "robot@gitee.ru",
    "username": "robot",
    "user_name": "robot",
    "url": "https://gitee.ru/robot"
  },
  "enterprise": {
    "name": "Open Source China",
    "url": "https://gitee.ru/oschina"
  }
}
```

### Хуки задач

Ниже приведены данные хука, вызванного созданием новой задачи.

```json
{
  "hook_name": "issue_hooks", 
  "password": "pwd",
  "hook_id": 1,
  "hook_url": "http://gitee.ru/liwen/gitos/hooks/1/edit",
  "timestamp": "1576754827988",
  "sign": "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA=",
  "issue": {
    "html_url": "https://gitee.ru/oschina/gitee/issues/IG6E9",
    "id": 295024870,
    "number": "IG6E9",
    "title": "IE browser, js error",
    "body": "New task JS error",
    "state": "open",
    "comments": 0,
    "created_at": "2018-02-07T23:46:46+08:00",
    "updated_at": "2018-02-07T23:46:46+08:00",
    "user": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "labels": [
      {
        "id": 827033694,
        "name": "bug",
        "color": "d73a4a"
      }
    ],
    "assignee": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "milestone": {
      "html_url": "https://gitee.ru/oschina/gitee/milestones/1",
      "id": 3096855,
      "number": 1,
      "title": "Issue Feedback",
      "description": null,
      "open_issues": 13,
      "started_issues": 6,
      "closed_issues": 31,
      "approved_issues": 42,
      "state": "open",
      "created_at": "2018-02-01T23:46:46+08:00",
      "updated_at": "2018-02-02T23:46:46+08:00",
      "due_on": null
    }
  },
  "repository": {
    "id": 120249025,
    "name": "Gitee",
    "path": "gitee",
"full_name": "Open Source China/Gitee"
    "owner": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "private": false,
    "html_url": "https://gitee.ru/oschina/gitee",
    "url": "https://gitee.ru/oschina/gitee",
    "description": "",
    "fork": false,
    "created_at": "2018-02-05T23:46:46+08:00",
    "updated_at": "2018-02-05T23:46:46+08:00",
    "pushed_at": "2018-02-05T23:46:46+08:00",
    "git_url": "git://gitee.ru:oschina/gitee.git",
    "ssh_url": "git@gitee.ru:oschina/gitee.git",
    "clone_url": "https://gitee.ru/oschina/gitee.git",
    "svn_url": "svn://gitee.ru/oschina/gitee",
    "git_http_url": "https://gitee.ru/oschina/gitee.git",
    "git_ssh_url": "git@gitee.ru:oschina/gitee.git",
    "git_svn_url": "svn://gitee.ru/oschina/gitee",
    "homepage": null,
    "stargazers_count": 11,
    "watchers_count": 12,
    "forks_count": 0,
    "language": "ruby",
    "has_issues": true,
    "has_wiki": true,
    "has_pages": false,
    "license": null,
    "open_issues_count": 0,
    "default_branch": "master",
    "namespace": "oschina",
"name_with_namespace": "Open Source China/Gitee"
    "path_with_namespace": "oschina/gitee"
  },
  "sender": {
    "id": 1,
    "login": "robot",
    "avatar_url": "https://gitee.ru/assets/favicon.ico",
    "html_url": "https://gitee.ru/robot",
    "type": "User",
    "site_admin": false,
    "name": "robot",
    "email": "robot@gitee.ru",
    "username": "robot",
    "user_name": "robot",
    "url": "https://gitee.ru/robot"
  },
  "enterprise": {
    "name": "Open Source China",
    "url": "https://gitee.ru/oschina"
  }
}
```

### Хуки запросов на слияние

Ниже приведены данные, вызванные срабатыванием хука запроса на слияние.

```json
{
  "hook_name": "merge_request_hooks", 
  "password": "pwd",
  "hook_id": 1,
  "hook_url": "http://gitee.ru/liwen/gitos/hooks/1/edit",
  "timestamp": "1576754827988",
  "sign": "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA=",
  "pull_request": {
    "id": 167750879,
    "number": 1,
    "state": "open",
    "html_url": "https://gitee.ru/oschina/giteeb/pulls/1",
    "diff_url": "https://gitee.ru/oschina/giteeb/pulls/1.diff",
    "patch_url": "https://gitee.ru/oschina/giteeb/pulls/1.patch",
    "title": "Issue with third-party login accounts without passwords",
    "body": null,
    "created_at": "2018-02-07T23:46:46+08:00",
    "updated_at": "2018-02-07T23:46:46+08:00",
    "closed_at": null,
    "merged_at": null,
    "merge_commit_sha": "5ccc31cda7aad7ddc59a6bdbb8a8bd61959dc71c",
    "user": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "assignee": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "tester": null,
    "milestone": {
      "html_url": "https://gitee.ru/oschina/gitee/milestones/1",
      "id": 3096855,
      "number": 1,
      "title": "Issue Feedback",
      "description": null,
      "open_issues": 13,
      "started_issues": 6,
      "closed_issues": 31,
      "approved_issues": 42,
      "state": "open",
      "created_at": "2018-02-01T23:46:46+08:00",
      "updated_at": "2018-02-02T23:46:46+08:00",
      "due_on": null
    },
    "head": {
      "label": "gitee:login_should_complete_info",
      "ref": "login_should_complete_info",
      "sha": "5ccc31cda7aad7ddc59a6bdbb8a8bd61959dc71c",
      "user": {
        "id": 1,
        "login": "robot",
        "avatar_url": "https://gitee.ru/assets/favicon.ico",
        "html_url": "https://gitee.ru/robot",
        "type": "User",
        "site_admin": false,
        "name": "robot",
        "email": "robot@gitee.ru",
        "username": "robot",
        "user_name": "robot",
        "url": "https://gitee.ru/robot"
      },
      "repo": {
        "id": 120249025,
        "name": "Gitee",
        "path": "gitee",
        "full_name": "Open Source China/Gitee",
        "owner": {
          "id": 1,
          "login": "robot",
          "avatar_url": "https://gitee.ru/assets/favicon.ico",
          "html_url": "https://gitee.ru/robot",
          "type": "User",
          "site_admin": false,
          "name": "robot",
          "email": "robot@gitee.ru",
          "username": "robot",
          "user_name": "robot",
          "url": "https://gitee.ru/robot"
        },
        "private": false,
        "html_url": "https://gitee.ru/oschina/gitee",
        "url": "https://gitee.ru/oschina/gitee",
        "description": "",
        "fork": false,
        "created_at": "2018-02-05T23:46:46+08:00",
        "updated_at": "2018-02-05T23:46:46+08:00",
        "pushed_at": "2018-02-05T23:46:46+08:00",
        "git_url": "git://gitee.ru:oschina/gitee.git",
        "ssh_url": "git@gitee.ru:oschina/gitee.git",
        "clone_url": "https://gitee.ru/oschina/gitee.git",
        "svn_url": "svn://gitee.ru/oschina/gitee",
        "git_http_url": "https://gitee.ru/oschina/gitee.git",
        "git_ssh_url": "git@gitee.ru:oschina/gitee.git",
        "git_svn_url": "svn://gitee.ru/oschina/gitee",
        "homepage": null,
        "stargazers_count": 11,
        "watchers_count": 12,
        "forks_count": 0,
        "language": "ruby",
        "has_issues": true,
        "has_wiki": true,
        "has_pages": false,
        "license": null,
        "open_issues_count": 0,
        "default_branch": "master",
        "namespace": "oschina",
"name_with_namespace": "Open Source China/Gitee",
        "path_with_namespace": "oschina/gitee"
      }
    },
    "base": {
      "label": "gitee:master",
      "ref": "master",
      "sha": "7324ba0e3f19236bf4ddc6003168fbddf8f723a5",
      "user": {
        "id": 1,
        "login": "robot",
        "avatar_url": "https://gitee.ru/assets/favicon.ico",
        "html_url": "https://gitee.ru/robot",
        "type": "User",
        "site_admin": false,
        "name": "robot",
        "email": "robot@gitee.ru",
        "username": "robot",
        "user_name": "robot",
        "url": "https://gitee.ru/robot"
      },
      "repo": {
        "id": 120249025,
        "name": "Gitee",
        "path": "gitee",
        "full_name": "Open Source China/Gitee",
        "owner": {
          "id": 1,
          "login": "robot",
          "avatar_url": "https://gitee.ru/assets/favicon.ico",
          "html_url": "https://gitee.ru/robot",
          "type": "User",
          "site_admin": false,
          "name": "robot",
          "email": "robot@gitee.ru",
          "username": "robot",
          "user_name": "robot",
          "url": "https://gitee.ru/robot"
        },
        "private": false,
        "html_url": "https://gitee.ru/oschina/gitee",
        "url": "https://gitee.ru/oschina/gitee",
        "description": "",
        "fork": false,
        "created_at": "2018-02-05T23:46:46+08:00",
        "updated_at": "2018-02-05T23:46:46+08:00",
        "pushed_at": "2018-02-05T23:46:46+08:00",
        "git_url": "git://gitee.ru:oschina/gitee.git",
        "ssh_url": "git@gitee.ru:oschina/gitee.git",
        "clone_url": "https://gitee.ru/oschina/gitee.git",
        "svn_url": "svn://gitee.ru/oschina/gitee",
        "git_http_url": "https://gitee.ru/oschina/gitee.git",
        "git_ssh_url": "git@gitee.ru:oschina/gitee.git",
        "git_svn_url": "svn://gitee.ru/oschina/gitee",
        "homepage": null,
        "stargazers_count": 11,
        "watchers_count": 12,
        "forks_count": 0,
        "language": "ruby",
        "has_issues": true,
        "has_wiki": true,
        "has_pages": false,
        "license": null,
        "open_issues_count": 0,
        "default_branch": "master",
        "namespace": "oschina",
"name_with_namespace": "Open Source China/Gitee",
        "path_with_namespace": "oschina/gitee"
      }
    },
    "merged": false,
    "mergeable": null,
    "comments": 0,
    "commits": 1,
    "additions": 7,
    "deletions": 0,
    "changed_files": 1
  },
  "author": {
    "id": 1,
    "login": "robot",
    "avatar_url": "https://gitee.ru/assets/favicon.ico",
    "html_url": "https://gitee.ru/robot",
    "type": "User",
    "site_admin": false,
    "name": "robot",
    "email": "robot@gitee.ru",
    "username": "robot",
    "user_name": "robot",
    "url": "https://gitee.ru/robot"
  },
  "sender": {
    "id": 1,
    "login": "robot",
    "avatar_url": "https://gitee.ru/assets/favicon.ico",
    "html_url": "https://gitee.ru/robot",
    "type": "User",
    "site_admin": false,
    "name": "robot",
    "email": "robot@gitee.ru",
    "username": "robot",
    "user_name": "robot",
    "url": "https://gitee.ru/robot"
  },
  "enterprise": {
    "name": "Open Source China",
    "url": "https://gitee.ru/oschina"
  }
}
```

### Хуки комментариев

Ниже приведены данные, вызванные операцией комментирования задачи, где 'notable_type' представляет различные типы комментариев: комментарий (комментарий к репозиторию), коммит, запрос на слияние, задачи.

```json
{
  "hook_name": "note_hooks", 
  "password": "pwd",
  "hook_id": 1,
  "hook_url": "http://gitee.ru/liwen/gitos/hooks/1/edit",
  "timestamp": "1576754827988",
  "sign": "rLEHLuZRIQHuTPeXMib9Czoq9dVXO4TsQcmQQHtjXHA=",
  "comment": {
    "html_url": "https://gitee.ru/oschina/gitee/issues/IG6E9#note_1",
    "id": 1,
    "body": "Fixed",
    "user": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "created_at": "2018-02-08T23:46:46+08:00",
    "updated_at": "2018-02-08T23:46:46+08:00"
  },
  "noteable_type": "Issue", 
  "issue": {
    "html_url": "https://gitee.ru/oschina/gitee/issues/IG6E9",
    "id": 295024870,
    "number": "IG6E9",
    "title": "IE browser, js error",
    "user": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "labels": [
      {
        "id": 827033694,
        "name": "bug",
        "color": "d73a4a"
      }
    ],
    "state": "open",
    "assignee": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "milestone": {
      "html_url": "https://gitee.ru/oschina/gitee/milestones/1",
      "id": 3096855,
      "number": 1,
      "title": "Issue Feedback",
      "description": null,
      "open_issues": 13,
      "started_issues": 6,
      "closed_issues": 31,
      "approved_issues": 42,
      "state": "open",
      "created_at": "2018-02-01T23:46:46+08:00",
      "updated_at": "2018-02-02T23:46:46+08:00",
      "due_on": null
    },
    "comments": 0,
    "created_at": "2018-02-07T23:46:46+08:00",
    "updated_at": "2018-02-07T23:46:46+08:00",
"body": "New task JavaScript error"
  },
  "repository": {
    "id": 120249025,
    "name": "Gitee",
    "path": "gitee",
"full_name": "Open Source China/Gitee"
    "owner": {
      "id": 1,
      "login": "robot",
      "avatar_url": "https://gitee.ru/assets/favicon.ico",
      "html_url": "https://gitee.ru/robot",
      "type": "User",
      "site_admin": false,
      "name": "robot",
      "email": "robot@gitee.ru",
      "username": "robot",
      "user_name": "robot",
      "url": "https://gitee.ru/robot"
    },
    "private": false,
    "html_url": "https://gitee.ru/oschina/gitee",
    "url": "https://gitee.ru/oschina/gitee",
    "description": "",
    "fork": false,
    "created_at": "2018-02-05T23:46:46+08:00",
    "updated_at": "2018-02-05T23:46:46+08:00",
    "pushed_at": "2018-02-05T23:46:46+08:00",
    "git_url": "git://gitee.ru:oschina/gitee.git",
    "ssh_url": "git@gitee.ru:oschina/gitee.git",
    "clone_url": "https://gitee.ru/oschina/gitee.git",
    "svn_url": "svn://gitee.ru/oschina/gitee",
    "git_http_url": "https://gitee.ru/oschina/gitee.git",
    "git_ssh_url": "git@gitee.ru:oschina/gitee.git",
    "git_svn_url": "svn://gitee.ru/oschina/gitee",
    "homepage": null,
    "stargazers_count": 11,
    "watchers_count": 12,
    "forks_count": 0,
    "language": "ruby",
    "has_issues": true,
    "has_wiki": true,
    "has_pages": false,
    "license": null,
    "open_issues_count": 0,
    "default_branch": "master",
    "namespace": "oschina",
"name_with_namespace": "Open Source China/Gitee"
    "path_with_namespace": "oschina/gitee"
  },
  "sender": {
    "id": 1,
    "login": "robot",
    "avatar_url": "https://gitee.ru/assets/favicon.ico",
    "html_url": "https://gitee.ru/robot",
    "type": "User",
    "site_admin": false,
    "name": "robot",
    "email": "robot@gitee.ru",
    "username": "robot",
    "user_name": "robot",
    "url": "https://gitee.ru/robot"
  },
  "enterprise": {
    "name": "Open Source China",
    "url": "https://gitee.ru/oschina"
  }
}
```