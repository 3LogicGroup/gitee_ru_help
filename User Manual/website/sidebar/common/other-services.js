/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs/src/sidebars/types').SidebarConfig} */

const sidebarItems = [

  { type: 'doc', label: 'Gitee Scan 代码扫描', id: 'services/gitee-scan' },
  { type: 'doc', label: 'Sonar 代码质量分析', id: 'services/SonarQube' },
  {
    type: 'category',
    collapsed: true,
    label: 'Gitee Pages 静态页面托管',
    link: {
      type: 'generated-index',
      title: 'Gitee Pages',
      description: 'Gitee Pages',
      slug: '/services/gitee-pages',
      keywords: ['Gitee Pages'],
      image: '/img/docusaurus.png',
    },
    items: ['services/gitee-pages/intro', 'services/gitee-pages/pro', 'services/gitee-pages/spa-support'],
  },
  {
    type: 'category',
    collapsed: true,
    label: '代码文档生成服务',
    link: {
      type: 'generated-index',
      title: '文档生成与托管',
      description: '文档生成与托管',
      slug: '/services/apidocs',
      keywords: ['文档生成与托管'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', label: 'JavaDoc 文档生成', id: 'services/apidocs/JavaDoc' },
      { type: 'doc', label: 'PHPDoc 文档生成', id: 'services/apidocs/PHPDoc' },
    ],
  },
  { type: 'doc', label: '安卓在线构建', id: 'services/Android-build-online' },
];


module.exports = sidebarItems;
