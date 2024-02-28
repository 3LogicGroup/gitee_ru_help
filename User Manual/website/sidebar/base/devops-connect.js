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
const sidebarItems =  [
    { type: 'doc', label: 'Jenkins 插件', id: 'devops/connect/Jenkins-Plugin' },
    { type: 'doc', label: 'TencentHub', id: 'devops/connect/TencentHub' },
    { type: 'doc', label: '腾讯云托管', id: 'devops/connect/Tencent-CloudBase' },
    { type: 'doc', label: '腾讯云 ServerlessFramework', id: 'devops/connect/Tencent-Serverless-Framework' },
    // { type: 'doc', label: '百度效率云', id: 'devops/connect/Baidu-XLY' },
    { type: 'doc', label: '华为容器云', id: 'devops/connect/HUAWEI-Cloud-ContainerOps' },
    { type: 'doc', label: '华为微服务', id: 'devops/connect/HUAWEI-Cloud-SWR' },
    { type: 'doc', label: '华为云 ContainerOps 服务', id: 'devops/connect/HUAWEI-Cloud-Service-Engine' },
    { type: 'doc', label: '阿里云 Serverless 应用引擎 SAE', id: 'devops/connect/Aliyun-SAE' },
    { type: 'doc', label: '阿里云 CodePipeline', id: 'devops/connect/Aliyun-CodePipeline' },
    { type: 'doc', label: 'AzurePipeLine ', id: 'devops/connect/Azure-PipeLine' },
    { type: 'doc', label: '奇安信代码卫士', id: 'devops/connect/Qi-AnXin-CodeSafe' },
    {
      type: 'doc',
      label: 'Composer 集成（packagist.org）',
      id: 'devops/connect/how-to-automatically-publish-to-packagist.org',
    },
  ];

module.exports = sidebarItems;
