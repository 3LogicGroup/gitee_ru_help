const fs = require('fs');
const chalk = require('chalk');
const lodashMap = require('lodash/map');
const unionBy = require('lodash/unionBy');

const configFile = './tmp/gitee_docs_url_migrate.conf';
const docsFile = './tmp/docs.json';

function renderNginxTpl(data) {
  const tpl = `
location '{{oldUrl}}' {
    return 302 'https://help.gitee.ru{{newUrl}}';
}
`;

  if (Array.isArray(data)) {
    return data.reduce((acc, cur) => {
      acc += tpl.replace('{{oldUrl}}', cur.oldUrl).replace('{{newUrl}}', cur.newUrl);
      return acc;
    }, '');
  }
  return '';
}

module.exports = function (context, options) {
  const originUrlSummaryObj = {};

  function originUrlSummary(item) {
    const key = item.frontMatter['origin-url'];
    if (!key) return;
    if (!originUrlSummaryObj[key]) {
      originUrlSummaryObj[key] = [];
    } else {
      originUrlSummaryObj[key] = [...originUrlSummaryObj[key], item.source];
    }
  }

  function duplicateCheckPrint() {
    const duplicateObj = {};
    lodashMap(originUrlSummaryObj, (value, key) => {
      if (originUrlSummaryObj[key].length > 1) {
        duplicateObj[key] = originUrlSummaryObj[key];
      }
    });

    console.log();
    console.log(chalk.yellow(`${chalk.bold('[WARNING]')} Duplicate origin_url found!`));
    console.log(chalk.yellow(JSON.stringify(duplicateObj, null, 2)));
    console.log();
    console.log();
  }

  return {
    name: 'generate-doc-plugin',
    contentLoaded(content) {
      const loadedVersions = content.allContent['docusaurus-plugin-content-docs']['default']['loadedVersions'];
      const currentVersion = loadedVersions.find((i) => i.versionName === 'current');
      const docs = currentVersion.docs;
      docs.forEach((doc) => {
        originUrlSummary(doc);
      });
      // 重复警告
      duplicateCheckPrint();
    },
    async postBuild(props) {
      const docContentPlugin = props.plugins.find((i) => Boolean(i.content));
      const currentVersion = docContentPlugin.content.loadedVersions.find((i) => i.versionName === 'current');
      const docs = currentVersion.docs;

      const urlList = docs.reduce((acc, cur) => {
        if (cur.frontMatter['origin-url'] && cur.frontMatter['origin-url'].includes('https://gitee.ru')) {
          acc.push({
            newUrl: cur.slug,
            oldUrl: cur.frontMatter['origin-url'].replace('https://gitee.ru', ''),
          });
        }
        return acc;
      }, []);

      const str = renderNginxTpl(unionBy(urlList, 'oldUrl'));
      fs.writeFileSync(docsFile, JSON.stringify(docs), { encoding: 'utf-8' });
      fs.writeFileSync(configFile, str);
      console.log(chalk.greenBright(`found ${urlList.length} items origin_url migrate !`));
      console.log(chalk.greenBright(configFile) + ` has generate！`);
      console.log();
      console.log();
    },
  };
};
