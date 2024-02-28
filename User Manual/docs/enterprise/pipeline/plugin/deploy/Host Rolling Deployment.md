---
title: Host Rolling Deployment
description: Host Rolling Deployment
slug: /enterprise/pipeline/plugin/host-rollout-deploy
keywords:
 - Gitee
 - Host
 - Rolling Deployment
---

Host Rolling Deployment is similar to Host Deployment, supporting deployment in batches. Specific configurations can refer to the Host Deployment task.

## What is scrolling frequency?

For example, when selecting 1/3 frequency: Gitee Go will randomly select 1/3 machines from the host group to execute, and continue to execute manually until all machines (excluding those that have been executed) have finished executing.