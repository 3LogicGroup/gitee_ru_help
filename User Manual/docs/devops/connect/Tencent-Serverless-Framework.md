---
Tencent Cloud ServerlessFramework
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4330
---

[Serverless Framework](https://gitee.ru/serverless-framework/Serverless-Components) is a popular serverless application framework in the industry. Developers can deploy complete serverless application architectures without worrying about underlying resources. Serverless Framework has capabilities such as resource orchestration, auto-scaling, and event-driven, covering the entire lifecycle of coding, debugging, testing, and deployment. It helps developers quickly build serverless applications by linking cloud resources.

Currently, Serverless Framework has partnered with Gitee, and project code hosted on Gitee can be directly deployed and managed through the [Serverless Application Console](https://console.cloud.tencent.com/ssr), enabling rapid cloud deployment and management of traditional web frameworks.

### Advantages

- **Low transformation cost:** Serverless components automatically help users complete the adaptation and transformation of the framework to the cloud. Users only need to focus on the business code, and some frameworks do not even need to modify a single line of code to complete cloud deployment.

- **Application-level Resource Display and Management:** After successful deployment, users can easily view and manage the created cloud resources through the Serverless Application Console without switching multiple pages, achieving centralized management of multiple resources.

- **Continuous build based on code hosting:** Supports continuous build. When the project in the Gitee repository is updated, it can automatically trigger redeployment.

- **Application-level monitoring charts**: Provides application-level monitoring capabilities. Users can not only see the number of calls, errors, and other information for each resource, but also view application-level monitoring metrics, facilitating operations and maintenance.

### Supported Frameworks

- Express
- Koa
- Flask
- Laravel
- Egg.js
- Next.js
- Nuxt.js

### Deployment Tutorials

0. Prerequisite for deployment: the account has opened the **[Serverless Framework](https://console.cloud.tencent.com/sls)** service. Log in to the console, and it will automatically enable it for you. The activation process does not incur any costs.

1. Go to Serverless Application Console (https://console.cloud.tencent.com/ssr), click on 'Create New Application' to go to the application creation page.

2. Fill in your application name, select "Import Existing Project" as the creation method, and choose the framework template you are using.

> Some framework projects may require simple project modifications before deployment. For details, please refer to the [Project Modification Documentation](https://cloud.tencent.com/document/product/1242/50319)

3. Select code hosting, authorize your Gitee account, and then you can choose the project repositories you want to import in the console.

   ![](https://images.gitee.ru/uploads/images/2020/1225/184304_98ec81d2_551147.png)

   By default, "Auto Trigger" is selected, and the repository project will be automatically triggered for deployment after each update. You can also modify it according to actual usage.

4. Click on [Create], and the Serverless console will automatically start deploying the application for you. After the deployment is completed, go to the application details page to view the created cloud resources, monitoring logs, deployment records, and other information. You can also modify the configuration on the 'Development & Deployment' page and redeploy.

### Manage Applications

After the application is created, you can view the specific information of the project on the application details page, mainly supporting the following management functions.

#### 1. Resource Management

In the [Resource List] page, you can view the cloud resources created for your current application and view basic configuration information.
![](https://images.gitee.ru/uploads/images/2020/1225/184304_da13bfaa_551147.png)

#### 2. Development Deployment

On the top of the application details page, click on [Development & Deployment] to easily modify the configuration and redeploy the application. It supports three methods: local upload, code hosting, and CLI development.

At the same time, you can also modify the application configuration information on this page and click 'Save' to complete the redeployment.
![](https://images.gitee.ru/uploads/images/2020/1225/184304_d3765c4a_551147.png)

#### 3. Application Monitoring

In the "Application Monitoring" page, you can view various monitoring indicators such as basic information, project request count, project error statistics, etc. after the project is deployed, making it easy for you to manage and operate the project.
![](https://images.gitee.ru/uploads/images/2020/1225/184305_c0420a3a_551147.png)

#### 4. Deployment Logs

In the 'Deployment Logs' page, you can see the deployment logs for 'Console Deployment' or 'Auto Trigger', as well as the deployment results.

![](https://images.gitee.ru/uploads/images/2020/1225/184305_9fc268ae_551147.png)

Help and Support

[Serverless Framework Product Documentation](https://www.serverless.com/cn/framework/docs/)

Serverless WeChat Official Account: TencentServerless

![](https://images.gitee.ru/uploads/images/2020/1225/184305_ce3e8dbb_551147.jpeg)