---
title: .NET Core build
description: .NET Core Build
slug: /enterprise/pipeline/plugin/dotnet-compile
keywords:
 - Gitee
 - .NET Core
 - Build
---

## Form Introduction

The .NET Core version: Select the appropriate .NET Core version from the dropdown list. The plugin will initialize the .NET Core environment based on the selected version.

- **Build Command**: The build command is a user-defined command to build the code. The command is executed in the root path of the code repository and supports ${Parameter Key} to get environment variables. Note that adding `set -e` can control the automatic exit of script commands in case of errors.

```shell
# input your command here
dotnet restore
dotnet publish -c Release -o out
```

- **Stash build artifacts**:
- **Unique Identifier**: The identifier for the artifact produced, which can be referenced in downstream tasks using `${Unique Identifier}` to obtain the artifact.
    - **Packaged files/directories**: Select the files or directories produced by the artifact, it can be single or multiple (these packaging directories are compressed together).

- **Build cache**:

> The cache parameter supports both absolute and relative paths, for example:

- ~/.nuget/packages
- xxx/xxx relative to the root directory of the code repository
- /root/workspace/xxx

> Rule Explanation:

- The so-called cache essentially means storing the modules that are repeatedly used in our pipeline in the uploaded S3. When the pipeline is triggered again, the cache file is downloaded and extracted from S3.
Only when the pipeline build is successful will the updated cache files be uploaded
- Cache files expire by default after 30 days
- Each time the pipeline is triggered, the cache expiration can be extended (even if the build fails)

## Common combinations:

### Image Build and Deployment (Single Artifact)

```mermaid
graph LR
A [.NET Core Build] -> B [Image Build] -> C [K8S Deployment]
    B --> D[Helm Chart Deployment]
```

### Artifact Upload and Deployment (Single Artifact)

```mermaid
graph LR
A [.NET Core Build] --> B[Upload Artifacts] --> C[Release] --> D[Host Deployment]
```

### Image Build and Deployment (Multiple Artifacts)

```mermaid
graph LR
A [.NET Core Build] -> B [Image Build] -> C [K8S Deployment]
A --> D[Mirror Build] --> F[Helm Chart Deployment]
A --> E[Image Build] --> G[K8S Deployment]
```