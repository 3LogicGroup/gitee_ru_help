---
title: Отправка уведомлений с помощью вебхуков
description: Отправка уведомлений с помощью вебхуков
slug: /enterprise/pipeline/notice/webhook
keywords:
 - Gitee
 - вебхук
 - уведомление
---

Пользователи могут настроить вебхук-уведомления в конвейере, чтобы отправлять информацию о состоянии выполнения этапов конвейера по указанному адресу.

## Конфигурация задачи конвейера "Вебхук-уведомления"

1. В узле задачи конвейера выберите "Добавить вебхук-уведомления".

![Добавить вебхук-уведомления](./assets/Add-Webhook-Notification.png)

![Конфигурация уведомлений вебхука](./assets/Webhook-Notification-Configuration.png)

2. Введите адрес вебхука с учетом требования, что адрес вебхука должен быть доступен через публичную сеть.

3. Ключ не требуется и используется для аутентификации вебхука. Он генерирует подпись запроса с использованием ключа подписи для аутентификации и предотвращения вредоносных запросов к URL-адресу.

4. Выберите события уведомления, которые будут запускать уведомления о сообщениях, когда задачи в этом конвейере переходят в выбранное состояние.

## Триггерный запуск конвейера

Конвейеры Gitee отправляют запросы веб-хуков в виде POST-запросов. В полезной нагрузке содержится информация о состоянии задачи.

```json
{
    "job":{
        "pipelineId":183,
"pipelineName":"Test Pipeline",
        "stageName": "Build",
        "jobName": "Java Build",
        "buildNumber":19,
        "statusCode":"SUCC", // SUCC,FAIL,CANCEL,SKIP
        "statusName": "Success",
        "pipelineUrl":"https://e.gitee.ru/oschina/projects/210455/pipelines/255039/history/426411/stages/741137/jobs/1018636?buildNumber=2"
    },
    "sources":[
        {
            "sourceType":"GITEE_GO",
            "repoPath":"xiaoxuxuy/test",
            "branch":"master",
            "commitId":"123123"
        },
        {
            "sourceType":"PIPELINE",
            "buildNumber":7,
            "upParams":"{"GITEE_REPO":"git/test","GITEE_BRANCH":"master1","GITEE_COMMIT":"c2a64f66a9536200f9dc464427e793c3444b1113b"}"
        },
        {
            "sourceType":"CODE_LEVEL_ARTIFACT",
            "artifactRepo":"default",
            "artifactVersion":"v1.0.0"
        }
    ],
    "globalParams":[
        {
            "key":"test",
            "value":"test1"
        },
        {
            "key":"test2",
            "value":"test2"
        }
    ]
}
```