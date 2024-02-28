---
title: How to reduce the number of commit history and modify the email in your own commit
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4198
---

Note: The content in this section comes from <https://git-scm.com/book/zh/v2/Git>-Tools-Rewriting History. The ultimate interpretation right belongs to the author of this page. This document only quotes and formats the content to some extent. The author of this document has no copyright to the content of this page.

Often, when using Git, you may want to correct the commit history for some reason. One great thing about Git is that it allows you to make decisions at the last minute. You can decide which files to include in a commit just before committing the staged content. You can choose not to work with certain content using the stash command. You can also rewrite past commits as if they happened differently. This may involve changing the order of commits, changing information in commits, modifying files, compressing or splitting commits, or completely removing commits before sharing your work with others.

In this section, you will learn how to accomplish these very useful tasks so that your commit history will be displayed as desired when sharing your work with others.

### Modify the Last Commit

Modifying your most recent commit is one of the most common operations you perform when working with Git. For your most recent commit, you usually want to do two things: modify the commit message or modify the snapshot of the files you added, modified, and removed.

If you just want to modify the commit message of the most recent commit, it's very easy:

```bash
git commit --amend
```

This will take you to a text editor containing your most recent commit message for you to modify. When you save and close the editor, the editor will replace the most recent commit message with the content you entered.

If you have already made the commit but forgot to add a newly created file, you can make changes to the commit snapshot by adding or modifying files. By modifying the file and then running `git add` or `git rm` on a tracked file, followed by `git commit --amend`, the current staging area will be taken away and used as the snapshot for the new commit.

When using this technique, be careful because the amendment will change the submitted SHA-1 checksum. It is similar to a small rebase. Do not amend it if the last commit has already been pushed.

### Modify Multiple Commit Messages

To modify a commit that is further back in the commit history, a more complex tool must be used. Git does not have a history changing tool, but you can use the rebase tool to rebase a series of commits based on their original state.

For example, if you want to modify the commit messages of the last three commits or any one of the group of commits, pass the parent commit of the most recent commit you want to modify as an argument to the git rebase -i command, i.e. HEAD~2^ or HEAD~3. Remember that ~3 might be easier to remember because you are trying to modify the last three commits; but be aware that it actually specifies the previous four commits, i.e. the parent commit of the commit you want to modify:

```bash
git rebase -i HEAD~3
```

Remember again that this is a rebase command - every commit within the range HEAD~3..HEAD will be rewritten, regardless of whether you modify the information. Do not involve any commits that have already been pushed to the central server - this will create two versions of the same change, confusing others.

Running this command will give you a list of commits on the text editor, which looks like the following:

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

It should be noted that the order displayed in these commits is reversed compared to the normal use of the log command. Running the log command once, you will see something like this:

```bash
git log --pretty=format:"%h %s" HEAD~3..HEAD
a5f4a0d added cat-file
310154e updated README formatting and added blame
f7f3f6d changed my name a bit
```

Note the reverse order display. Interactive rebase gives you a script that will run. It will replay each commit's changes from oldest to newest, starting with the commit you specified on the command line (HEAD~3). It lists the oldest, not the newest, at the top because that's the first one to be replayed.

You need to modify the script to make it stay on the change you want to modify. To achieve this, simply change 'pick' to 'edit' in front of each commit you want to modify. For example, if you only want to modify the third commit message, you can modify the file as follows:

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

This command will automatically apply the other two commits, and then it's done. If you need to change more than one 'pick' to 'edit', you need to modify each one separately.

### Reorder commits

You can also use interactive rebase to reorder or completely remove commits. If you want to remove the 'added cat-file' commit and then modify the order introduced by the other two commits, you can rewrite the rebase script like this:

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

When you save and exit the editor, Git brings your branch back to the parent commit of these commits, applies 310154e, and then applies f7f3f6d, and finally stops. In fact, the order of those commits has been modified and the 'added cat-file' commit has been completely removed.

### Compressed Commit

You can also compress a series of commits into a single commit using interactive rebase tool. The script provides useful instructions in the rebase information.

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

If 'squash' is specified instead of 'pick' or 'edit', Git will apply the changes of both and merge the commit messages together. So, if you want these three commits to be one commit, you can modify the script like this:

```bash
pick f7f3f6d changed my name a bit
squash 310154e updated README formatting and added blame
squash a5f4a0d added cat-file
```

