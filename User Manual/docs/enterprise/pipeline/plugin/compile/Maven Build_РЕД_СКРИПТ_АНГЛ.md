---
title: Сборка Maven
description: Сборка Maven
slug: /enterprise/pipeline/plugin/maven-compile
keywords:
 - Gitee
 - Maven
 - Java
 - Сборка
---

## Знакомство с формой

- **Версия JDK**: Выберите соответствующую версию JDK из выпадающего списка. Плагин инициализирует окружение JDK на основе выбранной версии.
  
- **Версия Maven**: Выберите соответствующую версию Maven из выпадающего списка. Во время выполнения плагин инициализирует окружение Maven на основе выбранной версии.
  
- **Команда сборки**: Команда сборки - это пользовательская команда для сборки кода. Команда выполняется по корневому пути репозитория кода и поддерживает ${Parameter Key} для получения переменных окружения. Обратите внимание, что добавление `set -e` может управлять автоматическим завершением команд скрипта в случае ошибок.

```shell
# Function: Packaging
# Parameter Description:
#    -Dmaven.test.skip=true: Skip unit tests
#    -U: Check for dependency updates each time the build is performed, which can avoid the problem of snapshot version dependencies not being updated in the cache, but sacrifices some performance.
#    -e -X: Print debug information, recommended to use this parameter for troubleshooting build issues
#    -B: Runs in batch mode, which can avoid ArrayIndexOutOfBoundsException exceptions when printing logs.
# Use case: Use when packaging a project and do not need to execute unit tests
mvn clean package -Dmaven.test.skip=true -U -e -X -B

# Function: Custom settings configuration
# Use case: If you need to manually specify settings.xml, you can use the following method
# Note: If you don't need to customize the settings configuration and need a private dependency repository, you can add private dependencies in the 'Private Repository' section of this task
# mvn -U clean package -s ./settings.xml
```

- **Артефакты сборки в корзине**:
- **Уникальный идентификатор**: Идентификатор созданного артефакта, на который можно ссылаться в последующих задачах, используя `${Unique Identifier}` для получения артефакта.
    - **Упакованные файлы/каталоги**: Выберите файлы или каталоги, созданные артефактом, их может быть один или несколько (эти упаковочные каталоги сжимаются вместе).

- **Частный репозиторий**:
- **Учетные данные репозитория**: Вы можете управлять удаленными репозиториями зависимостей, добавив учетные данные. Обратитесь к [Конфигурации учетных данных в настройках Maven](/enterprise/pipeline/enterprise-setup/certificate/introduce#others) для добавления учетных данных.
    - **Тип репозитория**: Релизный репозиторий или репозиторий моментальных снимков.

- **Кэш сборки**:

> Параметр кэша поддерживает как абсолютные, так и относительные пути, например:

- /root/.m2
- ~/.m2
- xxx/xxx относительно корневого каталога хранилища кода
- /root/workspace/xxx

> Пояснение правила:

- Так называемый кэш по сути означает хранение модулей, которые неоднократно используются в нашем конвейере, в загруженном S3. Когда конвейер запускается снова, файл кэша загружается и извлекается из S3.
Только после успешной сборки конвейера обновленные файлы кэша будут загружены.
- Срок действия файлов кэша по умолчанию истекает через 30 дней.
- При каждом запуске конвейера срок действия кэша может быть продлен (даже если сборка не удалась)

## Общие комбинации:

### Сборка и развертывание образа (один артефакт)

```mermaid
graph LR
A[Maven Build] --> B[Image Build] --> C[K8S Deployment]
    B --> D[Helm Chart Deployment]
```

### Загрузка и развертывание артефактов (один артефакт)

```mermaid
graph LR
A[Maven Build] -->B[Upload Artifact] -->C[Release] -->D[Host Deployment]
```

### Сборка и развертывание образов (несколько артефактов)

```mermaid
graph LR
A[Maven Build] --> B[Image Build] --> C[K8S Deployment]
A --> D[Mirror Build] --> F[Helm Chart Deployment]
A --> E[Image Build] --> G[K8S Deployment]
```