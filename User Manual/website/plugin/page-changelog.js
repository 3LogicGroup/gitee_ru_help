const path = require('path');
const { requireUncached } = require('./utils');

const Joi = require('joi');

// 校验
const schema = Joi.object({
  title: Joi.string().required(),
  notices: Joi.string().required(),
  changelogs: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        version: Joi.string().required(),
        release: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required(),
        content: Joi.string().required(),
      }),
    )
    .required(),
});

/**
 * 自定义更新日志页面
 */
module.exports = function (context, options) {
  return {
    name: 'changelog-page-plugin',
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir);
      return [`${contentPath}/content.changelog.js`];
    },
    async loadContent() {
      const configFile = path.resolve(context.siteDir, './content.changelog.js');
      const data = requireUncached(configFile);

      try {
        return await schema.validateAsync(data);
      } catch (err) {
        console.log(err?.details || err?.message);
        return {};
      }
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute } = actions;
      const pageDataJson = await createData('changelog-page-data.json', JSON.stringify(content));

      addRoute({
        path: `${context.baseUrl}changelog`,
        component: '@site/src/custom/ChangeLog/index.tsx',
        modules: {
          pageData: pageDataJson,
        },
        exact: true,
      });
    },
  };
};
