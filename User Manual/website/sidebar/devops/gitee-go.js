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
  'devops/gitee-go/intro',
  'devops/gitee-go/quick-start',
  'devops/gitee-go/get-started-in-3-steps',
  'devops/gitee-go/price',
  {
    type: 'category',
    collapsed: false,
    label: '流水线配置',
    link: {
      type: 'generated-index',
      title: '流水线配置',
      description: '流水线配置',
      // slug: '/devops/gitee-go/config',
      keywords: ['流水线配置'],
      image: '/img/docusaurus.png',
    },
    items: [
      'devops/gitee-go/pipeline-configure/basic-confiure',
      'devops/gitee-go/pipeline-configure/trigger',
      'devops/gitee-go/pipeline-configure/scheduling',
      'devops/gitee-go/pipeline-configure/parameter',
      'devops/gitee-go/pipeline-configure/advanced-options',
      // 'devops/gitee-go/pipeline-configure/permission',
      // 'devops/gitee-go/pipeline-configure/stage-permissions',
      // 'devops/gitee-go/pipeline-configure/notification',
    ],
  },
  {
    type: 'category',
    collapsed: false,
    label: '流水线插件',
    link: {
      type: 'generated-index',
      title: '流水线插件',
      description: '流水线插件',
      // slug: '/devops/gitee-go/config',
      keywords: ['流水线插件'],
      image: '/img/docusaurus.png',
    },
    items: [
      'devops/gitee-go/plugins/ci-build',
      'devops/gitee-go/plugins/deploy',
      'devops/gitee-go/plugins/image-build-and-deployment',
      'devops/gitee-go/plugins/test',
      'devops/gitee-go/plugins/shell',
    ],
  },
  // {
  //   type: 'category',
  //   collapsed: false,
  //   label: '主机管理',
  //   link: {
  //     type: 'generated-index',
  //     title: '主机管理',
  //     description: '主机管理',
  //     // slug: '/devops/gitee-go/config',
  //     keywords: ['主机管理'],
  //     image: '/img/docusaurus.png',
  //   },
  //   items: [
  //     'devops/gitee-go/host-manage/deploy-to-host-via-pipeline',
  //     'devops/gitee-go/host-manage/host-group-management',
  //   ],
  // },
  // {
  //   type: 'category',
  //   collapsed: false,
  //   label: '常见问题',
  //   link: {
  //     type: 'generated-index',
  //     title: '常见问题',
  //     description: '常见问题',
  //     // slug: '/devops/gitee-go/config',
  //     keywords: ['常见问题'],
  //     image: '/img/docusaurus.png',
  //   },
  //   items: [
  //     'devops/gitee-go/host-manage/deploy-to-host-via-pipeline',
  //     'devops/gitee-go/host-manage/host-group-management',
  //   ],
  // },
  'devops/gitee-go/contact-us',
];

module.exports = sidebarItems;
//Gitee Go
