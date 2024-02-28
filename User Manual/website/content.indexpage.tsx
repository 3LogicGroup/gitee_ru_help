// 帮助中心首页配置
import React from 'react';
import ent from './static/img/indexpage/videos/ent.png';
import community from './static/img/indexpage/videos/community.png';
import edu from './static/img/indexpage/videos/edu.png';
import statistics from './static/img/indexpage/videos/statistics.png';
import pipeline from './static/img/indexpage/videos/pipeline.png';
import tableView from './static/img/indexpage/videos/table-view.png';

import adminIcon from './static/img/indexpage/help-nav/admin.png';
import projectIcon from './static/img/indexpage/help-nav/project.png';
import codeIcon from './static/img/indexpage/help-nav/code.png';
import pipelineIcon from './static/img/indexpage/help-nav/pipeline.png';
import statisticsIcon from './static/img/indexpage/help-nav/statistics.png';
import questionIcon from './static/img/indexpage/help-nav/question.png';
import { IconInfinity, IconUserDouble, IconBookOpen } from '@gitee/icons-react';

import newFeatureCover from './static/img/indexpage/cover/202208-feature.jpg';
import hotFeatureCover from './static/img/indexpage/cover/hot-feature.jpg';
import goFeatureCover from './static/img/indexpage/cover/go-feature.jpg';
import claFeatureCover from './static/img/indexpage/cover/cla-feature.png';

/** 首页视频板块 */
const videoCardDataList: Array<{
  img: string;
  title: string;
  desc: string;
  videoSrc: string;
  /** 启用企业版动画? (lottie-player) */
  enabledEntAnimation?: boolean;
}> = [
    {
      img: ent,
      title: 'Gitee 企业版',
      desc: '一站式研发效能平台，25 万企业的信赖首选。通过高效、易用、敏捷的高并发工作流程，助力企业快速实现数字化转型，为业务创新提供有力支撑和持续驱动。',
      videoSrc: 'https://talk.gitee.ru/video/gitee-enterprise-landing-page.mp4',
      enabledEntAnimation: true,
    },
    {
      img: community,
      title: 'Gitee 社区版',
      desc: '为国内开发者提供优质稳定的托管服务，致力于打造无边界的协作体验，不论开源作者或是研发团队，都能在 Gitee 上实现价值，开创自己不设限的未来。',
      videoSrc: 'https://talk.gitee.ru/education/videos/gitee.tvc.mp4',
    },
    {
      img: edu,
      title: 'Gitee 高校版',
      desc: '面向高校计算机相关专业的一体化教学平台，解决软件工程教学难点，基于代码托管能力，满足学校教学、实训、项目协作、测试、自动化部署等全方位需求。',
      videoSrc: 'https://talk.gitee.ru/education/videos/gitee-talk-education.mp4',
    },
    {
      img: statistics,
      title: '工作项管理',
      desc: '帮助团队统一设置工作项类型，使项目管理井然有序',
      videoSrc: 'https://talk.gitee.ru/video/feature-guide/project-issue-type-setting.mp4',
    },
    {
      img: pipeline,
      title: '自动化持续交付',
      desc: '三分钟上手持续交付流水线，一键生成高并发工作流。',
      videoSrc: 'https://talk.gitee.ru/gitee-go/giteego-intro-2022.mp4',
    },
    {
      img: tableView,
      title: '表格视图',
      desc: '工作项管理支持自定义表格视图，信息降噪触手可及。',
      videoSrc: 'https://talk.gitee.ru/video/feature-guide/issue-table.mp4',
    },
  ];

/** 查看更多 Gitee 视频攻略 */
const moreVideoLink: string = 'https://space.bilibili.com/511608172/video';
const moreCaseLink: string = 'https://gitee.ru/customers';
const moreActivityLink: string = '/enterprise/activitys';
/** 帮助文档导航卡片内容 */
type HelpNavKey = 'ent' | 'community' | 'edu';
type HelpNavDataList = {
  [k in HelpNavKey]: Array<{
    /** 问题类别标题 */
    title: string;
    /** 1:1 的图片, 可以从此文件 import 或使用 CDN 链接。 */
    icon: string;
    /** 查看更多的链接 */
    moreLink: string;
    // 问题列表, 问题数量不超过四个
    question: Array<{
      /** 问题标题 */
      text: string;
      /** 问题链接 */
      link: string;
    }>;
  }>;
};

