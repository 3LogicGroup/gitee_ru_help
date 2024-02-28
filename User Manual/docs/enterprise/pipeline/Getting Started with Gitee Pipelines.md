---
title: Introduction to Gitee Pipelines
description: Introduction to Gitee Pipelines
slug: /enterprise/pipeline/introduce
origin-url: https://gitee.ru/help/articles/4393
keywords:
 - Gitee
 - CICD
 - Intelligent Build
 - Multi-cloud Management
 - Pipeline
---

What is a pipeline

Project pipeline is a brand new UI-based CI/CD tool launched by Gitee, providing continuous integration and continuous delivery (deployment) capabilities to help companies continuously improve the quality and efficiency of application delivery. By automating build, testing, and deployment, it achieves continuous delivery from development to release. It measures delivery process and discovers efficiency issues, and provides optimization recommendations.

![Pipeline List](./assets/pipeline_list.png)

## Product Advantages

### One-stop platform, full traceability of the R&D process

From issue creation, to code submission and storage, to final deployment and release, a series of processes are connected to make the necessary compilation, testing, and deployment processes for engineers simple, efficient, and stable. It is also integrated with PR access control and issue status transitions, making the development results measurable and the development process observable.

### Smart Build

Adjust resources dynamically based on the current number of tasks to solve resource contention problems. Visualize the observation of queued tasks and resource usage, dynamically adjust task priorities to help improve pipeline execution speed and efficiency. When tasks are crowded, in addition to quickly scaling up, it will also train pre-scaling models based on long-term accumulated pipeline construction data within the enterprise. Expand in advance based on the pre-scaling model to further improve pipeline execution speed and reduce your wait time, with the fastest completion in seconds.

### Multi-cloud Management, One-Click Deployment

Implement one-stop management of multi-cloud environments, providing you with a global resource dashboard to help you increase resource utilization and reduce maintenance costs. It is tightly integrated with the pipeline to achieve unified allocation of multi-cloud resources and enable one-click deployment across multiple clouds. It also allows smooth service migration, staged release, rollback, and other operations based on different cloud providers.

Rich and flexible templates

Gitee Pipeline provides dozens of generic pipeline templates to help you quickly create pipelines. At the same time, it supports customizing your own templates to manage enterprise continuous integration and continuous delivery processes.

## Use Cases

### Scenario 1: Delivery Process Setup

- Automated build, test, and deployment for various types of applications (e.g., Spring applications) on each code change, version management of code, artifacts, and test reports, and hierarchical management of testing and deployment
- Product Form: CI/CD Pipeline, Pipeline Plugin Template
- Value: Fast and reliable delivery process (traceable, repeatable, rollbackable)

### Scenario 2: Test Capability, Deploy Capability Service

To extend the capabilities of the pipeline, such as code scanning, more testing capabilities and deployment capabilities can be accessed as plugins in the pipeline. Tasks that previously required QA (testing engineers) and OP (operations engineers) can now be completed by RD (development engineers) autonomously by calling the services, such as setting up testing environments and deploying in stages.
- Product Form: Plugin Center
- Value: Reduce communication and application costs, improve delivery efficiency

### Scenario 3: Continuous Improvement based on Efficiency Metrics

- Generate efficiency reports for code changes to application delivery and process reports for build, test, and deployment phases. Identify key processes that impact efficiency and make improvements. Track the effectiveness of the improvements.
- Product Form: Metric Report
- Value: Continuous Efficiency Improvement

## Basic Concepts of Pipeline

- **Pipeline:** A pipeline provides a custom process orchestration tool and consists of multiple stages.
- **Input Source:** Original materials from continuous delivery, such as Gitee repositories
- **Stage:** A stage is used to manage a group of tasks with similar business attributes (e.g., build, test, and deploy), each stage contains one or more tasks.
- **Task:** A task is the smallest scheduling unit in a pipeline, and all scripts and content under a task are executed in the same runtime environment.
- **Trigger:** The way to start the pipeline. Common triggers include automatic triggering based on code changes, manual triggering, and scheduled triggering.
- **Run (Build):** Represents an execution of the pipeline. After the run is completed, you will get all the logs related to stages and tasks, as well as the results of the run.
Artifacts: Refers to various data processed in the pipeline, which can be executable programs, lib files, jar packages, Docker images, Helm Chart deployment files, etc.
- **Variables:** Variables are the content passed between pipelines, stages, and tasks, and they are an important part of the pipeline, existing in key-value form.

## Pricing

Committed to providing discounted and stable CI/CD services for enterprise users, therefore, a certain amount of free resource usage is provided for enterprises. More billing rules can be viewed in the 'Billing Rules and Product Pricing' section.