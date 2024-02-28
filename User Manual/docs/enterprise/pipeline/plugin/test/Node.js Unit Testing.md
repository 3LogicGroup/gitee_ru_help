---
title: Nodejs Unit Testing
description: Node.js unit testing
slug: /enterprise/pipeline/plugin/nodejs-unit-test
keywords:
 - Gitee
 - Nodejs
 - Npm
 - Yarn
 - Unit Testing
---

## Form Introduction

Select the appropriate Node version from the dropdown list, and the plugin will initialize the Node environment based on the selected version during execution.

- **Test Command**: The test command is a user-defined command for testing. The command is executed in the root directory of the code repository and supports accessing environment variables using ${parameter key}. Note that adding 'set -e' can control the automatic exit of script commands if there is an error.

```shell
# Set NPM source to improve installation speed
npm config set registry https://registry.npmmirror.com
# Enter the test command here, the test report only supports the Mocha testing framework
npm install && npm run test
```

- Test Report Directory: The test report directory is the directory where the test report generated after executing the test command is located, for example, mochawesome-report

- **Test Report File**: The test report file is the name of the JSON test report file, for example, `mochawesome.json`.

- **Test report entry file**: The test report entry file is the HTML test report entry file name, such as mochawesome.html

- **Quality Gate**: In the testing plugin, you can configure the quality gate. If the actual metrics during task execution are lower than the configured metrics, the gate will take effect. The pipeline task will be marked as failed and the subsequent tasks will not continue to execute.
  - Test Pass Rate: Pass rate of test cases

- **Build cache**:

> The default cache directory for npm is: ~/.npm, but you can customize the cache path using the npm command line: npm config set cache /root/xxx/.npm. If the default cache directory (~/.npm) is set in the pipeline, it will become invalid and needs to be changed to (/root/xxx/.npm). The cache parameter supports absolute and relative paths. For example:

- ~/.npm
- xxx/xxx relative to the root directory of the code repository
- /root/workspace/xxx

> Rule Explanation:

- The so-called cache essentially means storing the modules that are repeatedly used in our pipeline in the uploaded S3. When the pipeline is triggered again, the cache file is downloaded and extracted from S3.
Only when the pipeline build is successful will the updated cache files be uploaded
- Cache files expire by default after 30 days
- Each triggering of the pipeline can extend the cache expiration (even if the build fails)