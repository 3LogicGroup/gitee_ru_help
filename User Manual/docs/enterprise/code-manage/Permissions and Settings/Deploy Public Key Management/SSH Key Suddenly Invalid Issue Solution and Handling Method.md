---
title: Troubleshooting and Handling Methods for SSH Key Suddenly Invalid
origin-url: https://gitee.ru/help/articles/4352
---

### **Issues encountered**

Support for RSA-SHA1 was removed in OpenSSH 8.8 released on September 26, 2021.

- The latest version of git for windows 2.33.1 uses OpenSSH 8.8.
- Rolling upgrades of distributions like arch and manjaro are quite aggressive. Using pacman -Syu will upgrade all software to the latest version
- The current behavior is that it was working fine before, but after running pacman -Syu or upgrading to git for windows 2.33.1, when using git pull, it shows a fatal: unable to read remote repository error.

If you upgrade to OpenSSH 8.8 or above, you may encounter verification failures when using ssh to push/pull Gitee code.

![Image Description](./assets/110518_2fa9dedc_4764813.webp)
![Image Description](./assets/110856_78e3d7d4_4764813.webp)

### **Reason**

We use `golang.org/x/crypto/ssh` to extract fingerprints from public keys in order to exchange user information from the main Gitee application.

However, this repository currently (2021-10-12) does not support the RSA-SHA2 algorithm, so the fingerprint cannot be obtained, resulting in user verification failure.

### **Temporary Solution**

Choose one of the following three solutions
 
1. Configure OpenSSH service to allow RSA-SHA1 key usage

```bash
Add the following configuration to ~/.ssh/config
Host gitee.ru 
HostkeyAlgorithms +ssh-rsa 
PubkeyAcceptedAlgorithms +ssh-rsa
```

PS: This method does not require changing ssh key, recommended for Linux and Windows git bash

2. Use a different algorithm to generate ssh key

```bash
ssh-keygen -t ed25519 -C "your@example.email"
# Then re-add the public key to Gitee
```

PS: This method does not require changing ssh key, recommended for Linux and Windows git bash

3. Do not use OpenSSH 8.8 or higher version for now.

### **Conclusion**

The golang community has already noticed this situation and has been promoting support for RSA-SHA2. Details:

We will always pay attention to the progress and respond as soon as possible after Golang supports RSA-SHA2. Thank you for your support to Gitee.

### **Reference Links**

[openssh-release-note-8.8](https://gitee.ru/link?target=https%3A%2F%2Fwww.openssh.com%2Ftxt%2Frelease-8.8)