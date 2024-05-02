---
title: Выполнение сценария Shell
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/shell
origin-url: 
---

> Выполнить на основе пользовательского сценария в группе хостов и указать соответствующие параметры в сценарии. [Обратитесь к разделу параметров конвейера](https://gitee.ru/help/articles/4358#article-header9)

- Визуальная конфигурация
![Выполнение сценария Shell](https://images.gitee.ru/uploads/images/2021/1223/113926_54889e84_5192864.png)
- yml

```yaml
- step: shell@agent
  name: execute_shell
  displayName: Execute Shell Script
  # Target Host Group
  hostGroupID: gitee-go
  script: 
    |
    cd ~/gitee_go/deploy
    tar -zxvf output.tar.gz
    ls
    echo 'Hello Gitee!'
```