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
const requireX = (path) => requireUncached(require.resolve(path));

/** @type {import("@docusaurus/plugin-content-docs/src/sidebars/types").SidebarConfig} */
const sidebarItems = [
    // {
    //     type: 'category', collapsed: true, label: '产品简介', link: {
    //         type: 'generated-index', title: '产品简介', description: '产品简介文档', slug: '/community',
    //         keywords: ['产品简介'], image: '/img/docusaurus.png',
    //     }, items: [
    //         { type: 'doc', label: 'Gitee 开源软件 ', id: 'repository/file-operate/intro' },
    //         { type: 'doc', label: '开源 - 价值、生态', id: 'repository/file-operate/intro' },
    //     ],
    // },

    // {
    //     type: 'category', collapsed: true, label: '关于开源', link: {
    //         type: 'generated-index', title: '关于开源', description: '关于开源文档', slug: '/opensources',
    //         keywords: ['关于开源'], image: '/img/docusaurus.png',
    //     }, items: [
    //         { type: 'doc', label: 'Gitee 开源软件 ', id: 'repository/file-operate/intro' },
    //     ],
    // },

    // {
    //     type: 'category', collapsed: true, label: '基础功能', link: {
    //         type: 'generated-index', title: '基础功能', description: '基础功能', slug: '/opensources',
    //         keywords: ['基础功能'], image: '/img/docusaurus.png',
    //     }, items: [
    //         // { type: 'doc', label: '基础功能', id: 'repository/file-operate/intro' },
    //         // requireX('./enterprise/index'),
    //         // requireX('./eduction/index'),
    //     ],
    // },
    //  - - https://blog.gitee.ru/category/about-open-source/

    //  - - https://blog.gitee.ru/category/hot-project/


    {
        type: 'category', collapsed: true, label: '仓库/代码管理', link: {
            type: 'generated-index', title: '仓库/代码管理', description: '仓库/代码管理文档', slug: '/repository',
            keywords: ['仓库/代码管理'], image: '/img/docusaurus.png',
        }, items: [

            {
                type: 'category', collapsed: true, label: '基本功能', link: {
                    type: 'generated-index', title: '基本功能', description: '基本功能文档', slug: '/repository/base-usage',
                    keywords: ['基本功能'], image: '/img/docusaurus.png',
                },
                items: [],
            },
            {
                type: 'category', collapsed: true, label: '文件操作', link: {
                    type: 'generated-index', title: '文件操作', description: '文件操作文档', slug: '/repository/file',
                    keywords: ['文件操作'], image: '/img/docusaurus.png',
                },
                items: [
                    { type: 'doc', label: '文件创建、更新、删除', id: 'repository/file-operate/creation-update-and-deletion' },
                    { type: 'doc', label: '重命名、移动文件', id: 'repository/file-operate/rename-and-move' },
                    { type: 'doc', label: '文件对比', id: 'repository/file-operate/compare' },
                    { type: 'doc', label: '文件历史版本、提交历史查看', id: 'repository/file-operate/history' },
                ],
            },

            {
                type: 'category', collapsed: true, label: '分支管理', link: {
                    type: 'generated-index', title: '分支管理', description: '分支管理文档', slug: '/repository/branch',
                    keywords: ['分支管理'], image: '/img/docusaurus.png',
                },
                items: [
                    { type: 'doc', label: '筛选查看和创建分支', id: 'repository/branch/screen-and-create' },
                    { type: 'doc', label: '设置默认分支和删除分支', id: 'repository/branch/default-and-delete' },
                    { type: 'doc', label: '合并分支', id: 'repository/branch/merge' },
                    { type: 'doc', label: '保护分支和保护分支的评审模式', id: 'repository/branch/protected-branches' },
                    { type: 'doc', label: '重建已删除分支', id: 'repository/branch/rebuild' },
                ],
            },
            {
                type: 'category', collapsed: true, label: '标签/发行版（Release）管理', link:
                {
                    type: 'generated-index', title: '标签/发行版（Release）管理', description: '标签/发行版（Release）管理文档', slug: '/repository/release',
                    keywords: ['标签/发行版（Release）管理'],
                    image: '/img/docusaurus.png',
                },
                items: [
                    { type: 'doc', label: '什么是 Release（发行版）', id: 'repository/release/what-is-release' },
                    { type: 'doc', label: '创建 Release（发行版）', id: 'repository/release/create' },
                    { type: 'doc', label: '更新和删除 Release（发行版）', id: 'repository/release/update-and-delete' },
                ],
            },

            {
                type: 'category', collapsed: true, label: 'SSH Key 配置管理',
                link: {
                    type: 'generated-index', title: 'SSH Key 配置管理', description: 'Learn SSH Key 配置管理文档', slug: '/repository/ssh-key',
                    keywords: ['SSH Key 配置管理'], image: '/img/docusaurus.png',
                },
                items: [
                    { type: 'doc', label: '公钥管理', id: 'repository/ssh/settings' },
                    { type: 'doc', label: '生成、添加 SSH 公钥', id: 'repository/ssh/how-to-generate-and-add-ssh-public-key' },
                    { type: 'doc', label: '如何在 Gitee 上使用 GPG', id: 'repository/ssh/how-to-use-gpg-on-gitee' },
                    { type: 'doc', label: 'Git 配置多个 SSH-Key', id: 'repository/ssh/how-to-configure-multiple-ssh-keys' },
                    { type: 'doc', label: 'SSHKey 常见错误和问题', id: 'repository/ssh/questions' },
                ],
            },

            {
                type: 'category', collapsed: true, label: '仓库统计', link: {
                    type: 'generated-index', title: '仓库统计', description: '仓库统计文档', slug: '/repository/statistics',
                    keywords: ['仓库统计'], image: '/img/docusaurus.png',
                },
                items: [
                    { type: 'doc', label: '仓库访问统计', id: 'repository/statistics/access' },
                    { type: 'doc', label: '仓库数据统计', id: 'repository/statistics/stats' },
                    { type: 'doc', label: '仓库网络图', id: 'repository/statistics/graph' },
                ],
            },

            {
                type: 'category', collapsed: true, label: '仓库设置', link: {
                    type: 'generated-index', title: '仓库设置', description: '仓库设置文档', slug: '/repository/settings',
                    keywords: ['仓库设置'], image: '/img/docusaurus.png',
                },
                items: [
                    'repository/settings/gc',
                    'repository/settings/baidu-statistics',
                    'repository/settings/sync-between-gitee-github',
                    'repository/settings/status',
                    'repository/settings/transfer',
                    'repository/settings/delete',
                ],
            },

            {
                type: 'category', collapsed: true, label: '成员管理', link: {
                    type: 'generated-index', title: '成员管理', description: '成员管理文档', slug: '/repository/member',
                    keywords: ['成员管理'], image: '/img/docusaurus.png',
                },
                items: [
                    { type: 'doc', label: '仓库成员角色说明', id: 'repository/member/permission' },
                    { type: 'doc', label: '添加仓库成员', id: 'repository/member/add' },
                    { type: 'doc', label: '移除仓库成员', id: 'repository/member/delete' },
                ],
            },
        ],
    },

    {
        type: 'category', collapsed: true, label: 'Issue 任务协作', link: {
            type: 'generated-index', title: 'Issue 任务协作', description: 'Issue 任务协作', slug: '/issue',
            keywords: ['Issue 任务协作'], image: '/img/docusaurus.png',
        }, items: [
            requireX('./base/issue'),
        ],
    },


    {
        type: 'category', collapsed: true, label: 'Pull Request 代码协作', link: {
            type: 'generated-index', title: 'Pull Request 代码协作', description: 'Pull Request 代码协作', slug: '/pull-request',
            keywords: ['Pull Request 代码协作'], image: '/img/docusaurus.png',
        }, items: [
            requireX('./base/pullrequest'),
        ],
    },

    // {
    //     type: 'category', collapsed: true, label: 'Wiki 知识库', link: {
    //         type: 'generated-index', title: 'Wiki 知识库', description: 'Wiki 知识库', slug: '/wiki',
    //         keywords: ['代码管理'], image: '/img/docusaurus.png',
    //     }, items: [
    //         requireX('./base/wiki'),
    //     ],
    // },

    {
        type: 'category', collapsed: true, label: 'WebHook 管理', link: {
            type: 'generated-index', title: 'WebHook 管理', description: 'WebHook 管理', slug: '/webhook',
            keywords: ['代码管理'], image: '/img/docusaurus.png',
        }, items: [
            requireX('./base/webhook'),
        ],
    },

    {
        type: 'category', collapsed: true, label: '帐号与安全', link: {
            type: 'generated-index', title: '帐号与安全', description: '帐号与安全', slug: '/account-and-profile',
            keywords: ['代码管理'], image: '/img/docusaurus.png',
        }, items: [
            'base/account/组织功能介绍',
            'base/account/第三方账号绑定',
            'base/account/个人空间地址设置',
            'base/account/个人私有成员超过5人，怎么办',
            'base/account/个人信息设置',
            'base/account/如何添加组织域名验证',
            'base/account/消息通知设置',
            'base/account/组织私有成员超额，如何处理',
            'base/account/Gitee使用配额说明',
            'base/account/SSH公钥设置',
            'base/account/gitees-ssh-key-fingerprints',
        ],
    },

    // {
    //     type: 'category', collapsed: true, label: '账户管理', link: {
    //         type: 'generated-index', title: '账户管理', description: '账户管理文档', slug: '/account',
    //         keywords: ['账户管理'], image: '/img/docusaurus.png',
    //     }, items: [],
    // },
    {
        type: 'category', collapsed: true, label: '服务集成', link: {
            type: 'generated-index', title: '服务集成', description: '服务集成文档', slug: '/services',
            keywords: ['服务集成'], image: '/img/docusaurus.png',
        }, items: [
            requireX('./devops/gitee-go.js'), // IDE 插件
            requireX('./common/other-services'), // IDE 插件
            requireX('./common/ide-plugin'), // IDE 插件
        ],
    },






    {
        type: 'category', collapsed: true, label: '项目推荐', link: {
            type: 'generated-index', title: '项目推荐', description: '项目推荐文档', slug: '/recommand',
            keywords: ['项目推荐'], image: '/img/docusaurus.png',
        }, items: [],
    },


    // changelog: requireX('./sidebar/changelog'), // 更新日志
    // questions: requireX('./sidebar/questions'), // 常见问题
    // devops: requireX('./sidebar/base/devops'), // DevOps 持续集成
    // // 'devops/intro': requireX('./sidebar/devops/intro'), // 初识 DevOps
    // 'devops/jenkins': requireX('./sidebar/devops/jenkins'), // Gitee x Jenkins 集成
    // giteeGo: requireX('./sidebar/devops/gitee-go'), // Gitee Go
    // // 'devops/best-practices': requireX('./sidebar/devops/best-practices'), // DevOps 最佳实践
    // opensources: requireX('./sidebar/opensources'), // 开源治理相关
    // 'ide-plugin': 
    // services: requireX('./sidebar/other-services'), // 其他服务
    {
        type: 'category', collapsed: true, label: '第三方服务集成', link: {
            type: 'generated-index', title: '第三方服务集成', description: '第三方服务集成文档', slug: '/services-third-party',
            keywords: ['第三方服务集成'], image: '/img/docusaurus.png',
        }, items: [
            requireX('./base/devops-connect'), // 第三方服务集成
        ],
    },
    //  - - https://gitee.ru/help/articles/4285#article-header0
    {
        type: 'category', collapsed: true, label: 'Git 知识大全', link: {
            type: 'generated-index', title: 'Git 知识大全', description: 'Git 知识大全文档', slug: '/git',
            keywords: ['Git 知识大全'], image: '/img/docusaurus.png',
        }, items: [],
    },

    {
        type: 'category', collapsed: true, label: '更新日志', link: {
            type: 'generated-index', title: '更新日志', description: '更新日志', slug: '/community/changelogs',
            keywords: ['更新日志'], image: '/img/docusaurus.png',
        }, items: [
            // requireX('./community/changelogs'),
        ],
    },
    {
        type: 'category', collapsed: true, label: '服务协议', link: {
            type: 'generated-index', title: '服务协议', description: '服务协议文档', slug: '/terms',
            keywords: ['服务协议'], image: '/img/docusaurus.png',
        }, items: [
            { type: 'link', label: '网站 ', href: 'https://gitee.ru/terms' },
            { type: 'link', label: '个人 ', href: 'https://gitee.ru/user_terms' },
        ],
    },

];

module.exports = sidebarItems;
