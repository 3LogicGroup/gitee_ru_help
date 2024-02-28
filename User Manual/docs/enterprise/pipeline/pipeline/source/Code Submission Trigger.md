---
title: Code submission triggering
description: Code submission triggers
slug: /enterprise/pipeline/source/trigger
keywords:
 - Gitee
 - Code submission trigger
---

After binding the code source, save the pipeline, and the system will automatically register the webhook on the code service platform. After submitting code on the corresponding code address and branch, the pipeline can be triggered to run.

## Trigger Events and Filtering Conditions

You can use the configuration of trigger events and filter conditions to filter the webhook events of the source code.

### Trigger Events Supported by Different Code Sources

| | Gitee | Github | Continuously updated on other platforms |
|---------|-------|-------|-------|
Branch push | ✅ | ✅ |
| Tag push | ✅ | ✅ |
| Code review  | ✅  | ❌  |

Branch push

Pushing from a local branch to a remote branch (or modifying files in the Web interface of the code management platform), such as pushing from local master to origin/master. The pipeline will match the target branch of the push with the filter conditions. If there is a match, the pipeline will be triggered.

Branch push supports three matching methods, and the three matching rules are intersection, which means that if all rules are set, the pipeline can only be triggered if all rules are met.

- Branch Matching: There are the following four independent matching rules
  - Prefix match: for example, if you fill in 'dev', it will match all branches starting with 'dev'; when left blank, it matches all branches.
  - Exact Match: If filled with dev, it will only match the dev branch
- Regular expression match: If you fill in dev.*, it will match all branches with the prefix dev
- Exact exclusion: If filled with 'dev', submitting code to the dev branch will not trigger the pipeline. Exact exclusion rules have the highest priority and are usually used in combination with other rules

- File/Directory Matching: There are the following two independent matching rules
  - Exact Match: If you fill in src/main/test.java, code path filtering will only trigger pipeline runs when code updates satisfy this rule.
    - Regular expression matching: If filled with src.*, it means that the code path starting with 'src' needs to be updated to trigger the pipeline run.

Commit comment keyword matching: only supports regular expression matching
- Regular expression match: If filled with '^build.*', it will trigger the pipeline for code submissions with commit messages starting with 'build'.

### Tag Push

Push the local tag to the server tag (or create a Tag on the code management platform's web interface), for example, push the local tag release/0.0.1 to the server. The pipeline will match the target Tag name with the filter condition, and if it matches successfully, the pipeline will be triggered.

- Tag Match: There are four independent matching rules
    - Prefix matching: If filled in with v1, it matches all tags starting with v1; when left empty, it matches all tags
    - Exact matching: If you fill in v1.1.1, only v1.1.1 tag will be matched
    - Regular expression match: If filled with v1.*, it matches all tags with prefix v1.
- Exact exclusion: If filled in with v1.1.1, creating a v1.1.1 Tag will not trigger the pipeline. The rule of exact exclusion has the highest priority and is usually used in combination with other rules.

### Code Review

Code review is triggered by actions such as initiating a PR, updating a PR, and commenting on a PR from the page. Therefore, as long as code review triggering is configured in the pipeline, any of these three actions that meet the matching rules will automatically trigger the pipeline execution.

Code review supports four matching modes, and the four matching rules are intersected. That is, only when all rules are met can the pipeline be triggered.

- Branch Matching: There are the following four independent matching rules
    - Prefix matching: If filled in with dev, it matches all branches starting with dev; when left empty, it matches all branches
- Exact match: If you fill in dev, it will only match the dev branch
    - Regular Expression Matching: If you fill in dev.*, it will match all branches with the dev prefix.
- Exact exclusion: For example, if you fill in dev, submitting code to the dev branch will not trigger the pipeline. The exact exclusion rule has the highest priority and is usually used in combination with other rules.

- Source branch file/directory matching: There are two independent matching rules as follows
  - Exact Match: If you fill in src/main/test.java, code path filtering will only trigger pipeline runs when code updates satisfy this rule.
    - Regular expression matching: If filled with src.*, it means that the code path starting with 'src' needs to be updated to trigger the pipeline run.

- Review Title Matching: Supports Regular Expression Matching Only
    - Regular expression match: If you fill in ^Production code merge.*, then PR titles starting with Production code merge will trigger the pipeline when initiating PR, updating PR, or commenting on PR.

- Comment Information Matching: Supports Regular Expression Matching Only
  - Regular expression matching: If filled with
  `^通过.*`, it will match any comment in the PR starting with `通过`