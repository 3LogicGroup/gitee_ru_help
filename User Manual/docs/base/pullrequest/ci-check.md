---
title: PullRequest access control check
slug: /base/pullrequest/ci-check
description: PullRequest access control check feature
---

Pull Request gate check provides the ability to integrate third-party pipelines in Pull Requests. By building a

Here is a simple sequence diagram to explain how to access external service capabilities

![](https://images.gitee.ru/uploads/images/2021/0901/175609_cec4deeb_1841492.png 'Screenshot.png')

As shown in the above figure, Gitee pushes events and accepts user operation requests to complete the integration. This means that Gitee needs to provide WebHook event notifications and API interfaces to accept user operation detection requests.

Interface Description

:::info Prompt

Calling the check interface requires repository administrator permissions

:::

### Create a check task

> `POST` : /repos/{owner}/{repo}/check-runs

| Parameter Name | Data Type | Parameter Location | Parameter Description |
|-----|------|--------|------|
| owner | string | path | The address of the repository space, taking https://gitee.ru/oschina/git-osc as an example, `repo` takes the value of oschina |
| repo | string | path | Repository address, for example, `repo` takes the value git-osc |
| name | string | formData | Required parameter, check task name, like: `ci-pipeline-runn`
  |
| head_sha | string | formData | Required parameter, represents the latest commit SHA on the branch during the code push.
| details_url | string | formData | Optional. Provides the homepage address of the access control check capability service.
| status | string | formData | Optional, the current state of the check task. Possible values are:<br/>- `queued`: indicates the check task is in the queue (default value)<br/>- `in_progress`: indicates the check task is in progress<br/>- `completed`: indicates the check task has been completed |
| started_at | string | formData | Optional, the start time of the check task, the time format must comply with
| completed_at | string | formData | Optional, the completion time of the check task, required time format is `ISO 8601` standard |
| conclusion | string | formData | Optional. The final status (conclusion) of the check task. It can have one of the following values: <br/><ul><li>`action_required`: Action required.</li><li>`cancelled`: Cancelled.</li><li>`failure`: Task failed.</li><li>`neutral`: No status.</li><li>`success`: Task succeeded.</li><li>`skipped`: Skipped.</li><li>`stale`: Stale.</li><li>`timed_out`: Task timed out.</li></ul><br/>When the check task is completed (`completed_at` is not empty or `status` is set to `completed`), `conclusion` is a required parameter.<br/>If the field value is `action_required`, the details URL should be provided in `details_url`.<br/>When the task is completed and a conclusion is provided, the check task will be automatically set to `completed` status. The conclusion cannot be changed afterwards.
| output | object | formData | Optional. The detection report provided after the inspection task is completed. For the specific data structure, please refer to the **"Access Inspection Report Data Structure"** below. |
| actions | objects | formData | Optional. Displays a button on the access control related interface to remind you to do extra things.

### Get a Specific Check Task

> `GET` /repos/{owner}/{repo}/check-runs/{check_run_id}

| Parameter Name | Data Type | Parameter Description |
|-----|------|------|
| owner | string | Required. The space URL where the repository is located. For example, if the URL is oschina, the `repo` value would be oschina |
| repo | string | Required, repository URL, using 'git-osc' as an example, the 'repo' value is 'git-osc'.
| check_run_id | integer | The ID of the check item returned after calling the `Create a Check Task` API and successfully creating the check task |

### Update a Specific Check Task

> `PATCH` /repos/{owner}/{repo}/check-runs/{check_run_id}

| Parameter Name | Data Type | Parameter Location | Parameter Description |
|-----|------|--------|------|
| owner | string | path | The address of the repository space, taking https://gitee.ru/oschina/git-osc as an example, `repo` takes the value of oschina |
| repo | string | path | Repository address, for example, `repo` takes the value git-osc |
| name | string | formData | Required parameter, check task name, e.g.: ci-pipeline-run
| check_run_id | integer | formData | The ID of the check run returned after successfully creating a check task using the 'Create a check run' API |
| details_url | string | formData | Link provided by the access control service |
| status | string | formData | Current status. Values: queued, in_progress, completed. Default: queued |
| started_at | string | formData | The start time of the check task, with the time format required to be ISO 8601 |
completed_at: ISO 8601 formatted string representing the completion time of the check task.
| conclusion | string | formData | Required parameter when completed_at is not empty or the status is completed. Represents the final conclusion of the check task. The value can be one of the following: action_required, cancelled, failure, neutral, success, skipped, stale, timed_out. When the value is action_required, the details_url should provide the detail URL. Note: Providing a conclusion will automatically set the check task to
| output | object | formData | Detection report, can accept various data outputs, specific data structure refer to `Create an inspection task`->`Inspection task report attribute` |
| actions | objects | formData | Display a button on the Gitee interface, the specific data structure refers to

### Get Annotations for a Specific Check Task

> `GET`：/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations

| Parameter Name | Data Type | Parameter Location | Parameter Description |
|-----|------|--------|------|
| owner | string | path | The address of the repository space, taking https://gitee.ru/oschina/git-osc as an example, `repo` takes the value of oschina |
| repo | string | path | Repository address, for example, `repo` takes the value git-osc |
| check_run_id | integer | - | ID of the check item returned after calling the "Create a check task" interface and successfully creating the check task |
| per_page | integer | - | Optional parameter, maximum amount of data to retrieve in a single request, with a maximum value of 100, default value is 20 |
| page | integer | - | Optional parameter, the requested page number, default value is 1 |

### Get the check task corresponding to a specific commit on a specified repository

> `GET` /repos/{owner}/{repo}/commits/{ref}/check-runs

| Parameter Name | Data Type | Parameter Location | Parameter Description |
|-----|------|--------|------|
| owner | string | path | The address of the repository space, taking https://gitee.ru/oschina/git-osc as an example, `repo` takes the value of oschina |
| repo | string | path | Repository address, for example, `repo` takes the value git-osc |
| ref | string | - | Specify the Commit SHA of the specified commit on the repository |
| check_name | string | - | Returns check runs with the specified name. |
| status | string | - | - |
| per_page | integer | - | - |
| page | integer | - | - |

Data Structure

### Check Result Report Data Structure

The access control check report is passed by specifying the 'output' field in the 'access control check task' to define and output the specific content of the report to Gitee. Gitee will parse the information contained in the report and display it in the details of the access control check task. The following is the specific data structure of the 'access control check report':

| Parameter Name | Data Type | Parameter Description |
|-----|------|------|
| title | string | Required parameter, the title of the task report to be checked |
| summary | string | Required parameter, a summary overview of the checklist, this attribute supports `Markdown`
| text | string | Optional, detailed content of the checklist item. This attribute supports Markdown format
| annotations | array of objects | Optional. Used to declare and annotate analysis results to the corresponding code. See the 'Analysis Annotation Data Structure' below for the specific data structure. |
| images | array of objects | Optional. Add images in the report, and the pictures will be displayed in the UI. Refer to the following 'Annotation Data Structure' for the specific data structure.

### Check the annotations property data structure in the report

In the access check report, the 'annotations' property of the 'output' field can be used to annotate analysis information as comments in the code, so that users can see detailed analysis results while viewing the code.

> The annotated comments can be seen in the 'Pull Request Details > Files' tab.

| Parameter Name | Data Type | Parameter Description |
|-----|------|------|
| path | string | Required parameter, specifies the file path to be annotated, such as: 'README.md', 'src/main/example.java' |
| start_line | integer | Required parameter, the starting line number of the comment |
| end_line | integer | Required parameter, the end line number of the comment |
start_column | integer | Optional, the starting column number for comments, omit when start_line is not equal to end_line
Optional, the ending column number of the comment. It is omitted when start_line is not equal to end_line.
| annotation_level | string | Optional, the level of the annotation. The specific value can be one of the following:<br/>- `notice`: Reminder<br/>- `warning`: Warning<br/>- `failure`: Failed error |
| message | string | Required parameter, a brief description of the feedback for these lines of code |
| title | string | Optional, the title of the comment |
| raw_details | string | Optional, detailed information about the comment |

### Check the data structure of the images property in the report

In the access control check report, the 'output' field's 'images' attribute can be used to add images to the report in a declarative way. The images will be displayed in the UI interface.

| Parameter Name | Data Type | Parameter Description |
|-----|------|------|
| alt | string | Required parameter, image name |
| image_url | string | Required parameter, image URL |
| caption | string | Image description |

### Check the data structure of task extension actions

In the access control check task, third-party services can use the `actions` attribute to display a button on the access control check related interface, which can be used to passively trigger interaction between the check item and the service it belongs to in the access control check task details. The specific data structure of `access control check task extension actions` is as follows:

| Parameter Name | Data Type | Parameter Description |
|-----|------|------|
| label | string | Required parameter, the label displayed in the UI |
| description | string | Required parameter, describes the specific operation. |
| identifier | string | Required parameter, unique identifier of the extension operation |

### Check WebHook Data Structure Description

When a third-party service calls the access control check related interface, the platform will asynchronously notify the third-party service of the relevant events through `WebHook`. The specific `WebHook` notification data structure is as follows:

| WebHook Field | Type | Field Description |
|------------|----|------|
| action | string | This field represents the event type triggered by the current user. The possible values are:<br/><ul><li>`created`: Creating a check task</li><li>`completed`: When the status of the check task becomes completed</li><li>`rerequested`: When the user reruns the check task in the UI</li><li>`requested_action`: When the user uses the functional buttons provided by the check item</li></ul>|
| requested_action | string | The value of the unique identifier `identifier` customized by the third-party access control check service when creating a check task in the access control check task extension operation (`actions`) |
| check_run | object | Detailed information about the triggered check run |
| project | object | Repository information where the triggered check task is located |
| sender | object | User information who triggered the check task operation |

## Setting Pull Request Admission Rules through Protected Branches

In the branch protection strategy, set 'Require status checks to pass before merging', check the option, and click save. In subsequent Pull Request creation checks, if the 'Require status checks to pass before merging' check fails, the Pull Request is not allowed to be merged.

:::tip Tips

1. Only the inspection items executed in the last week can be filtered
2. If the 'Require successful access status to merge' check item is not successful, the repository administrator can bypass this restriction and force merge the Pull Request

:::