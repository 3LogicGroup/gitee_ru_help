---
title: Common Git operation issues
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4205
---

* [What is Git? How to use Git to commit code to Gitee](#Git%20%CA%C7%CA%B2%C3%B4%A3%BF%C8%E7%BA%CE%CA%B9%D3%C3%20Git%20%CC%E1%BD%BB%B4%FA%C2%EB%B5%BD)
* [Git client prompts 'fatal: Authentication failed' when pushing code](#Git client prompts 'fatal: Authentication failed')
* [Why do I get a 413 error and fail to push?](#%CE%AA%CA%B2%C3%B4%D4%DA%20push%20%B5%C4%CA%B1%BA%F2%A3%AC%B3%F6%CF%D6%C1%CB413%B4%ED%CE%F3%A3%ACpush%CA%A7%B0)
* [Permission denied (publickey)](#Permission%20denied%20(publickey))
* [clone code reports RPC failed](#clone%20%E4%BB%A3%E7%A0%81%E6%8A%A5%20RPC%20failed)
* [Couldn’t resolve host](#Couldn%E2%80%99t%20resolve%20host)
Clone code reports 403 error
* [Does Gitee have a graphical tool for code management](#%E7%A0%81%E4%BA%91%E7%9A%84%E4%BB%A3%E7%A0%81%E7%AE%A1%E7%90%86%E6%94%AF%E6%8C%81%E5%9B%BE%E5%BD%A2%E5%8C%96%E5%B7%A5%E5%85%B7%E5%90%97)

<a name="Git%20%CA%C7%CA%B2%C3%B4%A3%BF%C8%E7%BA%CE%CA%B9%D3%C3%20Git%20%CC%E1%BD%BB%B4%FA%C2%EB%B5%BD"></a>

## What is Git? How to use Git to commit code to Gitee?

Click [here](https://gitee.ru/help/articles/4104) to learn the basics of Git.

Click [here](https://gitee.ru/help/articles/4122) to learn how to use Git to commit code to Gitee

<a name="Git%20%BF%CD%BB%A7%B6%CB%CD%C6%CB%CD%B4%FA%C2%EB%CC%E1%CA%BE%20fatal:%20Authentication%20failed"></a>

## Git client prompts 'fatal: Authentication failed' when pushing code?

Reason: Permission restricted

Solution steps:

**Using https method**

Please double-check if your account and password are entered correctly, or if your account does not have push permission for this repository.

Through ssh method

Please check if SSH public key is configured and deployed on Gitee.

<a name="%CE%AA%CA%B2%C3%B4%D4%DA%20push%20%B5%C4%CA%B1%BA%F2%A3%AC%B3%F6%CF%D6%C1%CB413%B4%ED%CE%F3%A3%ACpush%CA%A7%B0"></a>

## Why did I get a 413 error and fail to push when pushing

> When using HTTP for Git push and pull, due to the stateless design limitation of the HTTP protocol, the Git HTTP Server imposes a length limit on the request data packets, which is manifested on the Git client as the `http.postBuffer` configuration option.

In order to provide a more stable and faster service, Gitee's HTTP server is configured with a single upload size limit (`client_max_body_size`) of 500M. If the code pushed locally exceeds 500M in a single push, it will be rejected by the server and return a 413 error.

When encountering a 413 error while pushing code, you can try the following configuration command to adjust the local 'http.postBuffer' value to the corresponding single upload size configuration of the Gitee service.

> git config --global http.postBuffer=524288000

Using SSH for code push and pull can avoid this problem. Please refer to [Using SSH for Code Push and Pull](/help/articles/4238) for specific usage.

<a name="Permission%20denied%20(publickey)"></a>

## Permission denied (publickey)

Reason: No permission for the target repository and branch, resulting in inability to update data.

Solution steps:

1) Check the push method.

SSH method: Check if the SSH public key is correct (when there are multiple private keys, please use the ssh-add command to specify the default private key to use);

HTTPS method: Please check the correctness of the password and username.

2) Confirm if the target branch has write permission.

<a name="clone%20%E4%BB%A3%E7%A0%81%E6%8A%A5%20RPC%20failed"></a>

## Clone code reports RPC failed

Reason: The https.postBuffer of HTTPS has limitations on the size of pushed files.

Solution: Change the SSH method for pushing

<a name="Couldn%E2%80%99t%20resolve%20host"></a>

## Couldn’t resolve host

Reason: DNS settings cause domain name resolution failure.

Solution: Please change your DNS to 8.8.8.8 or 114.114.114.114 and restart the network.

<a name="clone%20%E4%BB%A3%E7%A0%81%E6%8A%A5%20403%20%E9%94%99%E8%AF%AF"></a>

## clone code reports 403 error

Reason: restricted permissions, incorrect repository address, cache error password

Solution steps:

1) Ensure the remote URL is correct (case-sensitive)

2) Ensure your own permissions in the repository are not restricted

3) If https clone prompts 403 and does not prompt for password, the git client has cached the wrong password, please clear the saved password.

4) Use SSH address to clone

<a name="%E7%A0%81%E4%BA%91%E7%9A%84%E4%BB%A3%E7%A0%81%E7%AE%A1%E7%90%86%E6%94%AF%E6%8C%81%E5%9B%BE%E5%BD%A2%E5%8C%96%E5%B7%A5%E5%85%B7%E5%90%97"></a>

## Does Gitee support graphical tools for code management?

Support, we recommend using the following Git clients, IDEs, and browser plugin tools, please read [Git Complete Guide](https://gitee.ru/all-about-git).