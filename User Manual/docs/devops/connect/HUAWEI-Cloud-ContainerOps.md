---
title: Huawei Cloud ContainerOps Service

origin-url: https://gitee.ru/help/articles/4264
---

## What is Huawei Cloud ContainerOps service

ContainerOps on Huawei Cloud is an online container delivery pipeline service. This service is aimed at the entire process of container delivery, providing a series of services including image building, image management, image deployment, and gray release. It is the best practice tool to help enterprises quickly implement container technology and simplify container delivery and operation processes.

## How to bind Huawei Cloud account to Gitee

Go to the project homepage, select "Huawei Cloud ContainerOps" option through DevOps, and enter the binding page.
![Image Description](https://images.gitee.ru/uploads/images/2019/0819/170746_96672dc3_4839271.jpeg "01.jpg")

Click to bind now

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/170815_3d367f72_4839271.jpeg "02.jpg")

Confirm binding information

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/170833_f0f1c4be_4839271.jpeg "03.jpg")

Go to the Huawei Cloud official page, create an account directly or bind an existing account

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/170850_0b9388ec_4839271.jpeg "04.jpg")

After successful binding, you can see the bound Huawei Cloud account and pipeline quota when entering the pipeline page again.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/170924_2237d35c_4839271.jpeg "05.jpg")

## Create Pipeline

Click on "Create Pipeline" and a form will pop up. By default, automatic deployment is not selected. The newly created pipeline will not include the deployment process. If you need automatic deployment, you need to select it. For detailed usage, see the following text. This step explains how to create a pipeline without the deployment process.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171007_c93faaa4_4839271.jpeg "06.jpg")

## Pipeline List

After successful creation, you will see the following interface. You can directly edit or view the corresponding pipeline in the Huawei Cloud Console by clicking on the 'Edit' or 'View' button.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171037_cad2ddaa_4839271.jpeg "07.jpg")

After clicking on view or edit, the page will be redirected

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171147_c460f1a9_4839271.jpeg "09.jpg")

If you encounter the following page in the Huawei Cloud Console, it means that you have not authorized Gitee to Huawei Cloud, which may result in code fetching failures. You need to select Gitee and click on Bind Account to be redirected to the authorization page for authorization.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171226_02b0ce02_4839271.jpeg "10.jpg")

## Execute Pipeline

Gitee defaults to selecting the Dockerfile in the main directory as your image file, so you must ensure that there is a Dockerfile (case-sensitive) in the main directory.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171404_632b1a88_4839271.jpeg "14.jpg")

If you don't have it, you can also manually fill it in by editing the link to go to the Huawei Cloud Console using the web version.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171420_1a58e52e_4839271.jpeg "16.jpg")

Once the configuration is complete, you can execute the pipeline through the Huawei Cloud Console, or start the pipeline through the launch button provided by Gitee.

### Start Gitee Pipeline

After creating the pipeline, you can directly start it by clicking the launch button in Gitee.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171453_4a8d6a3a_4839271.jpeg "08.jpg")

### Huawei Cloud Pipeline Startup

You can also click on the link to jump to Huawei Cloud Startup

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171559_d35119e7_4839271.jpeg "19.jpg")

## Pipeline Execution Logs

### Gitee Log

Click on the log link to open the log popup window

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171756_0e533d8e_4839271.jpeg "21.jpg")

Huawei console log

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171849_3748b02f_4839271.jpeg "20.jpg")

## Image Deployment

If the user has an automatic deployment requirement, then check the automatic deployment option in the new pipeline dialog box.

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171911_56981aa5_4839271.jpeg "12.jpg")

After successful creation, click on the pipeline view link to jump to the Huawei Cloud Console. The pipeline process adds manual review and formal release stages, which cannot be completed in Gitee. Users need to choose their own machine cluster.

### Manual Review Process

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171931_7c1b8ae1_4839271.jpeg "17.jpg")

### Formal Release Configuration Page

If you have not purchased a cluster, you need to enter the Huawei Cloud Cluster Service page by clicking the "Create Cluster" button. If you have already purchased, select your information and then select "Save and Execute".

![Image Description](https://images.gitee.ru/uploads/images/2019/0819/171946_23b1c36b_4839271.jpeg "18.jpg")

At this point, your image deployment is complete, for more details see [Huawei ContainerOps Center](https://console.huaweicloud.com/swr/containerops/?region=cn-east-2#/app/dashboard).