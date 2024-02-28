---
title: Manual checkpoint
description: Artificial card point
slug: /enterprise/pipeline/plugin/tool-review
keywords:
 - Gitee
 - Manual Checkpoints
---

## Plugin Description

The manual checkpoint plugin is used for manual review to control whether the entire pipeline can continue to execute. This plugin will send an internal message to notify the reviewer for review. After the reviewer approves or rejects it, an internal message will be sent back for notification.

## Form Description

- **Reviewer**: The reviewer needs to pass the verification to continue executing the subsequent tasks of the pipeline.

## Usage Example

- Add plugins, select reviewer.

![Manual card point - Select acceptance person](./assets/Manual card point - Select acceptance person.png)

- After the pipeline is executed, the corresponding reviewer will receive an internal message notification.

![Manual Card Point - Internal Mail](./assets/Manual Card Point - Internal Mail.png)

- After the acceptance by the reviewer, the pipeline will continue with the subsequent tasks.