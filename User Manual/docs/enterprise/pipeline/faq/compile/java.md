---
title: Язык Java
description: Язык Java
slug: /enterprise/pipeline/faq/compile/java
keywords:
 - Gitee
 - Java
 - Сборка
 - Задача
---

## 1. Сборка Gradle завершилась с ошибкой './gradlew: Разрешение отклонено'

Ответ: Сначала повысьте привилегии gradlew

```bash
chmod +x ./gradlew
./gradlew build
```