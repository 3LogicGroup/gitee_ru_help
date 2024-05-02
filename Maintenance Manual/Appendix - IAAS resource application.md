# Применение ресурсов IAAS

## 1. Краткий перечень ресурсов

[‌⁢‌﻿⁣‍⁤﻿‍‬‌‍⁢⁡‌⁣‬‬⁤⁣⁢⁣⁣‌⁣⁣⁡‍⁡‍⁢⁣⁡﻿⁤‬⁤⁤⁣⁡⁡‌Russia product ENV hardware requirement - Feishu Cloud Document (feishu.cn)](https://giteecode.feishu.cn/docx/QYotdG4NLoqDTlx3N1WcTV7vnPb)

### 1.1 Основная информация о пуле ресурсов

| Инфраструктура| Информация об инфраструктуре             | master Количество узлов | worker Количество узлов | master стандарт             | worker стандарт         | Версия kubernetes  | CRI        | CNI    | CSI        | Операционная система    | Примечания |
| ---------------- | --------------------------- | ------------- | ------------- | ----------------------- | ------------------- | --------------- | ---------- | ------ | ---------- | ----------- | ---- |
| Облачная платформа Openstack  | 3\*master<br />10\*computer | 3             | 12            | 8C16G<br />Системный диск：500ГБ | 16C64G Системный диск：200ГБ | v1.26.0         | containerd | cilium | csi-cinder | ubuntu20.04 |      |

## 2. Подробный перечень ресурсов

| Роль узла                | Архитектура| Операционная система        | Стандарт                                                               | IP                             | Примечания                                       |
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
| gitee-kubernetes-node09  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:500G | 10.4.145.57                    | rook-ceph01 кластеризация                            |
| gitee-kubernetes-node10  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:500G | 10.4.145.116                   | rook-ceph02 кластеризация                            |
| gitee-kubernetes-node11  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:500G | 10.4.145.26                    | rook-ceph03 кластеризация                            |
| gitee-kubernetes-node12  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.123                   | узел мониторинга                                    |
| gitee-kubernetes-node13  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.144                   | Перенос кластера redis                          |
| gitee-kubernetes-node14  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.53                    | Перенос кластера redis                          |
| gitee-kubernetes-node15  | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.52                    | Перенос кластера redis                          |
| gitee-git-service1       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.158                   |                                             |
| gitee-git-service2       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.131                   |                                             |
| gitee-git-service3       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.23                    |                                             |
| gitee-git-service4       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：4C<br />Mem：16G<br />System-Disk：500G<br />Data-Disk:500G  | 10.4.145.93                    |                                             |
| gitee-mysql-master       | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G                     | 10.4.145.132                   |                                             |
| gitee-mysql-slave        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G                     | 10.4.145.133                   |                                             |
| gitee-postgresql1        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.105                   | Дополнительная установка redis и nfs для настройки высокой доступности порта. |
| gitee-postgresql2        | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：200G                     | 10.4.145.35                    | Дополнительная установка redis и nfs для настройки высокой доступности порта. |
| gitee-es-kafka1          | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.18                    |                                             |
| gitee-es-kafka2          | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.130                   |                                             |
| gitee-es-kafka3          | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：32C<br />Mem：64G<br />System-Disk：500G<br />Data-Disk:500G | 10.4.145.151                   |                                             |
| gitee-pages              | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：32G<br />System-Disk：200G                     | 10.4.145.62                    | Не доставлен, временно не используется, планируется дальнейшее использование                  |
| gitee-minio1             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.159                   |                                             |
| gitee-minio2             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.145                   |                                             |
| gitee-minio3             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.122                   |                                             |
| gitee-minio4             | Amd64/X86 | Ubuntu 20.04 LTS | VCPU：16C<br />Mem：64G<br />System-Disk：200G<br />Data-Disk:200G | 10.4.145.97                    |                                             |
