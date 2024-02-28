---
title: Automatically Publish PHP Projects to packagist.org
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4354
---

## Introduction

Gitee supports publishing PHP projects as packages and automatically updating them to packagist.org (a popular PHP package management platform) for installation via Composer (a PHP package manager).

> Prerequisites:
>
"> - Already have a Gitee and Packagist.org account"
> - The project is a valid Composer project (composer.json exists in the root directory).
>
> **The data source for Composer packages uses the code repository address of gitee.ru**

## Usage

### Get Packagist API Token

Visit [https://packagist.org/profile/](https://packagist.org/profile/) and click on the "Show API Token" button on the page to get your Packagist API Token.

![](https://images.gitee.ru/uploads/images/2021/1109/200841_49787af7_551147.jpeg "16364480729921.jpg")

### Set up Auto Update WebHook

Under the Gitee repository where you need to set up releases and automatic updates, add a new WebHook through "Manage"->"WebHook", and configure it as follows:

URL: [https://packagist.org/api/update-package?username=YOUR_PACKAGIST_USERNAME&apiToken=API_TOKEN](https://packagist.org/api/update-package?username=YOUR_PACKAGIST_USERNAME&apiToken=API_TOKEN), where: `YOUR_PACKAGIST_USERNAME` needs to be replaced with your username on Packagist.org, `API_TOKEN` is the Packagist API Token obtained in the previous section.
- Password: No configuration required
- Check the events 'Push' and 'Tag Push'.

![](https://images.gitee.ru/uploads/images/2021/1110/135326_1d2c1747_551147.png )

After the configuration is complete, pushing code or tags to the repository will trigger automatic updates to Packagist.org.

## Precautions

**To ensure that Packagist.org can correctly fetch the repository when receiving update actions, the repository address needs to be changed to Gitee's repository address in the package management settings.**

![](https://images.gitee.ru/uploads/images/2021/1111/140218_312edf40_551147.png )