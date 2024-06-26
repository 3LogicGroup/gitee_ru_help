---
title: Поддержка вебхуков для Slack
---

Вебхук Gitee поддерживает уведомления о сообщениях через Slack-бота.

## Добавление робота для получения вебхука

1. Чтобы создать приложение Slack для соответствующего рабочего пространства Slack, посетите <https://api.slack.com/apps> и выберите "Создать новое приложение"
2. После создания перейдите в "Функции"-> "Входящие веб-хуки"->"Добавить новый веб-хук в рабочую область" и выберите канал в качестве канала общения для отправки уведомлений. После авторизации группы вы получите адрес вебхука.

![](https://images.gitee.ru/uploads/images/2020/0628/124622_44f9e339_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0628/125434_39135ea1_551147.png )

![](https://images.gitee.ru/uploads/images/2020/0628/125740_e9e93408_551147.png )

## Настройка вебхука робота

На предыдущем шаге добавления вы можете получить URL-адрес запроса вебхука, например `https://hooks.slack.com/services/xxxxxxxx/xxxxxxxx/xxxxxxxx`, добавьте этот URL в Gitee, чтобы завершить настройку вебхука.

На странице репозитория Gitee вы можете добавить новый вебхук, перейдя в меню 'Настройки' -> 'Вебхуки' -> 'Добавить'.

Введите в URL-адрес полученный в предыдущем тексте адрес вебхука, выберите конкретное триггерное событие, активируйте и добавьте, чтобы завершить настройку вебхука.

![](https://images.gitee.ru/uploads/images/2020/0628/124312_c3d91ea1_551147.png "Jietu20200628-124215.png")

## Запуск вебхуков

Запросы вебхуков к Feishu будут запускаться при настройке робота в следующих сценариях.

- - Отправка: Репозиторий загружает код, загружает ветви, удаляет ветви
- Отправка тегов: Создаёт новый тег, удаляет тег
- Проблема: Создание, закрытие, повторное открытие, удаление задач или изменение назначенных задач
- Запрос на извлечение: Создание запроса на извлечение, обновление запроса на извлечение, запрос на объединение запроса на извлечение
- Комментарий: Комментарий к репозиториям, задачам, запросам на извлечение, коммитам

## Соответствующие показания

- [Вебхук Gitee поддерживает групповых чат-ботов DingTalk](/help/articles/4135)
- [Вебхук Gitee поддерживает корпоративный чат WeChat](/help/articles/4296)