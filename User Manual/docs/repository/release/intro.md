---
title: What is a Release
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder

# displayed_sidebar: apiSidebar
# slug: /demo
---

## Introduction

Release is a top-level object with Changelogs and binary files, representing all project history before a specific point in time that goes beyond the Git architecture itself.

## Purpose of Release

Through `release`, not only can you view the project history through source code, but you can also further describe the project status at this time through pre-compiled binary files.

"The significance and role of being "beyond the Git architecture itself" are:
>
> 1. Git itself can only record project modifications, and fundamentally is not suitable for recording compiled project binary files.
By using `release`, developers can save the compiled binary files of the project when releasing a version, making it convenient for users to download and search for specific versions of binary files.
>  

## Summary of Release Features

Combining the characteristics described in the previous section `Beyond the Git architecture itself`, we can understand and summarize as follows:
>
> 1. The release version is not provided by the native capability of Git, but based on the version management capability of Git-based platforms (such as [Gitee]) provided by hosting platforms.
> 2. When users access a project, they can quickly download the corresponding version binary files through `release` without having to download the source code and compile it locally, greatly reducing the learning cost for users to use the software.
> 3. In a release, it generally includes `source code of the corresponding release version`, `source code compression package of the corresponding release version` (provided by the platform with an Archive download address without the need to clone using Git command), and `binary files uploaded by the developer when creating the release` (i.e., attachments).
> 4. `Binary files uploaded by developers when creating releases` (i.e., attachments) are decided by developers whether to upload when publishing a `release`. In general, developers can provide `pre-made installation packages/executable programs`, `patches`, `version-specific usage documents or development documents`, etc. through the release attachment feature.

## Usage and management of release features

You can create releases on [Gitee] to package software, release notes, and attachments for others to download.

By creating a release, you can deliver project iterations to users.

> Repository collaborators and personnel with write permission to the repository can create, edit, and delete releases.

Distribution Management and Usage
  
### How to Create a Distribution

1. On [Gitee], navigate to the main page of the repository.

2. On the right side of the file list, click on "Create" (for initial creation) or "Release Title" or "All".

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/115356_1d0310c8_8249553.jpeg "02.jpeg")

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/115333_3c45bb5d_8249553.jpeg "01.jpeg")

3. Click the `+ Create Release` button in the upper right corner.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/115437_2b091816_8249553.jpeg "03.jpeg")

4. Enter the version number of the release, it is recommended to use [semantic versioning](https://semver.org/lang/zh-CN/) to name the tag.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/115449_b2ac4158_8249553.jpeg "04.jpeg")

5. Expand the dropdown list on the right and select the branch that includes the project to be published.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/115459_fce043f4_8249553.jpeg "05.jpeg")

6. Enter the title and description of the distribution, you can also insert links and images in the description.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/120023_15aa67fe_8249553.jpeg "06.jpeg")

7. If your distribution needs to add attachments, please `drag and drop` or `manually select` files in the file box.

> Individual attachments cannot exceed 100M (GVP project 200M)
> The total attachment size for each repository should not exceed 1G (recommended projects should not exceed 5G; GVP projects should not exceed 20G)
> The total capacity of attachments includes repository attachments and release attachments.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/124522_4e4e24ba_8249553.jpeg "08.jpeg")

8. If you need to inform the user that the release version is still unstable, check `This is a preview version`.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/124533_2adadaaa_8249553.jpeg "09.jpeg")

9. After checking the information is correct, click 'Create release' to publish the release. If you need to modify the release after it is published, refer to 'Edit release'.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/124626_48b6df86_8249553.jpeg "10.jpeg")

### How to Edit a Distribution

1. On Gitee, navigate to the main page of the repository.

2. On the right side of the file list, click on `Release Title` or `All`.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/124730_fb2abe5b_8249553.jpeg "01.jpeg")

3. On the right side of the release that needs to be edited, click on the `edit icon`.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/125302_5158e539_8249553.jpeg "13.jpeg")

4. After editing the content you need to modify, click 'Update'.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/125034_c0ef2f82_8249553.jpeg "12.jpeg")

### How to Delete a Release

1. On Gitee, navigate to the main page of the repository.

2. On the right side of the file list, click on `Release Title` or `All`.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/124730_fb2abe5b_8249553.jpeg "01.jpeg")

3. On the right side of the release that needs to be deleted, click on the `delete icon`.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/124940_38df24bf_8249553.jpeg "11.jpeg")

4. Click the 'Confirm' button in the delete release dialog to delete the release.

![Image Description](https://images.gitee.ru/uploads/images/2020/1126/125400_6a88eeaa_8249553.jpeg "14.jpeg")

[Gitee]:https://gitee.ru