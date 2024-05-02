---
title: Как использовать функцию CodeOwners
authors:
  - name: Gitee_Community
    url: https://gitee.ru/gitee_gitee
origin-url: https://gitee.ru/help/articles/4379
---

Для запросов на слияние, поданных во время ежедневной итерационной доставки, определенные члены команды назначаются для проверки кода, когда изменения кода затрагивают файл или каталог A. В большинстве случаев для проверки кода назначается фиксированный персонал B. Мы можем назвать B владельцем кода компонента A. Проще говоря, функция CodeOwner используется для определения ответственных за определенные файлы или каталоги в репозитории.

Чтобы использовать функцию CodeOwner, вам нужно создать файл с именем 'CODEOWNERS' в указанном месте репозитория. Они применяются только к текущей ветке. Указанное местоположение:

- В корневом каталоге репозитория
В каталоге `.gitee/`
- В каталоге `docs/`

 Пример файла **CODEOWNERS**

```text
# Code Owners for a file
filename @username1 @username2

# Code Owners for a directory
# You can also use email addresses if you prefer.
directoryname/ @username1 408815583@qq.com

# Regular expression matching
*.rb @liwen 

# The `docs/*` pattern will match files like
# `docs/getting-started.md` but not further nested files like
# `docs/build-app/troubleshooting.md`.
docs/*  docs@example.com

# In this example, @octocat owns any file in an apps directory
# anywhere in your repository.
apps/ @octocat
```

При совпадении нескольких правил CODEOWNERS в одном файле будет использоваться пользователь из последнего совпавшего шаблона в файле. Например:

```text
README.md @user1

# This line would also match the file README.md
*.md @user2
```

Владельцем кода `README.md` является `@user2`, и каждый путь к файлу может соответствовать только одному правилу `CODEOWNERS`.

 **Экранирование синтаксиса**

- Используйте `\` для экранирования шаблонов, начинающихся с `#`, чтобы они рассматривались как шаблоны, а не как комментарии;
Используйте `[ ]` для определения области действия группы. Группировка используется следующим образом:

```text
[Documentation]
ee/docs/    @docs
docs/       @docs

[Database]
README.md  @database
model/db/   @database

[DOCUMENTATION]
README.md  @docs
```

Вы можете сделать раздел необязательным, чтобы одобрение обзоров кода в этом разделе было необязательным.
Поставьте перед именем владельца кода символ каретки `^`. Например:

```text
^[Documentation]
*.md @ligen @liqin

[Config]
*.yml @liwen @normalcoder 

/app/models @xxx @xxx2
```

Правила назначения CodeOwner

- Указанный Codeowner может быть '@username' или указанным адресом электронной почты.
Если указанный пользователь не существует на платформе или не существует в качестве разработчика или выше в репозитории, соответствующий пользователь не будет назначен, и не будет выдано никакого конкретного запроса о том, почему назначение не было сделано.
- Список назначенных пользователей ограничен членами репозитория, за исключением администраторов предприятия, администраторов и администраторов организации.
- CODEOWNER принадлежит только последнему правилу.
- Назначение CODEOWNER не позволяет никому удалить его, оно будет обновлено с помощью файла CODEOWNERS
Добавить назначение CODEOWNERS: Назначить соответствующий CODEOWNER на связанный PR и добавить журнал назначений (толкатель назначил CODEOWNER XXXX)
- CODEOWNERS Удалить назначение: Обновление связанных PR не удаляет назначение и добавляет журнал назначений (толкатель удалил роль CODEOWNER XXXX).