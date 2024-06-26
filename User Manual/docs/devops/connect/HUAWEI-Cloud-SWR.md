---
title: Облако контейнеров Huawei 

origin-url: https://gitee.ru/help/articles/4221
---

"Сервис контейнеров образов облака Huawei (SWR)" (https://www.huaweicloud.com/product/swr.html) теперь поддерживает [Gitee](https://gitee.ru/).

URL-a1b223ddf5

Реестр контейнеров Облака Huawei (SWR) поддерживает управление полным жизненным циклом образов контейнеров - от исходного кода до образов и от образов до приложений. Он предоставляет простые, понятные в использовании и безопасные функции управления образами, помогающие пользователям быстро развертывать контейнерные сервисы. Недавно запущенные функции создания образа и автоматического развертывания еще больше облегчают пользователям создание собственных облачных процессов DevOps.

**SWR (Сервис контейнеров образов Облака Huawei) обладает следующим функционалом:**

Управление образами: Поддерживает управление полным жизненным циклом образов контейнеров, включая загрузку, скачивание, удаление и т.д. Предоставляет общедоступные и частные URL-адреса для загрузки для использования в различных сценариях.

- Интеграция с официальными образами Docker: полная интеграция с официальными образами Docker Hub. Пользователи могут напрямую просматривать образы Docker и выполнять поиск в сервисе образов  контейнеров, а также использовать функцию сбора образов. Пользователи могут собирать официальные образы Docker для удобства поиска и использования.

- Контроль доступа: Обеспечивает возможность изоляции образов, поддерживает назначение различным пользователям соответствующих прав доступа (чтение, редактирование, управление).

- Совместимость с платформенно-ориентированным Docker: поддерживает использование Docker CLI и платформенно-ориентированный Docker Registry версии V2 API для управления образами.

- Создание изображений: Поддерживается интеграция с Gitee, Github, Gitlab и другими сайтами хостинга исходного кода для сборки образов. Сборка образов автоматически запускается при обновлении кода или тегов. Предоставляет поддержку пользователям, размещающим на Gitee собственные аккаунты и связывающим репозитории кода с репозиториями образов с помощью конфигурации. Сервис создания образов контейнеров добавляет крючки в репозиторий кода. Как только будет обнаружено действие отправки кода или создания тега, система автоматически загрузит код, скомпилирует и соберет его на основе указанного dockerfile. Новый сгенерированный образ будет отправлен в указанное пользователем хранилище образов.

- Автоматическое развертывание: предоставляет исходную точку развертывания образа для развертывания контейнерных приложений в один клик. Поддерживается автоматический запуск развертывания, когда в хранилище изображений помещается образ новой версии, соответствующий указанным правилам. Он легко интегрируется с облачным контейнерным сервисом (ACCESS) для управления полным жизненным циклом и визуального мониторинга и эксплуатации кластеров контейнеров. Пользователи могут отслеживать и управлять развернутыми приложениями с помощью облачного контейнерного сервиса (CCE).

Конкретный процесс использования:

### Шаг 1

Выберите 'Облако Контейнеров Huawei' на странице "Сервисы" репозитория Gitee (gitee.ru).

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153110_570f319d_669935.png )

### Шаг 2

Согласно приведенном на странице руководству, посетите Облако Huawei  <https://www.huaweicloud.com/>, зарегистрируйтесь или войдите в существующую учетную запись. Выберите Продукты -> Сервисы приложений -> Сервис контейнерных образов.
Или зайдите непосредственно на <https://www.huaweicloud.com/product/swr.html>, чтобы войти.

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153122_935eba6a_669935.png )

### Шаг 3

Нажмите "Использовать сейчас" для входа на панель управления службой создания образов контейнеров

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153132_1e34a01c_669935.png )

### Шаг 4

Выбрать сборку образа -> Создать задачу на сборку

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153140_18151c9c_669935.png )

### Шаг 5

Выберите Gitee в качестве исходного кода, введите основную информацию и по завершении нажмите "Привязать учетную запись"

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153155_361af3fb_669935.png )

### Шаг 6

Войдите на страницу авторизации Gitee, нажмите кнопку "Авторизоваться" и после успешной привязки закройте текущую новую страницу.

### Шаг 7

Для завершения привязки учетной записи вернитесь на страницу консоли и нажмите кнопку подтверждения.

### Шаг 8

Выберите пользователя в Gitee, репозиторий для создания сервиса изображений и ветку репозитория

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153225_a80bde09_669935.png )

### Шаг 9

Нажмите кнопку "Создать", чтобы перейти к списку задач сборки, затем щелкните соответствующую задачу, чтобы ввести сведения о задаче

### Шаг 10

Нажмите кнопку "Собрать образ" в правом верхнем углу страницы сведений о задаче

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0829/153234_67c74cf0_669935.png )

В случае неудачи сборки причину можно установить в журнале сборки.

Далее вы можете развернуть собранный образ в Облаке Huawei (Модуль контейнеров).