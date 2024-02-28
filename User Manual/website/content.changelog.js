// @ts-check

/** @type import("./src/custom/ChangeLog/type").ChangeLogPageDataType */
const contentChangelog = {
  title: '更新日志',
  notices: '欢迎订阅微信公众号，随时随地获取产品更新动态一手信息',
  changelogs: [
    {
      title: '重磅！工时管理功能上线',
      version: 'V1.15.2',
      release: '2022-06-20',
      tags: ['项目管理', '企业版'],
      content: `企业版推出了周报功能，主要的目的就是 —— 既然不能不写周报，那我们来帮你简化写周报的内容。

只需将每周的代码提交以及完成任务列表中筛选出要在周报里汇报的内容，然后加上简单几句描述汇总的话，周报即刻完成，省时省力。`,
    },
  ],
};

module.exports = contentChangelog;
