// @ts-check

/**
 * 热门问题
 * @type import("./src/custom/HomePage/type").HotTopicType
 */
exports.hotTopics = {
  questions: [
    { label: '自己的主机能用 Gitee Go 吗', href: 'devops/gitee-go/host-manage/host-group-management' },
    { label: '如何自定义任务类型与状态', href: 'enterprise/issues/自定义任务类型与状态' },
    { label: '如何配置企业成员权限', href: 'enterprise/member/角色权限配置' },
    { label: '团队成员离职了怎么处理', href: 'enterprise/member/锁定企业成员' },
    { label: '如何通过流水线部署到主机', href: 'devops/gitee-go/host-manage/deploy-to-host-via-pipeline' },
  ],
  topicCards: [
    {
      cardTitle: '在 Gitee 上玩转 DevOps',
      cardAllHref: 'gitee-go/intro',
      cardLinks: [
        { label: 'Gitee Go', href: 'gitee-go/intro' },
        { label: 'Jenkins 集成', href: 'devops/connect/Jenkins-Plugin' },
        { label: '百度效率云', href: 'devops/connect/Baidu-XLY' },
        { label: '使用 Gitee 对接 AzurePipeLine ', href: 'devops/connect/Azure-PipeLine' },
      ],
    },
    {
      cardTitle: '代码安全扫描',
      cardLinks: [
        { label: '奇安信代码卫士', href: 'devops/connect/Qi-AnXin-CodeSafe' },
        { label: 'Sonar 代码质量分析', href: 'services/SonarQube' },
        { label: 'Gitee Scan 代码扫描', href: 'services/gitee-scan' },
      ],
    },
  ],
};

/**
 * 内容列表
 * @type import("./src/custom/HomePage/type").GroupTopicType
 */
exports.topicGroup = [
  {
    groupTit: '使用指南',
    groupCards: [
      {
        cardTitle: 'WebHook 集成',
        cardAllHref: 'webhook/gitee-webhook-intro',
        cardLinks: [
          { label: '添加 WebHook', href: 'webhook/how-to-add-webhook' },
          { label: '删除 WebHook', href: 'webhook/how-to-delete-webhook' },
          { label: 'WebHook 推送数据类型说明', href: 'webhook/gitee-webhook-push-data-type' },
          { label: 'WebHook 推送数据格式说明', href: 'webhook/gitee-webhook-push-data-format' },
          { label: 'WebHook 密钥验证和验证算法', href: 'webhook/how-to-verify-webhook-keys' },
        ],
      },
      {
        cardTitle: 'IM 集成',
        cardAllHref: 'webhook/webhook-for-slack',
        cardLinks: [
          { label: '对 Slack 的支持', href: 'webhook/webhook-for-slack' },
          { label: '对企业微信的支持', href: 'webhook/webhook-for-wecom-robot' },
          { label: '对钉钉机器人的支持', href: 'webhook/webhook-for-dingtalk-robot' },
          { label: '对飞书机器人的支持', href: 'webhook/webhook-for-feishu-robot' },
        ],
      },

      {
        cardTitle: 'IDE 插件集成',
        cardAllHref: '/services/ide-plugins/intro',
        cardLinks: [
          { label: 'IDEA 插件', href: 'services/ide-plugins/IDEA' },
          { label: 'Visual Studio 插件', href: 'services/ide-plugins/visual-studio' },
          { label: 'EClipse 插件', href: 'services/ide-plugins/eclipse' },
          { label: 'Atom 插件', href: 'services/ide-plugins/atom' },
        ],
      },
    ],
  },
];
