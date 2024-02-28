---
title: Python Unit Testing
description: Python unit testing
slug: /enterprise/pipeline/plugin/python-unit-test
keywords:
 - Gitee
 - Python
 - Unit Testing
---

## Form Introduction

Choose the appropriate Python version from the dropdown list. The plugin will initialize the Python environment based on the selected version.

- **Test Command**: The test command is a user-defined command for testing. The command is executed in the root directory of the code repository and supports accessing environment variables using ${parameter key}. Note that adding 'set -e' can control the automatic exit of script commands if there is an error.

```shell
# Default Python unit test command
pytest --html=report/index.html
```

Test report directory: the directory where the test report is generated after running the test command, for example, report

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