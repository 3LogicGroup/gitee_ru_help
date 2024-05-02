---
title: Развертывание плагина
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/deploy
origin-url: 
---
## 1. Загрузить артефакты

> Используется для загрузки поэтапных сборок в хранилище артефактов для постоянного хранения.

- Визуальная конфигурация
![Загрузить артефакт](https://images.gitee.ru/uploads/images/2021/1223/112922_9d068739_5192864.png)

```yml
# Upload temporary artifacts of the build plugin to the artifact repository
- step: publish@general_artifacts
  name: publish_general_artifacts
  displayName: Upload artifact
# Default BUILD_ARTIFACT defined in the upstream build task
  dependArtifact: BUILD_ARTIFACT
  # Build artifact repository, default is default, created by the system by default
  artifactRepository: default
# Default artifact naming when uploading to the artifact repository: build
  artifactName: output  
```

## 2. Релиз

> «Опубликовать» — важное понятие, означающее, что артефакт готов к запуску. «Публикация» — это основная концепция Gitee Go, имеющая следующие характеристики:

- Публикация плагинов основана на плагине «Загрузить артефакты».
- Плагин выпуска присвоит артефакту четырехзначный номер версии (например, 1.0.0.1).
- Логика выпуска плагина с четырехзначным номером версии следующая:
  — Номер версии указан на уровне репозитория и по умолчанию начинается с 1.0.0.0.
  - Каждый номер версии не может быть продублирован. Четвертая цифра номера версии увеличивается с каждым выпуском.
Вы можете самостоятельно изменить номер версии в yml-файле, например, изменив с 1.0.0.1 на 2.0.2.1, тогда номер версии этого релиза будет 2.0.2.1, а номер версии следующего релиза — 2.0.2.2.
- Пометьте текущую публикацию для каждого выпуска. Формат тега v1.0.0.1.
- При выпуске артефакта сначала получите номер версии из плагина текущей версии и проверьте, использовался ли этот номер версии в базе кода. Если он не использовался, его можно напрямую выпустить. Если он использовался, получите поле autoIncrement. Если true, получите максимальный номер версии в текущей базе кода, увеличив четвертую цифру на 1. Если false, выполниить выпуск не удастся, поскольку текущий номер версии конфликтует. Измените или установите для autoIncrement значение true, и номер версии будет увеличен.
![История релизов репозитория артефактов](https://images.gitee.ru/uploads/images/2021/1223/113036_6057f0c7_5192864.png)

- Визуальная конфигурация
![Релиз](https://images.gitee.ru/uploads/images/2021/1223/113110_8140751b_5192864.png)

```yml
- step: publish@release_artifacts
  name: publish_release_artifacts
  displayName: 'Release'
# Output of Upstream Artifact Upload Task
  dependArtifact: output
  # Release package repository, default release, system default creation
  artifactRepository: release
  # Publish artifact version
  version: '1.0.0.0'
  # Whether to enable version number increment, enabled by default
  autoIncrement: true
```

## 3. Развертывание хоста

> Поддерживает автоматическую загрузку промежуточных артефактов, артефактов в репозитории артефактов и опубликованных артефактов в указанные группы хостов, а также выполнение указанных сценариев.

- Визуальная конфигурация
![Развертывание хоста](https://images.gitee.ru/uploads/images/2021/1223/113443_4df66e6c_5192864.png )
- yml

```yaml
- step: deploy@agent
  name: deploy_agent
  displayName: Host Deployment
  # Target Host Group
  hostGroupID: gitee-go
  deployArtifact:
Source of deployment package, build means from upstream pipeline, artifact means from artifact repository, default is artifact
    - source: artifact
# The default name of the deployment package downloaded to the host, default is output.
      name: output
      # The specific directory on the host where the deployment package is downloaded, default is ~/gitee_go/deploy
      target: ~/gitee_go/deoloy
      # Upstream artifact name, only effective when the source is build, default output
      dependArtifact: output
The following content only takes effect when the source is artifact, the default repository name is release.
      artifactRepository: release
# Artifact name, default output
      artifactName: output
      # Artifact version, default is the latest
      artifactVersion: latest
  script: 
    |
    cd ~/gitee_go/deploy
    tar -zxvf output.tar.gz
    ls
    echo 'Hello Gitee!'
```