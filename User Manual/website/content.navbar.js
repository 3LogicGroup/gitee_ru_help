// @ts-check

/** @type {import("@docusaurus/theme-common").Navbar} */
const NavBarConfig = {
  // 影响 sidebar logo 显示
  hideOnScroll: false,
  title: '产品文档',
  logo: {
    alt: 'Gitee Logo',
    srcDark: 'img/logo-light.svg',
    src: '/img/logo-black.svg',
    width: 114,
    height: 36,
    href: '/',
  },
  items: [
    { type: 'docSidebar', label: '企业版', sidebarId: 'enterprise' },
    { type: 'docSidebar', label: '社区版', sidebarId: 'community' },
    // { type: 'docSidebar', label: '高校版', sidebarId: 'education' },
    { label: '私有化', to: 'https://gitee.cn' },
  ],
};

module.exports = NavBarConfig;
