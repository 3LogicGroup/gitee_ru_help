---
title: Golang Language
description: Golang Language
slug: /enterprise/pipeline/faq/compile/golang
keywords:
 - Gitee
 - Golang
 - Build
 - Issue
---

## 1. Go build, executing "make build" gives the error message "No rule to make target"

Reply:

1. You can reproduce it by executing 'make build' in the root directory of the code repository on your local machine. 'make build' requires a Makefile, which is not present in your code repository. You can Google it or refer to this document: https://www.cnblogs.com/guigujun/p/10702154.html

2. Or you can modify the execution command in the pipeline and use a local build command that passes, such as go build.

## 2. Slow Go build, Go proxy

Reply: export GOPROXY=https://goproxy.cn