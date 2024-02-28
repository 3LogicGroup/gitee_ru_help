---
title: Introduction to Gitee Go
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/intro
description: What is Gitee Go
origin-url: 
---

### 1. What is Gitee Go

Gitee Go is a new CICD tool launched by Gitee, which provides continuous integration and continuous delivery (deployment) capabilities to help enterprises continuously improve the quality and efficiency of application delivery. It automates the process from code submission to application delivery through build automation, test automation, and deployment automation. By measuring the delivery process, it identifies efficiency issues and recommends optimization solutions.

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/182102_1b1fefdc_10531940.png )

### 2. Product Advantages

- One-stop platform, full traceability of R&D process

From issue creation to code submission and ultimately deployment, a series of processes are connected to make the necessary compilation, testing, and deployment in engineers' work simpler, more efficient, and stable. It is integrated with PR gatekeeping, issue status flow, making the development results measurable and the development process observable.

- Smart Build

Dynamically adjust resources based on the current number of tasks to solve resource contention issues. Visualize the queue of tasks and resource utilization, dynamically adjust task priorities, and help improve the speed and efficiency of pipeline execution. When tasks are congested, in addition to quickly scaling up, a pre-scaling model will be trained based on the long-term accumulated pipeline construction data within the company to further improve the speed of pipeline execution and reduce your waiting time, with the fastest possible completion in seconds.

- Multi-cloud management, one-click release

It realizes one-stop management of multi-cloud environments, providing you with a global resource dashboard to help improve resource utilization and reduce maintenance costs. It is closely integrated with Gitee Go to achieve unified deployment of multi-cloud resources with one-click publishing to multiple clouds. It also allows smooth service migration, staged deployment, rollback, and other operations based on different cloud providers.

### 3. Application Scenarios

Scenario 1: Delivery Process Setup

- Automated build, test, and deployment for various types of engineering applications (such as Spring applications) for each code change. Version management of code, artifacts, and test reports. Hierarchical management of testing and deployment.
Product form: CI/CD pipeline, pipeline plugin template.
- Value: Fast and reliable delivery process (traceable, repeatable, rollbackable)

Scenario 2: Testability and Deployment Capability Service

- Integrate more testing capabilities and deployment capabilities into the pipeline as plug-ins, expand the capabilities of the pipeline (such as code scanning), and transform tasks that originally required QA (test engineers) and OP (operation engineers) operations into tasks that RD (development engineers) can independently call services to complete (such as building test environments, hierarchical deployment)
- Product Form: Plugin Center
- Value: Reduce communication and application costs, improve delivery efficiency

Scenario 3: Continuous Improvement Based on Efficiency Metrics

- Generate efficiency reports for code changes to application delivery and process reports for build, test, and deployment phases. Identify key processes that impact efficiency and make improvements. Track the effectiveness of the improvements.
- Product Form: Metric Report
- Value: Continuous Efficiency Improvement

### 4. Glossary

Pipeline
The pipeline provides a custom process orchestration tool, and the pipeline consists of multiple stages.
Stage
Stages are used to manage a group of tasks with similar business properties (e.g., build, test, and deploy), and each stage contains one or more tasks.
Task
A task is the smallest scheduling unit in a pipeline, and all scripts and contents under a task are executed in the same runtime environment.
Plugin
A program that implements the compilation, image building, unit testing, code scanning, coverage analysis, test deployment, interface testing, integration testing, performance stability testing, and hierarchical deployment logic of the application. The plugins are divided into official plugins and user-defined plugins. The official plugins encapsulate the standard execution logic, and users only need to configure the input and output without worrying about resources. User-defined plugins are written by users and can be run on their own resources to be compatible with historical tasks that cannot be decoupled from the environment.
Trigger
The ways to trigger a pipeline include automatic triggering by code changes, manual triggering, and scheduled triggering.
- Run (Build)
Represents the execution of a pipeline. After running, it obtains all the logs related to stages and tasks, as well as the results of the run.
Artifact
Refers to various data processed by the pipeline, which can be executable programs, lib files, jar packages, Docker images, Helm Chart deployment files, etc.
- Parameters
Parameters refer to the content passed between pipelines, stages, and tasks, and are an important part of the pipeline, existing in key-value form.