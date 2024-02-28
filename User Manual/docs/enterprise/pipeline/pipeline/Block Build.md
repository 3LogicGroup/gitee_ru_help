---
title: Block Build
description: Block build
slug: /enterprise/pipeline/block
keywords:
 - Gitee
 - Block Build
---

Blocking builds are set up to solve the problem of scarce resources and prevent contamination of environments in collaborative work.

- Switch on (block the build when the previous build is not finished): The next pipeline will not be triggered when the previous pipeline is not finished; the next pipeline will be automatically triggered when the previous pipeline is finished.
- Switch Off (Non-blocking Build): Normal and default build mode, allows multiple builds to run in parallel under the same pipeline.

Scenario Example:

A pipeline consists of three stages: compile, deploy to test environment, and functional testing. In build #1 triggered by A, both compile and deploy to test environment stages have been completed, and functional testing is currently in progress. At this point, B submits a code and triggers build #2. When it reaches the deploy to test environment stage, A's functional testing in build #1 is interrupted and fails. To avoid this issue, the execution order of pipeline builds can be limited. If the previous build has not been fully executed, the next build will be in a waiting state.

![Blocking build](./assets/Blocking build.png)