---
title: Solution and handling method for suddenly invalid SSH key
authors:
  - name: Yashin
    url: https://gitee.ru/yashin
origin-url: https://gitee.ru/help/articles/4352
---

Issues encountered

OpenSSH 8.8 released on September 26, 2021, removes support for RSA-SHA1.

> - The latest version of 'git for windows 2.33.1' has been using 'OpenSSH 8.8'
> - Rolling upgrades of distributions like arch and manjaro are quite aggressive. Using `pacman -Syu` will upgrade all software to the latest version.
- At this time, the behavior is that it was still working fine before, using `pacman -Syu` or upgrading to `git for windows 2.33.1` and then using `git pull` will show the prompt `fatal: could not read remote repository`.

If you upgrade to 'OpenSSH 8.8' or above, there will be a verification failure when using SSH to push/pull Gitee code.
> ![Image Description](https://images.gitee.ru/uploads/images/2021/1014/110518_2fa9dedc_4764813.png )
> ![Image Description](https://images.gitee.ru/uploads/images/2021/1014/110856_78e3d7d4_4764813.png )

### Reason

We use `golang.org/x/crypto/ssh` to extract the fingerprint from the public key and exchange user information from the main Gitee application.

Currently (2021-10-12), this repository does not support the `RSA-SHA2` algorithm, which will result in failure to obtain the fingerprint and cause user verification to fail.

### Temporary Solution

Choose one of the following three solutions

Configure OpenSSH service to allow using `RSA-SHA1` key.

```bash
# Add the following configuration in ~/.ssh/config
Host gitee.ru 
HostkeyAlgorithms +ssh-rsa 
PubkeyAcceptedAlgorithms +ssh-rsa
```

> PS: This method does not require changing the SSH key. Recommended for Linux and Windows Git Bash users.

1. Generate ssh key using a different algorithm

```bash
ssh-keygen -t ed25519 -C "your@example.email"
# After that, re-add the public key in Gitee
```

> PS: This method requires changing the SSH key. Recommended for `windows` users

1. Do not use `OpenSSH 8.8` and above versions temporarily

### Conclusion

Currently, the golang community has noticed this situation and is promoting support for `RSA-SHA2`, [details](https://github.com/golang/go/issues/37278)

We will keep an eye on the progress and follow up as soon as golang supports `RSA-SHA2`. Thank you for your support to `Gitee`.

### Reference Links

[openssh-release-note-8.8](https://www.openssh.com/txt/release-8.8)