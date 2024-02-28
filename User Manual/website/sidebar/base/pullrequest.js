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
    { type: 'doc', label: 'Pull Request 功能简介', id: 'base/pullrequest/intro' },

    {
      type: 'category',
      collapsed: true,
      label: '创建 Pull Request',
      link: {
        type: 'generated-index',
        title: '创建 Pull Request',
        description: '创建 Pull Request 的两种模式',
        // slug: '/repository/member',
        keywords: ['创键 Pull Request'],
        image: '/img/docusaurus.png',
      },
      items: [
        { type: 'doc', label: '“Fork + Pull”模式', id: 'base/pullrequest/Fork+Pull' },
        { type: 'doc', label: '“Gitee 轻量级 PR”模式', id: 'base/pullrequest/lite' },
      ],
    },

    { type: 'doc', label: 'Pull Request 草稿功能', id: 'base/pullrequest/draft' },
    { type: 'doc', label: 'Pull Request 支持扁平化 (Squash) 合并功能', id: 'base/pullrequest/squash' },

    {
      type: 'category',
      collapsed: true,
      label: 'Pull Request 审查功能介绍',
      link: {
        type: 'generated-index',
        title: 'Pull Request 审查功能介绍',
        description: '成员管理文档',
        // slug: '/repository/member',
        keywords: ['Pull Request 审查功能介绍'],
        image: '/img/docusaurus.png',
      },
      items: [
        { type: 'doc', label: '代码审查', id: 'base/pullrequest/review' },
        { type: 'doc', label: '代码评论', id: 'base/pullrequest/comment' },
        { type: 'doc', label: '代码「已阅」功能', id: 'base/pullrequest/check' },
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Pull Request 质量扫描',
      link: {
        type: 'generated-index',
        title: 'Pull Request 质量扫描',
        description: '成员管理文档',
        // slug: '/repository/member',
        keywords: ['Pull Request 质量扫描'],
        image: '/img/docusaurus.png',
      },
      items: [
        { type: 'doc', label: '缺陷/规范扫描', id: 'base/pullrequest/defect' },
        { type: 'doc', label: '依赖项扫描', id: 'base/pullrequest/dependency' },
      ],
    },
    { type: 'doc', label: 'Pull Request 质量门禁', id: 'base/pullrequest/quality-access' },
    { type: 'doc', label: 'Pull Request 门禁检查', id: 'base/pullrequest/ci-check' },

    { type: 'doc', label: '标签管理', id: 'base/pullrequest/tag' },
    { type: 'doc', label: '里程碑管理', id: 'base/pullrequest/milestone' },
    { type: 'doc', label: 'Pull Request 关联 Issue', id: 'base/pullrequest/issue' },
  ];

module.exports = sidebarItems;
