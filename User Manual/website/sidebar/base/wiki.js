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
    { type: 'doc', label: 'Wiki 知识库 简介', id: 'base/wiki/intro' },
    { type: 'doc', label: '文档创建', id: 'base/wiki/new' },
    { type: 'doc', label: '文档编辑', id: 'base/wiki/edit' },
    { type: 'doc', label: '文档导入/导出', id: 'base/wiki/import-export' },
    { type: 'doc', label: '文档管理', id: 'base/wiki/manage' },
    { type: 'doc', label: '文档预览', id: 'base/wiki/preview' },
]

module.exports = sidebarItems;
