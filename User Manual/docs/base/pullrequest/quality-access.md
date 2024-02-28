---
title: Pull Request quality gates
authors:
  - name: Cheese
description: Operation instructions for Pull Request quality gate feature scanning
---

> Pull Request quality gate is the last threshold for code submission and requires complete automated testing of all code. Gitee Scan has launched the quality gate scanning feature and opened it for unlimited use by all paid enterprises.

## Scan quality access control

Create a new module and select 'Enable Quality Gate' when creating code review triggers. When the PR code scan fails, merging the PR is not allowed. Quality Gate can strictly control the code quality from the source, and prohibit the inclusion of code that does not meet the specifications.

![Quality gate](https://pic1.zhimg.com/80/v2-c93c936a6eb5fb73580b5d117ed2bda4_1440w.webp)

![Quality gate](https://pic2.zhimg.com/80/v2-33d18ea1b176ae740b178254c7c2921d_1440w.webp)

![Quality gate](https://pic1.zhimg.com/80/v2-5ab2b85926b8bdcab6d9dc74bb631d68_1440w.webp)

## Scan scheme management

![Scan plan](https://pic3.zhimg.com/80/v2-cdadf32bd3a4278da93e2ea1710d9592_1440w.webp)

Click on the 'Scan Plan' button on the code scanning settings page to create and edit all scan plans for the organization.

![Scan plan](https://pic1.zhimg.com/80/v2-ef284848693086a6efd3094de7642edc_1440w.webp)

The scanning solution includes built-in general scanning schemes for mainstream languages and Alibaba scanning scheme.

Gitee Enterprise supports enterprise-customized scanning schemes, which can integrate different rule sets and set quality gates. When setting quality gates, you can customize the calculation rules for the issues.

Scan solution