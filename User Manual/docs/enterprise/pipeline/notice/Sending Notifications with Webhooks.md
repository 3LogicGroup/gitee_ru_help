---
title: Send Notifications Using Webhooks
description: Send notifications using Webhook
slug: /enterprise/pipeline/notice/webhook
keywords:
 - Gitee
 - webhook
 - Notification
---

Users can configure Webhook notifications in the pipeline to push information about the running status of the pipeline stages to a specified address.

## Pipeline Task Configuration Webhook Notification

1. In the pipeline task node, select Add Webhook Notification.

![Add Webhook Notification](./assets/Add Webhook Notification.png)

![Webhook Notification Configuration](./assets/Webhook Notification Configuration.png)

2. Fill in the Webhook address, and note that the Webhook address must be accessible from the public network.

3. The key is not required and is used for WebHook authentication. It generates a request signature using the signature key to authenticate and prevent malicious requests to the URL.

4. Select notification events that will trigger message notifications when the tasks in this pipeline enter the selected status.

## Trigger Pipeline Run

Gitee pipelines send webhook requests as POST requests. The payload contains task status information.

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