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
const activitysItems = require('./activitys');
const requireX = (path) => requireUncached(require.resolve(path));

/** @type {import("@docusaurus/plugin-content-docs/src/sidebars/types").SidebarConfig} */
const sidebarItems = [
  // 'repository/intro',
  //   'enterprise/wiki/文件共享',
  //   'enterprise/mini-program',
  {
    type: 'category',
    collapsed: true,
    label: '产品介绍',
    link: {
      type: 'generated-index',
      title: '产品介绍',
      slug: '/enterprise/',
      keywords: ['产品介绍'],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'doc',
        label: 'Gitee 企业版是什么',
        id: 'enterprise/产品介绍/Gitee 企业版是什么',
      },
      {
        type: 'doc',
        label: 'Gitee 企业版产品优势',
        id: 'enterprise/产品介绍/Gitee 企业版产品优势',
      },
      // {
      //   type: 'doc',
      //   label: 'Gitee 企业版资质认证 ',
      //   id: 'enterprise/mini-program',
      // },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '产品计费',
    link: {
      type: 'generated-index',
      title: '产品计费',
      description: '产品计费',
      slug: '/enterprise/billing',
      keywords: ['产品计费'],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'link',
        label: 'Gitee 企业版 2022 资费 ',
        href: 'https://gitee.ru/enterprises/price',
      },
      {
        type: 'link',
        label: '企业版功能说明 ',
        href: 'https://gitee.ru/enterprises',
      },
      // {
      //   type: 'doc',
      //   label: '企业版购买 FAQ ',
      //   id: 'enterprise/mini-program',
      // },
    ],
  },
  //   {
  //     type: 'category',
  //     collapsed: true,
  //     label: '快速上手',
  //     link: {
  //       type: 'generated-index',
  //       title: '快速上手',
  //       description: '快速上手',
  //       slug: '/enterprise/get-standard',
  //       keywords: ['快速上手'],
  //       image: '/img/docusaurus.png',
  //     },
  //     items: [{
  //         type: 'doc',
  //         label: 'Gitee 企业版快速上手 ',
  //         id: 'enterprise/mini-program'
  //       },
  //       {
  //         type: 'doc',
  //         label: '登陆/创建企业 ',
  //         id: 'enterprise/mini-program'
  //       },
  //       {
  //         type: 'doc',
  //         label: '产品 ',
  //         id: 'enterprise/mini-program'
  //       },
  //       {
  //         type: 'doc',
  //         label: '测试 ',
  //         id: 'enterprise/mini-program'
  //       },
  //       {
  //         type: 'doc',
  //         label: '开发 ',
  //         id: 'enterprise/mini-program'
  //       },
  //       {
  //         type: 'doc',
  //         label: '交付 ',
  //         id: 'enterprise/mini-program'
  //       },
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     collapsed: true,
  //     label: '最佳实践',
  //     link: {
  //       type: 'generated-index',
  //       title: '最佳实践',
  //       description: '最佳实践',
  //       slug: '/enterprise/best-practices',
  //       keywords: ['最佳实践'],
  //       image: '/img/docusaurus.png',
  //     },
  //     items: [{
  //       type: 'doc',
  //       label: '预留：当前无沉淀 ',
  //       id: 'enterprise/mini-program'
  //     }, ],
  //   },
  {
    type: 'category',
    collapsed: true,
    label: '企业管理',
    link: {
      type: 'generated-index',
      title: '企业管理',
      description: '企业管理',
      slug: '/enterprise/management',
      keywords: ['企业管理'],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'category',
        label: '工作台',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/dashboard',
        },
        items: [
          'enterprise/management/dashboard/entry',
          'enterprise/management/dashboard/add',
          'enterprise/management/dashboard/remove',
          'enterprise/management/dashboard/configure',
          'enterprise/management/dashboard/layout',
        ],
      },
      {
        type: 'category',
        label: '企业设置',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/settings',
        },
        items: [
          'enterprise/management/settings/info',
          'enterprise/management/settings/address',
          'enterprise/management/settings/invoice',
          'enterprise/management/settings/notice',
          'enterprise/management/settings/delete',
          'enterprise/management/settings/transfer',
        ],
      },
      {
        type: 'category',
        label: '成员管理',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/members',
        },
        items: [
          'enterprise/management/members/roles',
          'enterprise/management/members/roles-detail',
          'enterprise/management/members/add',
          'enterprise/management/members/change-role',
          'enterprise/management/members/remove',
          'enterprise/management/members/lock',
          'enterprise/management/members/reset-password',
        ],
      },
      {
        type: 'category',
        label: '团队管理',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/teams',
        },
        items: [
          'enterprise/management/teams/new',
          'enterprise/management/teams/transfer',
          'enterprise/management/teams/edit',
          'enterprise/management/teams/outsourcing',
          'enterprise/management/teams/outsourcing-invite',
        ],
      },
      {
        type: 'category',
        label: '功能管理',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/functions',
        },
        items: [
          'enterprise/management/functions/automation',
          'enterprise/management/functions/issues',
          'enterprise/management/functions/labels',
          'enterprise/management/functions/priorities',
          'enterprise/management/functions/nav',
          {
            type: 'category',
            label: 'WebHooks 管理',
            link: {
              type: 'generated-index',
              slug: 'enterprise/management/functions/webhooks',
            },
            items: [
              'enterprise/management/functions/webhooks/intro',
              'enterprise/management/functions/webhooks/add',
              'enterprise/management/functions/webhooks/delete',
              'enterprise/management/functions/webhooks/test',
              'enterprise/management/functions/webhooks/verify',
              'enterprise/management/functions/webhooks/push-data-type',
              'enterprise/management/functions/webhooks/push-data-format',
              'enterprise/management/functions/webhooks/webhook-for-dingtalk-robot',
              'enterprise/management/functions/webhooks/webhook-for-feishu-robot',
              'enterprise/management/functions/webhooks/webhook-for-wecom-robot',
              'enterprise/management/functions/webhooks/webhook-for-slack',
            ],
          },
          'enterprise/management/functions/deploy-keys',
        ],
      },
      {
        type: 'category',
        label: '资源管理',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/resource',
        },
        items: [
          {
            type: 'ref',
            label: '主机管理',
            id: 'enterprise/pipeline/enterprise-setup/host/多云主机组管理',
          },
          {
            type: 'ref',
            label: '凭证管理',
            id: 'enterprise/pipeline/enterprise-setup/certificate/凭证管理',
          },
        ],
      },
      {
        type: 'category',
        label: '安全性管理',
        link: {
          type: 'generated-index',
          slug: 'enterprise/management/securities',
        },
        items: [
          'enterprise/management/securities/operate-logs',
          'enterprise/management/securities/emergencies',
          'enterprise/management/securities/emergencies-settings',
          'enterprise/management/securities/settings',
        ],
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '项目管理 Project',
    link: {
      type: 'generated-index',
      title: '项目管理 Project ',
      description: '项目管理 Project',
      slug: '/enterprise/project',
      keywords: ['项目管理', 'Project'],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'doc',
        label: '产品介绍',
        id: 'enterprise/project/intro',
      },
      {
        type: 'category',
        label: '新建项目',
        link: {
          type: 'generated-index',
          slug: 'enterprise/project/new',
        },
        items: [
          {
            type: 'doc',
            id: 'enterprise/project/new/scrum',
            label: '敏捷项目',
          },
          {
            type: 'doc',
            id: 'enterprise/project/new/standard',
            label: '标准项目',
          },
          {
            type: 'doc',
            id: 'enterprise/project/new/kanban',
            label: '看板项目',
          },
        ],
      },
      {
        type: 'category',
        label: '项目配置',
        link: {
          type: 'generated-index',
        },
        items: [
          {
            type: 'doc',
            label: '成员管理',
            id: 'enterprise/project/settings/members',
          },
          {
            type: 'doc',
            label: '组件设置',
            id: 'enterprise/project/settings/components',
          },
          {
            type: 'doc',
            label: '管理模式设置',
            id: 'enterprise/project/settings/mode',
          },
          {
            type: 'doc',
            label: 'WebHook 设置',
            id: 'enterprise/project/settings/webhooks',
          },
          {
            type: 'category',
            label: '工作项设置',
            link: {
              type: 'generated-index',
            },
            items: [
              {
                type: 'doc',
                label: '工作项类型设置',
                id: 'enterprise/project/settings/issues/types',
              },
              {
                type: 'doc',
                label: '工作项字段设置',
                id: 'enterprise/project/settings/issues/fields',
              },
              {
                type: 'doc',
                label: '工作项状态设置',
                id: 'enterprise/project/settings/issues/states',
              },
              {
                type: 'doc',
                label: '工作流设置',
                id: 'enterprise/project/settings/issues/flow',
              },
            ],
          },
        ],
      },
      {
        type: 'category',
        label: '迭代管理',
        link: {
          type: 'generated-index',
        },
        items: [
          {
            type: 'doc',
            label: '新建迭代',
            id: 'enterprise/project/sprints/new',
          },
          {
            type: 'doc',
            label: '迭代概览',
            id: 'enterprise/project/sprints/overview',
          },
          {
            type: 'doc',
            label: '迭代规划',
            id: 'enterprise/project/sprints/planning',
          },
          {
            type: 'doc',
            label: '迭代知识库',
            id: 'enterprise/project/sprints/wiki',
          },
        ],
      },
      {
        type: 'category',
        label: '版本管理',
        link: {
          type: 'generated-index',
        },
        items: [
          {
            type: 'doc',
            label: '新建版本',
            id: 'enterprise/project/versions/new',
          },
          {
            type: 'doc',
            label: '规划版本',
            id: 'enterprise/project/versions/planning',
          },
          {
            type: 'doc',
            label: '发布版本',
            id: 'enterprise/project/versions/release',
          },
        ],
      },
      {
        type: 'category',
        label: '测试管理',
        link: {
          type: 'generated-index',
        },
        items: [
          {
            type: 'doc',
            label: '管理测试用例',
            id: 'enterprise/project/tests/cases',
          },
          {
            type: 'doc',
            label: '制定测试计划',
            id: 'enterprise/project/tests/plans',
          },
        ],
      },
      {
        type: 'category',
        label: '知识库',
        link: {
          type: 'generated-index',
          slug: 'enterprise/project/docs',
        },
        items: ['enterprise/project/docs/intro', 'enterprise/project/docs/new', 'enterprise/project/docs/delete'],
      },
      {
        type: 'category',
        label: '里程碑管理',
        link: {
          type: 'generated-index',
        },
        items: [
          {
            type: 'doc',
            label: '新建里程碑',
            id: 'enterprise/project/milestones/new',
          },
          {
            type: 'doc',
            label: '规划里程碑',
            id: 'enterprise/project/milestones/planning',
          },
          {
            type: 'doc',
            label: '关闭里程碑',
            id: 'enterprise/project/milestones/close',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '代码管理 Code ',
    link: {
      type: 'generated-index',
      title: '代码管理 Code ',
      description: '代码管理 Code ',
      slug: '/enterprise/code',
      keywords: ['代码管理 Code '],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'doc',
        label: '产品介绍 ',
        id: 'enterprise/code-manage/产品介绍',
      },
      {
        type: 'category',
        label: '安全承诺',
        items: ['enterprise/code-manage/安全承诺/企业版仓库快照功能简介'],
      },
      {
        type: 'category',
        label: '代码托管',
        items: [
          {
            type: 'category',
            label: '代码仓库',
            items: [
              {
                type: 'category',
                label: '基本设置',
                items: [
                  'enterprise/code-manage/代码托管/代码仓库/基本设置/仓库转移',
                  'enterprise/code-manage/代码托管/代码仓库/基本设置/仓库状态功能说明',
                  'enterprise/code-manage/代码托管/代码仓库/基本设置/查看或筛选仓库',
                  'enterprise/code-manage/代码托管/代码仓库/基本设置/存储库GC',
                  'enterprise/code-manage/代码托管/代码仓库/基本设置/删除仓库',
                  'enterprise/code-manage/代码托管/代码仓库/基本设置/新建仓库',
                ],
              },
              'enterprise/code-manage/代码托管/代码仓库/导入外部仓库至企业',
              'enterprise/code-manage/代码托管/代码仓库/个人或组织仓库转入企业',
              'enterprise/code-manage/代码托管/代码仓库/如何获取仓库转移码',
              'enterprise/code-manage/代码托管/代码仓库/如何找回被删除的仓库数据',
              'enterprise/code-manage/代码托管/代码仓库/通过https或ssh协议推拉代码',
              'enterprise/miniapp/在小程序Web开发工具中使用Git做版本管理',
              'enterprise/code-manage/代码托管/代码仓库/git clone或下载代码',
              'enterprise/code-manage/代码托管/代码仓库/Gitee SVN 增加 SSH 支持',
              'enterprise/code-manage/代码托管/代码仓库/Gitee SVN支持',
            ],
          },
          {
            type: 'category',
            label: '代码文件',
            items: [
              'enterprise/code-manage/代码托管/代码文件/在线重命名或删除文件',
              'enterprise/code-manage/代码托管/代码文件/Git 只读文件支持',
            ],
          },
          {
            type: 'category',
            label: '大文件管理',
            items: [
              'enterprise/code-manage/代码托管/大文件管理/Git LFS 操作指南',
              {
                type: 'doc',
                label: 'AI 模型代码托管',
                id: 'enterprise/code-manage/代码托管/大文件管理/Gitee AI 模型代码托管',
              },
            ],
          },
          {
            type: 'category',
            label: '分支',
            items: [
              'enterprise/code-manage/代码托管/分支/分支同步',
              'enterprise/code-manage/代码托管/分支/如何设置保护分支',
            ],
          },
          {
            type: 'category',
            label: '提交',
            items: [
              'enterprise/code-manage/代码托管/提交/如何查看提交记录',
              'enterprise/code-manage/代码托管/提交/如何对比提交的代码',
            ],
          },
          {
            type: 'category',
            label: '标签',
            items: [
              'enterprise/code-manage/代码托管/标签/如何查看标签记录',
              'enterprise/code-manage/代码托管/标签/如何新建标签',
              'enterprise/code-manage/代码托管/标签/如何查看标签的相关提交、操作',
            ],
          },
          {
            type: 'category',
            label: '发行版',
            items: [
              'enterprise/code-manage/代码托管/发行版/什么是Release（发行版）',
              'enterprise/code-manage/代码托管/发行版/如何查看发行版',
              'enterprise/code-manage/代码托管/发行版/如何新建、删除、编辑发行版',
            ],
          },
          {
            type: 'category',
            label: '仓库动态',
            items: ['enterprise/code-manage/代码托管/仓库动态/如何查看仓库动态'],
          },
          {
            type: 'category',
            label: 'Web IDE',
            items: ['enterprise/code-manage/代码托管/Web IDE/如何使用web IDE'],
          },
        ],
      },
      {
        type: 'category',
        label: '代码评审',
        items: [
          {
            type: 'category',
            label: 'Pull Request',
            items: [
              {
                type: 'category',
                label: '开发协作',
                items: [
                  'enterprise/code-manage/代码评审/Pull Request/开发协作/使用 Pull Request 功能进行代码审查',
                  'enterprise/code-manage/代码评审/Pull Request/开发协作/在线解决代码冲突',
                  'enterprise/code-manage/代码评审/Pull Request/开发协作/Commit 关联 Issue',
                  'enterprise/code-manage/代码评审/Pull Request/开发协作/Fork + PullRequest 模式',
                  'enterprise/code-manage/代码评审/Pull Request/开发协作/Issue 和 Pull Request 模板',
                  'enterprise/code-manage/代码评审/Pull Request/开发协作/Pull Request 关联 Issue',
                ],
              },
              'enterprise/code-manage/代码评审/Pull Request/克隆PullRequest',
              'enterprise/code-manage/代码评审/Pull Request/PullRequest 代码已阅功能',
            ],
          },
          {
            type: 'category',
            label: 'Change Request',
            items: ['enterprise/code-manage/代码评审/Change Request/保护分支-评审模式介绍'],
          },
          {
            type: 'category',
            label: 'Cherry Pick',
            items: ['enterprise/code-manage/代码评审/Cherry Pick/PullRequest Cherry Pick 功能介绍'],
          },
          {
            type: 'category',
            label: 'Pr 回退',
            items: ['enterprise/code-manage/代码评审/Pr 回退/Pull Request 如何回退？'],
          },
          {
            type: 'category',
            label: 'Code Owner 机制',
            items: ['enterprise/code-manage/代码评审/Code Owner 机制/如何使用CodeOwners功能'],
          },
        ],
      },
      {
        type: 'category',
        label: '权限与设置',
        items: [
          {
            type: 'category',
            label: '部署公钥管理 ',
            items: [
              'enterprise/code-manage/权限与设置/部署公钥管理/公钥管理',
              'enterprise/code-manage/权限与设置/部署公钥管理/生成或添加SSH公钥',
              'enterprise/code-manage/权限与设置/部署公钥管理/Git配置多个SSH-Key',
              'enterprise/code-manage/权限与设置/部署公钥管理/SSH Key 突然失效问题解答及处理办法',
            ],
          },
          {
            type: 'category',
            label: '仓库成员管理 ',
            items: [
              'enterprise/code-manage/权限与设置/仓库成员管理/仓库成员权限说明',
              'enterprise/code-manage/权限与设置/仓库成员管理/成员权限变更',
              'enterprise/code-manage/权限与设置/仓库成员管理/删除成员',
              'enterprise/code-manage/权限与设置/仓库成员管理/添加成员',
            ],
          },
          'enterprise/code-manage/权限与设置/企业仓库成员权限说明',
          'enterprise/code-manage/权限与设置/企业仓库权限说明',
          'enterprise/code-manage/权限与设置/企业内仓库批量GC',
          'enterprise/code-manage/权限与设置/企业中如何将仓库设为开源',
          'enterprise/code-manage/权限与设置/如何批量删除转移清空仓库、批量更改仓库负责人或拥有者',
          'enterprise/code-manage/权限与设置/如何使用仓库模板',
        ],
      },
      {
        type: 'category',
        label: '集成与生态',
        items: [
          {
            type: 'category',
            label: 'WebHook ',
            items: [
              'enterprise/code-manage/集成与生态/WebHook/WebHook 简介',
              'enterprise/code-manage/集成与生态/WebHook/删除WebHook',
              'enterprise/code-manage/集成与生态/WebHook/添加WebHook',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 对 Slack 的支持',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 对钉钉机器人的支持',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 对飞书机器人的支持',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 对企业微信的支持',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 密钥验证和验证算法',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 推送数据格式说明',
              'enterprise/code-manage/集成与生态/WebHook/WebHook 推送数据类型说明',
            ],
          },
          'enterprise/code-manage/集成与生态/Repo 工具使用介绍',
          'enterprise/miniapp/在小程序Web开发工具中使用Git做版本管理',
        ],
      },
      {
        type: 'category',
        label: '容量管理',
        items: ['enterprise/code-manage/容量管理/仓库容量不足怎么办'],
      },
      {
        type: 'category',
        label: 'Git 知识大全',
        items: [
          'enterprise/code-manage/Git 知识大全/Git 是什么',
          'enterprise/code-manage/Git 知识大全/Git 的安装',
          'enterprise/code-manage/Git 知识大全/初次运行 Git 前的配置',
          'enterprise/code-manage/Git 知识大全/获取Git帮助',
          'enterprise/code-manage/Git 知识大全/Git的基本概念和常用命令及实例',
          'enterprise/code-manage/Git 知识大全/减少提交历史和修改commit邮箱',
          'enterprise/code-manage/Git 知识大全/取得项目的Git仓库',
          'enterprise/code-manage/Git 知识大全/Git Commit message 编写指南',
          'enterprise/code-manage/Git 知识大全/如何处理代码冲突',
          'enterprise/code-manage/Git 知识大全/如何从众多提交中保留个别提交',
          'enterprise/code-manage/Git 知识大全/如何进行版本回退',
          'enterprise/code-manage/Git 知识大全/如何进行分支合并',
          'enterprise/code-manage/Git 知识大全/如何通过git clone克隆仓库和项目',
          'enterprise/code-manage/Git 知识大全/Git仓库基础操作',
        ],
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '代码扫描 Scan ',
    link: {
      type: 'generated-index',
      title: '代码扫描 Scan ',
      description: '代码扫描 Scan ',
      slug: '/enterprise/codescan',
      keywords: ['代码扫描 Scan '],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'doc',
        label: '产品介绍 ',
        id: 'enterprise/codescan/intro',
      },
      {
        type: 'doc',
        label: '全局设置  ',
        id: 'enterprise/codescan/setting',
      },
      {
        type: 'doc',
        label: '发起扫描  ',
        id: 'enterprise/codescan/scan-start',
      },
      {
        type: 'doc',
        label: '扫描方案与规则集自定义  ',
        id: 'enterprise/codescan/customize',
      },
      {
        type: 'doc',
        label: '扫描设置  ',
        id: 'enterprise/codescan/scan-setting',
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '流水线 CI/CD ',
    link: {
      type: 'generated-index',
      title: '流水线 CI/CD',
      // description: '流水线 CI/CD',
      slug: '/enterprise/pipeline',
      keywords: ['流水线 CI/CD'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', label: 'Gitee 流水线是什么', id: 'enterprise/pipeline/初识 Gitee 流水线' },
      {
        type: 'category',
        collapsed: true,
        label: '编排与执行',
        link: {
          type: 'generated-index',
          title: '编排与执行',
          slug: '/enterprise/pipeline/pipeline',
          keywords: ['编排与执行'],
          image: '/img/docusaurus.png',
        },
        items: [
          { type: 'doc', label: '使用流水线', id: 'enterprise/pipeline/pipeline/使用流水线' },
          { type: 'doc', label: '创建流水线', id: 'enterprise/pipeline/pipeline/创建流水线' },
          {
            type: 'category',
            collapsed: true,
            label: '流水线源',
            link: {
              type: 'generated-index',
              title: '流水线源',
              slug: '/enterprise/pipeline/pipeline/source',
              keywords: ['流水线源'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '流水线源', id: 'enterprise/pipeline/pipeline/source/流水线源' },
              { type: 'doc', label: '配置代码源', id: 'enterprise/pipeline/pipeline/source/配置代码源' },
              { type: 'doc', label: '代码提交触发', id: 'enterprise/pipeline/pipeline/source/代码提交触发' },
              { type: 'doc', label: '配置流水线源', id: 'enterprise/pipeline/pipeline/source/配置流水线源' },
              {
                type: 'doc',
                label: '配置 Gitee 制品库源',
                id: 'enterprise/pipeline/pipeline/source/配置 Gitee 制品库源',
              },
            ],
          },
          { type: 'doc', label: '编排流水线', id: 'enterprise/pipeline/pipeline/编排流水线' },
          {
            type: 'category',
            collapsed: true,
            label: '触发流水线运行',
            link: {
              type: 'generated-index',
              title: '触发流水线运行',
              slug: '/enterprise/pipeline/pipeline/trigger',
              keywords: ['触发流水线运行'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '触发流水线运行', id: 'enterprise/pipeline/pipeline/trigger/触发流水线运行' },
              { type: 'doc', label: '定时触发流水线', id: 'enterprise/pipeline/pipeline/trigger/定时触发流水线' },
            ],
          },
          { type: 'doc', label: '阻塞构建', id: 'enterprise/pipeline/pipeline/阻塞构建' },
        ],
      },
      {
        type: 'category',
        collapsed: true,
        label: '任务管理',
        link: {
          type: 'generated-index',
          title: '任务管理',
          slug: '/enterprise/pipeline/plugin',
          keywords: ['任务管理'],
          image: '/img/docusaurus.png',
        },
        items: [
          { type: 'doc', label: '任务介绍', id: 'enterprise/pipeline/plugin/任务介绍' },
          {
            type: 'category',
            collapsed: true,
            label: '编译',
            link: {
              type: 'generated-index',
              title: '编译',
              slug: '/enterprise/pipeline/plugin/compile',
              keywords: ['编译'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: 'Maven 构建', id: 'enterprise/pipeline/plugin/compile/Maven 构建' },
              { type: 'doc', label: 'Nodejs 构建', id: 'enterprise/pipeline/plugin/compile/Nodejs 构建' },
              { type: 'doc', label: '镜像构建', id: 'enterprise/pipeline/plugin/compile/镜像构建' },
              { type: 'doc', label: 'Golang 构建', id: 'enterprise/pipeline/plugin/compile/Golang 构建' },
              { type: 'doc', label: 'Gradle 构建', id: 'enterprise/pipeline/plugin/compile/Gradle 构建' },
              { type: 'doc', label: 'Ant 构建', id: 'enterprise/pipeline/plugin/compile/Ant 构建' },
              { type: 'doc', label: 'GCC 构建', id: 'enterprise/pipeline/plugin/compile/GCC 构建' },
              { type: 'doc', label: 'Ruby 构建', id: 'enterprise/pipeline/plugin/compile/Ruby 构建' },
              { type: 'doc', label: 'PHP 构建', id: 'enterprise/pipeline/plugin/compile/PHP 构建' },
              { type: 'doc', label: '.NET Core 构建', id: 'enterprise/pipeline/plugin/compile/DotNet 构建' },
            ],
          },
          {
            type: 'category',
            collapsed: true,
            label: '测试',
            link: {
              type: 'generated-index',
              title: '测试',
              slug: '/enterprise/pipeline/plugin/test',
              keywords: ['测试'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: 'Maven 单元测试', id: 'enterprise/pipeline/plugin/test/Maven 单元测试' },
              { type: 'doc', label: 'Nodejs 单元测试', id: 'enterprise/pipeline/plugin/test/Nodejs 单元测试' },
              { type: 'doc', label: 'Gradle 单元测试', id: 'enterprise/pipeline/plugin/test/Gradle 单元测试' },
              { type: 'doc', label: 'PHP 单元测试', id: 'enterprise/pipeline/plugin/test/PHP 单元测试' },
              { type: 'doc', label: 'Python 单元测试', id: 'enterprise/pipeline/plugin/test/Python 单元测试' },
              { type: 'doc', label: 'Golang 单元测试', id: 'enterprise/pipeline/plugin/test/Golang 单元测试' },
              { type: 'doc', label: 'Jacoco 覆盖率采集', id: 'enterprise/pipeline/plugin/test/Jacoco 覆盖率采集' },
              {
                type: 'doc',
                label: 'Cobertura 覆盖率采集',
                id: 'enterprise/pipeline/plugin/test/Cobertura 覆盖率采集',
              },
            ],
          },
          {
            type: 'category',
            collapsed: true,
            label: '扫描',
            link: {
              type: 'generated-index',
              title: '扫描',
              slug: '/enterprise/pipeline/plugin/scan',
              keywords: ['扫描'],
              image: '/img/docusaurus.png',
            },
            items: [
              {
                type: 'doc',
                label: 'OpenSCA 开源组件检测',
                id: 'enterprise/pipeline/plugin/scan/OpenSCA 开源组件检测',
              },
            ],
          },
          {
            type: 'category',
            collapsed: true,
            label: '发布',
            link: {
              type: 'generated-index',
              title: '发布',
              slug: '/enterprise/pipeline/plugin/publish',
              keywords: ['发布'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '上传制品', id: 'enterprise/pipeline/plugin/publish/上传制品' },
              { type: 'doc', label: '发布', id: 'enterprise/pipeline/plugin/publish/发布' },
            ],
          },
          {
            type: 'category',
            collapsed: true,
            label: '部署',
            link: {
              type: 'generated-index',
              title: '部署',
              slug: '/enterprise/pipeline/plugin/deploy',
              keywords: ['部署'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '主机滚动部署', id: 'enterprise/pipeline/plugin/deploy/主机滚动部署' },
              { type: 'doc', label: '主机部署', id: 'enterprise/pipeline/plugin/deploy/主机部署' },
              { type: 'doc', label: 'K8S部署', id: 'enterprise/pipeline/plugin/deploy/K8S部署' },
              { type: 'doc', label: 'Helm Chart部署', id: 'enterprise/pipeline/plugin/deploy/Helm Chart部署' },
            ],
          },
          {
            type: 'category',
            collapsed: true,
            label: '工具',
            link: {
              type: 'generated-index',
              title: '工具',
              slug: '/enterprise/pipeline/plugin/tool',
              keywords: ['工具'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '基于镜像的脚本执行', id: 'enterprise/pipeline/plugin/tool/基于镜像的脚本执行' },
              { type: 'doc', label: 'Shell 脚本执行', id: 'enterprise/pipeline/plugin/tool/Shell 脚本执行' },
              { type: 'doc', label: 'Jenkins 任务', id: 'enterprise/pipeline/plugin/tool/Jenkins 任务' },
              { type: 'doc', label: '人工卡点', id: 'enterprise/pipeline/plugin/tool/人工卡点' },
            ],
          },
        ],
      },
      {
        type: 'category',
        collapsed: true,
        label: '变量',
        link: {
          type: 'generated-index',
          title: '变量',
          slug: '/enterprise/pipeline/variable',
          keywords: ['变量'],
          image: '/img/docusaurus.png',
        },
        items: [
          { type: 'doc', label: '系统级变量', id: 'enterprise/pipeline/variable/系统级变量' },
          { type: 'doc', label: '流水线级变量', id: 'enterprise/pipeline/variable/流水线级变量' },
          { type: 'doc', label: '通用变量', id: 'enterprise/pipeline/variable/通用变量' },
        ],
      },
      {
        type: 'category',
        collapsed: true,
        label: '通知',
        link: {
          type: 'generated-index',
          title: '通知',
          slug: '/enterprise/pipeline/notice',
          keywords: ['通知'],
          image: '/img/docusaurus.png',
        },
        items: [
          { type: 'doc', label: '飞书机器人发送群消息', id: 'enterprise/pipeline/notice/飞书机器人发送群消息' },
          { type: 'doc', label: '企业微信机器人发送群消息', id: 'enterprise/pipeline/notice/企业微信机器人发送群消息' },
          { type: 'doc', label: '钉钉机器人发送群消息', id: 'enterprise/pipeline/notice/钉钉机器人发送群消息' },
          { type: 'doc', label: '使用 Webhook 发送通知', id: 'enterprise/pipeline/notice/使用 Webhook 发送通知' },
        ],
      },
      {
        type: 'category',
        collapsed: true,
        label: '企业设置',
        link: {
          type: 'generated-index',
          title: '企业设置',
          slug: '/enterprise/pipeline/enterprise-setup',
          keywords: ['企业设置'],
          image: '/img/docusaurus.png',
        },
        items: [
          {
            type: 'category',
            collapsed: true,
            label: '主机管理',
            link: {
              type: 'generated-index',
              title: '主机管理',
              slug: '/enterprise/pipeline/enterprise-setup/host',
              keywords: ['主机管理'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '多云主机组管理', id: 'enterprise/pipeline/enterprise-setup/host/多云主机组管理' },
            ],
          },
          {
            type: 'category',
            collapsed: true,
            label: '凭证管理',
            link: {
              type: 'generated-index',
              title: '凭证管理',
              slug: '/enterprise/pipeline/enterprise-setup/certificate',
              keywords: ['凭证管理'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', label: '凭证管理', id: 'enterprise/pipeline/enterprise-setup/certificate/凭证管理' },
            ],
          },
        ],
      },
      {
        type: 'category',
        collapsed: true,
        label: '常见问题',
        link: {
          type: 'generated-index',
          title: '常见问题',
          slug: '/enterprise/pipeline/faq',
          keywords: ['常见问题'],
          image: '/img/docusaurus.png',
        },
        items: [
          {
            type: 'category',
            collapsed: true,
            label: '构建问题',
            link: {
              type: 'generated-index',
              title: '构建问题',
              slug: '/enterprise/pipeline/faq/compile',
              keywords: ['构建问题'],
              image: '/img/docusaurus.png',
            },
            items: [
              { type: 'doc', id: 'enterprise/pipeline/faq/compile/java' },
              { type: 'doc', id: 'enterprise/pipeline/faq/compile/nodejs' },
              { type: 'doc', id: 'enterprise/pipeline/faq/compile/golang' },
            ],
          },
          { type: 'doc', label: '主机管理', id: 'enterprise/pipeline/faq/host/主机管理' },
        ],
      },
      {
        type: 'category',
        collapsed: true,
        label: '计费规则',
        link: {
          type: 'generated-index',
          title: '计费规则',
          slug: '/enterprise/pipeline/billing',
          keywords: ['计费规则'],
          image: '/img/docusaurus.png',
        },
        items: [{ type: 'doc', label: '计费规则和产品定价', id: 'enterprise/pipeline/billing/计费规则和产品定价' }],
      },
      { type: 'doc', label: '联系我们', id: 'enterprise/pipeline/contact/联系我们' },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '效能度量 Insight ',
    link: {
      type: 'generated-index',
      title: '效能度量 Insight ',
      description: '效能度量 Insight ',
      slug: '/enterprise/insight',
      keywords: ['效能度量 Insight '],
      image: '/img/docusaurus.png',
    },
    items: [
      'enterprise/insight/产品介绍',
      'enterprise/insight/查看项目的效能度量',
      'enterprise/insight/成员负荷报表',
      'enterprise/insight/成员工时报表',
      'enterprise/insight/团队速度报表',
      'enterprise/insight/燃尽图报表',
      'enterprise/insight/需求每日新增趋势',
      'enterprise/insight/需求累计新增趋势',
      'enterprise/insight/任务每日新增趋势',
      'enterprise/insight/任务累计新增趋势',
      'enterprise/insight/缺陷每日新增趋势',
      'enterprise/insight/缺陷累计新增趋势',
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '知识库 Wiki ',
    link: {
      type: 'generated-index',
      title: '知识库 Wiki ',
      description: '知识库 Wiki ',
      slug: '/enterprise/knowledge',
      keywords: ['知识库 Wiki '],
      image: '/img/docusaurus.png',
    },
    items: [
      'enterprise/knowledge/产品介绍',
      'enterprise/knowledge/文档新建与管理',
      'enterprise/knowledge/文档权限管理',
      'enterprise/knowledge/文档编辑',
      'enterprise/knowledge/文档预览',
      'enterprise/knowledge/文档关联工作项',
      'enterprise/knowledge/文档分享',
      'enterprise/knowledge/文档搜索',
      'enterprise/knowledge/文档导入与导出',
      'enterprise/knowledge/文档设置',
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: 'Gitee 小程序',
    link: {
      type: 'generated-index',
      title: 'Gitee 小程序',
      description: 'Gitee 小程序',
      slug: '/enterprise/miniapp',
      keywords: ['Gitee 小程序'],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'doc',
        label: '产品介绍 ',
        id: 'enterprise/miniapp/intro',
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: 'Gitee 内源',
    link: {
      type: 'generated-index',
      title: 'Gitee 内源',
      description: 'Gitee 内源',
      slug: '/enterprise/inner-source',
      keywords: ['Gitee 内源'],
      image: '/img/docusaurus.png',
    },
    items: [
      {
        type: 'doc',
        label: '产品介绍 ',
        id: 'enterprise/inner-source/产品介绍',
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '常见问题',
    link: {
      type: 'generated-index',
      title: '常见问题',
      slug: '/enterprise/questions',
    },
    items: [
      {
        type: 'category',
        label: '付款、发票问题',
        items: [
          'enterprise/invoice/查看发票快递信息',
          'enterprise/invoice/发票申请注意事项',
          'enterprise/invoice/合同到期，代码资产怎么处理',
          'enterprise/invoice/免费企业账号升级为付费版本',
          'enterprise/invoice/企业版赔付机制',
          'enterprise/invoice/企业账号开具发票',
        ],
      },
      {
        type: 'category',
        label: 'Gitee Project 常见问题',
        link: {
          type: 'generated-index',
          title: 'Gitee Project 常见问题',
          slug: '/enterprise/project/questions',
          keywords: ['Gitee Project 常见问题'],
          image: '/img/docusaurus.png',
        },
        items: [
          {
            label: '项目文档如何协作？',
            type: 'ref',
            id: 'enterprise/project/docs/intro',
          },
          {
            label: '项目中如何添加成员？',
            type: 'ref',
            id: 'enterprise/project/settings/members',
          },
          {
            label: '如何新建项目？',
            type: 'ref',
            id: 'enterprise/project/new/scrum',
          },
          {
            type: 'doc',
            label: '如何删除项目？',
            id: 'enterprise/project/delete',
          },
        ],
      },
      {
        type: 'category',
        label: 'Gitee Code 常见问题',
        link: {
          type: 'generated-index',
          title: 'Gitee Code 常见问题',
          slug: '/enterprise/code/questions',
          keywords: ['Gitee Project 常见问题'],
          image: '/img/docusaurus.png',
        },
        items: [
          {
            type: 'ref',
            id: 'repository/base/仓库体积过大，如何减小',
          },
          {
            type: 'ref',
            id: 'repository/base/查看、筛选仓库',
          },
          {
            type: 'ref',
            id: 'repository/base/如何找回被删除的仓库数据',
          },
          {
            type: 'ref',
            id: 'repository/base/通过https、ssh协议推拉代码',
          },
          {
            type: 'ref',
            id: 'repository/base/为仓库添加LICENSE',
          },
          {
            type: 'ref',
            id: 'repository/base/新建仓库',
          },
          {
            type: 'ref',
            id: 'repository/base/在线重命名或删除文件',
          },
          {
            type: 'ref',
            id: 'questions/仓库体积过大，如何减小',
          },
          {
            type: 'ref',
            id: 'enterprise/repo/设置保护分支',
          },
          {
            type: 'ref',
            id: 'repository/extend/如何使用CodeOwners功能',
          },
        ],
      },
      // {
      //   type: 'doc',
      //   label: 'Gitee Scan 常见问题 ',
      //   id: 'enterprise/mini-program',
      // },
      {
        type: 'category',
        label: 'Gitee CICD 常见问题',
        link: {
          type: 'generated-index',
          title: 'Gitee CICD 常见问题',
          slug: '/enterprise/pipeline/questions',
        },
        items: [
          'enterprise/pipeline/faq/自有主机部署失败怎么办？',
          'enterprise/pipeline/faq/无法开通流水线怎么办？',
          'enterprise/pipeline/faq/提交代码没有触发构建怎么办？',
          'enterprise/pipeline/faq/任务一直运行中没有日志怎么办？',
        ],
      },
      {
        type: 'category',
        label: 'Gitee Insight 常见问题',
        link: {
          type: 'generated-index',
          title: 'Gitee Insight 常见问题',
          slug: '/enterprise/insight/questions',
        },
        items: [
          'enterprise/insight/questions/如何查看需求每日新增趋势？',
          'enterprise/insight/questions/如何查看需求按时交付情况？',
          'enterprise/insight/questions/如何查看缺陷每日新增趋势？',
          'enterprise/insight/questions/如何查看任务每日新增趋势？',
        ],
      },
      // {
      //   type: 'doc',
      //   label: 'Gitee Wiki 常见问题',
      //   id: 'enterprise/mini-program',
      // },
      {
        type: 'category',
        label: '企业管理常见问题',
        link: {
          type: 'generated-index',
          title: '企业管理常见问题',
          slug: '/enterprise/manage/questions',
          keywords: ['企业管理常见问题'],
          image: '/img/docusaurus.png',
        },
        items: [
          'enterprise/quickstart/个人账号升级为企业账户',
          'enterprise/企业成员超额如何处理',
          {
            type: 'ref',
            label: '如何添加企业成员',
            id: 'enterprise/management/members/add',
          },
          {
            type: 'ref',
            label: '如何更改成员角色',
            id: 'enterprise/management/members/change-role',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    collapsed: true,
    label: '账户管理',
    items: [
      {
        type: 'doc',
        label: '转移组织至企业账号',
        id: 'enterprise/帐户管理/转移组织至企业账号',
      },
      {
        type: 'doc',
        label: '企业创建者离职了如何处理',
        id: 'enterprise/帐户管理/企业创建者离职了如何处理',
      },
      {
        type: 'doc',
        label: '如何主动退出企业？ ',
        id: 'enterprise/帐户管理/如何主动退出企业',
      },
    ],
  },
  {
    type: 'category',
    label: '相关协议',
    items: [
      {
        type: 'link',
        label: '个人信息保护政策',
        href: 'https://gitee.ru/user_terms',
      },
      {
        type: 'link',
        label: 'Gitee 企业版服务条款',
        href: 'https://gitee.ru/enterprise_terms',
      },
    ],
  },

];

module.exports = sidebarItems;
