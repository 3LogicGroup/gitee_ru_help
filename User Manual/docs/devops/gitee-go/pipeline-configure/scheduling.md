---
title: Task Orchestration
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/scheduling
description: What is Gitee Go
origin-url: 
---

### Stage settings

A stage is a secondary element in a pipeline and typically represents a collection of similar tasks, such as the "code scanning" stage, which can have three tasks: "code style scanning," "code security scanning," and "code defect scanning." A pipeline can have multiple stages that are executed sequentially. The basic elements of a stage are as follows:

Stage name: The name of the stage, which can be repeated within the same pipeline.
- Stage identification: Unique identifier for a stage, cannot be duplicated within the same pipeline
- Trigger Method
  - Auto Trigger: After the upstream stage build is successful, automatically trigger the downstream stage. If it fails, triggering the downstream is not allowed.
  - Manual Trigger: After the upstream stage is successfully built, the downstream stage will not be triggered automatically and requires manual clicking of the execute button.
- Failure strategy
 - **Fast Failure**: This is mainly applicable in scenarios where concurrent tasks are being executed, as shown in the diagram below. There are three parallel task chains in the build phase, and when the compilation phase starts, all three task chains will begin execution simultaneously. If Step1-1 fails, even if Step2-1 and Step3-1 succeed, downstream tasks will not be triggered. In other words, when "Fast Failure" is selected, parallel task chains can affect each other's execution status.
![Quick Failure and Natural Failure](https://images.gitee.ru/uploads/images/2021/1117/174914_1850cfff_5192864.png)
- **Natural Failure**: In contrast to fast failure, when selecting "Natural Failure", parallel task chains do not affect each other. Even if Step1-1 fails, it will only affect that Step1-2 and Step1-3 cannot continue to execute, while Step2 and Step3 chains will still execute normally until all chains are completed.

 **Example Usage** :
【 **Recommended】You can define in the visual editing interface:**
![New Stage](https://images.gitee.ru/uploads/images/2021/1117/175149_76c0a4c2_5192864.png )
![Edit Stage](https://images.gitee.ru/uploads/images/2021/1117/175154_2dfa1dd2_5192864.png )

 **You can define directly in Yml:**

```yaml
# Configuration Stage, mandatory fields. Multiple stages can be configured to execute sequentially according to the configuration order.
stages:
  - stage:        
    # Stage identifier, supports numbers, lowercase letters, hyphens, underscores, unique within the current pipeline
    name: compile
    # Stage name, supports Chinese, numbers, letters, common symbols, etc., up to 128 characters
Compile
    # Stage triggering strategy, naturally means natural failure, fast means fast failure
    strategy: naturally     
    # Stage triggering method, auto means automatic triggering, manual means manual triggering
    trigger: auto
```

### Task Settings

A task is a third-level element of a pipeline, which is a sub-element of a stage and the smallest unit of execution. In a stage, tasks can be defined to be executed in serial or parallel order. Tasks are automatically executed by default and do not support manual execution. A task corresponds to a plugin, and the task is the execution container for the plugin. Based on this, the overall model of the pipeline is: **One pipeline corresponds to multiple stages, one stage corresponds to multiple tasks, and one task corresponds to one plugin**.

A task contains the following basic information:

- Task Name: The name of the task, which can be repeated within the same stage.
- Task Identifier: Unique identifier for the task, cannot be duplicated within the same phase

 **Use Case:**
**[Recommended]** You can define it in the visual editing interface:
Create a new task
Configure the task
![Create serial and parallel tasks](https://images.gitee.ru/uploads/images/2021/1117/175347_8a345538_5192864.png )

 **You can define directly in Yml:**

```yaml
# Configure tasks, required fields. Multiple tasks can be configured, and serial and parallel can be defined.
steps:
# Plugin identifier for the current task, you can find the corresponding plugin by clicking here >>>
  - step: build@maven 
# Task identifier, supports numbers, lowercase letters, hyphens, underscores, unique within the current stage
    name: build_maven_1
# Task name, supports Chinese, numbers, letters, common symbols, etc., with a maximum of 128 characters.
displayName: Maven Build -1
  - step: build@maven
    name: build_maven_2
    displayName: Maven Build -2
# Dependency configuration, which means that Maven Build -2 task is executed in series with Maven Build -1 task, each task has both outdegree and indegree
    dependsOn: build_maven_1
  - step: build@maven
    name: build_maven_3
    displayName: Maven Build -3
```