---
title: Quick Start in Three Minutes
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/quick-start
description: Quick Start in Three Minutes
origin-url: 
---
After completing the Gitee Go pipeline opening, you can quickly get started with the product by reading this article. For detailed introductions to various capabilities, please refer to the "4. Operation Guide".

### 1. Product Function Introduction

Gitee Go consists of Pipelines, Build History, Global Parameters, and Release Records

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/184457_06b33eac_10531940.png )

Pipeline: You can view all pipelines in this code repository and perform operations such as execution, editing, and deletion on individual pipelines.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/184506_a56f4ae3_10531940.png )

Build History: You can view all the build records of a pipeline, and click on different stages of the pipeline to view the execution details of each stage and task of the pipeline.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/184513_34ffbb78_10531940.png )

Global parameters: Custom parameters that can be centrally managed by users in a single code repository. These parameters can be referenced by all pipelines in this code repository and can be used in any stage or task of the pipeline.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/184524_787efa4e_10531940.png )

Release Record: Records the output artifacts of all pipelines and allows for viewing, downloading, prohibiting downloads, deleting, etc. for a specific artifact.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/184940_b01f919d_10531940.png )

### 2. Product Function Practice

1. After completing the automatic creation of the pipeline, you can click to execute the pipeline

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185015_166b6e2e_10531940.png )

2. Select the corresponding branch and click start build

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185020_c432b14f_10531940.png )

3. Automatically redirect to the build history page of that pipeline

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185026_ce4ec117_10531940.png )

4. Click 'Build' to trigger the domain to view the execution status of the tasks in this stage.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185031_880800a1_10531940.png )

5. Click the "Upload Artifact" task to view the execution status of the task

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185036_6a67b81b_10531940.png )

6. Click "#4" to enter the details page of this pipeline execution (including an overview and execution logs of each stage task)

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185041_141ad71a_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185054_7ef859f2_10531940.png )

7. This pipeline includes the 'Artifact Release' task, which can be viewed in the release records for details.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185058_8fb01ee0_10531940.png )

8. You can enter the pipeline editing interface through the pipeline and build history interface

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185102_b7204db2_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185107_1837b697_10531940.png )

9. Pipeline editing is divided into graphic view and code view, and you can complete the configuration of the pipeline in different views.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185113_0ef67819_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185117_415df774_10531940.png )

10. Pipeline stage orchestration: A stage is a secondary element in a pipeline, and a stage is usually a collection of similar tasks, such as the 'Code Scan' stage, which can have three tasks: 'Code Standard Scan', 'Code Security Scan', and 'Code Defect Scan'. A pipeline can have multiple stages, which are executed sequentially in order.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185126_cbf2f77f_10531940.png )

11. Pipeline task orchestration: Tasks are the third-level elements of a pipeline and are sub-elements of a stage. They are the smallest execution units in a pipeline. In a stage, tasks can be defined to be executed in serial or parallel order. Tasks are automatically executed by default and do not support manual execution. A task corresponds to a plugin, and the task is the execution container for the plugin. Based on this, the overall model of the pipeline is: A pipeline corresponds to multiple stages, a stage corresponds to multiple tasks, and a task corresponds to a plugin.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185132_d10d65f2_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185140_9d339c4b_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185145_508aad1a_10531940.png )

12. After completing the orchestration of the pipeline, click save. Gitee Go will automatically submit the yaml file to the code repository where the pipeline is located and re-execute the pipeline to generate a build record.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185159_39166a16_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185205_90f52632_10531940.png )

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/185208_842e5d14_10531940.png )