---
title: Maven unit testing
description: Maven unit testing
slug: /enterprise/pipeline/plugin/maven-unit-test
keywords:
 - Gitee
 - Maven
 - Unit Testing
---

## Form Introduction

- **JDK Version**: Select the appropriate JDK version from the dropdown list. The plugin will initialize the JDK environment based on the selected version.

- **Maven Version**: Select the appropriate Maven version from the dropdown list. The plugin will initialize the Maven environment based on the selected version during execution.

- **Test Command**: The test command is a user-defined command for testing. The command is executed in the root directory of the code repository and supports accessing environment variables using ${parameter key}. Note that adding 'set -e' can control the automatic exit of script commands if there is an error.

```shell
# Parameter Description:
#    -Dmaven.test.failure.ignore: Continue building even if unit tests fail
#    -B: Runs in batch mode, which can avoid ArrayIndexOutOfBoundsException exceptions when printing logs.
mvn -B test -Dmaven.test.failure.ignore=true
# Create Surefire test report in HTML format, this command does not run tests, only builds the report
mvn surefire-report:report-only
# Put the required CSS and images resources for the report in the same directory as surefire-report.html (${basedir}/target/site/)
mvn site -DgenerateReports=false
```

- **Test Report Directory**: The test report directory is the directory where the test report generated after executing the test command is located.

The entry file for the test report is the name of the test report entry file, for example, surefire-report.html

- **Quality Gate**: In the testing plugin, you can configure the quality gate. If the actual metrics during task execution are lower than the configured metrics, the gate will take effect. The pipeline task will be marked as failed and the subsequent tasks will not continue to execute.
  - Test Pass Rate: Pass rate of test cases

- **Private repository**:
    - **Repository Credentials**: Manage your remote dependency repositories by adding credentials. Refer to [Maven Settings Credential Configuration](/) for instructions on adding credentials.
    - **Repository Type**: Release repository or snapshot repository.

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