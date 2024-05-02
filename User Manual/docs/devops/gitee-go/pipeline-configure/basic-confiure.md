---
{"title"=>"Основные понятия о конвейере"}
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/basic-config
description: Что такое Gitee Go
origin-url: 
---

- Имя конвейера: имя конвейера. Его можно дублировать в одном и том же репозитории кода, но не рекомендуется иметь повторяющиеся имена.
- Уникальный идентификатор конвейера: уникальный идентификатор конвейера, который не может быть дублирован в одном репозитории кода.

 **Пример использования:**
**[Рекомендуется]** Вы можете посмотреть на скриншоте:
![Настройка основной информации](https://images.gitee.ru/uploads/images/2021/1117/132106_3bd84c77_5192864.png)

 **Вы можете посмотреть в Yml:**

```yaml
# Current yml file version, default 1.0
version: '1.0'
Pipeline identifier, supports numbers, lowercase letters, hyphens, and underscores. Must be unique within the repository.
name: pipeline-demo 
Pipeline name, supports Chinese, numbers, letters, and common symbols, up to 128 characters
displayName: Pipeline Demo
```