---
title: Generate and Add SSH Public Key
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /repository/ssh-key/generate-and-add-ssh-public-key
origin-url: https://gitee.ru/help/articles/4181
---

Gitee provides Git services based on the SSH protocol. Before accessing the repository using the SSH protocol, you need to configure the SSH public key of the repository.

> Account public key, please go to [Set Account SSH Public Key](/base/account/Set-SSH-Public-Key)

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

## Add Deployment Public Key

Copy the generated SSH key and add it to the repository through the repository homepage 'Manage' -> 'Deploy Key Management' -> 'Add Deploy Key'.

![Add Deployment Key](./assets/deploy_keys_create.png "Add Deployment Key")

When testing with 'ssh -T', the output is 'Anonymous':

```bash
$ ssh -T git@gitee.ru
Hi Anonymous! You've successfully authenticated, but gitee.ru does not provide shell access.
```

After successful addition, you can use the SSH protocol to **pull** the repository.

## Repository public key and deployable public key

In order to enable users to use a set of deployable public keys in multiple project repositories, avoiding the cumbersome process of repeated deployment and management, Gitee has launched the "Deployable Public Key" feature, which supports using the deployment public key of another repository space under the current account name/participating repository space in the same repository space to achieve public key sharing.