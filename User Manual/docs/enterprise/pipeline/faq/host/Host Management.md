---
title: Управление хостом
description: Управление хостом
slug: /enterprise/pipeline/faq/host
keywords:
 - Gitee
 - Управление хостом
 - Задача
---

## 1. Не удалось восстановить соединение с хостом

### Причина
Переменная окружения JDK не установлена в текущем окружении, поэтому команда java не может быть использована непосредственно в любом пути. Укажите команду java.

### Команда скопирована с веб-страницы
```bash
cd /root/wei/gitee_go_agent && nohup java -jar -Dfile.encoding=UTF-8 agent.jar -s https://server-agent.gitee.ru/gitee_sa_server -t f3caa911-9642-4908-a011-84a52b9973e1 >>run.log 2>&1 &
```

### Измененная команда
```bash
cd /root/wei/gitee_go_agent && nohup /root/wei/gitee_go_agent/jdk4agent/jdk1.8.0_251/bin/java -jar -Dfile.encoding=UTF-8 agent.jar -s https://server-agent.gitee.ru/gitee_sa_server -t a13fe405-439d-4b3b-b356-ec64576d75ad >>run.log 2>&1 &
```

### Точка модификации
Измените `java` на полный путь `/root/wei/gitee_go_agent/jdk4agent/jdk1.8.0_251/bin/java`, больше ничего изменять не нужно!!!

### Описание параметра
- Путь к хосту первой установки пользователя (пользовательский): `/root/wei/`
- Путь к пакету установки агента: `/root/wei/gitee_go_agent`.
- Путь установки Java: `/root/wei/gitee_go_agent/jdk4agent/jdk1.8.0_251/bin/java`.