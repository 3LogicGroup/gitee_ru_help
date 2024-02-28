---
title: Java Language
description: Java Language
slug: /enterprise/pipeline/faq/compile/java
keywords:
 - Gitee
 - Java
 - Build
 - Issue
---

## 1. Gradle build failed with error './gradlew: Permission denied'

Reply: First elevate the privilege of gradlew

```bash
chmod +x ./gradlew
./gradlew build
```