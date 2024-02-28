---
title: Gitee Pages

origin-url: https://gitee.ru/help/articles/4136
---

### Description

Gitee Pages is a free static webpage hosting service that allows you to host static webpages such as blogs and project websites.

Currently Gitee Pages supports Jekyll, Hugo, Hexo to compile static resources.

### Criteria for compiling Jekyll, Hugo, and Hexo

1. Compile Hugo based on: When the repository compilation directory contains `config.toml|json|yaml` files and the `content` directory, `hugo` will be used to generate static files.
2. Hexo is compiled based on the presence of package.json, _config.yml files, and the scaffolds directory in the compilation directory of the repository. Since each deployment requires cloning the code, executing npm install, and compiling, the deployment time is relatively longer compared to Hugo and Jekyll.
3. When the above conditions 1 and 2 are not met, use Jekyll to compile.

Frequently asked questions

1. How to create a homepage with an access address without a secondary directory, like ipvb.gitee.io?

Q: If you want the homepage of your pages to be accessed without a subdirectory, such as ipvb.gitee.io, **you need to create a repository with the same name as your personalized address**. For example, this user <https://gitee.ru/ipvb> wants to create their own site but does not want to access it in a subdirectory. They want to access it directly with `ipvb.gitee.io`, so they can create a repository named `ipvb` <https://gitee.ru/ipvb/ipvb> After deployment, it can be accessed using <https://ipvb.gitee.io>.

2. When the project to be deployed does not match the personal address, there may be resource access 404 after the deployment is completed.

Answer: When the repository to be deployed does not match your personalized address, such as: <https://gitee.ru/ipvb/blog>, the generated pages URL is <https://ipvb.gitee.io/blog>, and the requested resource returns a 404 error, such as <https://ipvb.gitee.io/style.css>. This is due to a problem with the relative path in the corresponding configuration file, and the generated resource URL should be <https://ipvb.gitee.io/blog/style.css>. For different static resource generators, the configurations are as follows:
     - Modify the baseURL in the Hugo configuration file `config.toml` as follows:

       ```toml
       baseURL = "https://ipvb.gitee.io/blog"
       ```

     - Modify the Hexo configuration file `_config.yml` as follows for `url` and `root`:

       ```toml
       url: https://ipvb.gitee.io/blog
       root: /blog
       ```

     - Modify the Jekyll configuration file `_config.yml` as follows for `baseurl`:

       ```toml
       baseurl: "/blog" # the subpath of your site, e.g. /blog
       ```

3. Jekyll cannot access folders or files starting with an underscore, for example: _layouts
Answer: You need to create _config.yml in the root directory of the repository and write: include: [_layouts]

4. How to customize 404?
   Answer: Create a new file named 404.html in the root directory of the repository.

5. How to not trigger Jekyll compilation.

A: Create a .nojekyll file in the root directory of the repository.

### 1. Precautions

1. The repository must have an index.html in order to be accessed properly

2. The style of static web pages can be self-written or modified from some static templates. The Pages service itself does not provide any form of templates, but we will gradually add examples for reference.

### 2. A newbie's journey of building Pages

A. Create a new repository test_pages

![Image Description](https://static.oschina.net/uploads/img/201806/26173338_Pmcg.png)

Click to complete the repository creation

**B. Add the file `index.html` (note that the name should be index.html!)**

Click to create a new file

![Image Description](https://static.oschina.net/uploads/img/201806/26172523_5GI8.png)

Enter the filename as `index.html` and the content is a simple `html`.

![Image Description](https://static.oschina.net/uploads/img/201806/26173106_Jn2d.png)

Click Submit to submit the file to the repository

**C. Select pages service**

![Image Description](https://static.oschina.net/uploads/img/201806/26173423_zzeF.png)

**D. Select the branch to be deployed, here choose Master to start the service.**

![Image Description](https://static.oschina.net/uploads/img/201806/26173508_e3TE.png)

**E. Visit the generated website address to view the static pages you deployed!**

![Image Description](https://static.oschina.net/uploads/img/201806/26173825_h9D1.png)
![Image Description](https://static.oschina.net/uploads/img/201806/26173847_USPU.png)

### 3. How to deploy an existing Pages repository to Gitee Pages

Using the `jQuery-File-Upload` repository as an example, the repository address is: <https://github.com/blueimp/jQuery-File-Upload>

Its Pages address on Github is: <https://blueimp.github.io/jQuery-File-Upload/>

If you want to move it to Gitee Pages, just log in to your Gitee account, click the '+' in the upper right corner, and select 'New Repository'.

![Image Description](https://static.oschina.net/uploads/img/201806/26174500_j9HQ.png)

![Image Description](https://static.oschina.net/uploads/img/201806/26174556_lc6V.png)

![Image Description](https://static.oschina.net/uploads/img/201806/26174630_Kpri.png)

Then click create, the repository will be automatically imported in the background. After successful import, click on the menu bar's service dropdown `Gitee Pages`

![Image Description](https://static.oschina.net/uploads/img/201806/26175015_PomW.png)

![Image Description](https://static.oschina.net/uploads/img/201806/26175207_KKZ0.png)

Here we assume that the `Pages` service branch is the default branch of the repository, but you have also selected the branch where your static pages are located. For example, the static pages branch of the `jQuery-File-Upload` repository is `gh-pages`. Select `gh-pages` and click on start service.

![Image Description](https://static.oschina.net/uploads/img/201806/26175333_xxzm.png)
At this point, the static webpage has been successfully deployed. Access the provided address at https://frech.gitee.io/jquery-file-upload to view the static website of the 'jQuery-File-Upload' repository.

![Image Description](https://static.oschina.net/uploads/img/201806/26175421_ikZP.png)

### 4. Pages Advanced, Use Jekyll, Hugo, Hexo to Generate Your Own Static Web Pages

What are Jekyll, Hugo, and Hexo?

Jekyll, Hugo, and Hexo are simple blog-like static site generators. They have a template directory that contains documents in the original text format, which can be transformed into HTML files using the template engine.

* Jekyll Documentation: <https://www.jekyll.com.cn/docs/home/>
* Hugo Documentation: <https://gohugo.io/documentation/>
* Hexo User Documentation: <https://hexo.io/docs/>