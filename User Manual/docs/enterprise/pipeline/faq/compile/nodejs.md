---
title: Node.js Language
description: JNodejs language
slug: /enterprise/pipeline/faq/compile/nodejs
keywords:
 - Gitee
 - Nodejs
 - Build
 - Issue
---

## 1. Node build failed, Node build is slow

Reply: Whether to access overseas resources to pull overseas resources, if yes, please pull dependencies from domestic sources

## 2. Yarn build is slow and build fails

Reply: Whether to access overseas resources to pull overseas resources, if yes, please pull dependencies from domestic sources

## 3. Node build fails with 'JavaScript heap out of memory' or other memory resource shortage errors

Reply: You can Google 'JavaScript heap out of memory' for this issue, for example, refer to: https://www.jianshu.com/p/2bf539bb949f

Note: --max_old_space_size=8000, max_old_space_size should not exceed 8192 if possible

Alternatively, you can use your own build machine, which has no resource restrictions. Please refer to this document for more details: [Multi-Cloud Host Group Management](/enterprise/pipeline/enterprise-setup/host/introduce)

## 4、not found：python2

Reply: Change the mirror source, provide three suggestions

* Change the source using npm i node-sass --sass_binary_site=https://npmmirror.com/mirrors/node-sass 
 or npm config set sass_binary_site=https://npmmirror.com/mirrors/node-sass/ 
 or write the configuration to .npmrc
* yum install python2 -y (or python3)
Change sass to less, etc

## 5、module Not Found Error

Reply: Linux is case-sensitive to file names, check if there are any case-related errors in the file