---
{"title"=>"Basic Concepts of Pipelines"}
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/pipeline/basic-config
description: What is Gitee Go
origin-url: 
---

- Pipeline Name: The name of the pipeline. It can be duplicated within the same code repository, but it is not recommended to have duplicate names.
- Pipeline unique identifier: The unique identifier of the pipeline, which cannot be duplicated within the same code repository

 **Use Case:**
**[Recommended]** You can define it in the visual editing interface:
![Configure basic information](https://images.gitee.ru/uploads/images/2021/1117/132106_3bd84c77_5192864.png)

 **You can define directly in Yml:**

```yaml
# Current yml file version, default 1.0
version: '1.0'
Pipeline identifier, supports numbers, lowercase letters, hyphens, and underscores. Must be unique within the repository.
name: pipeline-demo 
Pipeline name, supports Chinese, numbers, letters, and common symbols, up to 128 characters
displayName: Pipeline Demo
```