---
title: Pages Single Page Application Support
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4237
---

`Gitee Pages` supports native single-page applications, such as `vue-router`, `angular`, `react-router`, etc. It can be achieved **through configuration** without writing front-end code to redirect requests via 404.html to the application entry point index.html to fulfill the needs of a single page. Currently, `Gitee Pages` supports configuring single-page applications.

## How to Operate

By adding a `.spa` file to the root directory in `Gitee Pages`, you can enable support for single-page applications.

## Implementation Principle

By adding the .spa file in the root directory, the Nginx rules of the Gitee Pages server will automatically change.

```bash
try_files $uri $uri.html /index.html $uri/ =404;
```

When there is no '.spa' file in the root directory, the 'Gitee Pages' server's 'Nginx' rules are the same as before.

```bash
try_files $uri $uri.html $uri.md $uri/ =404;
```