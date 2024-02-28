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
        type: 'category', collapsed: true, label: 'IDE 插件集成',
        link: {
            type: 'generated-index', title: 'IDE 插件集成',
            description: 'IDE 插件集成',
            slug: '/ide-plugin',
            keywords: ['服务集成'], image: '/img/docusaurus.png',
        }, items: [
            { type: 'doc', id: 'services/ide-plugins/intro', },
            { type: 'doc', id: 'services/ide-plugins/IDEA', },
            { type: 'doc', id: 'services/ide-plugins/visual-studio', },
            { type: 'doc', id: 'services/ide-plugins/eclipse', },
            { type: 'doc', id: 'services/ide-plugins/atom', },
            { type: 'doc', id: 'services/ide-plugins/tutorials', },
        ],
    },
];


module.exports = sidebarItems;
