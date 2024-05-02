# Общее руководство по Kubernetes

## 1. Статус обслуживания узла

```sh
Node eviction
kubectl drain NODE --ignore-daemonsets
Restore scheduling
kubectl uncordon NODE
```

[Безопасное удаление узла | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/safely-drain-node/)



## 2. Замена сертификата кластера по истечении срока действия

Обновление просроченных сертификатов для Kubernetes

[Управление сертификатами при помощи kubeadm | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/kubeadm/kubeadm-certs/)

Замена сертификата кластера по истечении срока действия (yuque.com)





## 3. Настройка домена-заглушки и вышестоящего DNS-сервера с помощью CoreDNS

[Пользовательская настройка службы DNS | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/dns-custom-nameservers/)





## 4. Change default StorageClass

[Change Default StorageClass | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/change-default-storage-class/)





## 5. Объединение изображений из частных репозиториев

[Объединение изображений из частных репозиториев | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/pull-image-private-registry/)





## 6. Инициализация модуля конфигурации

Инициализация модуля конфигурации | Kubernetes

[Инициализация модуля конфигурации | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/static-pod/)





## 7. Ежедневное устранение неполадок

[Troubleshooting Common Errors (yuque.com)](https://www.yuque.com/cuiliang0302/kubernetes/mrdyeu)

[Kubernetes Troubleshooting Guide (yuque.com)](https://www.yuque.com/imroc/kubernetes-troubleshooting)

"kubernetes node maintenance process | miscellaneous rice (zahui.fan)"

[K8s production environment common problem handling and Q&A (serial, irregular update)_error: failed to create deployment: namespaces "de-CSDN blog](https://blog.csdn.net/MyySophia/article/details/131679994)





## 7. Резервное копирование и восстановление кластера Etcd в среде Kubernetes

Практика: Резервное копирование и восстановление кластера Etcd в среде Kubernetes - Сообщество разработчиков Tencent Cloud - Tencent Cloud (tencent.com)




## Справочные материалы Gitee

"[‌‍‍﻿‬﻿‌⁡﻿⁡⁣⁢‍⁡⁡⁡‍⁢⁢‌﻿⁢‍⁢⁢‬‬‬‬‍⁡﻿⁢‌⁣﻿‬⁡⁣⁣⁢Gitee Public Cloud Component List - Feishu Cloud Docs (feishu.cn)](https://oschina-sz.feishu.cn/wiki/wikcnSCfAZJYob8N33THzvIJsRe)"

[Code - Gitee Standard Documents - Open Source China](https://e.gitee.com/oschina/repos/oschina/std/sources)

[ccad: Gitee Architecture Design](https://gitee.com/oscstudio/ccad#/oscstudio/ccad/blob/master/docs/2020/rime.md)

gitee-russia-dev: Russian Sass Development Environment Deployment Document

"[Russia-gitee: Russian Gitee Deployment Implementation Document](https://gitee.com/oschina/russia-gitee)"

[Open Source China/ci-devops (gitee.com)](https://gitee.com/oschina/ci-dev-ops)



Можно видеть, что монтаж постоянного тома выполняется `/volumes/csi/csi-vol-4f7108ef-5d3e-4763-b429-f2437c2db4c2/81a009f7-8e8c-471a-ae4c-4caf1b898e6d` в CephFS instance myfs.



## Справочное руководство



https://gitee.com/autom-studio/std/tree/master/ Архитектура развертывания / распределение сервисов

[Описание Архитектуры Платформы Gitee | Gitee SRE Wiki (autom.studio)](https://wiki.autom.studio/zh/Gitee/生产环境/Specifications/gitee平台架构说明)

[开源中国/atompi-gitee - 码云 - 开源中国](https://gitee.com/oschina/atompi-gitee/tree/master)

[Deployment architecture/service distribution.md · Open Source China/atompi-gitee - Gitee - Open Source China](https://gitee.com/oschina/atompi-gitee/blob/master/-deployment architecture/service distribution.md#https://gitee.com/autom-studio/std/tree/master/-deployment architecture/service distribution)

[Изменение политики удаления постоянного тома | Kubernetes](https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/change-pv-reclaim-policy/)