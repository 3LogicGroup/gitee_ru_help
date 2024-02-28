---
title: Arrange Pipelines
description: Arrange pipelines
slug: /enterprise/pipeline/layout
keywords:
 - Gitee
 - Orchestrate Pipeline
---

## Stage Settings

A stage is a secondary element in a pipeline and typically represents a collection of similar tasks, such as the "code scanning" stage, which can have three tasks: "code style scanning," "code security scanning," and "code defect scanning." A pipeline can have multiple stages that are executed sequentially. The basic elements of a stage are as follows:

- Stage Name: The name of the stage, can be repeated within the same pipeline.
  
- Trigger Method
    - Automatic trigger: After the upstream stage build succeeds, the downstream stage is triggered automatically. If it fails, the downstream is not allowed to be triggered.
- Manual Trigger: After the upstream stage build is successful, the downstream stage will not be automatically triggered. You need to manually click the execute button.

- Failure strategy
    - Fast Failure: It is mainly used in scenarios where concurrent tasks are executed, as shown in the figure below. There are three parallel task chains in the build phase, and when the compilation phase starts, the three task chains will start executing simultaneously. If Step1-1 fails, even if Step2-1 and Step3-1 succeed, downstream tasks will not be triggered. That is, when selecting 'Fast Failure', parallel task chains can affect each other's execution status.
- Natural Failure: In contrast to fast failure, when selecting "natural failure", the parallel task chains do not affect each other. Even if Step1-1 fails, it will only affect Step1-2 and Step1-3 from continuing to execute, while the Step2 and Step3 chains will continue to execute normally until all chains are completed.
    
![Quick Failure](./assets/quick_failure.png)

### Use Cases

![New Stage](./assets/New Stage.png)

![New Stage 2](./assets/New Stage 2.png)

## Task Settings

Task is the third-level element of a pipeline, which is a child element of a stage and is the smallest execution unit. Within a stage, tasks can be defined to run in either serial or parallel order. Tasks are automatically executed by default and do not support manual execution. A task corresponds to a plugin and serves as the execution container for the plugin. Based on this, the overall model of a pipeline is as follows: A pipeline corresponds to multiple stages, a stage corresponds to multiple tasks, and a task corresponds to a plugin.

A task contains the following basic information:

- Task Name: The name of the task, which can be repeated within the same stage.
- Workspace: When configuring multiple sources in a pipeline, you need to select the working source, and the working source data will be pulled during execution

### Use Cases

![Create Task](./assets/Create Task.png)

![Create task 2](./assets/Create task 2.png)

![Create Task 3](./assets/Create Task 3.png)