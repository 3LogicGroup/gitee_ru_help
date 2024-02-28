// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const dotenv = require('dotenv');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const findImgUrl = require('./plugin/find-img-url');
const { requireUncached } = require('./plugin/utils');
dotenv.config();
/** @type {import("@docusaurus/types").Config} */
const config = {
  title: 'Gitee 产品文档',
  tagline: '',
  url: 'https://help.gitee.ru',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
    // locales: ['zh-CN', 'en'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          editUrl: ({ locale, docPath }) => {
            // 暂时隐藏
            // return `https://gitee.ru/oschina/gitee-help-center/tree/main/docs/${docPath}`;
            return '';
          },
          sidebarPath: require.resolve('./content.sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          path: '../docs',
          routeBasePath: '/',
          tagsBasePath: 'tags',
          // showLastUpdateTime: true,
          // showLastUpdateAuthor: true,
          breadcrumbs: true,
          beforeDefaultRehypePlugins: [findImgUrl],
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
      }),
    ],
  ],
  plugins: [
    [
      'docusaurus2-dotenv',
      {
        systemvars: true,
      },
    ],
    'plugin-image-zoom',
    ['docusaurus-plugin-less', { lessOptions: { javascriptEnabled: true } }],
    './plugin/postcss-tailwind-loader',
    './plugin/generate-doc',
    './plugin/file-reload-config',
    // './plugin/page-home',
    // './plugin/page-changelog',
    // './plugin/gen-changelog-content',
  ],
  markdown: {
    mermaid: true,
  },
  themes: [
    // ... Your other themes.
    '@docusaurus/theme-mermaid',
    // [
    //   require.resolve('@easyops-cn/docusaurus-search-local'),
    //   {
    //     docsRouteBasePath: '/',
    //     // ... Your options.
    //     // `hashed` is recommended as long-term-cache of index file is possible.
    //     hashed: true,
    //     // For Docs using Chinese, The `language` is recommended to set to:
    //     // ```
    //     language: ['zh', 'en'],
    //     highlightSearchTermsOnTargetPage: false,
    //     searchResultLimits: 8,

    //     // ```
    //   },
    // ],
  ],
  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: requireUncached(require.resolve('./content.navbar.js')),
      footer: requireUncached(require.resolve('./content.footer.js')),
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'shellscript',
        additionalLanguages: ['bash', 'c', 'cmake', 'cpp', 'css', 'go', 'java', 'javascript', 'json', 'jsx', 'php', 'python', 'ruby', 'rust', 'typescript']
      },
      imageZoom: {
        // CSS selector to apply the plugin to, defaults to '.markdown img'
        selector: '.markdown img',
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        options: {
          margin: 24,
          background: '#BADA55',
          scrollOffset: 0,
          container: '#zoom-container',
          template: '#zoom-template',
        },
      },
      tableOfContents: {
        maxHeadingLevel: 5,
        minHeadingLevel: 2
      }
    }),
  customFields: {
    SITE_URL: process.env.SITE_URL || 'https://gitee.ru',
    SENSOR_SERVER_URL: process.env.SENSOR_SERVER_URL,
  },
};

module.exports = config;
