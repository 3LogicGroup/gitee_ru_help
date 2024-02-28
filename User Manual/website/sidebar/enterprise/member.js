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
    label: '成员管理',
    link: {
      type: 'generated-index',
      title: '成员管理',
      description: '成员管理',
      slug: '/enterprise/member',
      keywords: ['成员管理'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/member/成员分配角色' },
      { type: 'doc', id: 'enterprise/member/角色权限配置' },
      { type: 'doc', id: 'enterprise/member/添加企业成员' },
      { type: 'doc', id: 'enterprise/member/移出企业成员' },
      { type: 'doc', id: 'enterprise/member/锁定企业成员' },
      { type: 'doc', id: 'enterprise/member/重置成员密码' },
    ],
  },


  {
    type: 'category',
    collapsed: false,
    label: '团队管理',
    link: {
      type: 'generated-index',
      title: '团队管理',
      description: '团队管理',
      slug: '/enterprise/member/team',
      keywords: ['团队管理'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/member/创建团队' },
      { type: 'doc', id: 'enterprise/member/删除团队' },
      { type: 'doc', id: 'enterprise/member/转入团队' },
      { type: 'doc', id: 'enterprise/member/外包团队管理' },
      { type: 'doc', id: 'enterprise/member/成员权限设置' },
      { type: 'doc', id: 'enterprise/member/受邀加入企业' },
    ],
  },
  

];

module.exports = sidebarItems;
 // 企业成员管理
