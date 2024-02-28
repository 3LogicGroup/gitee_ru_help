---
title: Generate/Add SSH Public Key
origin-url: https://gitee.ru/help/articles/4181
---


Gitee provides Git services based on the SSH protocol. Before accessing the repository using SSH, you need to configure the account/repository.

You can generate sshkey with the following command:

```bash
ssh-keygen -t ed25519 -C "xxxxx@xxxxx.com"  
# Generating public/private ed25519 key pair...
```

> Note: The xxxxx@xxxxx.com here is just the name of the generated ssh key and does not require or restrict it to be named after a specific email address.
> Most of the online tutorials explain the use of email generation, and the initial intention was only for ease of identification, so email addresses were used.

Press enter three times as instructed to generate the SSH key. By viewing the contents of the ~/.ssh/id_ed25519.pub file, you can get your public key.

```bash
cat ~/.ssh/id_ed25519.pub
# ssh-ed25519 AAAAB3NzaC1yc2EAAAADAQABAAABAQC6eNtGpNGwstc....
```

![Image Description](./assets/165113_8e58f0e1_551147.webp)
![Image Description](./assets/165455_ec7dbd09_551147.webp)

Copy the generated SSH key and add it through the repository homepage: Repository Settings -> Deploy Keys -> Add Deploy Key

![Image Description](../../../../../assets/image223.png)

After adding, enter in the terminal

```bash
ssh -T git@gitee.ru
```

Confirmation and adding the host to the local SSH trusted list is required for the first use. If the content returns 'Hi XXX! You've successfully authenticated, but gitee.ru does not provide shell access.', it means the addition is successful.

![Image Description](./assets/170837_4c5ef029_551147.webp)

After successful addition, you can use the SSH protocol to operate on the repository

### Repository public key and deployable public key

In order to facilitate users to use a set of public keys in multiple project repositories, avoiding the cumbersome deployment and management, Gitee has launched the "Deployable Public Key" feature, which supports using the deployment public key of another repository space under the current account/participating repository space in one repository space to achieve public key sharing.