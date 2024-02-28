---
title: Host Management
description: Host management
slug: /enterprise/pipeline/faq/host
keywords:
 - Gitee
 - Host Management
 - Issue
---

## 1. Host Reconnection Failed

### Reason
JDK environment variable is not set in the current environment, so the java command cannot be used directly in any path. Specify the java command

### Command copied from the webpage
```bash
cd /root/wei/gitee_go_agent && nohup java -jar -Dfile.encoding=UTF-8 agent.jar -s https://server-agent.gitee.ru/gitee_sa_server -t f3caa911-9642-4908-a011-84a52b9973e1 >>run.log 2>&1 &
```

### Modified command
```bash
cd /root/wei/gitee_go_agent && nohup /root/wei/gitee_go_agent/jdk4agent/jdk1.8.0_251/bin/java -jar -Dfile.encoding=UTF-8 agent.jar -s https://server-agent.gitee.ru/gitee_sa_server -t a13fe405-439d-4b3b-b356-ec64576d75ad >>run.log 2>&1 &
```

### Modification Point
Change `java` to the full path `/root/wei/gitee_go_agent/jdk4agent/jdk1.8.0_251/bin/java`, no need to modify anything else!!!

### Parameter Description
- User's first installation host path (custom): `/root/wei/`
- Agent installation package path: `/root/wei/gitee_go_agent`
- Java installation path: `/root/wei/gitee_go_agent/jdk4agent/jdk1.8.0_251/bin/java`