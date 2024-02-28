---
title: How to reduce the number of commit history and modify the email in your own commit
origin-url: https://gitee.ru/help/articles/4198
---

**Note: The content in this section comes from the https://git-scm.com/book/zh/v2/Git- tool-rewrite history. The final interpretation right belongs to the author of this page. This document only quotes and formats the content to a certain extent. The author of this document has no copyright to the content of this page.**

Many times, when using Git, you may want to modify the commit history for some reason. One great thing about Git is that it allows you to make decisions at the last moment. You can decide which files to include in a commit before submitting the content of the staging area. You can choose not to work with certain content by using the stash command. You can also rewrite past commits as if they happened in a different way. This may involve changing the order of commits, changing the information in commits, modifying files, compressing or splitting commits, or completely removing commits before sharing your work with others.

In this section, you will learn how to accomplish these very useful tasks so that your commit history will be displayed as you wish when sharing your work with others.

### **Modify the last commit**

Modifying your most recent commit is probably the most common operation among all the operations of modifying commit history. For your most recent commit, you usually want to do two things: modify the commit message, or modify the snapshot of the files you added, modified, and removed.

If you only want to modify the commit message of the most recent commit, it's very simple:

```bash
git commit --amend
```

This will take you to a text editor, which contains your most recent commit message for you to modify. When you save and close the editor, the editor will replace the most recent commit message with the content you entered.

If you have already made the commit but forgot to add a newly created file, you can make changes to the commit snapshot by adding or modifying files. By modifying the file and then running

Be careful when using this technique, as the correction will change the submitted SHA-1 checksum. It is similar to a small rebase - do not correct it if the last commit has already been pushed.

### **Modify multiple commit messages**

To modify a commit further back in the commit history, a more complex tool must be used. Git does not have a built-in tool for changing history, but the rebase tool can be used to rebase a series of commits based on their original HEAD rather than moving them onto a new one. With the interactive rebase tool, you can stop after any commit you want to modify and then change the information, add files, or do whatever you want. The rebase command can be run interactively by adding the -i option. You must specify how far back in history you want to rewrite, which can be done by telling the command where you want to rebase to.

For example, if you want to modify the commit messages of the last three commits or any one of the group of commits, pass the parent commit of the most recent commit you want to modify as an argument to the git rebase -i command, i.e. HEAD~2^ or HEAD~3. Remember that ~3 might be easier to remember because you are trying to modify the last three commits; but be aware that it actually specifies the previous four commits, i.e. the parent commit of the commit you want to modify:

```bash
git rebase -i HEAD~3
```

Remember, this is a rebase command - each commit within the range HEAD~3..HEAD will be rewritten, regardless of whether you modify the information. Do not involve any commits that have already been pushed to the central server - doing so will create two versions of the same changes, causing confusion for others.

Running this command will give you a commit list in a text editor, which looks like this:

```bash
pick f7f3f6d changed my name a bit
pick 310154e updated README formatting and added blame
pick a5f4a0d added cat-file

# Rebase 710f0f8..a5f4a0d onto 710f0f8
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

It is important to note that the order of these commits displayed is reversed compared to the normal use of the log command. Running the log command once will show something like this:

```bash
$ git log --pretty=format:"%h %s" HEAD~3..HEAD
a5f4a0d added cat-file
310154e updated README formatting and added blame
f7f3f6d changed my name a bit
```

Note the reverse order display. Interactive rebase gives you a script it will run. It will replay each commit's changes starting from the commit you specify on the command line (HEAD~3) in a top-down order. The oldest, not the newest, is listed at the top because it will be the first one to be replayed.

You need to modify the script to make it stay on the change you want to modify. To achieve this, you just need to change 'pick' in front of each commit you want to modify to 'edit'. For example, if you only want to modify the information of the third commit, you can modify the file like this:

```bash
edit f7f3f6d changed my name a bit
pick 310154e updated README formatting and added blame
pick a5f4a0d added cat-file
```

When you save and exit the editor, Git takes you back to the last commit in the list and returns you to the command line with the following message:

```bash
$ git rebase -i HEAD~3
Stopped at f7f3f6d... changed my name a bit
You can amend the commit now, with

       git commit --amend

Once you’re satisfied with your changes, run

       git rebase --continue
```

These instructions tell you exactly what to do. Enter

```bash
git commit --amend
```

Modify the commit message and then exit the editor. Then, run

```bash
git rebase --continue
```

This command will automatically apply the other two commits and then it will be completed. If you need to change more than one pick to edit, you need to modify each one individually.

### **Reorder commits**

Interactive rebase can also be used to reorder or completely remove commits. If you want to remove the 'added cat-file' commit and then modify the order introduced by the other two commits, you can use the rebase script like this:

```bash
pick f7f3f6d changed my name a bit
pick 310154e updated README formatting and added blame
pick a5f4a0d added cat-file
```

Change it to this:

```bash
pick 310154e updated README formatting and added blame
pick f7f3f6d changed my name a bit
```

When you save and exit the editor, Git brings your branch back to the parent commits of these commits, applies 310154e and then applies f7f3f6d, and finally stops. In fact, it changes the order of those commits and completely removes the 'added cat-file' commit.

### **Compress and submit**

By using an interactive rebase tool, a series of commits can also be compressed into a single commit. Useful instructions are provided in the rebase information.

```bash
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

