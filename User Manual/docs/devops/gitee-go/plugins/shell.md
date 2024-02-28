---
title: Shell script execution
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/shell
origin-url: 
---

> Execute based on the custom script in the host group, and reference the relevant parameters in the script. [Refer to the pipeline parameters section](https://gitee.ru/help/articles/4358#article-header9)

- Visual Configuration
![Shell script execution](https://images.gitee.ru/uploads/images/2021/1223/113926_54889e84_5192864.png)
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