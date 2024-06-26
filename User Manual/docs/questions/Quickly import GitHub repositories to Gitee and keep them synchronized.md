---
title: Быстрый импорт репозиториев из GitHub в Gitee и синхронизация обновлений
origin-url: https://gitee.ru/help/articles/4284
---

### 1. Импорт репозитория

Войдите в учетную запись Gitee, нажмите на кнопку "+" в правом верхнем углу, нажмите на "Импортировать репозиторий из GitHub" и авторизируйтесь через Gitee на странице, куда вы будете перенаправлены.

![Описание изображения](https://images.gitee.ru/uploads/images/2020/1228/112528_a7793116_7722649.png )

Интеграция с GitHub.

![Описание изображения](https://images.gitee.ru/uploads/images/2019/1219/181219_db79b8bd_669935.png )

Выборочно импортируйте ваши проекты из GitHub в Gitee

![Описание изображения](https://images.gitee.ru/uploads/images/2019/1219/181957_1fb4eeac_669935.png )

- Если это репозиторий с открытым исходным кодом, просто нажмите "Создать" и по завершении импорта вы будете перенаправлены на страницу репозитория в Gitee (скорость импорта может зависеть от размера репозитория и скорости интернет-соединения).

- Если это частный репозиторий, вам нужно войти в учетную запись GitHub с правами на управление репозиторием и разерешить выполнение действия. Результат буде таким же, как описано выше.

Синхронизация обновлений между Gitee и GitHub

#### Способ №1 (рекомендуемый): для репозиториев с небольшим количеством веток

Если это локальный репозиторий, достаточно добавить через командную строку удаленные репозитории для Gitee и GitHub с разными названиями.

`git remote add remote_name remote_address`

![Описание изображения](https://images.gitee.ru/uploads/images/2019/1219/182224_d5066b4d_669935.png )

Вот подробное описание шагов:

1. Во-первых, выполните команду 'git remote -v', чтобы просмотреть список удаленных репозиториев, которые вы хотите синхронизировать. Если в списке нет удаленного репозитрия Gitee, необходимо добавить новый адрес.

```bash
git remote add remote_repo_name remote_repo_url
# eg: git remote add gitee git@github.com:xxx/xxx.git
```

Если вы столкнулись с ошибкой "Не удалось удалить раздел настроек" в процессе добавления

2. Скопируйте последнюю версию кода из GitHub на вашу локальную машину

```bash
git pull repository_name branch_name
# eg：git pull origin master
```

3. Отправьте в Gitee последнюю обновлённую версию кода с локальной машины

```bash
git push remote_repo_name branch_name
# eg：git push gitee master
```

В случае выявления каких-либо различий, необходимо устранить их вручную

#### Способ №2 (рекомендуемый): сравнение репозиториев с большим количеством веток 

1. Склонируйте репозиторий GitHub на локальную машину, используя следующую команду

```bash
git clone git@github.com:xxx/xxx.git
# Enter the repository directory
cd xxx
```

2. Одновременно скопируйте все ветки репозитория, используя команду:

`$ for b in`git branch -r | grep -v -- '->'`; do git branch --track ${b##origin/} $b; done`

Описание команды:

- | Представляет канал, это означает, что вывод предыдущей команды - это ввод следующей команды.
- for xxx in xxxs; do xxx; это - оболочка оператора цикла.
- Обратные кавычки указывают, что их содержимое - это команда.
- git branch -r выводит список удаленных веток.
- grep -v – ‘->’, команда grep выполняет поиск строк, не содержащих '->'.
- git branch -r | grep -v – '->', что вместе означает просмотр удаленных веток за исключением содержащих '->'.
- $b представляет имя удаленной ветки, например, origin/dev.
- ${b##origin/} означает извлечение содержимого после `origin/` в имени удаленной ветки, например, dev, и использование извлеченного кода в качестве локальной ветки.
- git branch --track ${b##origin/} $b, аналогично способу 1: git branch dev origin/dev. Параметр --track не является обязательным.

Проверьте все ветки (включая локальные и ветки удаленных репозиториев)

```bash
git branch --all
```

4. Отправьте локальный репозиторий в Gitee

#### Способ №3: Сравнение репозиториев с большим количеством веток

Нажмите кнопку обновления синхронизации на домашней странице репозитория Gitee!

![Описание изображения](https://images.gitee.ru/uploads/images/2019/1219/182244_d97d6aa2_669935.png )

Функция синхронизации начнёт принудительную синхронизацию (новый код перезапишется поверх существующего)

--------------------------

Ссылка на справочную информацию:

Официальный блог Gitee: <https://blog.gitee.ru/2018/06/05/github_to_gitee/>