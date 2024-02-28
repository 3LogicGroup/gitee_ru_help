# IAAS 资源申请

## 1. 资源汇总清单

[‌⁢‌﻿⁣‍⁤﻿‍‬‌‍⁢⁡‌⁣‬‬⁤⁣⁢⁣⁣‌⁣⁣⁡‍⁡‍⁢⁣⁡﻿⁤‬⁤⁤⁣⁡⁡‌Russia product ENV hardware requirement - 飞书云文档 (feishu.cn)](https://giteecode.feishu.cn/docx/QYotdG4NLoqDTlx3N1WcTV7vnPb)

### 1.1 资源池基本信息

| 基础设施         | 基础设施信息                | master 节点数 | worker 节点数 | master 规格             | worker 规格         | kubernetes 版本 | CRI        | CNI    | CSI        | 操作系统    | 备注 |
| ---------------- | --------------------------- | ------------- | ------------- | ----------------------- | ------------------- | --------------- | ---------- | ------ | ---------- | ----------- | ---- |
| Openstack 云平台 | 3\*master<br />10\*computer | 3             | 12            | 8C16G<br />系统盘：500G | 16C64G 系统盘：200G | v1.26.0         | containerd | cilium | csi-cinder | ubuntu20.04 |      |

## 2. 资源详细清单

| 节点角色                 | 架构      | 操作系统         | 规格                                                               | IP                             | 备注                                        |
| ------------------------ | --------- | ---------------- | ------------------------------------------------------------------ | ------------------------------ | ------------------------------------------- |
| gitee-sre1               | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：500G                     | 10.4.145.135<br />5.101.70.250 | VIP：10.4.145.142                           |
| gitee-sre2               | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G                     | 10.4.145.75 <br />5.101.70.232 | VIP：10.4.145.142                           |
| gitee-edge-cache1        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：100G                     | 10.4.145.111<br />5.101.70.218 |                                             |
| gitee-edge-cache2        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：100G                     | 10.4.145.112<br />5.101.70.209 |                                             |
| gitee-kubernetes-master1 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G                      | 10.4.145.92                    | VIP：10.4.145.100                           |
| gitee-kubernetes-master2 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G                      | 10.4.145.129                   | VIP：10.4.145.100                           |
| gitee-kubernetes-master3 | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：8C<br />Mem：32G<br />System-Disk：200G                      | 10.4.145.169                   | VIP：10.4.145.100                           |
| gitee-kubernetes-node01  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.107                   |                                             |
| gitee-kubernetes-node02  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.32                    |                                             |
| gitee-kubernetes-node03  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.79                    |                                             |
| gitee-kubernetes-node04  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.37                    |                                             |
| gitee-kubernetes-node05  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.168                   |                                             |
| gitee-kubernetes-node06  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.113                   |                                             |
| gitee-kubernetes-node07  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.34                    |                                             |
| gitee-kubernetes-node08  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.25                    |                                             |
| gitee-kubernetes-node09  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:500G | 10.4.145.57                    | rook-ceph01 集群                            |
| gitee-kubernetes-node10  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:500G | 10.4.145.116                   | rook-ceph02 集群                            |
| gitee-kubernetes-node11  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:500G | 10.4.145.26                    | rook-ceph03 集群                            |
| gitee-kubernetes-node12  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.123                   | 监控节点                                    |
| gitee-kubernetes-node13  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.144                   | redis 集群改迁过来                          |
| gitee-kubernetes-node14  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.53                    | redis 集群改迁过来                          |
| gitee-kubernetes-node15  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.52                    | redis 集群改迁过来                          |
| gitee-git-service1       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.158                   |                                             |
| gitee-git-service2       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.131                   |                                             |
| gitee-git-service3       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.23                    |                                             |
| gitee-git-service4       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.93                    |                                             |
| gitee-mysql-master       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G                     | 10.4.145.132                   |                                             |
| gitee-mysql-slave        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G                     | 10.4.145.133                   |                                             |
| gitee-postgresql1        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.105                   | 额外安装 redis 和 nfs，为 harbor 设置高可用 |
| gitee-postgresql2        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.35                    | 额外安装 redis 和 nfs，为 harbor 设置高可用 |
| gitee-es-kafka1          | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.18                    |                                             |
| gitee-es-kafka2          | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.130                   |                                             |
| gitee-es-kafka3          | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.151                   |                                             |
| gitee-pages              | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：32G<br />System-Disk：200G                     | 10.4.145.62                    | 不交付，暂时闲置，后面使用                  |
| gitee-minio1             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.159                   |                                             |
| gitee-minio2             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.145                   |                                             |
| gitee-minio3             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.122                   |                                             |
| gitee-minio4             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.97                    |                                             |
