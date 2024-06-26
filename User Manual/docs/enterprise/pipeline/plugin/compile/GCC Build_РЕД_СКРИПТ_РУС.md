---
title: Сборка GCC
description: Сборка GCC
slug: /enterprise/pipeline/plugin/gcc-compile
keywords:
 - Gitee
 - GCC
 - Сборка
---

## Знакомство с формой

- **Версия GCC**: Выберите подходящую версию GCC из выпадающего списка. При выполнении плагин инициализирует окружение GCC на основе выбранной версии.

- **Команда сборки**: Команда сборки - это пользовательская команда для сборки кода. Команда выполняется по корневому пути репозитория кода и поддерживает ${Parameter Key} для получения переменных окружения. Обратите внимание, что добавление `set -e` может управлять автоматическим завершением команд скрипта в случае ошибок.

```shell
# Создать каталог сборки и переключится на него
mkdir build && cd build 
Generate Unix platform makefiles and execute the build
cmake -G 'Unix Makefiles' ../ && make -j
```

- **Артефакты сборки в корзине**:
- **Уникальный идентификатор**: Идентификатор созданного артефакта, на который можно ссылаться в последующих задачах, используя `${Unique Identifier}` для получения артефакта.
    - **Упакованные файлы/каталоги**: Выберите файлы или каталоги, созданные артефактом, их может быть один или несколько (эти упаковочные каталоги сжимаются вместе).
    
- **Кэш сборки**:

> Параметр кэша поддерживает как абсолютные, так и относительные пути, например:

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
 A[GCC Build] -->B[Image Build] -->C[K8S Deployment]
    B --> D[Helm Chart Deployment]
```

### Загрузка и развертывание артефактов (один артефакт)

```mermaid
graph LR
A[GCC Build] --> B[Upload Artifact] --> C[Release] --> D[Host Deployment]
```

### Сборка и развертывание образов (несколько артефактов)

```mermaid
graph LR
 A[GCC Build] -->B[Image Build] -->C[K8S Deployment]
A --> D[Mirror Build] --> F[Helm Chart Deployment]
A --> E[Image Build] --> G[K8S Deployment]
```