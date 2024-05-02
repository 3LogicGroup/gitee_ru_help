---
title: Автоматическая публикация проектов на языке PHP на packagist.org
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4354
---

## Введение

Gitee поддерживает публикацию PHP-проектов в виде пакетов и их автоматическое обновление до packagist.org (популярная платформа управления пакетами PHP) для установки через Composer (менеджер пакетов PHP).

> Предварительные условия:
>
"> - У вас уже имеются учетные записи Gitee и Packagist.org"
> - Проект является актуальным проектом Composer (файл composer.json существует в корневой директории).
>
> **В качестве источника данных для пакетов Composer используется адрес репозитория кода gitee.ru**

## Введение

### Получение токена Packagist API

Для получения токена Packagist API пройдите по ссылке [https://packagist.org/profile/](https://packagist.org/profile/) и нажмите кнопку "Показать токен API".

![](https://images.gitee.ru/uploads/images/2021/1109/200841_49787af7_551147.jpeg "16364480729921.jpg")

### Настройка автоматического обновления вебхука

В репозитории Gitee, в котором необходимо настроить релизы и автоматические обновления, добавьте новый вебхук через "Управление"->"Вебхук" и настройте его следующим образом:

URL: [https://packagist.org/api/update-package?username=YOUR_PACKAGIST_USERNAME&apiToken=API_TOKEN](https://packagist.org/api/update-package?username=YOUR_PACKAGIST_USERNAME&apiToken=API_TOKEN), where: `YOUR_PACKAGIST_USERNAME` needs to be replaced with your username on Packagist.org, `API_TOKEN` is the Packagist API Token obtained in the previous section.
- Пароль: Настроек не требуется
- Выберите события 'Отправка' и 'Отправка тега'.

![](https://images.gitee.ru/uploads/images/2021/1110/135326_1d2c1747_551147.png )

После завершения настройки отправка в репозиторий кода или тегов запустит автоматическое обновление Packagist.org.

## Меры предосторожности

**Чтобы гарантировать корректную загрузку репозиториев в Packagist.org  при получении действий по обновлению, адрес репозитория необходимо изменить на адрес репозитория Gitee в настройках управления пакетами.**

![](https://images.gitee.ru/uploads/images/2021/1111/140218_312edf40_551147.png )