---
title: Поддержка вебхуков для роботов DingTalk
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4135
---

DingTalk предоставляет функцию "Умного ассистента группы" в групповых чатах. С помощью вебхуков вы можете добавить в DingTalk пользовательских роботов для рассылки автоматических уведомлений.

## Добавление робота

В чате группы DingTalk перейдите в 'Настройки группы' -> 'Умный ассистент группы' -> 'Добавить бота' и выберите 'Пользовательский' бот. Установите профильную картинку и имя для бота, нажмите 'Добавить', чтобы получить адрес вебхука, и нажмите 'Завершить', чтобы закончить добавление бота DingTalk.

![](https://images.gitee.ru/uploads/images/2019/1219/194453_7c7ae14c_551147.png )

![](https://images.gitee.ru/uploads/images/2019/1219/194509_8cdbd130_551147.png )

![](https://images.gitee.ru/uploads/images/2019/1219/195953_08539aca_551147.png )

Настройка вебхука для робота

Получите URL-адрес вебхука в процессе добавления робота. URL-адрес будет похож на  'https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxxxxxxxxxxx'. Добавьте этот URL-адрес в Gitee для завершения настройки вебхука.

Перейдите на страницу репозитория на Gitee и выберите "Управление" -> "Настройки вебхуков" -> "Добавить" для добавления нового вебхука.

Заполните поле URL полученным адресом вебхука. Для поля "Пароль/Ключ подписи вебхука" выберите "Ключ подписи" и введите соответствующее содержимое ключа подписи, предоставленное в настройках бота. Для завершения настройки вебхука выберите, активируйте и добавьте конкретные события-триггеры.

![](webhook-for-dingtalk-robot.assets/image.png)

## Настройки безопасности

Боты Dingtalk поддерживают функции 'Пользовательские ключевые слова', 'Подпись' и 'IP-адрес (диапазон)', используемые для усиления безопасности приема запросов бота и предотвращения вредоносных запросов.

### Пользовательские ключевые слова

После установки пользовательских ключевых слов бот будет активироваться только при получении запросов вебхуков, содержащих указанные пользователеи ключевые слова. Можно определить до 10 ключевых слов.

![](https://images.gitee.ru/uploads/images/2019/1219/195006_2a5c79ea_551147.png )

### Контрольная подпись

Установка подписи позволяет обеспечить подпись запроса бота DingTalk для обеспечения более высокой безопасности.

![](https://images.gitee.ru/uploads/images/2019/1219/195809_ac4c9a91_551147.png )

### Белый список IP-адресов 

Установка диапазона IP-адресов позволяет ограничить белый список IP-адресов, с которых могут быть выполнены запросы на активацию бота. Поскольку диапазон IP-адресов запросов услуг Gitee не фиксирован, во избежание проблем с нормальной активацией бота DingTalk не рекомендуется устанавливать белый список IP-адресов (диапазон).

![](https://images.gitee.ru/uploads/images/2019/1219/195750_17d422d1_551147.png )

Активация вебхуков DingTalk

Запросы вебхуков в DingTalk срабатывают при настройке бота в следующих случаях:

- Push: Отправка кода в репозиторий, создание и удаление веток
- Tag Push: Создание и удаление тегов
- Issue: Создание, закрытие, повторное открытие, удаление задач или изменение назначенных исполнителей
- Pull Request: Создание запроса на слияние, обновление запроса на слияние, объединение запроса на слияние
- Comment: Комментарии к репозиториям, задачам, запросам на слияние, коммитам

![Изображение с описанием](https://images.gitee.ru/uploads/images/2019/1009/161438_04ff173d_551147.png)

## Связанные материалы

- [Поддержка Gitee вебхуков для WeChat Work](/help/articles/4296)
- [Поддержка Gitee вебхуков для робота группового чата Feishu](/help/articles/4297)