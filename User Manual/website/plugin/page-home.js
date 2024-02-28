const path = require('path');
const Joi = require('joi');
const { requireUncached } = require('./utils');

// 校验
const schema = Joi.object({
  hotTopics: Joi.object({
    questions: Joi.array()
      .items(
        Joi.object({
          label: Joi.string().required(),
          href: Joi.string().required(),
        }),
      )
      .required(),
    topicCards: Joi.array()
      .items(
        Joi.object({
          cardTitle: Joi.string().required(),
          cardAllHref: Joi.string(),
          cardLinks: Joi.array()
            .items({
              label: Joi.string().required(),
              href: Joi.string().required(),
            })
            .required(),
        }),
      )
      .required(),
  }),
  topicGroup: Joi.array().items(
    Joi.object({
      groupTit: Joi.string().required(),
      groupCards: Joi.array()
        .items(
          Joi.object({
            cardTitle: Joi.string().required(),
            cardAllHref: Joi.string(),
            cardLinks: Joi.array()
              .items({
                label: Joi.string().required(),
                href: Joi.string().required(),
              })
              .required(),
          }),
        )
        .required(),
    }),
  ),
});

/**
 * 加载 homePage 数据
 */
module.exports = function (context, options) {
  return {
    name: 'home-page-plugin',
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir);
      return [`${contentPath}/content.home.js`];
    },
    async loadContent() {
      const configFile = path.resolve(context.siteDir, './content.home.js');
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
      const homePageDataJson = await createData('home-page-data.json', JSON.stringify(content));
      addRoute({
        path: `${context.baseUrl}`,
        component: '@site/src/custom/Homepage/index.tsx',
        modules: {
          pageData: homePageDataJson,
        },
        exact: true,
      });
    },
  };
};
