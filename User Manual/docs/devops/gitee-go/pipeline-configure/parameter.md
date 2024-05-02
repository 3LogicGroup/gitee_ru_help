---
title: Настройки параметров
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/parameter
description: Что такое Gitee Go
origin-url: 
---

Параметры системного уровня

Параметры системного уровня — это встроенные параметры Gitee Go, которые можно сгенерировать путем создания записи сборки и использовать в любой задаче. Они описываются в форме «GITEE_xxx», и на них можно ссылаться, используя «${GITEE_xxx}» или «$GITEE_xxx». Все системные параметры генерируются системой и не могут быть изменены.

| Параметр | Описание |
| --------------------------- | --------------------------------------------- |
| GITEE_PIPELINE_NAME         | Уникальный идентификатор конвейера |
| GITEE_PIPELINE_DISPLAY_NAME | Имя конвейера |
|GITEE_PIPELINE_BUILD_NUMBER| Номер сборки конвейера|
|GITEE_PIPELINE_TRIGGER_USER| Пользователь триггера конвейера|
| GITEE_COMMIT_MESSAGE | Сообщение для отправки, тега или заголовка запроса на слияние |
| GITEE_BRANCH | Ветка под отправку или целевая ветка под запрос на слияние|
| GITEE_COMMIT | Коммит отправки, тега или коммит целевой ветки запроса на слияние |
| GITEE_SOURCE_BRANCH         | Исходная ветка при запуске запроса на слияние |
| GITEE_SOURCE_COMMIT         | Коммит исходной ветки при запуске запроса на слияние |
| GITEE_PULL_ID               | Номер запроса на слияние при запуске               |
| GITEE_REPO                  | Имя репозитория кода                          |
| GITEE_STAGE_NAME | Уникальный идентификатор этапа |
| GITEE_STAGE_DISPLAY_NAME | Название этапа |
|GITEE_STAGE_STRATEGY| Стратегия запуска этапа: ручная или автоматическая.|

 **Пример использования:**
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
![Системные переменные](https://images.gitee.ru/uploads/images/2021/1117/180342_4a9e1f83_5192864.png)

 **Вы можете посмотреть в Yml:**

```yaml
In the Maven build below, you can use it like this
- step: build@maven
  name: build_maven_2
displayName: Maven Build -2
  jdkVersion: 8
  mavenVersion: 3.3.9
  commands:
    - echo ${GITEE_PIPELINE_NAME}
```

### Параметры уровней конвейера

Параметры уровней конвейера — это определяемые пользователем параметры, которые можно использовать на любом этапе или задаче в этом конвейере. Среди них «GITEE_» и «GO_».

 **Пример использования:**
**[Рекомендуется]** Вы можете посмотреть на скриншоте:

![Определить параметры уровней конвейера](https://images.gitee.ru/uploads/images/2021/1117/180500_95690acb_5192864.png )

![Справочные параметры уровней конвейера](https://images.gitee.ru/uploads/images/2021/1118/120125_c6f26f26_5192864.png )

Вы можете посмотреть в Yml:

```yaml
# Optional Fields
variables:
// Key: Supports numbers, letters (including uppercase and lowercase), hyphens, underscores, does not support special characters, maximum of 32 characters, where GITEE_ and GO_ are reserved words by the system
  // Value: Please support numbers, letters, common symbols, Chinese characters, etc., up to 256 characters
  PIPELINE_A: aaa
  
 # After defining it, you can reference it in tasks. For example, it is referenced in Maven build as follows
- step: build@maven
  name: build_maven_2
displayName: Maven Build -2
  jdkVersion: 8
  mavenVersion: 3.3.9
  commands:
    - echo ${PIPELINE_A}
    # Change parameter values
    - echo '${PIPELINE_A}=bbb' >> GITEE_PARAMS
    # Generate a new parameter
    - echo '${PIPELINE_C}=ccc' >> GITEE_PARAMS
```