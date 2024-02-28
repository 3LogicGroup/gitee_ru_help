---
title: Tencent Cloud Hosting
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4318
---

"Cloud Run" (Tencent CloudBase Run) is a next-generation cloud-native application engine provided by Tencent CloudBase (TCB). It supports running containerized applications written in any language and framework. Cloud Run has advantages such as painless migration, automated elastic scaling, no maintenance, cross-platform deployment support, and integration with cloud development capabilities. Developers can migrate to cloud development at low cost without language or framework limitations, effectively improving development efficiency.

User Benefits

Starting now, Gitee users who successfully deploy applications on Cloud Hosting for the first time can [click here](https://cloud.tencent.com/act/pro/tcb-welfare) to receive a 50 yuan coupon (50 off for orders over 100) as a benefit. Limited to 2000 coupons, first come first served!

## Cloud Hosting Application Scenarios

Cloud hosting is suitable for various application scenarios, whether it is traditional enterprises, SaaS vendors, or small and medium-sized startups, they can enjoy high-quality cloud-native hosting services through cloud hosting to help businesses develop rapidly.

- **Quick Cloud Migration**: Traditional enterprises/legacy businesses can be seamlessly migrated to cloud hosting without modifying or refactoring the code, enabling them to enjoy one-stop backend cloud services provided by cloud development without the need for operations and maintenance.

Multi-tenant Isolation: Supports environment-level resource isolation, where each environment has its own set of backend cloud services. For example, with Cloud Hosting, SaaS vendors no longer need to worry about data and resource isolation between SaaS tenants. Each tenant can enjoy all the cloud services within the environment.

- **Backend Service Hosting**: Visual operation, nanny-style service hosting, even **small and medium-sized enterprises** can enjoy the level of back-end automation operations and hosting services provided by large companies, so as to focus more on business development.

- **Low-Cost and Rapid Validation of New Business**: **Startups and internal innovation of enterprises**, can use cloud hosting for out-of-the-box usage, convenient deployment, rapid development and deployment of applications, iterative development, and validation of business models.

## Cloud Hosting Product Advantages

Comparison with using cloud servers:

- **Server maintenance-free**: Serverless mode does not require you to purchase, manage, and maintain servers, saving operation and maintenance costs.
- **Cross-platform deployment and migration**: Compatible with Knative + Kubernetes ecosystem standards, with a strong community foundation and complete community ecosystem. It can seamlessly migrate between different cloud providers without worrying about technology lock-in, entering the era of "cloud-native".
Flow-driven mode: The number of instances can automatically scale based on traffic, and can be reduced to 0 or kept running constantly. There is no need to constantly monitor the running status and manually scale up or down.
- **Pay-as-you-go**: Elastic scaling of resources, only pay for the actual amount of resources used, with a minimum granularity of 0.25C0.5GiB. Avoid idle resources and no need to prepare excessive resources in advance for business peaks.

**Comparison with other container platforms:**

- **Reduce the learning curve**: No need to create and maintain clusters, write complex yaml configuration files, just focus on business logic development.
- **Provide build functionality**: In addition to the traditional method of uploading and deploying images, it also supports pulling code directly from code hosting platforms like Gitee for deployment. This provides a complete end-to-end operation without the need for users to manually build images. When used with CloudBase Framework, even the Dockerfile can be generated by the system.
Cloud Development Framework Linkage: Can be linked with other functions of cloud development, using basic services such as cloud database, cloud storage, cloud calls, cloud access, static website hosting, etc., to host multi-end applications in one-stop, greatly improving the overall development efficiency of the project.

Cloud Hosting x Gitee Operation Guide

### Step 1: Open Cloud Code

#### 1.1 Log in to the Cloud Development Console

Before enabling cloud hosting, you need to log in to the Cloud Development Console and select a pay-as-you-go environment. If you don't have a pay-as-you-go environment or haven't enabled cloud development yet, please refer to the Cloud Development documentation to activate the environment.

#### 1.2 Select Environment

Multiple Cloud Development Environments can be created under one Tencent Cloud account. Each environment can independently choose whether to enable Cloud Run. When you destroy an environment, the Cloud Run within the environment will also be deleted.

![](https://images.gitee.ru/uploads/images/2020/0928/220456_67ed77fd_551147.png)

#### 1.3 Log in to the Cloud Hosting Console

Log in to the Cloud Hosting console at https://console.cloud.tencent.com/tcb/service?tdl_anchor=gitee&tdl_site=0, then switch to the specified environment as needed.
![](https://images.gitee.ru/uploads/images/2020/0928/220456_1d1eecb4_551147.png)

#### 1.4 Open Immediately

Click [Subscribe Now].

![](https://images.gitee.ru/uploads/images/2020/0928/220456_884e9156_551147.png)

#### 1.5 Open Settings

- **Location**: Currently, cloud hosting is only available in Shanghai, and more regions will be opened one after another.

- **Cloud Hosted Network**: Network settings include [Virtual Private Cloud (VPC)](https://cloud.tencent.com/document/product/215) and [Subnet](https://cloud.tencent.com/document/product/215/20046#.E5.AD.90.E7.BD.91). All services created in Cloud Hosted are deployed in the same VPC based on the environment, and network settings cannot be changed after Cloud Hosted is successfully provisioned. There are two modes for network settings:


- **Default configuration**: Regardless of whether you have created a Virtual Private Cloud (VPC) and subnet under your Tencent Cloud account, Cloud Run will automatically create a VPC and subnet for your current Cloud Development Environment. All services created in Cloud Run under this environment will be deployed to this VPC and subnet. You do not need to manually configure this process. Afterwards, you can view and manage this VPC and subnet created automatically by Cloud Run in the [VPC Console](https://console.cloud.tencent.com/vpc). You can also deploy more cloud resources (such as cloud servers, cloud databases, etc.) within this VPC for interaction. ![](https://images.gitee.ru/uploads/images/2020/0928/220455_961d0e3a_551147.png)
- **Custom Configuration**: If you have already created a private network VPC and subnet, and have deployed other cloud resources (such as cloud servers, cloud databases, etc.) in it, and want to deploy the service to the existing private network VPC through the cloud hosting in the current environment, in order to interact with the cloud resources in this private network VPC. Then you can choose the **Custom Configuration** option and select the specific VPC and subnet. Only one VPC can be selected, and multiple subnets are supported. ![](https://images.gitee.ru/uploads/images/2020/0928/220456_06c5192a_551147.png)

#### 1.6 Successful Activation

Click "Finish", the status will change to **In progress**, wait a few seconds. ![](https://images.gitee.ru/uploads/images/2020/0928/220456_c2052cb0_551147.png)

### Step 2: Create a New Service

#### 2.1 Create a New Service

Click 'Create Service' on the service list page in the console.

Enter the service name as "helloworld", select the "Use the default repository of the system" option for the image repository usage mode, and click on "Submit". ![Image](https://images.gitee.ru/uploads/images/2020/0928/220456_bc203cca_551147.png)

#### 2.2 Enter the details of the 'helloworld' service.

Select the service "helloworld" and click on the service name to enter the service details page.

![](https://main.qcloudimg.com/raw/252af6bc138cd26f7f109fe3ed8b5fa2.png)

### Step 3: Create and Configure Versions

Click on [Create New Version]

![](https://main.qcloudimg.com/raw/80be0e18962acdd5d131b08a688a544d.png)

In the new version window, continue filling in the required configuration information for the version. Select "Code Repository Pulling" as the upload method, and choose "Gitee" as the code source. The listening port, traffic policy, and advanced settings can all be left as default values. If further modifications are needed, please refer to [More Documentation](https://cloud.tencent.com/document/product/1243/46127#.E6.AD.A5.E9.AA.A43.EF.BC.9A.E9.85.8D.E7.BD.AE.E7.89.88.E6.9C.AC).

![](https://main.qcloudimg.com/raw/4991ff020264e0f6ad9f990fe9897880.png)

### Step 4: Start Deployment

In the new version window, after filling in the version configuration information, click on [Start Deployment].

The initial version is set to 'Creating'. The status changes to 'Normal' when the deployment is successful.

At this time, the traffic is 0% and cannot accept requests. If you click on 'Access Service', an error will be displayed.

![](https://main.qcloudimg.com/raw/73914fd4b0e1216652d421f3e073c565.png)

Click on [Traffic Configuration]. Configure traffic 100% for version 'helloworld-001'.

Click [Finish].

![](https://main.qcloudimg.com/raw/bcc46bc970c5eeecbadf5ca006d7ab6d.png)

After success, you can see that the traffic becomes 100%.

![](https://main.qcloudimg.com/raw/dd62fe608c1afd19bf9b7e5a696a5ebf.png)

### Step 5: Complete the deployment

Click 'Access Service' to see the service running effect as the traffic has been configured to 100% and the service has started processing requests.

![](https://main.qcloudimg.com/raw/60119b59be875421760bc593fdbe5b24.png)

## Help and Support

[Cloud Hosting Product Documentation](https://cloud.tencent.com/document/product/1243)

Tencent Cloud Cloud Development Technology Exchange QQ Group: 601134960

Tencent Cloud Cloud Development WeChat Official Account: Tencent Cloud Cloud Development