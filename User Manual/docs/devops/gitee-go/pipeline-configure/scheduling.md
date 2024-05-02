---
title: Оркестровка задач
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/scheduling
description: Что такое Gitee Go
origin-url: 
---

### Настройки этапа

Этап - это вторичный элемент в конвейере и обычно представляет собой набор подобных задач, таких как этап "сканирования кода", который может включать три задачи: "сканирование стиля кода", "сканирование безопасности кода" и "сканирование дефектов кода". Конвейер может содержать несколько этапов, которые выполняются последовательно. Основные элементы этапа следующие:

Название этапа: Название этапа, которое может повторяться в рамках одного конвейера.
- Идентификация этапа: Уникальный идентификатор для этапа, который не может повторяться в рамках одного конвейера.
- Метод триггера:
- Автозапуск: После успешного завершения сборки предыдущего этапа, автоматически запускается следующий этап. Если предыдущий этап завершается с ошибкой, автоматический запуск следующего этапа не происходит.
- Ручной запуск: После успешного завершения сборки предыдущего этапа следующий этап не запускается автоматически и требует ручного запуска.
- Стратегия обработки ошибок
- **Быстрый сбой**: это в основном применимо в сценариях, где выполняются параллельные задачи, как показано на схеме ниже. На этапе сборки существуют три параллельные цепочки задач, и когда начинается этап компиляции, все три цепочки задач начнут выполнение одновременно. Если Шаг 1-1 завершится неудачно, даже если Шаг 2-1 и Шаг 3-1 завершатся успешно, последующие задачи не будут запущены. Другими словами, когда выбран «Быстрый сбой», параллельные цепочки задач могут влиять на статус выполнения друг друга.
![Быстрый сбой и естественный сбой](https://images.gitee.ru/uploads/images/2021/1117/174914_1850cfff_5192864.png)
- **Естественный сбой**: в отличие от быстрого сбоя, при выборе «Естественный сбой» параллельные цепочки задач не влияют друг на друга. Даже если Шаг 1-1 завершится неудачей, это повлияет только на то, что Шаг 1-2 и Шаг 1-3 не смогут продолжать выполнение, в то время как цепочки Шаг 2 и Шаг 3 будут по-прежнему выполняться нормально, пока все цепочки не будут завершены.

 **Пример использования**:
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
![Новый этап](https://images.gitee.ru/uploads/images/2021/1117/175149_76c0a4c2_5192864.png )
![Редактировать этап](https://images.gitee.ru/uploads/images/2021/1117/175154_2dfa1dd2_5192864.png )

 **Вы можете посмотреть в Yml:**

```yaml
# Configuration Stage, mandatory fields. Multiple stages can be configured to execute sequentially according to the configuration order.
stages:
  - stage:        
    # Stage identifier, supports numbers, lowercase letters, hyphens, underscores, unique within the current pipeline
    name: compile
    # Stage name, supports Chinese, numbers, letters, common symbols, etc., up to 128 characters
Compile
    # Stage triggering strategy, naturally means natural failure, fast means fast failure
    strategy: naturally     
    # Stage triggering method, auto means automatic triggering, manual means manual triggering
    trigger: auto
```

### Настройки задачи

Задача — это элемент третьего уровня конвейера, который является подэлементом этапа и наименьшей единицей выполнения. На этапе задачи могут быть определены для выполнения в последовательном или параллельном порядке. По умолчанию задачи выполняются автоматически и не поддерживают выполнение вручную. Задача соответствует плагину, а задача является контейнером выполнения плагина. Исходя из этого, общая модель конвейера выглядит следующим образом: **Один конвейер соответствует нескольким этапам, один этап соответствует нескольким задачам и одна задача соответствует одному плагину**.

Задача содержит следующую основную информацию:

- Имя задачи: название задачи, которая может повторяться в рамках одного и того же этапа.
- Идентификатор задачи: уникальный идентификатор задачи, не может быть дублирован в пределах одного этапа.

 **Пример использования**:
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
Создать новую задачу
Настроить задачу
![Создать последовательные и параллельные задачи](https://images.gitee.ru/uploads/images/2021/1117/175347_8a345538_5192864.png )

 **Вы можете посмотреть в Yml:**

```yaml
# Configure tasks, required fields. Multiple tasks can be configured, and serial and parallel can be defined.
steps:
# Plugin identifier for the current task, you can find the corresponding plugin by clicking here >>>
  - step: build@maven 
# Task identifier, supports numbers, lowercase letters, hyphens, underscores, unique within the current stage
    name: build_maven_1
# Task name, supports Chinese, numbers, letters, common symbols, etc., with a maximum of 128 characters.
displayName: Maven Build -1
  - step: build@maven
    name: build_maven_2
    displayName: Maven Build -2
# Dependency configuration, which means that Maven Build -2 task is executed in series with Maven Build -1 task, each task has both outdegree and indegree
    dependsOn: build_maven_1
  - step: build@maven
    name: build_maven_3
    displayName: Maven Build -3
```