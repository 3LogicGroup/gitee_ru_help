---
title: Сгенерируйте и добавьте открытый SSH-ключ
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /repository/ssh-key/generate-and-add-ssh-public-key
origin-url: https://gitee.ru/help/articles/4181
---

Gitee предоставляет услуги Git на основе протокола SSH. Прежде чем получить доступ к репозиторию по протоколу SSH, необходимо настроить открытый ключ SSH репозитория.

> Открытый ключ учетной записи, перейдите по ссылке [Установка открытого SSH-ключа учетной записи](/base/account/Set-SSH-Public-Key)

## Генерация открытого SSH-ключа

> Пользователям Windows рекомендуется использовать **Windows PowerShell** или **Git Bash**, так как в **командной строке** нет команд `cat` и `ls`.

1. Сгенерируйте SSH-ключ с помощью команды `ssh-keygen`:

```bash
ssh-keygen -t ed25519 -C "Gitee SSH Key"
```

* `-t` key type
* `-C` Comment

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

* Три раза нажмите **Enter** между ними.

2. Просмотрите сгенерированные открытый и закрытый SSH-ключи:

```bash
ls ~/.ssh/
```

Выходные данные:

```bash
id_ed25519  id_ed25519.pub
```

* Файл закрытого ключа `id_ed25519`.
Файл открытого ключа `id_ed25519.pub`.

3. Прочитайте файл открытого ключа `~/.ssh/id_ed25519.pub`:

```bash
cat ~/.ssh/id_ed25519.pub
```

Выходные данные, например:

```bash
ssh-ed25519 AAAA***5B Gitee SSH Key
```

Скопируйте вывод открытого ключа из терминала.

## Добавить открытый ключ развертывания

Скопируйте сгенерированный SSH-ключ и добавьте его в репозиторий через главную страницу репозитория 'Manage' -> 'Deploy Key Management' -> 'Add Deploy Key'.

![Добавить ключ развертывания](./assets/deploy_keys_create.png "Add Deployment Key")

При тестировании с помощью 'ssh -T', на выходе получается 'Anonymous':

```bash
$ ssh -T git@gitee.ru
Hi Anonymous! You've successfully authenticated, but gitee.ru does not provide shell access.
```

После успешного добавления вы можете использовать протокол SSH для **извлечения** репозитория.

## Открытый ключ репозитория и развертываемый открытый ключ

Для того чтобы пользователи могли использовать набор развертываемых открытых ключей в нескольких репозиториях проекта, избегая громоздкого процесса повторного развертывания и управления, Gitee запустила функцию "Развертываемый открытый ключ", поддерживающую использование развертываемого открытого ключа другого пространства репозитория под именем текущей учетной записи/участника пространства репозитория в том же пространстве репозитория для обеспечения совместного использования открытых ключей.