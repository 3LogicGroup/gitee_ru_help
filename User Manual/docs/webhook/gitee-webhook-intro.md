---
title: Знакомство с вебхуками

origin-url: https://gitee.ru/help/articles/4183
---

## Знакомство с вебхуками

Функция вебхуков Gitee помогает автоматически вызывать указанный HTTP-адрес после того, как пользователь отправляет код.

> Это стандартное решение, и пользователи могут написать свои собственные сценарии на основе различных потребностей (например, отправка электронных писем, автоматическое развертывание и т. д.).

#### Сравнение вебхуков компании и вебхуков репозитория

- Вебхуки компании действительны для всех репозиториев в компании для отправки, запросов на слияние и задач.
- Вебхуки для репозиториев работают только для отправки, запросов на слияние и задач, связанных с репозиторием.

## Структуры данных и типы

Относительно описания структуры данных и типа вебхука обратитесь к следующим документам:

- [Описание формата данных для отправки вебхука](/enterprise/code-manage/integration-ecosystem/webhook/webhook-push-data-format-description)
- [Проверка ключа вебхука и алгоритм проверки](/enterprise/code-manage/integration-and-ecology/WebHook/WebHook Key Verification and Verification Algorithm)
- [Описание типов данных для отправки вебхука](/enterprise/code-manage/integration-and-ecology/WebHook/WebHook%20Push%20Data%20Type%20Description)

## Поддержка сторонних мессенджеров

Для удобства пользователей для получеения уведомлений Gitee в сторонних мессенджерах мы поддерживаем следующие сторонние приложения через вебхуки:

- Робот DingTalk: Установите URL вебхука на адрес робота группового чата DingTalk.
- Связанная документация: [Поддержка вебхука для DingTalk](/enterprise/code-manage/integration-and-ecosystem/webhook/webhook-dingtalk-support)
- Робот Enterprise WeChat: Установите URL вебхука на адрес робота Enterprise WeChat.
  - Связанная документация: [Вебхук добавляет поддержку для WeChat Work](/enterprise/code-manage/integration-and-ecosystem/webhook/webhook-support-for-wechat-work)
- Робот Feishu: Установите URL вебхука на адрес робота группового чата Feishu.
  - Связанная документация: [Вебхук добавляет поддержку для Feishu](/enterprise/code-manage/integration-ecosystem/WebHook/WebHook%20support-for-feishu-robot)
- Робот Slack: Установите URL вебхука на адрес робота Slack.
- Cвязанная документация: [Вебхук добавляет поддержку для Slack](/enterprise/code-manage/integration-and-ecology/webhook/webhook-for-slack)