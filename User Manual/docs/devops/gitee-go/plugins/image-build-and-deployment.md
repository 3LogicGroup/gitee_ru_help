---
title: Image build and deployment
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/image-build-and-deployment
origin-url: 
---

## 1. Image Build

The default workspace is the current code repository root directory. Specify the Dockerfile to build the image and push it to the remote image repository.

- Visual Configuration
![Image Build](https://images.gitee.ru/uploads/images/2021/1223/161518_fbc81757_5192864.png)

```yml
- step: build@docker
  name: build_docker
displayName: Image build
Docker image repository address, such as hub.docker.com
  repository: 
  # Repository Username
  username:
# Repository password
  password:
# Image Tag, such as tomcat:v1.${GITEE_PIPELINE_BUILD_NUMBER}, supports system parameters or pipeline custom parameters, understand system parameters (https://gitee.ru/help/articles/4358#article-header9)
  tag: tomcat:v1.${GITEE_PIPELINE_BUILD_NUMBER}
# Relative to the path where the code repository is located, such as './Dockerfile'
  dockerfile: ./Dockerfile
# Pull upstream output, can be configured multiple, default ${BUILD_ARTIFACT}. Supports system parameters and direct input of an output address
  artifacts:
    - ${BUILD_ARTIFACT}
    - http://xxxxx.xxxxx/output.tar.gz
  # Do not use caching, docker build will use the --no-cache=true parameter for image construction.
  isCache: false
```

- Parameter Output
After the image is successfully built, it will automatically output a parameter GITEE_DOCKER_IMAGE to the downstream to represent the image address, which can be directly referenced in the downstream.

    ```bash
    docker pull ${GITEE_DOCKER_IMAGE}
    ```

## 2. K8S Deployment

The default workspace is the current codebase root directory, and deployment is performed based on the specified yaml file using the apply mode.

- Visual Configuration
![K8S Deployment](https://images.gitee.ru/uploads/images/2021/1223/172207_4bf97ccc_5192864.png )

```yml
- step: deploy@k8s
  name: deploy_k8s
  displayName: K8S Deployment
The kubectl version is the current version of the kubectl client used in this step. Please choose the version that is compatible with the cluster, the default version is v1.16.4.
  version: v1.16.4
# Certificate identifier, you can click here to learn about credential management (http://https://gitee.ru/help/articles/4377)
  certificate: k8s-test
# Kubernetes cluster namespace, default is 'default'
  namespace: default
# The YAML path is the relative path in the source code to the YAML file or directory that needs to be deployed. For example: 'manifests'
  yaml: ./deployment.yaml
# Applicable to the scenario where 'kubectl apply' may not be able to calculate the diff correctly and update the application when using 'kubectl install' for the initial deployment. The 'replace' mode only supports Kubernetes clusters with certificate import.
  isReplace: false
```

- Tips
The K8S deployment plugin can be used together with the "Image Build" plugin, where the upstream is the "Image Build" task and the downstream is the "K8S deployment" task. The yaml required in the K8S plugin can be written as follows to obtain the image.

    ```yaml
    spec:
      template:
        spec:
          containers:
          - name: gitee-go
            # Parameter for the upstream image build plugin output
            image: ${GITEE_DOCKER_IMAGE}
            ports:
            - containerPort: 80
    ```

## 3, Helm Deployment

The default workspace is the root directory of the current code repository. Deployment is done based on the specified chart file directory and values file directory. The initial deployment uses the 'install' mode, and subsequent deployments use the 'upgrade' mode.

- Visual Configuration
![Helm Deployment](https://images.gitee.ru/uploads/images/2021/1223/172809_294e30fc_5192864.png)

```yml
- step: deploy@helm
  name: deploy_helm
displayName: Helm Chart deployment
  # Helm client version, supports two versions: 2.17.0 and 3.4.0, default value is 3.4.0
  version: 3.4.0
# Certificate identifier, you can click here to learn about credential management (http://https://gitee.ru/help/articles/4377)
  certificate: k8s-test
# Kubernetes cluster namespace, default is 'default'
  namespace: default
# Application name
  appName:
  # Chart file directory, default codebase root directory
  chartPath: ./
# values.yml path, default is ./values.yml. valuesPath is relative to the chart package directory, not the code repository directory
  valuesPath: ./values.yml
```