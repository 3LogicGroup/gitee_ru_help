---
title: How to use GPG on Gitee
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /repository/ssh-key/how-to-use-gpg-with-gitee
origin-url: https://gitee.ru/help/articles/4248
---

## GPG Key generation and export

### Windows

1. Download <https://gpg4win.org/>

2. Generate GPG Key

![Image Description](https://gitee.ru/uploads/images/2019/0506/145050_bebf25ab_2118102.png )

Enter the username and email, note that the email must match the Gitee submission email

![Image Description](https://gitee.ru/uploads/images/2019/0506/145127_a478549e_2118102.png )

3. Export

![Image Description](https://gitee.ru/uploads/images/2019/0506/145440_6ef1c448_2118102.png )

### MacOS

1. Download and install <https://gpgtools.org/>

2. Generate GPG Key

Enter the username and email, note that the email must match the Gitee submission email

![Image Description](https://gitee.ru/uploads/images/2019/0506/143642_13ee972e_340906.png "gpg_mac.png")

3. Export Public Key

![Image Description](https://gitee.ru/uploads/images/2019/0506/143648_a896df68_340906.png "gpg_mac_1.png")

### Ubuntu 16.04/18.04

1. Install

```shell
sudo apt install gnupg2  # Ubuntu 16.04
sudo apt install gnupg   # Ubuntu 18.04
```

2. Generate GPG Key

```bash
gpg2 --full-gen-key     # Ubuntu 16.04 gpg version < 2.1.17
gpg --full-generate-key # Ubuntu 18.04 gpg version >= 2.1.17
```

```bash
Please select the type of key you want to use:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (Used for signing only)
   (4) RSA (Used for signing only)
Your choice? 1 <- Choose the key type
RSA key length should be between 1024 and 4096 bits.
What key size would you like to use? (3072) 3072
The key size you requested is 3072 bits
Please set the expiration date for this key.
         0 = Key never expires
      <n> = Key expires in n days
<n>w = Key expires in n weeks
<n>m = Key expires in n months
<n>y = Key expires in n years
What is the validity period of the key? (0) 1y <- Expiry date
The key will expire on Monday, May 04, 2020 14:38:48 CST
Is the above correct? (y/n) y

You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

Real Name: YOUR_NAME                                          <-
Email Address: gitee@gitee.ru                                 <-
Comment: Gitee GPG Key                                          <- Comment
You have selected this user identifier:
    “YOUR_NAME (Gitee GPG Key) <gitee@gitee.ru>”

Change name (N), comment (C), email address (E), or confirm (O)/quit (Q)? O
gpg: Key B0A02972E266DD6D marked as fully trusted.
gpg: revocation certificate stored as 'xxx'
Public and private keys have been generated and signed.

pub   rsa3072 2019-05-05 [SC] [expires: 2020-05-04]
      8086B4D21B3118A83CC16CEBB0A02972E266DD6D                 <- Key ID
uid                      likui (Gitee GPG Key) <gitee@gitee.ru>
sub rsa3072 2019-05-05 [E] [Valid until: 2020-05-04]
```

3. Export GPG Public Key

```shell
gpg --armor --export 8086B4D21B3118A83CC16CEBB0A02972E266DD6D
```

## GPG Key configuration and usage

1. Configure Git

```bash
git config --global user.signingkey 8086B4D21B3118A83CC16CEBB0A02972E266DD6D
```

2

![Image Description](https://gitee.ru/uploads/images/2019/0506/150932_746867da_2118102.png )

GPG public key verification status, GPG email needs to be activated to pass:

![Image Description](https://gitee.ru/uploads/images/2019/0506/151235_bdda7f4c_340906.png "gpg_gitee_1.png")

- `Delete` only removes the GPG public key, the verified commit signature status remains unchanged.
- "Logout" removes the GPG public key and changes the verified commit signature status to unverified

3. Use GPG signature for commits

```shell
git commit -S -m "YOUR COMMIT MESSAGE"
git log --show-signature # View signature status
```

4. Check Signature Status

![Image Description](https://gitee.ru/uploads/images/2019/0506/152745_4ffaa4b3_340906.png )

- The conditions for a commit to pass verification are: the commit email matches the public key email used for commit GPG signature, and the GPG public key verification passes.

View GPG public key

Enter https://gitee.ru/<username>.gpg

- Go to the security settings by selecting the settings page in the upper right corner of the user profile - GPG public key

- Gitee platform GPG public key: <https://gitee.ru/gitee.gpg>

## How to use platform GPG public key for signature verification?

- Import platform GPG public key

```shell
jane@zh ~ (master !*+%) » curl https://gitee.ru/gitee.gpg | gpg --import
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   919  100   919    0     0   1058      0 --:--:-- --:--:-- --:--:--  1057
gpg: key 4AEE18F83AFDEB23: public key "Gitee (web-flow commit signing.) <noreply@gitee.ru>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```

Set the platform GPG public key to be fully trusted

```shell
jane@zh ~ (master !*+%) » gpg --edit-key 63A71EA590E6E55E5ADED924173E9B9CA92EEF8F
gpg (GnuPG) 2.2.29; Copyright (C) 2021 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.


pub  rsa2048/4AEE18F83AFDEB23
     created: 2017-08-16  expires: never       usage: SC
     trust: unknown       validity: unknown
[ unknown] (1). Gitee (web-flow commit signing) <noreply@gitee.ru>

gpg> trust
pub  rsa2048/4AEE18F83AFDEB23
     created: 2017-08-16  expires: never       usage: SC
     trust: unknown       validity: unknown
[ unknown] (1). Gitee (web-flow commit signing) <noreply@gitee.ru>

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 5
Do you really want to set this key to ultimate trust? (y/N) y

pub  rsa2048/4AEE18F83AFDEB23
     created: 2017-08-16  expires: never       usage: SC
     trust: ultimate      validity: unknown
[ unknown] (1). Gitee (web-flow commit signing) <noreply@gitee.ru>
Please note that the shown key validity is not necessarily correct
unless you restart the program.

gpg>
```

Check the signature status of the commit, 'Good signature' means normal

```shell
commit b5fd988cafde32e01cb21662ee3452995674c3d9 (tag: v1.1, tag: v1, tag: k, tag: gpg2, tag: gpg1, tag: KK)
gpg: Signature made Mon 11/15 15:07:11 2021 CST
gpg:                using RSA key 4AEE18F83AFDEB23
gpg: Good signature from "Gitee (web-flow commit signing.) <noreply@gitee.ru>" [ultimate]
Author: bestjane <mr.bestjane@gmail.com>
Date:   Mon Nov 15 15:07:11 2021 +0800

    Create laravel.yml
```