When you save and exit the editor, Git applies all three modifications and puts you back into the editor to merge the three commit messages:

```bash
# This is a combination of 3 commits.
# The first commit's message is:
changed my name a bit

# This is the 2nd commit message:

updated README formatting and added blame

# This is the 3rd commit message:

added cat-file
```

Once you save, you have a commit that contains all the changes from the previous three commits.

### Splitting Commits

Splitting a commit will undo the commit and then partially stage and commit multiple times until the desired number of commits is achieved. For example, if you want to split the middle commit of three commits. You want to split it into two commits: the first one is 'updated README formatting', and the second one is 'added blame' instead of the original 'updated README formatting and added blame'. This can be done by modifying the script of rebase -i and changing the instruction of the commit to be split to 'edit'.

```bash
pick f7f3f6d changed my name a bit
edit 310154e updated README formatting and added blame
pick a5f4a0d added cat-file
```

Then, when the script takes you into the command line, reset that commit and retrieve the changes from the reset. Create several commits from it. When you save and exit the editor, Git takes you to the parent commit of the first commit in the list, applies the first commit (f7f3f6d), applies the second commit (310154e), and then takes you to the command line. There, you can perform a mixed reset for that commit using 'git reset HEAD^', which will actually undo that commit and unstage the modified files. Now you can stage and commit files until you have multiple commits, and then run 'git rebase --continue' when finished.

```bash
git reset HEAD^
git add README
git commit -m 'updated README formatting'
git add lib/simplegit.rb
git commit -m 'added blame'
git rebase --continue
```

Git applies the latest commit (a5f4a0d) in the script. The history looks like this:

```bash
$ git log -4 --pretty=format:"%h %s"

1c002dd added cat-file
9b29157 added blame
35cfb2b updated README formatting
f3cc40e changed my name a bit
```

Again, these changes altered the SHA-1 checksum of all the commits in the list, so make sure none of the commits in the list have been pushed to a shared repository yet.

## Nuclear-level Option: filter-branch

There is another option for rewriting history, if you want to rewrite a large number of commits using a script, you can use it - for example, globally changing your email address or removing a file from each commit. This command is filter-branch, which can rewrite a large number of commits in history. You should not use it unless your repository has not been published and no one else has based their work on the commits to be rewritten. However, it can be very useful. You will learn a few common use cases, giving you an idea of where it is suitable to use it.

### Remove a file from each commit

This often happens. Someone carelessly commits a huge binary file through git add . and you want to remove it from everywhere. Maybe accidentally committed a file that includes a password, but you want it to be open source. filter-branch

```bash
$ git filter-branch --tree-filter 'rm -f passwords.txt' HEAD
Rewrite 6b9b3cf04e7c5686a9cb838c3f36a8cb6a0fc2bd (21/21)
Ref 'refs/heads/master' was rewritten
```

--tree-filter option runs the specified command after checking out each commit of the repository and recommit the results. In this example, you remove a file called passwords.txt from each snapshot, regardless of its existence. If you want to remove all accidental editor backup files, you can run a command like git filter-branch --tree-filter 'rm -f \*~' HEAD.

Finally, you will see Git rewriting trees and commits and then moving branch pointers. It is usually a good idea to do this in a test branch and then hard reset the master branch when you decide that the final result is what you really want. To make filter-branch run on all branches, you can pass the --all option to the command.

### Make a subdirectory the new root directory

Assuming it has been imported from another source code control system and has several meaningless subdirectories (trunk, tags, etc.). If you want to make the trunk subdirectory the new repository root for each commit, filter-branch can help you do that.

```bash
$ git filter-branch --subdirectory-filter trunk HEAD
Rewrite 856f0bf61e41a27326cdae8f09fe708d679f596f (12/12)
Ref 'refs/heads/master' was rewritten
```

Now the new repository root directory is the trunk subdirectory. Git will automatically remove all commits that do not affect the subdirectory.

### Global Modification of Email Address

Another common scenario is when you forget to run 'git config' to set your name and email address before starting work, or when you want to open source a project and change all your work email addresses to your personal email address. In any case, you can also use 'filter-branch' to modify email addresses in multiple commits at once. Be careful to only modify your own email address, so you use '--commit-filter':

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

This will traverse and rewrite each commit to include your new email address. Since commits include the SHA-1 checksum of their parent commits, this command will modify every commit in your history.