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
  {
    type: 'category',
    collapsed: false,
    label: '常见问题',
    link: {
      type: 'generated-index',
      title: '常见问题',
      description: '常见问题',
      slug: '/enterprise/questions',
      keywords: ['常见问题'],
      image: '/img/docusaurus.png',
    },
    items: [
      // { type: 'doc', id: 'enterprise/base-questions/paid-value' },
      // { type: 'doc', id: 'enterprise/base-questions/service-comparison' },
      // { type: 'doc', id: 'enterprise/base-questions/feature-comparison' },
      // { type: 'doc', id: 'enterprise/base-questions/how-to-create-or-upgrade' },
      // { type: 'doc', id: 'enterprise/base-questions/entrance' },
      // { type: 'doc', id: 'enterprise/base-questions/exceeded-quota' },
    ],
  },
  {
    type: 'category',
    collapsed: false,
    label: '常见问题',
    link: {
      type: 'generated-index',
      title: '常见问题',
      description: '常见问题',
      slug: '/enterprise/questiodsns',
      keywords: ['常见问题'],
      image: '/img/docusaurus.png',
    },
    items: [
      // { type: 'doc', id: 'enterprise/base-questions/项目常见问题/如何更换项目负责人' },
      // { type: 'doc', id: 'enterprise/base-questions/项目常见问题/如何暂停正在进行的项目' },
      // { type: 'doc', id: 'enterprise/base-questions/项目常见问题/具有负责及的任务如何变更关联项目' },
    ],
  },

  
];

module.exports = sidebarItems;
