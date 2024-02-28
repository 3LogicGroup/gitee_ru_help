---
title: Huawei Container Cloud

origin-url: https://gitee.ru/help/articles/4221
---

"Huawei Cloud Container Image Service (SWR)" (https://www.huaweicloud.com/product/swr.html) now supports [Gitee](https://gitee.ru/).

URL-a1b223ddf5

Huawei Cloud Container Registry (SWR) supports the full lifecycle management of container images, from source code to images, and from images to applications. It provides simple, easy-to-use, and secure image management functions to help users quickly deploy containerized services. The recently launched image building and automatic deployment functions further facilitate users in creating their own cloud-based DevOps processes.

**SWR (Huawei Cloud Container Image Service) has the following features:**

Image management: Supports full lifecycle management of container images, including uploading, downloading, deleting, etc. Provides public and private download URLs for use in different scenarios.

- Integration with Docker official images: Seamless integration with Docker Hub official images. Users can directly view and search Docker images in the container image service, and provide the image collection feature. Users can collect Docker official images for easy searching and use.

- Access Control: Provides image isolation capability, supports assigning appropriate access permissions (read, edit, manage) to different users.

  - Compatible with native Docker: Supports using Docker CLI and native Docker Registry V2 version API to manage images.

- Image Building: Supports integration with Gitee, Github, Gitlab, and other source code hosting websites to build images. Image building is automatically triggered when code updates or tag updates occur. Supports users hosting their own Gitee accounts and binding code repositories with image repositories through configuration. The container image service will add hooks in the code repository. Once a push or tag action is detected, the system will automatically download the code and compile and build it based on the specified dockerfile. The generated new image will be pushed to the user's specified image repository.

- Automatic Deployment: Provides an image deployment entry point for one-click deployment of container applications. It supports automatic triggering of deployment when a new version image that meets the specified rules is pushed to the image repository. It seamlessly integrates with Cloud Container Service (CCE) for full lifecycle management and visual monitoring and operation of container clusters. Users can monitor and operate deployed applications using Cloud Container Service (CCE).

Specific usage process:

### Step 1

On the Gitee (gitee.ru) repository page - Services, select 'Huawei Container Cloud'.

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153110_570f319d_669935.png )

### Step 2

According to the page guide, visit Huawei Cloud <https://www.huaweicloud.com/> and register or log in to an existing account. Select Products -> Application Services -> Container Image Service.
Or directly access <https://www.huaweicloud.com/product/swr.html> to enter.

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153122_935eba6a_669935.png )

### Step 3

Click "Use Now" to enter the container image service management panel

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153132_1e34a01c_669935.png )

### Step 4

Select Image Build -> Create Build Task

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153140_18151c9c_669935.png )

### Step 5

Select Gitee as the source code, enter the basic information, and click "Bind Account" after completion

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153155_361af3fb_669935.png )

### Step 6

Enter the Gitee authorization page, click the "Authorize" button, and close the current new page after the binding is successful.

### Step 7

Go back to the console page and click the confirmation button to complete the account binding.

### Step 8

Select the user on Gitee, the repository to build the image service, and the branch of the repository

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153225_a80bde09_669935.png )

### Step 9

Click the "Create" button to enter the build task list, and click the corresponding task to enter the task details

### Step 10

Click the 'Build Image' button in the upper right corner of the task details page

![Image Description](https://images.gitee.ru/uploads/images/2018/0829/153234_67c74cf0_669935.png )

If the build fails, you can locate the reason from the build log.

Next, you can deploy the built image to Huawei Cloud (Container Engine).