// TODO 产品完善中...
/** 首页帮助文档导航 */
const helpNav: Array<{ key: HelpNavKey; icon: JSX.Element; name: string }> = [
  {
    key: 'ent',
    name: '企业版',
    icon: <IconInfinity />,
  },
  {
    key: 'community',
    name: '社区版',
    icon: <IconUserDouble />,
  },
  // {
  //   key: 'edu',
  //   name: '高校版',
  //   icon: <IconBookOpen />,
  // },
];

const helpNavDataList: HelpNavDataList = {
  ent: [
    {
      title: '企业管理',
      icon: adminIcon,
      moreLink: '/enterprise/management',
      question: [
        {
          text: '个人账号如何升级为企业账户？',
          link: '/enterprise/quickstart/个人账号升级为企业账户',
        },
        {
          text: '如何进入企业工作台界面？',
          link: 'enterprise/management/dashboard/entry',
        },
        {
          text: '如何添加企业成员？',
          link: 'enterprise/management/members/add',
        },
        {
          text: '如何给成员分配企业角色？',
          link: 'enterprise/management/members/change-role',
        },
      ],
    },
    {
      title: '项目管理',
      icon: projectIcon,
      moreLink: '/enterprise/project/questions',
      question: [
        {
          text: '项目文档如何协作？',
          link: '/enterprise/project/docs/new',
        },
        {
          text: '项目中如何添加成员？',
          link: '/enterprise/project/settings/members',
        },
        {
          text: '如何新建项目？',
          link: '/enterprise/project/new',
        },
        {
          text: '如何删除项目？',
          link: '/enterprise/project/questions/delete',
        },
      ],
    },
    {
      title: '代码管理',
      icon: codeIcon,
      moreLink: '/enterprise/code/questions',
      question: [
        {
          text: '如何找回被删除的仓库数据？',
          link: '/repository/base/如何找回被删除的仓库数据',
        },
        {
          text: '仓库体积过大如何减小？',
          link: '/questions/仓库体积过大，如何减小',
        },
        {
          text: '如何设置保护分支？',
          link: '/enterprise/repo/设置保护分支',
        },
        {
          text: '如何使用 CodeOwners 功能？',
          link: '/repository/extend/如何使用 CodeOwners 功能',
        },
      ],
    },
    {
      title: '流水线管理',
      icon: pipelineIcon,
      moreLink: '/enterprise/pipeline/questions',
      question: [
        {
          text: '自有主机部署失败怎么办？',
          link: '/enterprise/pipeline/questions/deploy-error',
        },
        {
          text: '无法开通流水线怎么办？',
          link: '/enterprise/pipeline/questions/can-not-open-pipeline',
        },
        {
          text: '提交代码没有触发构建怎么办？',
          link: '/enterprise/pipeline/questions/not-trigger',
        },
        {
          text: '任务一直运行中没有日志怎么办？',
          link: '/enterprise/pipeline/questions/running-no-log',
        },
      ],
    },
    {
      title: '效能度量',
      icon: statisticsIcon,
      moreLink: '/enterprise/insight/questions',
      question: [
        {
          text: '如何查看需求每日新增趋势？',
          link: '/enterprise/insight/questions/how-to-view-the-daily-demand-trend',
        },
        {
          text: '如何查看需求按时交付情况？',
          link: '/enterprise/insight/questions/how-to-view-the-daily-statistics',
        },
        {
          text: '如何查看缺陷每日新增趋势？',
          link: '/enterprise/insight/questions/how-to-view-the-daily-bug-trend',
        },
        {
          text: '如何查看任务每日新增趋势？',
          link: '/enterprise/insight/questions/how-to-view-the-daily-issue-trend',
        },
      ],
    },
    {
      title: '常见问题',
      icon: questionIcon,
      moreLink: '/enterprise/questions',
      question: [
        {
          text: '企业账号无法开具发票',
          link: '/enterprise/questions/invoice/invoice-request',
        },
        {
          text: '如何查看发票快递信息',
          link: '/enterprise/questions/invoice/invoice-logistics-info',
        },
        {
          text: '企业成员超额如何处理',
          link: '/enterprise/manage/questions/member-above-quota',
        },
        {
          text: '发票申请注意事项有哪些',
          link: '/enterprise/questions/invoice/invoice-request-notice',
        },
      ],
    },
  ],
  // 产品内容完善中...
  community: [
    {
      title: '仓库/代码管理',
      icon: codeIcon,
      moreLink: '/repository',
      question: [
        {
          text: '如何通过网页管理仓库内文件',
          link: '/repository/file',
        },
        {
          text: '如何通过网页管理仓库分支',
          link: '/repository/branch',
        },
        {
          text: '如何管理仓库成员',
          link: '/repository/member',
        },
        {
          text: '如何管理开源项目发行版',
          link: '/repository/release',
        },
      ],
    },
    {
      title: 'SSH 管理',
      icon: projectIcon,
      moreLink: '/repository/ssh-key',
      question: [
        {
          text: '生成、添加 SSH 公钥',
          link: '/repository/ssh-key/generate-and-add-ssh-public-key',
        },
        {
          text: '如何在 Gitee 上使用 GPG',
          link: '/repository/ssh-key/how-to-use-gpg-with-gitee',
        },
        {
          text: 'Git 配置多个 SSH-Key',
          link: '/repository/ssh-key/configure-multiple-ssh-keys',
        },
        {
          text: 'SSHKey 常见错误和问题',
          link: '/repository/ssh/questions',
        }
      ],
    },
    {
      title: 'WebHook 集成',
      icon: adminIcon,
      moreLink: '/webhook',
      question: [
        {
          text: 'WebHook 简介',
          link: '/webhook/gitee-webhook-intro',
        },
        {
          text: '添加 WebHook',
          link: '/webhook/how-to-add-webhook',
        },
        {
          text: 'WebHook 对 Slack 的支持',
          link: '/webhook/webhook-for-slack',
        },
        {
          text: 'WebHook 对企业微信的支持',
          link: '/webhook/webhook-for-wecom-robot',
        },
        {
          text: 'WebHook 对钉钉机器人的支持',
          link: '/webhook/webhook-for-dingtalk-robot',
        },
        {
          text: 'WebHook 对飞书机器人的支持',
          link: '/webhook/webhook-for-feishu-robot',
        },
      ],
    },
  ],
  edu: [
    {
      title: '课程管理',
      icon: adminIcon,
      moreLink: '/eduction/class',
      question: [
        { text: '如何创建课程？', link: '#',},
        { text: '如何使用课程管理学生？', link: '#',},
        { text: '如何使用文本作业？', link: '#',},
        { text: '如何使用代码作业？', link: '#',},
      ]
    },
    {
      title: '仓库管理',
      icon: codeIcon,
      moreLink: '/eduction/code',
      question: [
        {
          text: 'Git 是什么？',
          link: '#'
        },
        {
          text: '如何创建仓库？',
          link: '#'
        },
        {
          text: '如何提交代码？',
          link: '#'
        },
        {
          text: '如何使用仓库管理代码？',
          link: '#'
        },
      ]
    },
    {
      title: '项目管理',
      icon: projectIcon,
      moreLink: '/eduction/project',
      question: [
        { text: '如何创建项目？', link: '#',},
        { text: '如何使用项目协作？', link: '#',},
        { text: '如何使用项目完成实训课程？', link: '#',},
        { text: '如何使用项目完成毕业设计？', link: '#',},
      ]
    },
    {
      title: '常见问题',
      icon: questionIcon,
      moreLink: '/eduction/questions',
      question: [
        { text: 'Git 操作常见问题', link: '#', },
        { text: '课程记录如何存档？', link: '#', },
        { text: '如何合理的设置打分方式？', link: '#', },
        { text: '如何批改作业？', link: '#', },
      ],
    },
  ],
};

