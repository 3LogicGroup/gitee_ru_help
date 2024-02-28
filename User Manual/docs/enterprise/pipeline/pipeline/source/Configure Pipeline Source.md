---
title: Configure Pipeline Source
description: Configure pipeline source
slug: /enterprise/pipeline/source/pipeline
keywords:
 - Gitee
 - Pipeline Source
---

There are scenarios where the build phase and deployment phase are separated in the actual application process.

For example, it is necessary to deploy to development, testing, and production environments separately, but the deployment frequency of each environment is different. If the deployment environment for multiple environments is configured in the same pipeline, there will be multiple repetitions and cancellations. If the multiple environments are configured as separate pipelines, each environment will have duplicate builds during the deployment process.

Therefore, Gitee Pipeline provides the ability to trigger one pipeline from another. You can set Pipeline A as the trigger source for Pipeline B. When Pipeline B is triggered to run, Gitee Pipeline will pass the build variables from the source Pipeline A to Pipeline B according to your configuration. Subsequent tasks can reference the variables from Pipeline A.

On the pipeline orchestration page, click **Add Source**, select **Pipeline** in the new pipeline dialog box, select the source pipeline and the default version. The pipelines can also be automatically triggered between each other. Turn on the trigger event switch and select the events for automatic triggering.

![Configure pipeline source](./assets/Configure pipeline source.png)