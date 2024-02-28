---
title: Three steps to start a pipeline
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/get-started-in-3-steps

origin-url: 
---

Three steps to quickly play with Gitee Go! Go! Go! Go!

## 1. Free Usage

Enterprise/Community Edition is now fully open!
Currently, by opening Gitee Go Pipeline, each individual code repository can directly obtain 200 minutes of free build time, which is permanently valid!
Enterprise/organization/individual automatically receives 1000 minutes of free build time per month, applicable to all repositories!

![Personal Billing Details](https://images.gitee.ru/uploads/images/2022/0317/191152_e80dfbbd_10531940.png)

## 2. Fork Demo repository as needed

You can experience the convenience brought by the pipeline for the first time by Forking the following Demo repository. You can also skip this step and proceed to the next one.

- One-click deployment of cloud instances for SpringBoot applications built with Maven: [Maven Usage Example](https://gitee.ru/gitee-go/spring-boot-maven-deploy-case)
- Application built with Gradle: [Gradle Usage Example](https://gitee.ru/gitee-go/spring-gradle)
- Build a command-line tool using Golang: [Golang usage example](https://gitee.ru/gitee-go/golang-build-case)
- Build front-end engineering package based on Node.js: [Node.js Usage Example](https://gitee.ru/gitee-go/gitee-go-nodejs-usage-example)
- Java application built with Ant: [Ant Usage Example](https://gitee.ru/gitee-go/gitee-go-ant-example)
- Applications built with Python: [Python Usage Example](https://gitee.ru/gitee-go/gitee-go-python-example)
- Based on Rails testing and compiling examples: [Ruby usage examples](https://gitee.ru/gitee-go/ruby-rails-case)
- Application built using PHP: [PHP usage example](https://gitee.ru/gitee-go/gitee-go-php-demo)
- Web application based on ThinkPHP 6.0, one-click deployment on cloud host: [ThinkPHP Usage Example](https://gitee.ru/gitee-go/thinkphp6-deploy-case)
- One-click deployment of cloud hosts based on LaravelS: [LaravelS Usage Example](https://gitee.ru/gitee-go/laravels-deploy-case)
- Deploy a SpringBoot application based on Gradle build with one click: [Gradle Usage Example](https://gitee.ru/gitee-go/spring-boot-gradle-deploy-case)

Gitee Go Official Organization: [https://gitee.ru/gitee-go](https://gitee.ru/gitee-go). The following related demos, new features of Gitee Go, and help manuals will be updated here in real time, and regular capabilities comparisons and analyses in the CICD field both domestically and internationally will be provided. The open-source work of Gitee Go is also progressing rapidly, so stay tuned~

## 3. One-click enable Gitee Go, default create three pipelines

- **If you are using the Enterprise Edition, select the repository you forked in the second step or other repositories and enter Gitee Go from here.**
![Enterprise Edition Gitee Go entrance](https://images.gitee.ru/uploads/images/2022/0317/191650_3c80ffbe_10531940.png)

- **If you are using the Community Edition, select the repository you forked in the second step or other repositories and enter Gitee Go from here.**
![Community Edition Gitee Go Entry](https://images.gitee.ru/uploads/images/2021/1117/130845_2fa08f4e_5192864.png)

> If you encounter a situation where Gitee Go cannot be activated as shown in the figure below, please check if your account is bound to a mobile phone number. [Check if the mobile phone number is bound >>>](https://gitee.ru/profile/account_information). Due to the underlying mechanism of Gitee Go based on cloud native and other elastic scheduling mechanisms, which can scale massively, in response to the national call, the use of public resources for "mining" is prohibited. Before starting the journey of Gitee Go, your account needs to be bound to a mobile phone number!

Unable to activate

After choosing to enable Gitee Go, if you directly fork the demo repository mentioned above, you do not need to use the template to create it directly. In addition, you can choose to create three pipelines based on the template or customize the pipeline. The recommended pipeline template here is recommended based on the language you selected when creating the repository. It is recommended to use the template first.

![Enable](https://images.gitee.ru/uploads/images/2022/0317/191828_713944c4_10531940.png)

> Creating a pipeline based on a template cannot guarantee a 100% build success rate. It may be related to the specific code in your code repository. If the build fails, you can troubleshoot the issue through the build logs or contact us (QQ Group: 1078759826) for real-time support.

After using templates to create a pipeline, a commit will be generated in your code repository. A `.workflow` folder will be created in the root directory, and the following files will be produced

- **Generate Description File**

![Description File](https://images.gitee.ru/uploads/images/2021/1117/131132_38aa23a6_5192864.png)

- **Pipeline List Page**

![Image Description](https://images.gitee.ru/uploads/images/2022/0411/183956_13c42c65_10531940.png )