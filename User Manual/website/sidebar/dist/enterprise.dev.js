"use strict";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
// @ts-check
var _require = require('../plugin/utils'),
    requireUncached = _require.requireUncached;

var activitysItems = require('./activitys');

var requireX = function requireX(path) {
  return requireUncached(require.resolve(path));
};
/** @type {import("@docusaurus/plugin-content-docs/src/sidebars/types").SidebarConfig} */


var sidebarItems = [// 'repository/intro',
//   'enterprise/wiki/文件共享',
//   'enterprise/mini-program',
{
  type: 'category',
  collapsed: true,
  label: '产品介绍',
  link: {
    type: 'generated-index',
    title: '产品介绍',
    description: '产品介绍',
    slug: '/enterprise/',
    keywords: ['产品介绍'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: 'Gitee 企业版是什么 ',
    id: 'enterprise/产品介绍/Gitee 企业版是什么'
  }, {
    type: 'doc',
    label: 'Gitee 企业版产品优势 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: 'Gitee 企业版资质认证 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '产品动态与公告',
  link: {
    type: 'generated-index',
    title: '产品动态与公告',
    description: '产品动态与公告',
    slug: '/enterprise/changelogs',
    keywords: ['产品动态与公告'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'category',
    label: '产品动态 ',
    collapsible: false,
    collapsed: true,
    className: 'hide-menu-list',
    link: {
      type: 'generated-index',
      title: '产品动态',
      // description: '产品动态',
      slug: '/enterprise/activitys',
      keywords: ['产品动态'],
      image: '/img/docusaurus.png'
    },
    items: activitysItems
  }, {
    type: 'doc',
    label: '产品更新日志 ',
    id: 'enterprise/mini-program'
  } // {
  //   type: 'doc',
  //   label: 'Project 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  // {
  //   type: 'doc',
  //   label: 'Code 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  // {
  //   type: 'doc',
  //   label: 'Scan 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  // {
  //   type: 'doc',
  //   label: 'CICD 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  // {
  //   type: 'doc',
  //   label: 'Insight 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  // {
  //   type: 'doc',
  //   label: 'Wiki 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  // {
  //   type: 'doc',
  //   label: '企业管理 更新日志 ',
  //   id: 'enterprise/mini-program',
  // },
  ]
}, {
  type: 'category',
  collapsed: true,
  label: '产品计费',
  link: {
    type: 'generated-index',
    title: '产品计费',
    description: '产品计费',
    slug: '/enterprise/billing',
    keywords: ['产品计费'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: 'Gitee 企业版 2022 资费 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '企业版功能说明 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '企业版购买 FAQ ',
    id: 'enterprise/mini-program'
  }]
}, //   {
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
    slug: '/enterprise/enterprise-management',
    keywords: ['企业管理'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: '工作台 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '企业设置 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '成员管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '组织管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '功能管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '资源管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '安全性管理 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '项目管理 Project ',
  link: {
    type: 'generated-index',
    title: '项目管理 Project ',
    description: '项目管理 Project ',
    slug: '/enterprise/project',
    keywords: ['项目管理 Project '],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: '产品介绍 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '项目管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '工作项 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '代码管理 Code ',
  link: {
    type: 'generated-index',
    title: '代码管理 Code ',
    description: '代码管理 Code ',
    slug: '/enterprise/code',
    keywords: ['代码管理 Code '],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: '产品介绍 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '代码管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '仓库管理 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: 'Git 知识大全 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: '权限与设置 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '代码扫描 Scan ',
  link: {
    type: 'generated-index',
    title: '代码扫描 Scan ',
    description: '代码扫描 Scan ',
    slug: '/enterprise/codescan',
    keywords: ['代码扫描 Scan '],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: '产品介绍 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '流水线 CI/CD ',
  link: {
    type: 'generated-index',
    title: '流水线 CI/CD',
    // description: '流水线 CI/CD',
    slug: '/enterprise/pipeline',
    keywords: ['流水线 CI/CD'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: 'Gitee 流水线是什么',
    id: 'enterprise/pipeline/初识 Gitee 流水线'
  }, {
    type: 'category',
    collapsed: true,
    label: '编排与执行',
    link: {
      type: 'generated-index',
      title: '编排与执行',
      slug: '/enterprise/pipeline/pipeline',
      keywords: ['编排与执行'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'doc',
      label: '使用流水线',
      id: 'enterprise/pipeline/pipeline/使用流水线'
    }, {
      type: 'doc',
      label: '创建流水线',
      id: 'enterprise/pipeline/pipeline/创建流水线'
    }, {
      type: 'category',
      collapsed: true,
      label: '流水线源',
      link: {
        type: 'generated-index',
        title: '流水线源',
        slug: '/enterprise/pipeline/pipeline/source',
        keywords: ['流水线源'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '流水线源',
        id: 'enterprise/pipeline/pipeline/source/流水线源'
      }, {
        type: 'doc',
        label: '配置代码源',
        id: 'enterprise/pipeline/pipeline/source/配置代码源'
      }, {
        type: 'doc',
        label: '代码提交触发',
        id: 'enterprise/pipeline/pipeline/source/代码提交触发'
      }, {
        type: 'doc',
        label: '配置流水线源',
        id: 'enterprise/pipeline/pipeline/source/配置流水线源'
      }, {
        type: 'doc',
        label: '配置 Gitee 制品库源',
        id: 'enterprise/pipeline/pipeline/source/配置 Gitee 制品库源'
      }]
    }, {
      type: 'doc',
      label: '编排流水线',
      id: 'enterprise/pipeline/pipeline/编排流水线'
    }, {
      type: 'category',
      collapsed: true,
      label: '触发流水线运行',
      link: {
        type: 'generated-index',
        title: '触发流水线运行',
        slug: '/enterprise/pipeline/pipeline/trigger',
        keywords: ['触发流水线运行'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '触发流水线运行',
        id: 'enterprise/pipeline/pipeline/trigger/触发流水线运行'
      }, {
        type: 'doc',
        label: '定时触发流水线',
        id: 'enterprise/pipeline/pipeline/trigger/定时触发流水线'
      }]
    }, {
      type: 'doc',
      label: '阻塞构建',
      id: 'enterprise/pipeline/pipeline/阻塞构建'
    }]
  }, {
    type: 'category',
    collapsed: true,
    label: '任务管理',
    link: {
      type: 'generated-index',
      title: '任务管理',
      slug: '/enterprise/pipeline/plugin',
      keywords: ['任务管理'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'doc',
      label: '任务介绍',
      id: 'enterprise/pipeline/plugin/任务介绍'
    }, {
      type: 'category',
      collapsed: true,
      label: '编译',
      link: {
        type: 'generated-index',
        title: '编译',
        slug: '/enterprise/pipeline/plugin/compile',
        keywords: ['编译'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: 'Maven 构建',
        id: 'enterprise/pipeline/plugin/compile/Maven 构建'
      }, {
        type: 'doc',
        label: 'Nodejs 构建',
        id: 'enterprise/pipeline/plugin/compile/Nodejs 构建'
      }, {
        type: 'doc',
        label: '镜像构建',
        id: 'enterprise/pipeline/plugin/compile/镜像构建'
      }, {
        type: 'doc',
        label: 'Golang 构建',
        id: 'enterprise/pipeline/plugin/compile/Golang 构建'
      }, {
        type: 'doc',
        label: 'Gradle 构建',
        id: 'enterprise/pipeline/plugin/compile/Gradle 构建'
      }, {
        type: 'doc',
        label: 'Ant 构建',
        id: 'enterprise/pipeline/plugin/compile/Ant 构建'
      }, {
        type: 'doc',
        label: 'GCC 构建',
        id: 'enterprise/pipeline/plugin/compile/GCC 构建'
      }, {
        type: 'doc',
        label: 'Ruby 构建',
        id: 'enterprise/pipeline/plugin/compile/Ruby 构建'
      }, {
        type: 'doc',
        label: 'PHP 构建',
        id: 'enterprise/pipeline/plugin/compile/PHP 构建'
      }, {
        type: 'doc',
        label: '.NET Core 构建',
        id: 'enterprise/pipeline/plugin/compile/DotNet 构建'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '测试',
      link: {
        type: 'generated-index',
        title: '测试',
        slug: '/enterprise/pipeline/plugin/test',
        keywords: ['测试'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: 'Maven 单元测试',
        id: 'enterprise/pipeline/plugin/test/Maven 单元测试'
      }, {
        type: 'doc',
        label: 'Nodejs 单元测试',
        id: 'enterprise/pipeline/plugin/test/Nodejs 单元测试'
      }, {
        type: 'doc',
        label: 'Gradle 单元测试',
        id: 'enterprise/pipeline/plugin/test/Gradle 单元测试'
      }, {
        type: 'doc',
        label: 'PHP 单元测试',
        id: 'enterprise/pipeline/plugin/test/PHP 单元测试'
      }, {
        type: 'doc',
        label: 'Python 单元测试',
        id: 'enterprise/pipeline/plugin/test/Python 单元测试'
      }, {
        type: 'doc',
        label: 'Golang 单元测试',
        id: 'enterprise/pipeline/plugin/test/Golang 单元测试'
      }, {
        type: 'doc',
        label: 'Jacoco 覆盖率采集',
        id: 'enterprise/pipeline/plugin/test/Jacoco 覆盖率采集'
      }, {
        type: 'doc',
        label: 'Cobertura 覆盖率采集',
        id: 'enterprise/pipeline/plugin/test/Cobertura 覆盖率采集'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '扫描',
      link: {
        type: 'generated-index',
        title: '扫描',
        slug: '/enterprise/pipeline/plugin/scan',
        keywords: ['扫描'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: 'OpenSCA 开源组件检测',
        id: 'enterprise/pipeline/plugin/scan/OpenSCA 开源组件检测'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '发布',
      link: {
        type: 'generated-index',
        title: '发布',
        slug: '/enterprise/pipeline/plugin/publish',
        keywords: ['发布'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '上传制品',
        id: 'enterprise/pipeline/plugin/publish/上传制品'
      }, {
        type: 'doc',
        label: '发布',
        id: 'enterprise/pipeline/plugin/publish/发布'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '部署',
      link: {
        type: 'generated-index',
        title: '部署',
        slug: '/enterprise/pipeline/plugin/deploy',
        keywords: ['部署'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '主机滚动部署',
        id: 'enterprise/pipeline/plugin/deploy/主机滚动部署'
      }, {
        type: 'doc',
        label: '主机部署',
        id: 'enterprise/pipeline/plugin/deploy/主机部署'
      }, {
        type: 'doc',
        label: 'K8S部署',
        id: 'enterprise/pipeline/plugin/deploy/K8S部署'
      }, {
        type: 'doc',
        label: 'Helm Chart部署',
        id: 'enterprise/pipeline/plugin/deploy/Helm Chart部署'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '工具',
      link: {
        type: 'generated-index',
        title: '工具',
        slug: '/enterprise/pipeline/plugin/tool',
        keywords: ['工具'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '基于镜像的脚本执行',
        id: 'enterprise/pipeline/plugin/tool/基于镜像的脚本执行'
      }, {
        type: 'doc',
        label: 'Shell 脚本执行',
        id: 'enterprise/pipeline/plugin/tool/Shell 脚本执行'
      }, {
        type: 'doc',
        label: 'Jenkins 任务',
        id: 'enterprise/pipeline/plugin/tool/Jenkins 任务'
      }, {
        type: 'doc',
        label: '人工卡点',
        id: 'enterprise/pipeline/plugin/tool/人工卡点'
      }]
    }]
  }, {
    type: 'category',
    collapsed: true,
    label: '变量',
    link: {
      type: 'generated-index',
      title: '变量',
      slug: '/enterprise/pipeline/variable',
      keywords: ['变量'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'doc',
      label: '系统级变量',
      id: 'enterprise/pipeline/variable/系统级变量'
    }, {
      type: 'doc',
      label: '流水线级变量',
      id: 'enterprise/pipeline/variable/流水线级变量'
    }, {
      type: 'doc',
      label: '通用变量',
      id: 'enterprise/pipeline/variable/通用变量'
    }]
  }, {
    type: 'category',
    collapsed: true,
    label: '通知',
    link: {
      type: 'generated-index',
      title: '通知',
      slug: '/enterprise/pipeline/notice',
      keywords: ['通知'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'doc',
      label: '飞书机器人发送群消息',
      id: 'enterprise/pipeline/notice/飞书机器人发送群消息'
    }, {
      type: 'doc',
      label: '企业微信机器人发送群消息',
      id: 'enterprise/pipeline/notice/企业微信机器人发送群消息'
    }, {
      type: 'doc',
      label: '钉钉机器人发送群消息',
      id: 'enterprise/pipeline/notice/钉钉机器人发送群消息'
    }, {
      type: 'doc',
      label: '使用 Webhook 发送通知',
      id: 'enterprise/pipeline/notice/使用 Webhook 发送通知'
    }]
  }, {
    type: 'category',
    collapsed: true,
    label: '企业设置',
    link: {
      type: 'generated-index',
      title: '企业设置',
      slug: '/enterprise/pipeline/enterprise-setup',
      keywords: ['企业设置'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'category',
      collapsed: true,
      label: '主机管理',
      link: {
        type: 'generated-index',
        title: '主机管理',
        slug: '/enterprise/pipeline/enterprise-setup/host',
        keywords: ['主机管理'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '多云主机组管理',
        id: 'enterprise/pipeline/enterprise-setup/host/多云主机组管理'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '凭证管理',
      link: {
        type: 'generated-index',
        title: '凭证管理',
        slug: '/enterprise/pipeline/enterprise-setup/certificate',
        keywords: ['凭证管理'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '凭证管理',
        id: 'enterprise/pipeline/enterprise-setup/certificate/凭证管理'
      }]
    }]
  }, {
    type: 'category',
    collapsed: true,
    label: '常见问题',
    link: {
      type: 'generated-index',
      title: '常见问题',
      slug: '/enterprise/pipeline/q&a',
      keywords: ['常见问题'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'category',
      collapsed: true,
      label: '构建问题',
      link: {
        type: 'generated-index',
        title: '构建问题',
        slug: '/enterprise/pipeline/q&a/compile',
        keywords: ['构建问题'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: 'Java 语言',
        id: 'enterprise/pipeline/q&a/compile/Java 语言'
      }, {
        type: 'doc',
        label: 'Nodejs 语言',
        id: 'enterprise/pipeline/q&a/compile/Nodejs 语言'
      }, {
        type: 'doc',
        label: 'Golang 语言',
        id: 'enterprise/pipeline/q&a/compile/Golang 语言'
      }]
    }, {
      type: 'category',
      collapsed: true,
      label: '主机管理问题',
      link: {
        type: 'generated-index',
        title: '主机管理问题',
        slug: '/enterprise/pipeline/q&a/host',
        keywords: ['主机管理问题'],
        image: '/img/docusaurus.png'
      },
      items: [{
        type: 'doc',
        label: '主机管理',
        id: 'enterprise/pipeline/q&a/host/主机管理'
      }]
    }]
  }, {
    type: 'category',
    collapsed: true,
    label: '计费规则',
    link: {
      type: 'generated-index',
      title: '计费规则',
      slug: '/enterprise/pipeline/billing',
      keywords: ['计费规则'],
      image: '/img/docusaurus.png'
    },
    items: [{
      type: 'doc',
      label: '计费规则和产品定价',
      id: 'enterprise/pipeline/billing/计费规则和产品定价'
    }]
  }, {
    type: 'doc',
    label: '联系我们',
    id: 'enterprise/pipeline/contact/联系我们'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '效能度量 Insight ',
  link: {
    type: 'generated-index',
    title: '效能度量 Insight ',
    description: '效能度量 Insight ',
    slug: '/enterprise/insight',
    keywords: ['效能度量 Insight '],
    image: '/img/docusaurus.png'
  },
  items: ['enterprise/insight/产品介绍', 'enterprise/insight/查看项目的效能度量', 'enterprise/insight/成员负荷报表', 'enterprise/insight/成员工时报表', 'enterprise/insight/团队速度报表', 'enterprise/insight/燃尽图报表', 'enterprise/insight/需求每日新增趋势', 'enterprise/insight/需求累计新增趋势', 'enterprise/insight/任务每日新增趋势', 'enterprise/insight/任务累计新增趋势', 'enterprise/insight/缺陷每日新增趋势', 'enterprise/insight/缺陷累计新增趋势']
}, {
  type: 'category',
  collapsed: true,
  label: '知识库 Wiki ',
  link: {
    type: 'generated-index',
    title: '知识库 Wiki ',
    description: '知识库 Wiki ',
    slug: '/enterprise/knowledge',
    keywords: ['知识库 Wiki '],
    image: '/img/docusaurus.png'
  },
  items: ['enterprise/knowledge/产品介绍', 'enterprise/knowledge/文档新建与管理', 'enterprise/knowledge/文档权限管理', 'enterprise/knowledge/文档编辑', 'enterprise/knowledge/文档预览', 'enterprise/knowledge/文档关联工作项', 'enterprise/knowledge/文档分享', 'enterprise/knowledge/文档搜索', 'enterprise/knowledge/文档导入与导出', 'enterprise/knowledge/文档设置']
}, {
  type: 'category',
  collapsed: true,
  label: 'Gitee 小程序',
  link: {
    type: 'generated-index',
    title: 'Gitee 小程序',
    description: 'Gitee 小程序',
    slug: '/enterprise/mini-program',
    keywords: ['Gitee 小程序'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: '产品介绍 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: 'Gitee 内源',
  link: {
    type: 'generated-index',
    title: 'Gitee 内源',
    description: 'Gitee 内源',
    slug: '/enterprise/inner-source',
    keywords: ['Gitee 内源'],
    image: '/img/docusaurus.png'
  },
  items: [{
    type: 'doc',
    label: '产品介绍 ',
    id: 'enterprise/mini-program'
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '常见问题',
  items: [{
    type: 'category',
    label: '付款、发票问题 ',
    items: ['enterprise/invoice/查看发票快递信息', 'enterprise/invoice/发票申请注意事项', 'enterprise/invoice/合同到期，代码资产怎么处理', 'enterprise/invoice/免费企业账号升级为付费版本', 'enterprise/invoice/企业版赔付机制', 'enterprise/invoice/企业账号开具发票']
  }, {
    type: 'category',
    label: 'Gitee Project 常见问题',
    link: {
      type: 'generated-index',
      title: 'Gitee Project 常见问题',
      slug: '/enterprise/project/questions',
      keywords: ['Gitee Project 常见问题'],
      image: '/img/docusaurus.png'
    },
    items: ['enterprise/project/项目文档如何协作', 'enterprise/project/项目中如何添加成员', 'enterprise/project/新建项目', 'enterprise/project/删除项目']
  }, {
    type: 'category',
    label: 'Gitee Code 常见问题 ',
    items: ['repository/base/仓库体积过大，如何减小', 'repository/base/查看、筛选仓库', 'repository/base/如何找回被删除的仓库数据', 'repository/base/通过https、ssh协议推拉代码', 'repository/base/为仓库添加LICENSE', 'repository/base/新建仓库', 'repository/base/在线重命名或删除文件', 'repository/base/gitclone、下载代码', 'questions/仓库体积过大，如何减小', 'enterprise/repo/设置保护分支', 'repository/extend/如何使用CodeOwners功能']
  }, // {
  //   type: 'doc',
  //   label: 'Gitee Scan 常见问题 ',
  //   id: 'enterprise/mini-program',
  // },
  {
    type: 'doc',
    label: 'Gitee CICD 常见问题 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: 'Gitee Insight 常见问题 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'doc',
    label: 'Gitee Wiki 常见问题 ',
    id: 'enterprise/mini-program'
  }, {
    type: 'category',
    label: '企业管理常见问题',
    link: {
      type: 'generated-index',
      title: '企业管理常见问题',
      slug: '/enterprise/manage/questions',
      keywords: ['企业管理常见问题'],
      image: '/img/docusaurus.png'
    },
    items: ['enterprise/quickstart/个人账号升级为企业账户', // 'enterprise/quickstart/如何进入企业工作台界面',
    'enterprise/member/添加企业成员', 'enterprise/member/成员分配角色']
  }]
}, {
  type: 'category',
  collapsed: true,
  label: '账户管理',
  items: [{
    type: 'doc',
    label: '转移组织至企业账号',
    id: 'enterprise/帐户管理/转移组织至企业账号'
  }, {
    type: 'doc',
    label: '企业创建者离职了如何处理',
    id: 'enterprise/帐户管理/企业创建者离职了如何处理'
  }, {
    type: 'doc',
    label: '如何主动退出企业？ ',
    id: 'enterprise/帐户管理/如何主动退出企业'
  }]
}, {
  type: 'category',
  label: '相关协议',
  items: [{
    type: 'link',
    label: '个人信息保护政策',
    href: 'https://gitee.com/user_terms'
  }, {
    type: 'link',
    label: 'Gitee 企业版服务条款',
    href: 'https://gitee.com/enterprise_terms'
  }]
}, {
  type: 'link',
  label: '视频中心',
  href: 'https://space.bilibili.com/511608172'
}, {
  type: 'doc',
  label: '企业案例',
  id: 'enterprise/企业案例'
}];
module.exports = sidebarItems;