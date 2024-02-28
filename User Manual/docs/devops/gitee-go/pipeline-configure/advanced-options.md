---
title: Advanced Settings
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/advantage-options
description: What is Gitee Go
origin-url: 
---

### Block Builds

Blocking build is used to solve the scarcity of resources and prevent contamination of the environment when multiple people collaborate. There are two options for blocking build: non-blocking build and blocking build when the previous build is not finished.

- Non-blocking build: The normal, default build method that allows multiple builds to run in parallel under the same pipeline.
- Block the next pipeline if the previous build is not finished: The next pipeline will not be triggered until the previous pipeline is completed. Only when the previous pipeline finishes running, the next pipeline will be automatically triggered.

Scenario Examples:
A pipeline consists of three stages: compile, deploy to test environment, and functional testing. In build #1 triggered by A, both compile and deploy to test environment stages have been completed, and functional testing is currently in progress. At this point, B submits a code and triggers build #2. When it reaches the deploy to test environment stage, A's functional testing in build #1 is interrupted and fails. To avoid this issue, the execution order of pipeline builds can be limited. If the previous build has not been fully executed, the next build will be in a waiting state.

Specific Configuration:

【Recommended】You can define in the visual editing interface:

![Blocking Build Configuration](https://images.gitee.ru/uploads/images/2021/1117/180713_e6b2847a_5192864.png)

You can define directly in Yml:

```yaml
# Optional Fields
strategy:
  # true to enable blocking build, false to disable (default false)
  blocking: false        
```

### Timeout Tasks

Task timeout setting applies to all tasks within the pipeline, in minutes. The minimum timeout is 1 minute, and the maximum timeout is 1 day (1440 minutes). Inputs outside this range (1-1440) cannot be saved as configuration. It is recommended to input an integer (non-integer inputs will be rounded down, e.g. 1.5 minutes will be considered as 1 minute). Once a task exceeds the timeout, it will be canceled. If not set, there will be no timeout handling, and the task can continue to run.
Specific Configuration:
【Recommended】You can define in the visual editing interface:
![Task Timeout Configuration](https://images.gitee.ru/uploads/images/2021/1117/180759_5c1a440b_5192864.png )

You can define directly in Yml:

```yaml
# Optional Fields
strategy:
# Minimum timeout is 1 minute, maximum timeout is 1 day (1440 minutes), leave blank for no timeout limit.
  stepTimeout: 100 
```