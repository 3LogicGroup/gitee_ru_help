---
title: Deploy plugin
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
slug: /gitee-go/plugin/deploy
origin-url: 
---
1. Upload artifacts

> Used to upload staged builds to the artifact repository for permanent storage

- Visual Configuration
![Upload Artifact](https://images.gitee.ru/uploads/images/2021/1223/112922_9d068739_5192864.png)

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

## 2. Release

> "Publish" is an important concept, which means that the artifact is ready to go live. "Publish" is a core concept in Gitee Go and has the following characteristics:

- Publishing plugins relies on the 'Upload Artifacts' plugin
- The release plugin will assign a four-digit version number (e.g., 1.0.0.1) to the artifact
- The logic for releasing plugin with a four-digit version number is as follows
  - The version number is at the repository level and starts from 1.0.0.0 by default.
  - Each version number cannot be duplicated. The fourth digit of the version number increments with each release.
You can change the version number in the yml file yourself, for example, changing from 1.0.0.1 to 2.0.2.1, then the version number of this release is 2.0.2.1, and the version number for the next release is 2.0.2.2.
- Tag the current submission for each release. The format of the tag is v1.0.0.1
- When a artifact is released, first get the version number from the current release plugin and check if this version number has been used in the codebase. If it has not been used, it can be directly released. If it has been used, get the autoIncrement field. If it is true, get the maximum version number in the current codebase and release it by incrementing the fourth digit by 1. If it is false, the release fails because the current version number conflicts. Please modify or set autoIncrement to true, and the version number will be incremented.
![Artifact Repository Release History](https://images.gitee.ru/uploads/images/2021/1223/113036_6057f0c7_5192864.png)

- Visual Configuration
![Release](https://images.gitee.ru/uploads/images/2021/1223/113110_8140751b_5192864.png)

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

## 3. Host Deployment

> Supports automatic download of staged artifacts, artifacts in the artifact repository, and published artifacts to specified host groups, and execution of specified scripts.

- Visual Configuration
![Host Deployment](https://images.gitee.ru/uploads/images/2021/1223/113443_4df66e6c_5192864.png )
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