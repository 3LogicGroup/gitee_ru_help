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
    { type: 'doc', label: 'Issue 简介', id: 'base/issue/intro' },
    { type: 'doc', label: '创建 Issue', id: 'base/issue/new' },
    { type: 'doc', label: 'Issue 指派', id: 'base/issue/assignment' },
    { type: 'doc', label: 'Issue 任务优先级', id: 'base/issue/priority' },
    { type: 'doc', label: '标签管理', id: 'base/issue/tag' },
    { type: 'doc', label: '里程碑管理', id: 'base/issue/milestone' },
    { type: 'doc', label: '任务看板', id: 'base/issue/sidebar' },
    { type: 'doc', label: 'Issue 关联 Pull Request', id: 'base/issue/PR' },
    { type: 'doc', label: 'Issue 模板功能', id: 'base/issue/template' },
    { type: 'doc', label: 'Gitee 表单范式', id: 'base/syntax-for-gitees-form-schema' },
  ];

module.exports = sidebarItems;
