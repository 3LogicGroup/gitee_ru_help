---
title: Разъяснение прав участников репозитория предприятия
origin-url: https://gitee.ru/help/articles/4159
---

> Участники репозитория предприятия могут относиться к следующим типам:

| Роль участника | Права |
| --- | --- |
| Гость (зарегистрированный пользователь) | Для общедоступных репозиториев: Создать проблему, прокомментировать, клонировать и извлекать репозитории, загружать код в виде Zip-архива, создавать форк репозитория, оздавать форк репозитория и отправлять запрос на слияние, загружать вложенияния
| Докладчик| Наследует разрешения посетителя. Частные репозитории: не имеет права просмотреть код, не имеет права загружать код, не имеет права отправилять, не имеет права создавать форки, не имеет права отправлять запросы на слияние, не имеет права загружать вложения, не имеет права загружать вложения, не имеет права удалять вложения |
| Наблюдатель| Наследует права докладчика для частных репозиториев: создает вики, может клонировать и загружать код, может объединять, не может
| Разработчик | Создавать задачи, комментировать, клонировать и извлекать репозитории, разветвлять репозитории, упаковывать и загружать код, создавать запросы на извлечение, создавать ветви, отправлять ветви, удалять ветви, создавать теги (вехи), создавать вики, может загружать вложения, может удалять собственные загруженные вложения, не имеет права удалять вложения, загруженные другими, |
| Администратор | Создавать задачи, комментировать, клонировать и объединять репозитории, создавать пакеты и загружать код, создавать запросы на слияние, создавать ветки, отправлять ветеи, удалять ветки, создавать теги (этапы),создавать вики, добавлять участников репозитория, принудительно отправлять ветки, редактировать свойства репозитория, может загружать вложения, может удалять загруженные вложения им или другими лицами, не имеет права переносить/очищать/удалять репозиторий |

> В Gitee Go разрешения конвейера данных полностью наследуются от разрешений роли репозитория, а конкретные сведения о разрешениях представлены ниже:

| Роль участника | Права | 
|------ |-----------------------------|
| Докладчик | Наследует права доступа посетителей. Частный репозиторий: Невозможно просмотреть записи и подробные сведения о выполнении конвейера, невозможно просмотреть конфигурации конвейера, невозможно просмотреть хранилища артефактов, невозможно загрузить артефакты, т.е. содержимое, связанное с конвейером, не отображается.
| Наблюдатель | Наследует права докладчика. Частный репозиторий: Может просматривать записи и подробные сведения о выполнении конвейера, может загружать артефакты, может просматривать хранилища артефактов, т.е. все содержимое, связанное с конвейером, видно, но вносить изменения нельзя.
| Разработчик | Наследует права наблюдателя. Может выполнять конвейеры данных, просматривать конфигурации конвейеров данных, обновлять конвейеры и удалять конвейеры. |
| Администратор | Наследует права разработчика. |