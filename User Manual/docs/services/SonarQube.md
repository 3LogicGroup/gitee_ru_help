---
title: Sonar quality analysis
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4182
---

Currently, the Gitee platform has built a Sonar code quality analysis platform, which can perform code line count/duplicate rate statistics, code logic defect scanning (such as null pointers), password/key leakage risk scanning, and bad code smell detection. It provides corresponding detailed reports and repair evaluations.

> **Quality analysis is currently only available for Enterprise Edition and recommended projects.**

## Enable code quality check

By accessing the homepage of the open-source project repository, go to the "Services" -> "Code Quality Analysis" menu to enter the code quality inspection feature page.

![](https://images.gitee.ru/uploads/images/2019/1224/202958_7a15aee0_551147.png)

By clicking the 'Start Analysis' button, fill in the directory where the code to be analyzed is located, the corresponding analysis branch, and the analysis language. After submission, the code quality analysis service will be started, and you can wait for the analysis to complete to obtain the code quality analysis report.

![](https://images.gitee.ru/uploads/images/2019/1224/203018_b34cb135_551147.png)

![](https://images.gitee.ru/uploads/images/2019/1224/203035_e1c8e5a4_551147.png)

## View quality check report

After the analysis service is completed, you can directly view the analysis report by accessing the code quality detection service page. By filtering the problem types, problem severities, and problem tags, you can filter the analyzed reports.

![](https://images.gitee.ru/uploads/images/2019/1224/203054_be567419_551147.png)