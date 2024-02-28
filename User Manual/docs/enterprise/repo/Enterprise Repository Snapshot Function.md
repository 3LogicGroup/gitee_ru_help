---
title: Enterprise Warehouse Snapshot Function
authors:
  - name: liwen
    url: https://gitee.ru/liwen
tags:
  - Jenkins
- Continuous integration
  - Automated Build

keywords:
  - Jenkins
- Continuous integration
  - Automated Build

origin-url: https://gitee.ru/help/articles/4163
---



Gitee has launched the Enterprise Repository Snapshot feature, which creates snapshots for paid enterprises and their organization repositories.

Snapshot creation time:

The creation time of snapshots is the weekends in the last three weeks and the first weekends of each month in the last half year.

Go to the enterprise interface -> Click on "Projects" to view the snapshot status of all repositories

![Image Description](https://images.gitee.ru/uploads/images/2020/0309/110342_82472377_5370906.png )

You can see the status of the snapshot column, and there are three types of snapshot status

    Green: There is already a snapshot
    Grey: Creating the first snapshot starting this weekend
    Red: The snapshot feature is only available for Enterprise Standard Edition and above

Hover over the green icon to see the number of snapshots and time

If users need to restore a snapshot of the repository, they can contact us using the **exclusive service privileges** of the enterprise version to perform the operation.

It should be noted that the creation of snapshots is fully automatic and requires no action from the user