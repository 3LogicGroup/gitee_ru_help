/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
const { requireUncached } = require('../plugin/utils');
const requireX = (path) => requireUncached(require.resolve(path));

/** @type {import("@docusaurus/plugin-content-docs/src/sidebars/types").SidebarConfig} */
const sidebarItems = [
    'enterprise/wiki/文档权限管理',
    {
        type: 'category', collapsed: true, label: '产品简介',
        link: {
            type: 'generated-index', title: '产品简介', description: '产品简介文档', slug: '/education',
            keywords: ['产品简介'], image: '/img/docusaurus.png',
        }, items: [],
    },
    {
        type: 'category', collapsed: true, label: '功能介绍',
        link: {
            type: 'generated-index', title: '功能介绍', description: '功能介绍文档', slug: '/education/intro',
            keywords: ['功能介绍'], image: '/img/docusaurus.png',
        }, items: [],
    },
    {
        type: 'category', collapsed: true, label: '高校介绍',
        link: {
            type: 'generated-index', title: '高校介绍', description: '高校介绍文档', slug: '/education/highschool',
            keywords: ['高校介绍'], image: '/img/docusaurus.png',
        }, items: [],
    },
    {
        type: 'category', collapsed: true, label: '视频中心',
        link: {
            type: 'generated-index', title: '视频中心', description: '视频中心文档', slug: '/education//videos',
            keywords: ['视频中心'], image: '/img/docusaurus.png',
        }, items: [],
    },
    {
        type: 'category', collapsed: true, label: '免费申请高校版',
        link: {
            type: 'generated-index', title: '免费申请高校版', description: '免费申请高校版文档', slug: '/education/apply',
            keywords: ['免费申请高校版'], image: '/img/docusaurus.png',
        }, items: [],
    },
    {
        type: 'category', collapsed: true, label: '服务协议',
        link: {
            type: 'generated-index', title: '服务协议', description: '服务协议文档', slug: '/education/terms',
            keywords: ['服务协议'], image: '/img/docusaurus.png',
        }, items: [],
    },
  ];

module.exports = sidebarItems;