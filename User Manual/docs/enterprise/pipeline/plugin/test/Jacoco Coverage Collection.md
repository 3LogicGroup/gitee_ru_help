---
title: Jacoco coverage collection
description: Jacoco coverage collection
slug: /enterprise/pipeline/plugin/jacoco
keywords:
 - Gitee
 - Jacoco
 - Coverage Collection
---

## Form Introduction

- **JDK Version**: Select the appropriate JDK version from the dropdown list. The plugin will initialize the JDK environment based on the selected version.

- **Maven Version**: Select the appropriate Maven version from the dropdown list. The plugin will initialize the Maven environment based on the selected version during execution.

- **Test Command**: The test command is a user-defined command for testing. The command is executed in the root directory of the code repository and supports accessing environment variables using ${parameter key}. Note that adding 'set -e' can control the automatic exit of script commands if there is an error.

```shell
# Parameter Description:
#    -Dmaven.test.failure.ignore: Continue building even if unit tests fail
mvn test -Dmaven.test.failure.ignore=true
```

- **Coverage Report Directory**: The coverage report directory is the directory where the coverage report generated after the test command execution is located, for example, target/site/jacoco

The entry file for the test report is the name of the test report entry file, for example, surefire-report.html

- **Quality Gate**: In the testing plugin, you can configure the quality gate. If the actual metrics during task execution are lower than the configured metrics, the gate will take effect. The pipeline task will be marked as failed and the subsequent tasks will not continue to execute.
- Instruction Coverage: The counting unit is a single Java binary code instruction. Instruction coverage provides information on whether the code is executed, measuring independent of source code format.
  - Branch Coverage: Measures the branch coverage of if and switch statements, calculates the total number of branches in a method, and determines the number of executed and not executed branches
- Line coverage: The percentage of executable statements that have been executed out of the total executable statements (excluding things like C++ header file declarations, code comments, blank lines, etc.)
  - Method Coverage: Measures the execution of methods in the tested program, whether it is executed depends on whether at least one instruction is executed
  - Code Coverage: Measures whether class files are executed

- **Private repository**:
    - **Repository Credentials**: Manage your remote dependency repositories by adding credentials. Refer to [Maven Settings Credential Configuration](/) for instructions on adding credentials.
    - Repository type: release repository or snapshot repository.