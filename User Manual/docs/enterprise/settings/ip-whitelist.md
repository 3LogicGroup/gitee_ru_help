---
title: Настройка белого списка IP-адресов
authors:
  - name: Zoker
    url: https://gitee.ru/kesin
origin-url: https://gitee.ru/help/articles/4274
---

В версии Gitee Enterprise доступна функция белого списка IP-адресов, которая чаще всего используется предприятиями для установки ограничения доступа к репозиториям кода.

> Если ранее вы могли получить код из репозитория, а тепеь не можете, это может быть вызвано тем, что предприятие, которому принадлежит этот репозиторий, включило функцию белого списка IP-адресов, и теперь IP-адрес, с которого запрашивается код, в этот список не входит. Обратитесь к администратору, чтобы добавить его в список.

Как показано на изобраении ниже:

![Описание изображения](https://images.gitee.ru/uploads/images/2019/1018/142040_69712d2a_669935.png )

#### Использование

1. Войдите в рабочее пространство предприятия -> Управление -> Настроки безопасности

2. Добавьте IP-адрес в список разрешенных к доступу к репозиторию Git

3. Включите параметр безопасности: Отправка и получение кода будут разрешены только в пределах довереннго диапазона.