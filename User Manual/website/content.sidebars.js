// @ts-check
/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const { requireUncached } = require('./plugin/utils');
const requireX = (path) => requireUncached(require.resolve(path));

/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
const sidebars = {
  enterprise: requireX('./sidebar/enterprise'),
  community: requireX('./sidebar/community'),
  education: requireX('./sidebar/education'),
};

module.exports = sidebars;
