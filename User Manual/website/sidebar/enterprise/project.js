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

  { type: 'doc', id: 'enterprise/project/intro', },
  {
    type: 'category',
    collapsed: false,
    label: '项目管理',
    link: {
      type: 'generated-index',
      title: '项目管理',
      description: '基本功能文档',
      slug: '/enterprise/project',
      keywords: ['项目管理'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/project/新建项目', },
      { type: 'doc', id: 'enterprise/project/删除项目', },
      { type: 'doc', id: 'enterprise/project/项目与仓库的关系', },
      { type: 'doc', id: 'enterprise/project/项目文档如何协作', },
      { type: 'doc', id: 'enterprise/project/项目中如何添加成员', },
    ],
  },

  // { type: 'doc', id: 'enterprise/project/测试管理' },
  {
    type: 'category',
    collapsed: false,
    label: '任务管理',
    link: {
      type: 'generated-index',
      title: '任务管理',
      description: '基本功能文档',
      slug: '/enterprise/issues',
      keywords: ['任务管理'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/issues/任务关联关系设置' },
      { type: 'doc', id: 'enterprise/issues/自定义任务类型与状态' },
      { type: 'doc', id: 'enterprise/issues/任务拆分与关联' },
      { type: 'doc', id: 'enterprise/issues/任务查看与编辑' },
    ],
  },
];

module.exports = sidebarItems;
 // project 和任务协作
