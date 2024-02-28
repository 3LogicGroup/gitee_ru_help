---
title: SSH public key setting
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4191
---

Gitee provides Git services based on the SSH protocol. Before accessing a repository with the SSH protocol, you need to configure the SSH public key for the account.

Please go to [Add Deploy Public Key](/repository/ssh-key/generate-and-add-ssh-public-key) for the repository public key (deploy public key).

## Generate SSH Public Key

> Windows users are recommended to use **Windows PowerShell** or **Git Bash** as there is no `cat` and `ls` commands in the **Command Prompt**.

1. Generate SSH Key using the command `ssh-keygen`:

```bash
ssh-keygen -t ed25519 -C "Gitee SSH Key"
```

* `-t` key type
* `-C` Comment

Output, such as:

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

* Press **Enter** three times in between

2. View the generated SSH public key and private key:

```bash
ls ~/.ssh/
```

Output:

```bash
id_ed25519  id_ed25519.pub
```

* Private key file `id_ed25519`
Public key file `id_ed25519.pub`

3. Read the public key file `~/.ssh/id_ed25519.pub`:

```bash
cat ~/.ssh/id_ed25519.pub
```

Output, such as:

```bash
ssh-ed25519 AAAA***5B Gitee SSH Key
```

Copy the public key output from the terminal.

## Set Account SSH Public Key

Users can go to the top right corner of the homepage, click on **'Personal Settings' -> 'Security Settings' -> 'SSH Public Keys' -> '[Add Public Key](https://gitee.ru/profile/sshkeys)'** to add the generated public key to the current account.

> Note: **Adding a public key requires user password verification**

![](SSH%E5%85%AC%E9%92%A5%E8%AE%BE%E7%BD%AE.assets/image.png)

Test through `ssh -T` and output the **username** associated with the SSH Key:

```bash
$ ssh -T git@gitee.ru
Hi USERNAME! You've successfully authenticated, but gitee.ru does not provide shell access.
```

After adding the public key, users can browse and view the SSH public keys already added to the current account in 'Personal Settings' -> 'Security Settings' -> '[SSH Public Keys](https://gitee.ru/profile/sshkeys)', and perform management/deletion operations on the public keys.

![](SSH%E5%85%AC%E9%92%A5%E8%AE%BE%E7%BD%AE.assets/image-1.png)

![](SSH%E5%85%AC%E9%92%A5%E8%AE%BE%E7%BD%AE.assets/image-2.png)

Difference between repository SSH Key and account SSH Key?

The account's SSH Key is bound to the account, and the account can use SSH to push/pull repositories if it has push/pull permissions.

When testing with `ssh -T`, the output will be the username associated with the bound SSH key.

```bash
$ ssh -T git@gitee.ru
Hi USERNAME! You've successfully authenticated, but gitee.ru does not provide shell access.
```

The SSH key for the repository is only applicable to the repository. We only provide a deployment public key for the repository, which can only be used to **pull** the repository. This is commonly used for production servers to pull the repository's code.

When testing with `ssh -T`, the output is Anonymous:

```bash
ssh -T git@gitee.ru
Hi Anonymous! You've successfully authenticated, but gitee.ru does not provide shell access.
```