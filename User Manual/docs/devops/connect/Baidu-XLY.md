---
title: Baidu Efficiency Cloud

origin-url: https://gitee.ru/help/articles/4285
---

Use Baidu Efficiency Cloud-iPipe to compile, scan, test, and deploy code on Gitee.

## Introduction

Baidu Efficiency Cloud is a DevOps platform on Baidu Cloud. It uses Baidu Efficiency Cloud-iPipe to connect with Gitee code repository, allowing you to easily compile, scan, test, and deploy your applications. Efficiency Cloud-iPipe supports popular languages such as Python, Java, Javascript, C, C++, PHP, and Go for compilation, Docker build, artifact management, and cloud deployment. You can also use Baidu Efficiency Cloud iScan for source code scanning and iTest for automated API testing and performance testing. The flexible pipeline customization can meet your needs.

## Connecting Baidu Effciency Cloud with Gitee Repositories

- Gitee's PullRequest can automatically trigger the cloud integration service iPipe, which can perform compilation, code scanning, artifact storage, and deployment.
- Code commits on branches in Gitee will automatically trigger the efficiency cloud iPipe for builds, achieving continuous integration.

## Just three steps to connect Baidu iPipe with Gitee code repository

### Step 1: Registering a Baidu Cloud Account and Activate Efficiency Cloud Service

1. Open the Baidu Efficiency Cloud product homepage ([https://cloud.baidu.com/product/xly.html](https://cloud.baidu.com/product/xly.html?trackid=30001)) and click 'Use Now'.

![Image Description](https://images.gitee.ru/uploads/images/2019/1229/000440_5f66931a_62561.png )

2. Log in with your Baidu account. If you don't have a Baidu account, please register one and start from the previous step after registration.

3. On the Open Efficiency Cloud Service page, enter the "Enterprise Name" and "Enterprise Identifier/URL" to open the Efficiency Cloud Service. Access the Efficiency Cloud

![Image Description](https://images.gitee.ru/uploads/images/2019/1229/000543_385faf4f_62561.png )

### Step 2: Create an efficiency cloud project and set up an iPipe pipeline.

1. On the Efficiency Cloud project overview page, click "New Project", enter the project name and identifier, and click "Finish and Create".

![Image Description](https://images.gitee.ru/uploads/images/2019/1229/000630_f1018367_62561.png )

2. Enter the newly created project, select "Pipeline iPipe" in the left navigation, and click the "Create Pipeline" button on the page.

![Image Description](https://images.gitee.ru/uploads/images/2019/1229/000728_4d30c3ef_62561.png )

### Step 3: Configure iPipe pipeline and select Gitee code repository

1. On the pipeline configuration page, click the "+ Repository/Branch" button and select Gitee repository

![](https://images.gitee.ru/uploads/images/2019/1231/115413_fd078de1_551147.png )

2. Click on 'OAuth' authorization, authorize Efficiency Cloud in the Gitee page, and give the connection a name

3. Select the code repository or manually enter the open source code repository and configure the branch to monitor.

![](https://images.gitee.ru/uploads/images/2019/1231/115444_aea5aa4b_551147.png )

4. Configure iPipe pipeline stages and tasks, save the pipeline, [Detailed Documentation](https://cloud.baidu.com/doc/XLY/s/qjwvy89pc?trackid=30001)

![](https://images.gitee.ru/uploads/images/2019/1231/115507_06741cd4_551147.png )

## For open source projects, make the iPipe build results visible to anyone

If your Gitee project is an open-source project, you may want the connected iPipe pipeline to be visible to everyone so that anyone can see the log of the automatically triggered iPipe pipeline when submitting a Commit or creating a PR. If you want this, perform the following operation to configure the Efficiency Cloud project as "public to the whole network".

If you have already configured a pipeline for connecting to the Gitee code repository (based on the above three steps), please click on the "Project Settings" in the left navigation of the iPipe pipeline page, and in the "Privacy Settings" section of the basic information, select "Public to the Whole Network"

![](https://images.gitee.ru/uploads/images/2019/1231/115527_b23bd877_551147.png )

Please note: Currently, the 'Public on the Internet' feature only works for Efficiency Cloud-iPipe Pipeline components. This means that if a user views a 'Public on the Internet' Efficiency Cloud project without logging in, they can only see

## Help and Support

- [Baidu Efficiency Cloud Product Manual and Help Documentation](https://cloud.baidu.com/doc/XLY/index.html?trackid=30001)
- [Baidu Cloud Efficiency Forum](https://developer.baidu.com/forum/topic/list/95?trackid=30001)
- Contact Baidu Efficiency Cloud (xiaolvyun@baidu.com)