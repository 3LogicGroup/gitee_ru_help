---
title: How to handle exceeding private members in the organization
slug: /account/organization-member-quota-above
origin-url: https://gitee.ru/help/articles/4233
---

'Organization' is a tool provided by Gitee for open source project collaboration, such as managing private projects. The number of members participating in private repository collaboration must not exceed

To avoid affecting your normal use, please delete the number of members in your organization's private repository to comply with the rules (<=5 people) before **December 31, 2018**. **If you fail to upgrade to Enterprise or reduce the number of members in private repositories, all private repositories will enter read-only mode.** Detailed operation instructions are as follows:

Note: Use an organization admin account for the following operations.

## 1. Confirm that the private repository of the organization will not exceed 5 members

Go to the organization homepage, click 'Settings' - 'Private Repository Members' to see which members are currently in the private repositories.

## 2. How to handle when the number of members in the organization's private repository exceeds 5?

### 2.1 Purchase Gitee Enterprise Edition

**If you need to retain more than 5 private repository members, please use [Gitee Enterprise](https://gitee.ru/enterprises/?from=group-collaborators) and purchase the corresponding package to obtain the quota.**

_Note: If the current organization has exceeded the limit, you can directly upgrade to the enterprise edition, but because of the exceeding, it will still enter a locked state and must be paid to continue using it!_

#### 2.1.1. Hope that the original repository address will not change

- **The current account does not have an enterprise account. Follow these steps:**

Step 1: Go to the organization homepage, select 'Settings' - 'Upgrade to Enterprise Edition'

Step 2: Follow the prompts to fill in the enterprise information and complete the account upgrade.

Step 3: Enter the enterprise workspace interface, select 'Members' and 'Repositories' from the left sidebar to view the organization members and repositories that have been transferred.

- If the current account has a free enterprise, follow these steps:

Step 1: Go to the enterprise management console - "Enterprise Settings" - "Delete Enterprise".

Step 2: Go to the organization homepage and select 'Settings' - 'Upgrade to Enterprise Edition'

Step 3: Follow the prompts to fill in the enterprise information and complete the account upgrade.

Step 4: Go to the enterprise workbench interface, select 'Members' and 'Repositories' in the left sidebar, and view the transferred organization members and repositories.

- **If the current account has a paid enterprise and belongs to the same department/company as the organization, follow these steps:**

Step 1: Go to the Enterprise Dashboard, select "Members" - "Add Team" - "Transfer to Team".

Step 2: Click "Generate Transfer Code" - "Copy" in the pop-up window.

Step 3: Go to the organization homepage, select 'Settings' - 'Transfer to Enterprise', paste the transfer code copied in step 2 here, and click 'Next'.

Step 4: Confirm enterprise information, here you need to check the check mark shown in the figure below, and then click "Confirm Transfer".

![Transfer Organization](https://images.gitee.ru/uploads/images/2018/1212/111527_f917f741_669935.png "1.png")

- **If the current account belongs to a paid enterprise and is different from the organization in a department/company, follow these steps:**

Step 1: Go to the organization homepage, select 'Settings' - 'Upgrade to Enterprise Edition'

Step 2: Follow the prompts to fill in the enterprise information and complete the account upgrade.

#### 2.1.2, Select enterprise package and make payment

For payment details, please see: [https://gitee.ru/help/articles/4160](https://gitee.ru/help/articles/4160)

### 2.2 Delete members from private repositories

Go to the organization homepage, click on [Settings] - [Private Repository Members] - [Remove All] to remove the members from all private repositories of the organization, until the number of collaborators in private repositories is reduced to

![Image Description](https://images.gitee.ru/uploads/images/2019/0103/193737_61ef3bd2_669935.png )