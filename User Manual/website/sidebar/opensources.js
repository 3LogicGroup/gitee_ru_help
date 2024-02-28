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
    { type: 'doc', label: '开源贡献者协议', id: 'opensources/cla/intro' },
    { type: 'doc', label: '创建、管理贡献者协议', id: 'opensources/cla/manage' },
    { type: 'doc', label: '如何签署 CLA', id: 'opensources/cla/sign' },
    // { type: 'doc', label: '', id: 'opensources/cla/intro' },
    // { type: 'doc', to: 'opensources/cla/intro' },
    // { type: 'doc', to: 'opensources/cla/sd' },
    // {
    //   type: 'category',
    //   collapsed: true,
    //   label: '开源许可协议',
    //   link: {
    //     type: 'generated-index',
    //     title: '开源许可协议',
    //     description: '开源许可协议',
    //     slug: '/license',
    //     keywords: ['开源许可协议'],
    //     image: '/img/docusaurus.png',
    //   },
    //   items: [{ type: 'doc', label: '简介', id: 'opensources/license/intro' }],
    // },
    // {
    //   type: 'category',
    //   collapsed: true,
    //   label: '社区行为规范',
    //   link: {
    //     type: 'generated-index',
    //     title: '社区行为规范',
    //     description: '社区行为规范',
    //     slug: '/guidelines',
    //     keywords: ['社区行为规范'],
    //     image: '/img/docusaurus.png',
    //   },
    //   items: [{ type: 'doc', label: '简介', id: 'opensources/guidelines/intro' }],
    // },
    // {
    //   type: 'category',
    //   collapsed: true,
    //   label: '开源贡献者协议',
    //   link: {
    //     type: 'generated-index',
    //     title: '开源贡献者协议',
    //     description: '开源贡献者协议',
    //     slug: '/cla',
    //     keywords: ['开源贡献者协议'],
    //     image: '/img/docusaurus.png',
    //   },
    //   items: [{ type: 'doc', label: '简介', id: 'opensources/guidelines/intro' }],
    // },
    // {
    //   type: 'category',
    //   collapsed: true,
    //   label: '贡献指南',
    //   link: {
    //     type: 'generated-index',
    //     title: '贡献指南',
    //     description: '贡献指南',
    //     slug: '/contribute',
    //     keywords: ['贡献指南'],
    //     image: '/img/docusaurus.png',
    //   },
    //   items: [{ type: 'doc', label: '简介', id: 'opensources/contribute/intro' }],
    // },
    // {
    //   type: 'category',
    //   collapsed: true,
    //   label: '优秀开源案例',
    //   link: {
    //     type: 'generated-index',
    //     title: '优秀开源案例',
    //     description: '优秀开源案例',
    //     slug: '/case',
    //     keywords: ['优秀开源案例'],
    //     image: '/img/docusaurus.png',
    //   },
    //   items: [{ type: 'doc', label: '简介', id: 'opensources/case/intro' }],
    // },
  ];

module.exports = sidebarItems;
