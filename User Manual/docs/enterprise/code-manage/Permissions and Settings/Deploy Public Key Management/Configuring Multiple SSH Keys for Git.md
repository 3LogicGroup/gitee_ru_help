---
title: Configure Multiple SSH Key in Git
origin-url: https://gitee.ru/help/articles/4229
---

Background

To use two Gitee accounts simultaneously, you need to configure different SSH Keys for each account:

* Account A is for the company;
* Account B is for personal use.

### Solution

1. Generate SSH Key for account A and add SSH public key in the Gitee settings page of account A:

```bash
ssh-keygen -t ed25519 -C "Gitee User A" -f ~/.ssh/gitee_user_a_ed25519
```

2. Generate SSH keys for account B and add the SSH public key on account B's Gitee settings page:

```bash
ssh-keygen -t ed25519 -C "Gitee User B" -f ~/.ssh/gitee_user_b_ed25519
```

3. Create or modify the file `~/.ssh/config` and add the following content:

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

4. Test the two SSH Keys separately using the ssh command:

```text
$ ssh -T gt_a
Hi Gitee User A! You've successfully authenticated, but gitee.ru does not provide shell access.

$ ssh -T gt_b
Hi Gitee User B! You've successfully authenticated, but gitee.ru does not provide shell access.
```

5. Pull code:

Replace `git@gitee.ru` with the corresponding `Host` in the SSH configuration file, such as the original repository SSH link:

```text
git@gitee.ru:owner/repo.git
```

When using account A to push and pull repositories, you need to modify the connection to:

```text
gt_a:owner/repo.git
```