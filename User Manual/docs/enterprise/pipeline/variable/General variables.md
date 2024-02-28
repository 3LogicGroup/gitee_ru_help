---
title: Common Variables
description: Common variables
slug: /enterprise/pipeline/variable/global
keywords:
 - Gitee
 - Project-level
 - Common Variables
---

General variables are common environment variables controlled by the project, managed uniformly by the project, and can be added to pipelines.

As shown in the figure, click on General Variables -> Add Variable -> Fill in the variable configuration -> Create

![Add Common Variables](./assets/Add_Common_Variables.png)

Add universal variable 1

## Pipeline Associated Common Variables

Go to the pipeline editing page, click on the indicated location, select variables, and click on Associate.

![Reference Common Variables](./assets/Reference_Common_Variables.png)

:::info**Note:**
Variable priority: Task output variable > Pipeline-level variable > General variable.

If the same variable exists in both custom variables and common variables in the same pipeline, the variable in the pipeline takes the highest priority.
:::