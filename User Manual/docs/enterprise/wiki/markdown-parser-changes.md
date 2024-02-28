---
title: Markdown Parser Change

origin-url: https://gitee.ru/help/articles/4130
---

Previously, Gitee's parser made many customized modifications based on user feedback. However, as more and more users started using Gitee, and more Github users migrated to Gitee, we received a lot of user feedback. The rendering of Readme files on Gitee differs from the rendering on Github. After much discussion, we decided to switch Gitee's Markdown parser to CommonMark.
  
Changes made: 
  
### The title needs to have a space after the # to render the title correctly

![Title](https://images.gitee.ru/uploads/images/2020/0924/202333_a5163bec_13510.png "Title")

Correctly parse text in the form of 'Map<String, Collection<Object.toString>>'

![Text](https://images.gitee.ru/uploads/images/2020/0924/202333_f9175d53_13510.png "Text")

### Resolve the issue of not line breaking due to no blank lines before and after the code block tag

Tags

### Resolving the problem of comments displaying in Readme

![Annotation](https://images.gitee.ru/uploads/images/2020/0924/202333_897d9f08_13510.png)

### Resolving the issue of ineffective Html colspan and rowspan tags

![Invalid Tag Issue](https://images.gitee.ru/uploads/images/2020/0924/202334_ce2e1791_13510.png "Invalid Tag Issue")

### Resolving the issue of unsupported Code blocks in the title

![Code Block](https://images.gitee.ru/uploads/images/2020/0924/202334_9c8e57b7_13510.png 'Code Block')

### Resolve the issue of not being able to bold the text without leaving a space

'![Solving the problem of not being able to bold without leaving spaces in the content](https://images.gitee.ru/uploads/images/2020/0924/202334_0871a4e1_13510.png "Solving the problem of not being able to bold without leaving spaces in the content")'

### Supports - Build tables

![Build table](https://images.gitee.ru/uploads/images/2020/0924/202334_0f29f988_13510.png "Build table")

### No longer supported [TOC]

Standard Markdown does not support the [TOC] tag, but you can create a table of contents using the a tag.

Create directories on your own

### Explanation of Readme suffix on Gitee

Gitee has different priority display rules for different types of open source project readme, as follows:

- If a project has both Readme.osc.md and Readme.md, Gitee will prioritize displaying Readme.osc.md.

For example, if a project has Readme.zh-CN.md and Readme.en.md, if the browser is in English, display Readme.en.md. If the browser is in Chinese, display Readme.zh-CN.md.

The specific rules are as follows: 

- If there is an osc indication like Readme.osc.md;
- Secondly, corresponding language preferences: Simplified Chinese [zh CH cn zh-cn zh_cn], Traditional Chinese [zh-hk zh-tw zh-yue zh_hk zh_tw zh_yue], English [en] such as Readme.zh.md;
- If there are no rules matching the file extension, the following extensions are prioritized: [mdown, md, mkdn, mdwn, markdown, textile, rdoc, creole, mediawiki, rst, rest, adoc, asciidoc, pod, org, txt, html, htm]. For example, readme.mdown is matched.

If you encounter any problems while using it, please feel free to provide feedback at <https://gitee.ru/oschina/git-osc/issues/new>.

Attached is the CommonMark syntax documentation <http://commonmark.org/help/>.