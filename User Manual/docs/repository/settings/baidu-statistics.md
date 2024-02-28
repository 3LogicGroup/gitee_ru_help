---
title: Set up Baidu Statistics
origin-url: https://gitee.ru/help/articles/4335
---

After embedding Baidu Analytics through **"Baidu Analytics Settings"** in the repository, open source project authors can obtain detailed access details of the open source repository, such as visitor sources, geographical distribution, search keywords, entry pages, and more.
Help open-source project authors operate their projects in a more targeted and efficient manner

<a name="divtop"><b>1. How to configure a single repository</b></a>

1.1 Register a Baidu Analytics account by clicking on the registration link in Baidu Analytics and selecting "Baidu Analytics - Site Owner Edition". If you already have an account, simply log in.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210725_0d17e0b6_7722649.png )

1.2 Click on "Manage" - "Add Website", enter the website domain name gitee.ru, fill in your repository address in the website homepage, and click OK.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210739_df1a1ca6_7722649.png )

1.3 After adding, click on [Get Code] and copy the KEY value (32-character string) after hm.js?.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210753_569d47c8_7722649.png )

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210809_d67c388e_7722649.png )

1.4 Open the 'Manage' - 'Baidu Analytics Settings' under the repository, paste the obtained KEY into the input box shown in the figure, and click the confirm button. Single repository configuration completed.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210824_640848f9_7722649.png )

 **2. How to configure multiple repositories**

 **2.1 Solution 1: Consolidated Statistics of Multiple Repositories**

Advantage: Easy and fast configuration, get KEY value once, configure multiple times

**Disadvantage**: Unable to view the summary of data for a specific repository

Configure the KEY value obtained from 'How to configure a single repository' section to multiple repositories. The data source obtained from Baidu Statistics will be multiple repositories.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210911_ad5733c2_7722649.png )

2.2 Plan 2: Separate statistics for multiple repositories

**Advantage**: Can view the summary of data for a specific repository

 **Disadvantage**: Configuring is more complicated, requiring multiple times to obtain KEY values and configure multiple times

In step [How to configure a single repository](#divtop), directly fill in the website domain as the repository address to obtain data for a single repository. Repeat this operation by clicking [Add Website] multiple times to complete the configuration of multiple repositories, and the data for each repository is independent.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210935_84fcd7e6_7722649.png )

 **3. How to view statistical data**

After the configuration is completed, you need to wait for about 20 minutes to view the repository access sources, regional distribution, search keywords, etc. in <https://tongji.baidu.com>.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/210959_293abbbb_7722649.png )

Advanced gameplay

To view the summary of all repository data under 'Me' or 'Organization' and also view the summary of individual repository data.

Taking Gitee organization as an example, using the concept of subdirectories:

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/211019_d8412a82_7722649.png )

Specific setup steps:

1. When adding a new website, enter the organization address as the website domain, get the KEY value, and complete the configuration for the repository under the organization;

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/211043_a2ef2d71_7722649.png )

2. Add subdirectories to the website domain through [Subdirectory Management];

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/211058_67065e2f_7722649.png )

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/211120_3e39c369_7722649.png )

Note: The included pages are in wildcard form to make the access data more complete.

3. Switch website domain and subdirectory to view data.

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/211138_a2d8c566_7722649.png )

![Image Description](https://images.gitee.ru/uploads/images/2021/0519/211145_120e6bf6_7722649.png )