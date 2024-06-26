---
title: Развертывание хоста
description: Развертывание хоста
slug: /enterprise/pipeline/plugin/host-deploy
keywords:
 - Gitee
 - Host
 - Развертывание
---

## Знакомство с формой

- **Группа хостов исполнения**: Вы можете перейти к [Управлению хостом](/), чтобы добавить свою группу хостов.

- **Загрузка выходных файлов или артефактов на хост перед развертыванием (поддерживает несколько конфигураций)**:
- Имя файла развертывания: имя артефакта, загружаемого на хост.
    - **Путь загрузки**: Путь, по которому артефакт загружается на хост-машину.
    - **Источник файла**: Файлы развертывания могут быть получены из сборочных выходов восходящего потока или из общего хранилища артефактов.

- **Сценарий развертывания**: Сценарий, используемый для развертывания на хосте, поддерживает получение переменных окружения с помощью ${parameterKey}.

## Пример использования

1. Форк репозитория кода SpringBoot из репозитория кода примера: [https://gitee.ru/gitee-go/spring-boot](https://gitee.ru/gitee-go/spring-boot), который включает скрипт развертывания deploy.sh: [https://gitee.ru/gitee-go/spring-boot/blob/master/deploy.sh](https://gitee.ru/gitee-go/spring-boot/blob/master/deploy.sh).

2. Установите среду выполнения Java на машине развертывания.

3. Сборка артефактов в конвейере

Чтобы выполнить развертывание, необходимо сначала собрать артефакты. Артефакты в Gitee Pipeline представляют собой сжатые пакеты tar.gz. В задании сборки можно указать один или несколько файлов (папок), которые должны быть включены в артефакт.

В этом примере вам нужно включить в артефакт файлы target/application.jar и deploy.sh. Поэтому необходимо настроить задачу сборки следующим образом:

![Развертывание хоста - конфигурация артефактов](./assets/Host Deployment - Artifact Configuration.png)

4, Конфигурация развертывания хоста

![Конфигурация развертывания хоста](./assets/Host_Deployment_Configuration.png)

Сценарий развертывания:

Поскольку фактический сценарий развертывания был упакован в сжатый пакет результатов сборки, сценарий развертывания можно просто распаковать и выполнить.

```shll
mkdir -p /home/admin/application
tar zxvf ~/gitee_go/deploy/output.tgr.gz -C /home/admin/application/
sh /home/admin/application/deploy.sh restart
```