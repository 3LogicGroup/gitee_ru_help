---
title: Huawei microservices

origin-url: https://gitee.ru/help/articles/4222
---

The Microservice Cloud Application Platform is an enterprise-oriented one-stop PaaS platform service that provides cloud hosting solutions for applications, helping enterprises simplify application lifecycle management such as deployment, monitoring, operation, and governance. It provides a microservice framework compatible with mainstream open-source ecosystems, without binding to specific development frameworks and platforms, helping enterprises quickly build distributed applications based on microservice architecture.

Currently, Huawei microservice platform has opened support for Gitee code repositories. The specific usage process is as follows:

### Step 1

SpringCloud applications do not need to modify the source code, just need to introduce the cse-solution-spring-cloud dependency. For demos and instructions, please refer to [SpringCloud Application Access CSE](https://support.huaweicloud.com/devg-cse/cse_03_0092.html?utm=osc).

### Step 2

Visit Huawei Cloud [https://www.huaweicloud.com](https://www.huaweicloud.com/), register or log in with an existing account.

### Step 3

Select 'Products' -> 'Application Services' -> 'Microservice Cloud Application Platform ServiceStage', click 'Use Now' to enter the overview page of the microservice cloud platform.

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154201_f16aa425_669935.png )

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154318_8d8def97_669935.png )

### Step 4

Select "Resource Management" -> "Cluster" in the left sidebar -> "Create Kubernetes Cluster", and choose "Create Virtual Machine Cluster" as the type. Follow the prompts on the interface to complete the steps such as "Fill in Basic Information" (select version v1.7.3) and "Create Nodes" (when configuring the network, you must select elastic IP, and there is no limitation on bandwidth specification). For more information, please refer to [Create Cluster](https://support.huaweicloud.com/usermanual-cce/cce_01_0028.html?utm=osc).

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154334_ecf8fa20_669935.png )

### Step 5

Select 'Application Development' -> 'Microservice Development' in the left sidebar -> 'Build Management', click 'Create Job', enter basic information, select Gitee as the source code, click 'Bind Account' and complete authorization.

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154438_243ee403_669935.png )

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154452_e0b94454_669935.png )

### Step 6

Go back to the console page, select the bound account's namespace, the repository name where the image is to be built, and the branch in order.

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154502_7a53083c_669935.png )

### Step 7

Click Next, choose "Java" as the build language, then enter the compile command, Dockerfile directory, and image name in order (Dockerfile and start.sh are provided in the Demo, you can refer to and use them).

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154510_697718be_669935.png )

### Step 8

Click on the next step, select the deployment cluster, namespace, number of instances, and other information, enable "Set access method", and publish the application as an accessible service (the container port must be consistent with the server.port in the application configuration file).

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/154524_f244f284_669935.png )

(Optional) If the project includes multiple microservices, repeat steps 4-8 to create cloud projects.

### Step 9

Select "Application Development" -> "Overview", click "Add Microservice" to monitor the deployed microservices and their real-time status. In addition, under "Microservice Management", there are functions such as "Dashboard", "Service Catalog", "Service Governance", and "Global Configuration".

Visit [Gitee](https://gitee.ru/) to experience it immediately!