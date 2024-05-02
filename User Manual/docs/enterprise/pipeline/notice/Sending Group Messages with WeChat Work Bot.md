---
title: Отправка групповых сообщений с помощью корпоративных роботов WeChat
description: Отправка групповых сообщений с помощью робота WeChat
slug: /enterprise/pipeline/notice/weixin
keywords:
 - Gitee
 - Enterprise WeChat
 - Робот
 - Уведомление
---

Пользователи могут настроить уведомления групп корпоративного робота WeChat в задачах конвейера, чтобы отправлять информацию о выполнении задач конвейера в указанные группы корпоративного WeChat.

## Добавление корпоративного робота группы WeChat

Добавьте группового робота, перейдя в Настройки группы -> Добавить группового робота -> Создать робота.

![Enterprise WeChat](./assets/enterprise-wechat-robot.png)

Вы можете обратиться к следующему документу: [https://open.work.weixin.qq.com/help2/pc/14931?person_id=1&from=homesearch# Отправка сообщений с помощью групповых роботов](https://open.work.weixin.qq.com/help2/pc/14931?person_id=1&from=homesearch# Отправка сообщений с помощью групповых роботов).

Скопируйте URL-адрес вебхука и настройте его в конвейере [Сертификат уведомления Enterprise WeChat](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-通讯).

## Конфигурация задачи конвейера "Групповое уведомление DingTalk"

1. В узле задачи конвейера выберите добавить групповое уведомление DingTalk.

2. Добавьте рабочие учетные данные WeChat, обратитесь к управлению учетными данными [WeChat Webhook](/enterprise/pipeline/enterprise-setup/certificate/introduce#im-communication)

![Добавить рабочие учетные данные WeChat](./assets/add-wechat-work-credentials.png)

3. Выберите события уведомления, когда задача этого конвейера переходит в состояние выбора, она будет запускать уведомления о сообщениях.

4. Выберите содержание уведомления, выбранное содержание уведомления будет автоматически добавлено в push-сообщение.

5. Поддержка заполнения пользовательского контента, поддержка ссылок на переменные окружения, такие как ${GITEE_PIPELINE_NAME}, поддержка синтаксиса WeChat [Markdown](https://developer.work.weixin.qq.com/document/path/91770#markdown type).

6. Введите user_id (Enterprise WeChat user_id) участника, который будет @, или введите все.

Получить идентификатор пользователя через Администратор Enterprise WeChat -> Адресная книга

![Идентификатор пользователя Enterprise WeChat](./assets/Enterprise-WeChat-User-ID.png)

## Триггерный запуск конвейера

Триггер выполнения конвейера. Когда задача конвейера переходит в состояние выполнения, настроенное в плагине уведомлений, запускается уведомление о сообщении.

![Пример сообщения-уведомления Enterprise WeChat](./assets/Enterprise-WeChat-notification-message-example.png)