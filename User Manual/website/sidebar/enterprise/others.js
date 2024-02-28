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
    label: '信息通知',
    link: {
      type: 'generated-index',
      title: '信息通知',
      description: '信息通知',
      slug: '/enterprise/notice',
      keywords: ['信息通知'],
      image: '/img/docusaurus.png',
    },
    items: [
      // { type: 'doc', id: 'enterprise/notice/intro', },
      { type: 'doc', id: 'enterprise/notice/支持微信通知', },
      { type: 'doc', id: 'enterprise/notice/支持钉钉通知', },
      { type: 'doc', id: 'enterprise/notice/支持私信、邮件通知', },
    ],
  },
  
  {
    type: 'category',
    collapsed: false,
    label: '功能和安全设置',
    link: {
      type: 'generated-index',
      title: '功能和安全设置',
      description: '功能和安全设置',
      slug: '/enterprise/project',
      keywords: ['功能和安全设置'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/settings/ip-whitelist', },
      { type: 'doc', id: 'enterprise/settings/禁止仓库强推', },
      { type: 'doc', id: 'enterprise/settings/设置企业信息', },
      { type: 'doc', id: 'enterprise/settings/账号安全设置', },
      { type: 'doc', id: 'enterprise/settings/代码推拉方式设置', },
      { type: 'doc', id: 'enterprise/settings/异常行为监控告警', },
    ],
  },
  
  {
    type: 'category',
    collapsed: false,
    label: '付款、发票和服务',
    link: {
      type: 'generated-index',
      title: '付款、发票和服务',
      description: '付款、发票和服务',
      slug: '/enterprise/project',
      keywords: ['付款、发票和服务问题'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/invoice/企业账号开具发票', },
      { type: 'doc', id: 'enterprise/invoice/发票申请注意事项', },
      { type: 'doc', id: 'enterprise/invoice/查看发票快递信息', },
      { type: 'doc', id: 'enterprise/invoice/免费企业账号升级为付费版本', },
      { type: 'doc', id: 'enterprise/invoice/企业版赔付机制', },
      { type: 'doc', id: 'enterprise/invoice/合同到期，代码资产怎么处理', },
    ],
  },
  
  { type: 'doc', id: 'enterprise/mini-program', },
];

module.exports = sidebarItems;
 // project 和任务协作
