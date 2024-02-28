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
    'repository/intro',
    { type: 'doc', label: '重命名、移动文件', id: 'repository/file-operate/intro' },
    {
      type: 'category',
      collapsed: false,
      label: '基本功能',
      link: {
        type: 'generated-index',
        title: '基本功能',
        description: '基本功能文档',
        slug: '/repository/base-usage',
        keywords: ['基本功能'],
        image: '/img/docusaurus.png',
      },
      items: [
        { type: 'doc', label: '重命名、移动文件', id: 'repository/file-operate/intro' },
      ],
    },
  ];

module.exports = sidebarItems;
 // 功能和安全设置
