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
  { type: 'doc', id: 'enterprise/quickstart/intro' },
  { type: 'doc', id: 'enterprise/quickstart/企业版敏捷开发流程' },
  { type: 'doc', id: 'enterprise/quickstart/企业版成员权限管理' },
  { type: 'doc', id: 'enterprise/quickstart/企业版代码安全管理' },
  // {
  //   type: 'category',
  //   collapsed: false,
  //   label: '快速了解 Gitee 企业版',
  //   link: {
  //     type: 'generated-index',
  //     title: '快速了解 Gitee 企业版',
  //     description: 'Gitee 企业版是企业级软件协作开发管理平台，我们针对企业研发团队的协作开发场景，提供企业级精细代码管理服务，集项目管理、代码管理、知识库管理于一体，可支撑“需求 - 迭代 - 任务分配 - 编码 - 质量审查 - 部署测试 - 缺陷管理”的全流程研发管理，助力企业有序规划和管理软件研发全生命周期，帮助企业降本增效，提升竞争力。',
  //     slug: '/enterprise/quickstart',
  //     keywords: ['基本功能'],
  //     image: '/img/docusaurus.png',
  //   },
  //   items: [
  //     // { type: 'doc', id: 'enterprise/quickstart/intro' },
  //     // { type: 'doc', id: 'enterprise/quickstart/企业版敏捷开发流程' },
  //     // { type: 'doc', id: 'enterprise/quickstart/企业版成员权限管理' },
  //     // { type: 'doc', id: 'enterprise/quickstart/企业版代码安全管理' },
  //     // { type: 'doc', id: 'enterprise/quickstart/企业版视频教程概述' },
  //   ],
  // }, 

  {
    type: 'category',
    collapsed: false,
    label: '常见问题',
    link: {
      type: 'generated-index',
      title: '常见问题',
      description: '基本功能文档',
      slug: '/enterprise/quickstart/questions',
      keywords: ['常见问题'],
      image: '/img/docusaurus.png',
    },
    items: [
      { type: 'doc', id: 'enterprise/issues/任务关联关系设置' },
      { type: 'doc', id: 'enterprise/issues/自定义任务类型与状态' },
      { type: 'doc', id: 'enterprise/issues/任务拆分与关联' },

      { type: 'doc', id: 'enterprise/quickstart/为什么要购买企业版' },
      // https://gitee.ru/help/articles/4147
      // { type: 'doc', id: 'enterprise/quickstart/企业版与社区版服务对比' },
      // https://gitee.ru/help/articles/4167
      // { type: 'doc', id: 'enterprise/quickstart/企业版与社区版功能对比' },
      // https://gitee.ru/help/articles/4166
      // { type: 'doc', id: 'enterprise/quickstart/创建企业与升级为企业' },
      // https://gitee.ru/help/articles/4148
      { type: 'doc', id: 'enterprise/quickstart/个人账号升级为企业账户' },
      // https://gitee.ru/help/articles/4207
      // { type: 'doc', id: 'enterprise/quickstart/如何进入企业工作台界面' },
      // https://gitee.ru/help/articles/4208
      // { type: 'doc', id: 'enterprise/quickstart/企业成员超额如何处理' },
      // https://gitee.ru/help/articles/4236
      // { type: 'doc', id: 'enterprise/quickstart/账号忘记了，如何召回' },
      // https://gitee.ru/help/articles/4325

    ],
  },
];

module.exports = sidebarItems;





// 项目：（将小标题拆出来当做四级目录）
//   https://gitee.ru/help/articles/4313
//   如何暂停正在进行的项目？
//   如何更换项目负责人？
//   具有负责及的任务如何变更关联项目？
// 任务：（将小标题拆出来当做四级目录）
// https://gitee.ru/help/articles/4314
// 导出任务的文件内容出现乱码？
// 企业版是否可以统计每个人的任务工时？
// 创建任务后如何设置短信提醒？
// 文档：（将小标题拆出来当做四级目录）
// https://gitee.ru/help/articles/4315
// Wiki 文档编辑内容会实时保存么？
// 离开 Wiki 文档页面会提示没有保存么？
// 仓库：（将小标题拆出来当做四级目录）
// https://gitee.ru/help/articles/4312
// 删除团队会删除相关仓库么？
// 如何从一个项目复制一个仓库到另一个项目？
// 不同企业账号之间仓库如何转移？
// 个人账户常见问题：（将小标题拆出来当做四级目录）
// https://gitee.ru/help/articles/4286
// 个人账号为什么解绑不了手机号？
// 个人账号已是企业账号的创建者或成员，无法解绑手机号？
// 如何注销 Gitee 账号？
// 企业庄户常见问题：（将小标题拆出来当做四级目录）
// https://gitee.ru/help/articles/4204
// 如何注销企业账户？
// 企业的个性地址可以修改吗？
// 企业的名称、邮箱、和绑定的手机号可以修改吗？
// 如何推荐好友使用 Gitee 企业版，并获得优惠码？
// 如何将组织账号升级为企业账号？
// 创建企业和升级为企业的区别是什么？
// 如何将企业账户转给其他成员？
// 个人可以有多个企业账号吗？
// 企业版套餐常见问题？（将小标题拆出来当做四级目录）
// https://gitee.ru/help/articles/4203
// 企业版按照什么标准收费？
// 标准版 20 人成员上线是什么？
// 标准版 20G 仓库容量是什么？
// 付费企业如何扩容成员账号？
// 但仓库和单文件是什么？
// 企业版用户可以建多少个仓库？
// 升级付费版本/购买企业版有什么优惠？
// 选好企业版套餐后，如何付费？
// 企业版初创企业优惠政策是什么？如何操作？
// 是否可以开具发票？
// 为什么申请专用发票被拒绝？
// 存放在代码仓库的数据是否安全？