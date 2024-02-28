---
title: How to clone repositories and projects with gitclone
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4111
---

In the previous section, we introduced that Git supports multiple data transfer protocols, including the 'git://' protocol, 'http(s)://' protocol, and SSH transfer protocol represented by 'user@server:/path.git'. We can clone projects/repositories using these three protocols.

Next, we will use the repository 'git@git.oschina.net:zxzllyj/sample-project.git' as an example to clone the project/repository.

### Clone via HTTPS

```bash
git clone https://gitee.ru/zxzllyj/sample-project.git
```

### Clone via SSH Protocol

```bash
git clone git@gitee.ru:zxzllyj/sample-project.git
```

Take the repository `git@gitee.ru:zxzllyj/sample-project.git` as an example (Note: ssh address is used here because the demo machine has already configured ssh public key, so ssh address can be used. If you haven't configured the public key, please use the https address)

![Image Description](https://static.oschina.net/uploads/img/201603/10160653_BHzv.gif)

Note: Although the method in the figure above pulls the complete repository, it will only display the default branch. If you need to go directly to a specific branch, you can add the branch name after the repository address.