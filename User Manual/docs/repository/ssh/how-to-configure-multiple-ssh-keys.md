---
title: Configure Multiple SSH Keys in Git
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /repository/ssh-key/configure-multiple-ssh-keys
origin-url: https://gitee.ru/help/articles/4229
---

Background

When there are multiple git accounts, for example:

a. A Gitee for internal work development within the company;
b. A GitHub account for personal development activities

### Solution

1. Generate an SSH-Key for the company

```bash
ssh-keygen -t rsa -C 'xxxxx@company.com' -f ~/.ssh/gitee_id_rsa
```

2. Generate an SSH-Key for use with GitHub.

```bash
ssh-keygen -t rsa -C 'xxxxx@qq.com' -f ~/.ssh/github_id_rsa
```

3. Create a config file in the ~/.ssh directory and add the following content (where Host and HostName specify the domain name of the git server, and IdentityFile specifies the path to the private key)

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

4. Test with ssh command separately

```bash
ssh -T git@gitee.ru
ssh -T git@github.com
```

In this example, we take gitee as an example, and if successful, the following image will be returned

![Image Description](https://images.gitee.ru/uploads/images/2018/0921/161137_b71ef6be_967230.png )