/** 首页"产品动态"板块数据列表 */
const eventDataList: Array<{
  /** 卡片封面图片, 图片会被裁剪按中心缩放 */
  poster: string;
  /** 卡片描述 */
  desc: string;
  /** 点击卡片的链接 */
  link: string;
}> = [
    {
      poster: newFeatureCover,
      desc: 'Gitee 企业版 8 月更新汇总：细节之处见真章',
      link: 'https://blog.gitee.ru/2022/09/08/gitee-update/',
    },
    {
      poster: goFeatureCover,
      desc: 'Gitee Go 武器库再添猛将，开源漏洞扫描也能自动化',
      link: 'https://blog.gitee.ru/2022/09/08/gitee-go-3/',
    },
    {
      poster: hotFeatureCover,
      desc: '小功能有大用处，Gitee 这些新特性你都 get 了吗？',
      link: 'https://blog.gitee.ru/2022/08/18/update/',
    },
    {
      poster: claFeatureCover,
      desc: 'Gitee 上线 CLA 协议签署，开源贡献也能有据可依',
      link: 'https://blog.gitee.ru/2022/08/17/gitee-cla/',
    },
  ];

export {
  videoCardDataList,
  moreVideoLink,
  moreCaseLink,
  moreActivityLink,
  type HelpNavKey,
  type HelpNavDataList,
  helpNav,
  helpNavDataList,
  eventDataList,
};
