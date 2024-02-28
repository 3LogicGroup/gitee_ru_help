---
title: Gradle Unit Testing
description: Gradle Unit Testing
slug: /enterprise/pipeline/plugin/gradle-unit-test
keywords:
 - Gitee
 - Gradle
 - Unit Testing
---

## Form Introduction

- **JDK Version**: Select the appropriate JDK version from the dropdown list. The plugin will initialize the JDK environment based on the selected version.

- **Gradle Version Number**: Select the appropriate Gradle version from the dropdown list. The plugin will initialize the Gradle environment based on the selected version.

- **Test Command**: The test command is a user-defined command for testing. The command is executed in the root directory of the code repository and supports accessing environment variables using ${parameter key}. Note that adding 'set -e' can control the automatic exit of script commands if there is an error.

```shell
# Default Gradle unit test command
chmod +x gradlew
./gradlew test
```

- **Test Report Directory**: The test report directory is the directory where the test report generated after executing the test command is located.

- **Test report entry file**: The test report entry file is the name of the test report entry file, for example, index.html

- **Quality Gate**: In the testing plugin, you can configure the quality gate. If the actual metrics during task execution are lower than the configured metrics, the gate will take effect. The pipeline task will be marked as failed and the subsequent tasks will not continue to execute.
  - Test Pass Rate: Pass rate of test cases

- **Build cache**:

> The cache parameter supports both absolute and relative paths, for example:

- /root/.m2
- ~/.m2
- xxx/xxx relative to the root directory of the code repository
- /root/workspace/xxx

> Rule Explanation:

- The so-called cache essentially means storing the modules that are repeatedly used in our pipeline in the uploaded S3. When the pipeline is triggered again, the cache file is downloaded and extracted from S3.
Only when the pipeline build is successful will the updated cache files be uploaded
- Cache files expire by default after 30 days
- Each triggering of the pipeline can extend the cache expiration (even if the build fails)