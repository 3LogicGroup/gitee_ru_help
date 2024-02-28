---
title: How to clone a repository/project using git
origin-url: https://gitee.ru/help/articles/4111
---

In the previous section, we introduced that Git supports multiple data transfer protocols, including `git://` protocol, `http(s)://` and `user@server:/path.git` SSH transfer protocol. We can clone projects/repositories using these three protocols.

Next, we will take the repository `git@git.oschina.net:zxzllyj/sample-project.git` as an example to clone the project/repository.

### **Clone via HTTPS Protocol**

```bash
git clone https://gitee.ru/zxzllyj/sample-project.git
```

### **Clone using SSH Protocol**

```bash
git clone git@gitee.ru:zxzllyj/sample-project.git
```

Take the repository `git@gitee.ru:zxzllyj/sample-project.git` as an example (Note: ssh address is used here because the demo machine has already configured ssh public key, so ssh address can be used. If you haven't configured the public key, please use the https address)

![Image Description](./assets/10160653_BHzv.gif)

Note: Although the method in the above diagram pulls the complete repository, it will only display the default branch. If you need to go directly to a specific branch, you can append the branch name after the repository URL.