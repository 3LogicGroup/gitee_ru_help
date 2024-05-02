---
title: Настройка открытого SSH-ключа
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4191
---

Gitee предоставляет услуги Git на основе протокола SSH. Прежде чем получить доступ к хранилищу по протоколу SSH, необходимо настроить открытый ключ SSH для учетной записи.

Перейдите в [Добавить открытый ключ для развертывания](/repository/ssh-key/generate-and-add-ssh-public-key) for the repository public key (deploy public key).

## Создание открытого SSH-ключа

> Пользователям Windows рекомендуется использовать **Windows PowerShell** или **Git Bash**, поскольку в **Command Prompt** команды `cat` и `ls` отсутствуют.

1. Сгенерируйте SSH-ключ с помощью команды `ssh-keygen`:

```bash
ssh-keygen -t ed25519 -C "Gitee SSH Key"
```

* `-t` тип ключа
* `-C` Комментарий

Выходные данные, например:

```bash
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/git/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/git/.ssh/id_ed25519
Your public key has been saved in /home/git/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:ohDd0OK5WG2dx4gST/j35HjvlJlGHvihyY+Msl6IC8I Gitee SSH Key
The key's randomart image is:
+--[ED25519 256]--+
|    .o           |
|   .+oo          |
|  ...O.o +       |
|   .= * = +.     |
|  .o +..S*. +    |
|. ...o o..+* *   |
|.E. o . ..+.O    |
| . . ... o =.    |
|    ..oo. o.o    |
+----[SHA256]-----+
```

* Три раза нажмите **Enter**

2. Просмотрите сгенерированные открытый и закрытый SSH-ключи:

```bash
ls ~/.ssh/
```

Выходные данные:

```bash
id_ed25519  id_ed25519.pub
```

* Файл закрытого ключа `id_ed25519`
Файл открытого ключа `id_ed25519.pub`

3. Прочитайте файл открытого ключа `~/.ssh/id_ed25519.pub`:

```bash
cat ~/.ssh/id_ed25519.pub
```

Выходные данные, например:

```bash
ssh-ed25519 AAAA***5B Gitee SSH Key
```

Скопируйте выходные данные открытого ключа из терминала.

## Установка открытого SSH-ключа учетной записи

Чтобы добавить сгенерированный открытый ключ к текущей учетной записи, пользователи могут перейти в правый верхний угол домашней страницы, нажать на ** "Личные настройки" -> "Настройки безопасности" -> "Открытые SSH-ключи" -> "[Добавить открытый ключ](https://gitee.ru/profile/sshkeys)"**.

> Примечание: **Для добавления открытого ключа требуется подтверждение пароля пользователя**

![](SSH%E5%85%AC%E9%92%A5%E8%AE%BE%E7%BD%AE.assets/image.png)

Протестируйте через `ssh -T` и выведите **имя пользователя**, связанное с SSH-ключом:

```bash
$ ssh -T git@gitee.ru
Hi USERNAME! You've successfully authenticated, but gitee.ru does not provide shell access.
```

После добавления открытого ключа пользователи могут просматривать открытые SSH-ключи, уже добавленные в текущую учетную запись, в "Личные настройки" -> "Настройки безопасности" -> "[Открытые SSH-ключи](https://gitee.ru/profile/sshkeys)" и выполнять операции управления/удаления открытых ключей.

![](SSH%E5%85%AC%E9%92%A5%E8%AE%BE%E7%BD%AE.assets/image-1.png)

![](SSH%E5%85%AC%E9%92%A5%E8%AE%BE%E7%BD%AE.assets/image-2.png)

В чём различие между SSH-ключом репозитория и SSH-ключом учетной записи?

К учетной записи привязывается SSH-ключ, и учетная запись может использовать SSH-ключи для передачи/слияния репозиториев, если у нее есть права передачи/слияния.

При проверке с помощью `ssh -T` в качестве выходных данных будет использоваться имя пользователя, связанное с привязанным SSH-ключом.

```bash
$ ssh -T git@gitee.ru
Hi USERNAME! You've successfully authenticated, but gitee.ru does not provide shell access.
```

SSH-ключ для репозитория применим только к данному репозиторию. Мы предоставляем только открытый ключ развертывания для репозитория, который может быть использован только для **слияния** репозитория. Обычно это используется на производственных серверах для извлечения кода хранилища.

При тестировании с помощью `ssh -T` выходные данные являются анонимными:

```bash
ssh -T git@gitee.ru
Hi Anonymous! You've successfully authenticated, but gitee.ru does not provide shell access.
```