---
{"title"=>"Cobertura Coverage Collection"}
description: Collect Cobertura coverage
slug: /enterprise/pipeline/plugin/cobertura
keywords:
 - Gitee
 - Cobertura
 - Coverage Collection
---

## Form Introduction

- **JDK Version**: Select the appropriate JDK version from the dropdown list. The plugin will initialize the JDK environment based on the selected version.

- **Maven Version**: Select the appropriate Maven version from the dropdown list. The plugin will initialize the Maven environment based on the selected version during execution.

- **Test Command**: The test command is a user-defined command for testing. The command is executed in the root directory of the code repository and supports accessing environment variables using ${parameter key}. Note that adding 'set -e' can control the automatic exit of script commands if there is an error.

```shell
# Parameter Description:
#    -Dmaven.test.failure.ignore: Continue building even if unit tests fail
mvn -B cobertura:cobertura -Dmaven.test.failure.ignore=true
```

'Coverage Report Directory': The coverage report directory is the directory where the coverage report generated after executing the test command is located, for example, target/site/cobertura

- **Test report entry file**: The test report entry file is the name of the test report entry file, for example, index.html

- **Quality Gate**: In the testing plugin, you can configure the quality gate. If the actual metrics during task execution are lower than the configured metrics, the gate will take effect. The pipeline task will be marked as failed and the subsequent tasks will not continue to execute.
  - Branch Coverage: Measures the branch coverage of if and switch statements, calculates the total number of branches in a method, and determines the number of executed and not executed branches
- Line coverage: The percentage of executable statements that have been executed out of the total executable statements (excluding things like C++ header file declarations, code comments, blank lines, etc.)

- **Private repository**:
    - **Repository Credentials**: Manage your remote dependency repositories by adding credentials. Refer to [Maven Settings Credential Configuration](/) for instructions on adding credentials.
    - Repository type: release repository or snapshot repository.