If you specify 'squash' instead of 'pick' or 'edit', Git will apply both changes and merge the commit messages together. So, if you want these three commits to become one commit, you can modify the script like this:

```bash
pick f7f3f6d changed my name a bit
squash 310154e updated README formatting and added blame
squash a5f4a0d added cat-file
```

When saving and exiting the editor, Git applies all three modifications and puts you in the editor to merge the three commit messages.

```bash
# This is a combination of 3 commits.
# The first commit's message is:
changed my name a bit

# This is the 2nd commit message:

updated README formatting and added blame

# This is the 3rd commit message:

added cat-file
```

Once you save, you will have a commit that includes all changes for the first three commits.

### **Split Commit**

Splitting a commit will undo the commit and then partially stage and commit multiple times until the desired number of commits is achieved. For example, if you want to split the middle commit of three commits. You want to split it into two commits: the first one is 'updated README formatting', and the second one is 'added blame' instead of the original 'updated README formatting and added blame'. This can be done by modifying the script of rebase -i and changing the instruction of the commit to be split to 'edit'.

```bash
pick f7f3f6d changed my name a bit
edit 310154e updated README formatting and added blame
pick a5f4a0d added cat-file
```

Then, when the script takes you into the command line, reset that commit and retrieve the changes from the reset. Create several commits from it. When you save and exit the editor, Git

```bash
git reset HEAD^
git add README
git commit -m 'updated README formatting'
git add lib/simplegit.rb
git commit -m 'added blame'
git rebase --continue
```

Git applies the last commit (a5f4a0d) in the script, and the history looks like this:

```bash
git log -4 --pretty=format:"%h %s"

1c002dd added cat-file
9b29157 added blame
35cfb2b updated README formatting
f3cc40e changed my name a bit
```

Once again, these changes change the SHA-1 checksum of all commits in the list, so make sure the commits in the list have not been pushed to the shared repository.

### **Nuclear Weapon-level Option: filter-branch**

There is another option for rewriting history, if you want to rewrite a large number of commits using a script, you can use it - for example, globally changing your email address or removing a file from each commit. This command is filter-branch, which can rewrite a large number of commits in history. You should not use it unless your repository has not been published and no one else has based their work on the commits to be rewritten. However, it can be very useful. You will learn a few common use cases, giving you an idea of where it is suitable to use it.

### **Remove a file from each commit**

This often happens. Someone carelessly committed a large binary file using git add . and you want to remove it from everywhere. Maybe accidentally committed a file with a password, but you want it for an open-source project. filter-branch is a tool that can be used to scrub the entire commit history. To remove a file called passwords.txt from the entire commit history, you can use the --tree-filter option with filter-branch.

```bash
git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
Rewrite 6b9b3cf04e7c5686a9cb838c3f36a8cb6a0fc2bd (21/21)
Ref 'refs/heads/master' was rewritten
```

--tree-filter option runs the specified command after checking out each commit of the repository and recommit the results. In this example, you remove a file called passwords.txt from each snapshot, regardless of its existence. If you want to remove all accidental editor backup files, you can run a command like git filter-branch --tree-filter 'rm -f *~' HEAD.

Finally, you will see the Git tree rewritten and the commits moved. It is usually a good idea to do this in a test branch and then, when you are ready and satisfied with the final result, perform a hard reset on the master branch. To make filter-branch run on all branches, you can pass the --all option to the command.

### **Make a Subdirectory the New Root Directory**

Assuming it has been imported from another source code control system and there are several meaningless subdirectories (trunk, tags, etc.). If you want the trunk subdirectory to be the new repository root for each commit, filter-branch can help you do that.

```bash
$ git filter-branch --subdirectory-filter trunk HEAD
Rewrite 856f0bf61e41a27326cdae8f09fe708d679f596f (12/12)
Ref 'refs/heads/master' was rewritten
```

Now the new repository root directory is the trunk subdirectory. Git will automatically remove all commits that do not affect the subdirectory.

### **Global Email Address Modification**

Another common scenario is that you forget to run 'git config' to set your name and email address when you start working, or you want to open source a project and change all your work email addresses to your personal email address. In any case, you can also use 'filter-branch' to modify the email addresses in multiple commits at once. Be careful to only modify your own email address, so you use '--commit-filter':

```bash
git filter-branch --commit-filter '
        if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
        then
                GIT_AUTHOR_NAME="Scott Chacon";
                GIT_AUTHOR_EMAIL="schacon@example.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
```

This will iterate and rewrite each commit to include your new email address. Since the commits include the SHA-1 checksum of their parent commits, this command will modify the SHA-1 checksum of each commit in your history, not just those that match the email address.