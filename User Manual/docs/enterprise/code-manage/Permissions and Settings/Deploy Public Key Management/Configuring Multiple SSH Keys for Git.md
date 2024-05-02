---
title: Настройка нескольких SSH-ключей в Git
origin-url: https://gitee.ru/help/articles/4229
---

Справочная информация

Чтобы одновременно использовать два аккаунта Gitee, необходимо настроить разные SSH-ключи для каждого аккаунта:

* Учетная запись A - для компании;
* Учетная запись Б - для личного использования.

### Решение

1. Сгенерируйте SSH-ключ для учетной записи A и добавьте открытый SSH-ключ на странице настроек Gitee для учетной записи A:

```bash
ssh-keygen -t ed25519 -C "Gitee User A" -f ~/.ssh/gitee_user_a_ed25519
```

2. Сгенерируйте SSH-ключи для учетной записи Б и добавьте открытый SSH-ключ на странице настроек Gitee учетной записи Б:

```bash
ssh-keygen -t ed25519 -C "Gitee User B" -f ~/.ssh/gitee_user_b_ed25519
```

3. Создайте или измените файл `~/.ssh/config` и добавьте в него следующее содержимое:


```bash
Host gt_a
    User git
    Hostname gitee.ru
    Port 22
    IdentityFile ~/.ssh/gitee_user_a_ed25519
Host gt_b
    User git
    Hostname gitee.ru
    Port 22
    IdentityFile ~/.ssh/gitee_user_b_ed25519
```

4. Проверьте по отдельности два SSH-ключа с помощью команды ssh:

```text
$ ssh -T gt_a
Hi Gitee User A! You've successfully authenticated, but gitee.ru does not provide shell access.

$ ssh -T gt_b
Hi Gitee User B! You've successfully authenticated, but gitee.ru does not provide shell access.
```

5. Выполнить слияние кода:

В файле настроек SSH замените `git@gitee.ru` на соответствующий `Host`, например, на SSH-ссылку оригинального репозитория:

```text
git@gitee.ru:owner/repo.git
```

В случае использования учетной записи A для отправки и слияния репозиториев необходимо изменить соединение на:

```text
gt_a:owner/repo.git
```