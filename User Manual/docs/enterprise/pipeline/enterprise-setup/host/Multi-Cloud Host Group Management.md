---
title: Multi-Cloud Host Group Management
description: Multi-cloud host group management
slug: /enterprise/pipeline/enterprise-setup/host/introduce
keywords:
 - Gitee
 - Host Group
 - Host
 - Management
---

## 1. Host Group

Enterprise administrators can access the Enterprise Edition, go to 'Management' -> 'Feature Settings' -> 'Host Management' page, and set the projects or repositories that need to be associated with the host group.

Note: Associating repositories and project settings allows enterprise (organization) administrators to allocate machines to project teams. Only after associating the host group with the code repository, can it be called in the pipeline.

![Image Description](https://foruda.gitee.ru/images/1660230257898613744/屏幕截图.png )

## 2. Host Types

Add host (currently supports Alibaba Cloud, Huawei Cloud, Tencent Cloud, LAN host, public network host)

## 3. Operation Guide

### 3.1 Create a host group

![Image Description](https://foruda.gitee.ru/images/1660230378058600935/屏幕截图.png )
> Click on 'Create Host Group', select the creation type, and support selecting self-import, import from LAN, import from Alibaba Cloud, import from Tencent Cloud, import from Huawei Cloud.

#### 3.1.1 Alibaba Cloud Host

![Image Description](https://foruda.gitee.ru/images/1660230445097563873/屏幕截图.png )
>Enter basic information such as host group name, host group identifier, credential name, and read credential management data and host information.

![Image Description](https://foruda.gitee.ru/images/1660230651635002910/屏幕截图.png )

>Go to "Credentials Management" and add "Aliyun" type credentials.

![Image Description](https://foruda.gitee.ru/images/1660230475727162812/屏幕截图.png )

Support automatically installing Alibaba Cloud Assistant for the hosts associated with the credentials.

#### 3.1.2 Other Types of Hosts

![Image Description](https://foruda.gitee.ru/images/1660230778144917527/屏幕截图.png )

>Enter basic information such as host group name, host group identifier, project scope, and repository scope.

### 3.2 Add Host

#### 3.2.1 Add Alibaba Cloud type hosts

![Image Description](https://foruda.gitee.ru/images/1660230874051212207/屏幕截图.png )
![Image Description](https://foruda.gitee.ru/images/1660230881500120946/屏幕截图.png )
Support viewing host group information, as well as area, credential name, UUID, host information, etc. On this page, you can continue to [install cloud assistant](link), and reinstall the agent for the newly associated host with the credential.

#### 3.2.2 Add Huawei Cloud, Tencent Cloud, and public hosts

![Image Description](https://foruda.gitee.ru/images/1660230963953771050/屏幕截图.png )
>Click on Add Host to add hosts in this host group

![Image Description](https://foruda.gitee.ru/images/1660230972095617783/屏幕截图.png )
>Support adding hosts one by one through commands and importing files in batches

![Image Description](https://foruda.gitee.ru/images/1660230979591649373/屏幕截图.png )
> Add one by one through commands - open the command line of the host group to be deployed, and execute in a certain directory

![Image Description](https://foruda.gitee.ru/images/1660230986732197447/屏幕截图.png )
>Batch Import Hosts from Files

Support viewing host group information, as well as operating system and host information, this page supports adding more hosts.

- Add Linux hosts one by one using commands or import files in batches
- Windows hosts and Mac OS hosts only support adding them one by one through commands.

#### 3.2.3 Add LAN Host

Add proxy host: A proxy host is defined as a host in the local area network that can be reached by the target host and [https://server-agent.gitee.ru/](https://server-agent.gitee.ru/). It is used to connect the local area network and the public network while ensuring security.
Please add proxy on the proxy host:
![Image Description](https://foruda.gitee.ru/images/1660232643547283805/屏幕截图.png )

>On the LAN host group page, select Add Proxy Host, copy the installation command, log in to the proxy host and execute the command in a certain directory. The proxy process will start in the background. You can use ps -ef | grep 'gitee-proxy' to check if the process is running.

![Image Description](https://foruda.gitee.ru/images/1660232694183070611/屏幕截图.png )

The proxy process will only retrieve the following information about the host:

1) Installation directory of the proxy, used for proxy reconnection
2) Host machine CPU, memory, and hard disk information (not used for analysis)
The proxy code open source repository is as follows (currently the repository is not publicly available):
   [https://gitee.ru/gitee-go/agent-proxy](https://gitee.ru/gitee-go/agent-proxy)
The agent code open source repository is as follows (currently the repository is not publicly available):
   [https://gitee.ru/gitee-go/agent-all](https://gitee.ru/gitee-go/agent-all)

Delete Host Group 3.3

![Image Description](https://foruda.gitee.ru/images/1660234008391860467/屏幕截图.png )
> Delete all contents under the host group, including hosts and tasks, and stop processes on each host

### 3.4 Edit Host Group

#### 3.4.1 Alibaba Cloud host type

![Image Description](https://foruda.gitee.ru/images/1660231077667666874/屏幕截图.png )

Support editing the host group name, credentials cannot be edited.

#### 3.4.2 Other Types of Hosts

![Image Description](https://foruda.gitee.ru/images/1660231090140975724/屏幕截图.png )

>Support editing of host group name, project scope, and repository scope.