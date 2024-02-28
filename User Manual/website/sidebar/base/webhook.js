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
const sidebarItems = {
  webhook: [
    { type: 'doc', label: 'WebHoo 简介', id: 'webhook/gitee-webhook-intro' },
    { type: 'doc', label: '添加 WebHook', id: 'webhook/how-to-add-webhook' },
    { type: 'doc', label: '删除 WebHook', id: 'webhook/how-to-delete-webhook' },
    { type: 'doc', label: 'WebHook 推送数据类型说明', id: 'webhook/gitee-webhook-push-data-type' },
    { type: 'doc', label: 'WebHook 推送数据格式说明', id: 'webhook/gitee-webhook-push-data-format' },
    { type: 'doc', label: 'WebHook 密钥验证和验证算法', id: 'webhook/how-to-verify-webhook-keys' },
    { type: 'doc', label: 'WebHook 对 Slack 的支持', id: 'webhook/webhook-for-slack' },
    { type: 'doc', label: 'WebHook 对企业微信的支持', id: 'webhook/webhook-for-wecom-robot' },
    { type: 'doc', label: 'WebHook 对钉钉机器人的支持', id: 'webhook/webhook-for-dingtalk-robot' },
    { type: 'doc', label: 'WebHook 对飞书机器人的支持', id: 'webhook/webhook-for-feishu-robot' },
  ],
};

module.exports = sidebarItems;
