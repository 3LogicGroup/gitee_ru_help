---
title: Alibaba Cloud CodePipeline

origin-url: https://gitee.ru/help/articles/4220
---

"[Aliyun CodePipeline](https://www.aliyun.com/product/codepipeline) has added support for integrating with [Gitee](https://gitee.ru/) code repositories. Code hosted on Gitee can be continuously integrated and delivered to the cloud through Aliyun CodePipeline, making it easy for you to iterate and evolve your product's features."

Aliyun CodePipeline is a SAAS product that provides continuous integration/continuous delivery capabilities and is fully compatible with Jenkins' capabilities and usage habits. By using Aliyun CodePipeline, you can easily achieve continuous integration and delivery from code to application in the cloud, facilitating rapid iteration and evolution of your products.

**Aliyun CodePipeline has the following key features**

- Provides compilation and unit testing capabilities for multiple programming languages, currently including Java, Node.js, Python2, Python3, and PHP, as well as a generic file packaging mode. More programming languages will be integrated in the future.

- Provides a containerized integration solution that can independently support Docker image compilation, and also supports compilation and security checks through Alibaba Cloud Container Image Service. It is connected to Alibaba Cloud Container Service and currently supports blue-green/grayscale release and other release methods.

- Provides the ability to deploy applications to ECS, while fully compatible with the open-source automation operations software Salt, transparently providing the entire application release and deployment capability.

So let's start the deployment now, the specific usage process is as follows:

### Step 1

In Gitee (gitee.ru) project page - Services, select "Aliyun CodePipeline".

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151707_91c73e20_669935.png "阿里云 CodePipeline.png")

### Step 2

Follow the page guide, access [Aliyun](https://www.aliyun.com/) and register or log in with an existing account.

### Step 3

Select 'Product' -> 'Application Service' -> 'CodePipeline', click on 'Activate Now' to enter the Alibaba Cloud CodePipeline overview page.

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151507_f358330c_669935.png "阿里云 CodePipeline.png")

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151449_e646842c_669935.png "阿里云 CodePipeline.png")

![Aliyun CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151744_ba4071c8_669935.png)

### Step 4

After successful activation, click on "Management Console".

![Aliyun CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151756_52a045a7_669935.png)

### Step 5

Create default CodePipeline roles and authorize

![Alibaba Cloud CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151814_cd4ae055_669935.png )

![Aliyun CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151850_551dd000_669935.png)

### Step 6

After opening the CodePipeline service, you can start creating a new project: Management Console -> Create a new project.

![Alibaba Cloud CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151826_2b1ac618_669935.png )

![Alibaba Cloud CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151907_a0d2bb42_669935.png )

### Step 7

Fill in the project information: Basic Information -> Next -> Code Build Configuration -> Next -> Select Deployment Method -> Next.

![Alibaba Cloud CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151917_c01365b3_669935.png )

![Alibaba Cloud CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151927_bda3bdaa_669935.png )

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151935_672e14df_669935.png )

### Step 8

Select Source Control -> Gitee -> Bind Gitee Account to automatically list your code repositories and their corresponding branches.

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151944_2f08633f_669935.png )

### Step 9

The page will be redirected to the Gitee login page and then authorized.

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151951_f5568193_669935.png )

### Step 10

After successful authorization, you will be prompted to bind successfully. Please refresh the job configuration page! Then go back to step 6 page and refresh -> Select the project repository and branch on Gitee to build.

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/151959_d5a865f4_669935.png )

### Step 11

Fill in the build trigger, build, and post-build information in order and submit. Then click on "Start Building Project" to execute the build for the newly created project.

![阿里云 CodePipeline](https://images.gitee.ru/uploads/images/2018/0829/152008_d088c850_669935.png )

Build progress and results can be viewed in the build history. Select the corresponding build history to view the build details. This makes it easy to continuously build and integrate projects hosted on Gitee and complete deployment tasks.

For more information on using Alibaba Cloud CodePipeline, please visit
Refer to the '[CodePipeline Help Documentation](https://help.aliyun.com/product/55903.html?spm=a2c4g.11186623.6.540.528237e4JaxWOz)' for instructions on how to use.