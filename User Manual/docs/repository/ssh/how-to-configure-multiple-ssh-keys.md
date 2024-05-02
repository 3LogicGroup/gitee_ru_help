---
title: Настройка нескольких SSH-ключей в Git
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /repository/ssh-key/configure-multiple-ssh-keys
origin-url: https://gitee.ru/help/articles/4229
---

Справочная информация

Когда есть несколько учетных записей git, например:

a. Gitee для внутренней разработки внутри компании;
b. Учетная запись GitHub для личных разработок.

### Решение

1. Сгенерируйте SSH-ключ для компании

```bash
ssh-keygen -t rsa -C 'xxxxx@company.com' -f ~/.ssh/gitee_id_rsa
```

2. Сгенерируйте SSH-ключ для использования с GitHub.

```bash
ssh-keygen -t rsa -C 'xxxxx@qq.com' -f ~/.ssh/github_id_rsa
```

3. Создайте файл конфигурации в каталоге ~/.ssh и добавьте в него следующее содержимое (где Host и HostName указывают доменное имя git-сервера, а IdentityFile - путь к закрытому ключу)

```ssh
# gitee
Host gitee.ru
HostName gitee.ru
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitee_id_rsa
# github
Host github.com
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github_id_rsa
```

4. Протестируйте команду ssh отдельно

```bash
ssh -T git@gitee.ru
ssh -T git@github.com
```

Здесь в качестве примера мы возьмем gitee, и в случае успеха будет возвращено следующее изображение

![Описание изображения](https://images.gitee.ru/uploads/images/2018/0921/161137_b71ef6be_967230.png )