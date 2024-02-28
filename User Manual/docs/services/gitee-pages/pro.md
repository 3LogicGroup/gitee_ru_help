---
title: GiteePagesPro
authors:
  - name: No Mo
    url: https://gitee.ru/normalcoder
origin-url: https://gitee.ru/help/articles/4228
---

> Due to business adjustments, Gitee Pages Pro temporarily closes the personal user purchase entrance. Repositories of already activated users are not affected. GVP projects and paid enterprise usage are not affected.

Gitee Pages Pro is an upgraded version of Gitee Pages, with the following new features:

- Supports publishing a specific directory from the repository (e.g., you can publish the repository's document directory 'doc' as a static webpage)

- Support custom domain (e.g., <https://example.com>)

- Supports custom domain + https

## Function Introduction

`Gitee Pages` is a static page hosting service open to Gitee users. Users can publish their own sites using the default provided domain 'gitee.io'.

Currently, Gitee Pages supports `Jekyll`, `Hugo`, `Hexo`, and other static website generation engines. It can easily compile these types of static site projects online. Of course, raw HTML is also supported.

`Gitee Pages Pro` is the custom domain version of `Gitee Pages`. Currently, it can be used for free in Gitee GVP, Gitee Recommended Projects, and Gitee Paid Enterprise Editions.

>【Note】: [Open Enterprise Edition](https://gitee.ru/enterprises) can try Gitee Pages Pro service for free for one month, and after the trial period, it will automatically downgrade to Pages regular version. Enterprise Standard Edition and above can use Gitee Pages Pro for free, and after the enterprise expires, the service will automatically downgrade to Pages regular version.

## Enable Feature

To use the personal open source [Gitee Blog Mini Program] as an example, open the 'Gitee Pages' service by going to 'Repository Home' -> 'Services' -> 'Gitee Pages'. Under the default settings, simply click '**Start**' and confirm to enable the service.

![](https://images.gitee.ru/uploads/images/2018/1030/173827_8c73e7b2_551147.jpeg "166c4500c3de2d2b.jpg")

Introduction to Configuration Options

- Deployment Branch: branch used for deploying Pages
- Deployment Directory: Customize the directory for `Pages` source files.
- Custom Domain: User-defined domain name, needs to be resolved to `gitee.gitee.io` for it to take effect.
Configure domain certificate: Used to configure custom domain HTTPS certificate
- Start/Pause: Start/Pause the `Gitee Pages` service

For a project, the project's Pages may exist on different branches.
Or it may exist in a subdirectory of a branch, such as the 'docs' or 'pages' directory.

By specifying the deployment branch and deployment directory, we can easily accomplish custom deployment of Pages.

![](https://images.gitee.ru/uploads/images/2018/1030/173842_6c3fede6_551147.png )

## Apply for Certificate and Parse Domain

To enable HTTPS access on our website, we need to apply for an HTTPS certificate. Of course, we first need a domain name :)

Here we use the free SSL service provided by [Freessl]. Visit [Freessl], enter your own domain name on the homepage, and choose the type of certificate according to your needs.

Taking 'Let's Encrypt V2' as an example, after entering the applied domain name, click the 'Create' button to proceed to the next step.

![](https://images.gitee.ru/uploads/images/2018/1030/173855_6e14fefc_551147.png )

Enter the receiving email address for issuing the certificate, choose the type of certificate, verification method, and CSR file generation method, and click Create.

![](https://images.gitee.ru/uploads/images/2018/1030/173906_eafe0e3e_551147.png )

If using a browser to create a CSR file, be sure to save the downloaded private key file after generation. After clicking create, it is necessary to verify the DNS information of the related domain.

![](https://images.gitee.ru/uploads/images/2018/1030/173917_b970db0a_551147.png )

After modifying the domain name DNS as required and resolving the corresponding TXT record, you can click "Configuration completed, check it" to verify if the resolution is correctly configured. If the detection content in the pop-up page appears as shown in the figure below, it means that the resolution is completed.

![](https://images.gitee.ru/uploads/images/2018/1030/173927_cd2aaa78_551147.png )

At this time, you can click on "Click to Verify" to complete the verification. After the verification is completed, you can obtain a valid HTTPS certificate.

![](https://images.gitee.ru/uploads/images/2018/1030/173937_88db13c5_551147.png )

Paste the corresponding certificate and private key into the certificate setting of 'Gitee Pages', click 'Submit', and then redeploy. After confirming that the domain 'CNAME' is successfully resolved to 'gitee.gitee.io', you can access the website normally using your own domain.

![](https://images.gitee.ru/uploads/images/2018/1030/173956_b5fe3ef4_551147.png )

The final effect is as follows:

![](https://images.gitee.ru/uploads/images/2018/1030/174007_97582d78_551147.png )

## Summary

Through the four steps of 'Upload Code' -> 'Apply for Certificate' -> 'Domain Name Resolution' -> 'Deploy Gitee Pages', we can deploy a static website that supports HTTPS with 'Gitee Pages'. In addition, by choosing different static website generation tools and themes such as Jekyll, Hugo, Hexo, etc., you can easily create a cool personal website/blog.

[Gitee]:https://gitee.ru
[Gitee gitee.ru]:https://gitee.ru
[Github]:https://github.com
[Freessl]:https://freessl.cn
[Gitee Blog Mini Program]:https://gitee.ru/normalcoder/Gitee-Blog-Applets