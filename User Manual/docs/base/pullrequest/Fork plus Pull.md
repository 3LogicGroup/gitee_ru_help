---
title: Модель "Форк + Слияние" (Fork + Pull)
authors:
  - name: No Mo
description: Инструкции по созданию запроса на слияние с использованием модели "Форк + Слияние".
---

Как создать запрос на слияние в режиме "Форк + Слияние"?

Наиболее распространенным и рекомендуемым способом участия в разработке репозитория на Gitee является модель "Форк + Слияние". В модели "Форк + Слияние" участникам репозитория не нужно запрашивать разрешения на коммит у создателя репозитория. Вместо этого они создают форк репозитория в своем собственном хостинге. Что касается коммитов, созданных в форке репозитория, то они могут легко использовать инструмент Запроса на слияние от Gitee, чтобы отправить запрос на слияние сопроводителю оригинального репозитория.

Как создать форк репозитория?

Создать форк репозитория очень просто. Перейдите на страницу репозитория, затем в правом верхнем углу найдите кнопку "Создать форк". После нажатия выберите пространство имен для форка, затем нажмите кнопку "Подтвердить" и дождитесь, пока система завершит операцию клонирования репозитория в фоновом режиме. Операция создания форка завершена, как показано на рисунке:

![Описание изображения](https://images.gitee.ru/uploads/images/2019/0718/171321_ab4dc0b2_58426.png )

## Как отправить запрос на слияние?

Во-первых, для того, чтобы отправка была возможна, ваш репозиторий должен иметь отличия от целевого репозитория, например, такие:

![Описание изображения](https://images.gitee.ru/uploads/images/2019/0718/171023_d20b2b6b_58426.png )

Если различий нет или целевая ветка новее ветки, в которую вы отправили запрос на слияние, вы получите такое сообщение:

![Описание изображения](https://images.gitee.ru/uploads/images/2019/0326/143541_0ed9397d_551147.png)

Затем заполните описание запроса на слияние, нажмите "Отправить запрос на слияние", после чего сможете отправить

![Описание изображения](https://images.gitee.ru/uploads/images/2019/0326/143541_db661571_551147.png)

Управление существующими запросами на слияние

Во-первых, если у вас есть права только наблюдателя или докладчика, ваш доступ к существующему запросу на слияние будет ограничен. Для получения информации о конкретных ограничениях обратитесь к документации платформы Gitee по ролевым разрешениям. Следующая информация относится только к правам администратора. Если вы заметили какие-либо различия, проверьте, есть ли у вас права администратора или вы являетесь создателем запроса на слияние.

## Изменение существующего запроса на слияние

Нажмите кнопку "Редактировать" в правом верхнем углу страницы "Детали запроса на слияние", после чего появится поле редактирования. В поле редактирования внесите необходимые изменения в информацию, затем нажмите "Сохранить" для внесения изменений в запрос на слияние, как показано на рисунке ниже:

![Описание изображения](https://images.gitee.ru/uploads/images/2019/0326/143541_8385228b_551147.png)

Обратите внимание, что на этой странице вы можете назначать для текущего запроса на слияние ответственных лиц и тестировщиков. После каждой операции назначенный персонал будет получть соответствующие уведомления

## Как отправить исправления дефектов для запроса на слияние?

Чтобы устранить дефекты или внести какие-либо изменения в запрос на слияние, нет необходимости в отправке нового запроса на слияние. Просто отправьте изменения в ветку, куда был отправлен запрос на слияние. Наш бэкенд автоматически выполнит обновление этого запроса на слияние с этими коммитами.

## Как обрабатывать запросы на слияние, которые не могут быть автоматически выполнены?

После отправки запроса на слияние, во время обработки этого запроса на слияние, он изменяется с запроса, который может быть выполнен автоматически, на запрос, который не может быть выполнен автоматически.Это абсолютно нормальное явление. В этот момент у нас появляется две возможности. Одна заключается в том, чтобы продолжать объединение с целевым объектом и вручную выявлять и устранять конфликтующие компоненты. Другой вариант - сначала разрешить конфликт, чтобы запрос на слияние перешел в состояние, пригодное для слияния, а затем использовать автоматическое слияние. Как правило, мы официально рекомендуем второй вариант, который заключается в том, чтобы сначала разрешить конфликт, а затем произвести слияние. Конкретная операция выглядит следующим образом:

Во-первых, перейдите в ветку, в которую вы хотите локально отправить запрос на слияние, затем отправте целевую ветку в локальную. В этот момент могут возникнуть конфликты, см. раздел [Как устранять конфликты кода](/help/articles/4194) для устранения конфликтов. После устранения конфликтов, направьте коммиты в ветку, где располагается запрос на слияние. Дождитесь завершения системой обновления запроса на слияние в фоновом режиме, после чего запроса на слияние перейдёт в состояние, пригодное для автоматического слияния.

## Можно ли выполнть откат после случайного выполнения запроса на слияние?

На случай ошибочного выполнения запроса на слияние мы предоставляем функцию отката, генерирующую откат XXX запроса на слияние. Принятие этого запроса на слияние завершит операцию отката. Обратите внимание, что откат по сути представляет собой совершенно противоположный запрос на слияние, поэтому вам в любом случае необходимо выполнить его проверку на целостность. Кроме того, чтобы не нарушить другие запросы на слияние, рекомендуется выполнять операцию отката только в том случае, если запрос на слияние, который нужно откатить, является последней операцией слияния и над ним больше нет коммитов. В противном случае  его необходимо выполнять вручную.