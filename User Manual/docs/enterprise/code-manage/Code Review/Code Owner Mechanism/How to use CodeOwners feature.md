---
title: How to use the CodeOwners feature?
origin-url: https://gitee.ru/help/articles/4379
---


When submitting a PR for daily iteration delivery, specify team members for code review. In most cases, when the code changes involve a file or directory A, the majority of the time, a fixed person B is assigned to perform the code review. We can then refer to B as the CodeOwner of component A. In simple terms, Codeowner is used to define who is responsible for specific files or directories in the repository.

To use the CodeOwner feature, you need to create a CODEOWNERS file at a specified location in the repository. They only apply to the current branch, and the specified locations are:

- In the root directory of the repository
- In the .gitee/ directory
- In the docs/ directory

### **CODEOWNERS file example**

```bash
# Code Owners for a file
filename @username1 @username2

# Code Owners for a directory
# You can also use email addresses if you prefer.
directoryname/ @username1 XXXX@qq.com

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

When multiple CODEOWNERS rules in the file match, the user from the last matching pattern in the file will be used. For example:

```bash
README.md @user1

# This line would also match the file README.md
*.md @user2
```

README.md is owned by @user2, and each file path can only match one CODEOWNERS
  Rule.

Syntax escape

Use \ to escape patterns starting with #, so that they are treated as patterns instead of comments.
- Use [ ] to define the scope of the group. The usage of group is as follows:

```INI
[Documentation]
ee/docs/    @docs
docs/       @docs

[Database]
README.md  @database
model/db/   @database

[DOCUMENTATION]
README.md  @docs
```

You can make a section optional so that the approval of code reviews in that section is optional.
Place an insertion character ^ before the name of the code owner

```INI
^[Documentation]
*.md @ligen @liqin

[Config]
*.yml @liwen @normalcoder 

/app/models @xxx @xxx2
```

### **CodeOwner Assignment Rules**

- The specified Codeowner can be either @username or a specified email address.
- When the specified user does not exist in the platform, or does not exist as a developer or above role in the repository, the corresponding user will not be assigned, and no specific prompt will be provided as to why it is not assigned.
- The assignment list is limited to repository members, excluding enterprise edition super admins, admins, and organization admins.
- CODEOWNER attribution only follows the last rule
- CODEOWNER assignment is not allowed to be removed, it is updated with the CODEOWNERS file.
- CODEOWNERS assignment: Add the corresponding CODEOWNER to the related PR and add an assignment log (the pusher assigned CODEOWNER XXXX).
- CODEOWNERS reduce assignment: Related PR updates do not remove the assignment and add assignment logs (the pusher removed the CODEOWNER identity of XXXX).