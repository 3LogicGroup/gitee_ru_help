---
title: How to use CodeOwners feature
authors:
  - name: Gitee_Community
    url: https://gitee.ru/gitee_gitee
origin-url: https://gitee.ru/help/articles/4379
---

For PRs submitted during daily iteration delivery, specific team members are assigned for code review when the code changes involve a file or directory A, in most cases, fixed personnel B are assigned for code review. We can call B the CodeOwner of component A. In simple terms, CodeOwner is used to define who is responsible for specific files or directories in the repository.

To use the CodeOwner feature, you need to create a file named 'CODEOWNERS' in the specified location in the repository. They only apply to the current branch. The specified location is:

- In the root directory of the repository
In the `.gitee/` directory
- In the `docs/` directory

 **CODEOWNERS file example**

```text
# Code Owners for a file
filename @username1 @username2

# Code Owners for a directory
# You can also use email addresses if you prefer.
directoryname/ @username1 408815583@qq.com

# Regular expression matching
*.rb @liwen 

# The `docs/*` pattern will match files like
# `docs/getting-started.md` but not further nested files like
# `docs/build-app/troubleshooting.md`.
docs/*  docs@example.com

# In this example, @octocat owns any file in an apps directory
# anywhere in your repository.
apps/ @octocat
```

When multiple CODEOWNERS rules in a file match, the user from the last matching pattern in the file will be used. For example:

```text
README.md @user1

# This line would also match the file README.md
*.md @user2
```

The code owner of `README.md` is `@user2`, and each file path can only match one `CODEOWNERS` rule.

 **Syntax Escaping**

- Use `\` to escape patterns starting with `#`, so that they are treated as patterns instead of comments;
Use `[ ]` to define the scope of the group. The usage of grouping is as follows:

```text
[Documentation]
ee/docs/    @docs
docs/       @docs

[Database]
README.md  @database
model/db/   @database

[DOCUMENTATION]
README.md  @docs
```

You can make a section optional, so that the approval of code reviews in that section is optional.
Place the caret character `^` before the name of the code owner. For example:

```text
^[Documentation]
*.md @ligen @liqin

[Config]
*.yml @liwen @normalcoder 

/app/models @xxx @xxx2
```

CodeOwner assignment rules

- The specified Codeowner can be '@username' or a specified email address
When the specified user does not exist on the platform or does not exist as a developer or above in the repository, the corresponding user will not be assigned, and no specific prompt will be provided as to why the assignment was not made.
- The assigned list is limited to the repository members, excluding enterprise administrators, administrators, and organization administrators.
- CODEOWNER belongs only to the last rule
- CODEOWNER assignment does not allow anyone to remove it, it will be updated with the CODEOWNERS file
Add CODEOWNERS assignment: Assign the corresponding CODEOWNER to related PR and add assignment log (the pusher assigned CODEOWNER XXXX)
- CODEOWNERS Remove assignment: Related PR updates do not remove assignments, and add assignment logs (the pusher removed the CODEOWNER role of XXXX).