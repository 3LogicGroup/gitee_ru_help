const fs = require('fs');
const chalk = require('chalk');
const GEN_CHANGELOG_DATA = process.env.GEN_CHANGELOG_DATA;

const contentFile = './tmp/changelog-content.json';

module.exports = function (context, options) {
  return {
    name: 'gen-changelog-content-plugin',
    async postBuild(props) {
      // if (!GEN_CHANGELOG_DATA) return;

      debugger;
      const docContentPlugin = props.plugins.find((i) => Boolean(i.content));
      const currentVersion = docContentPlugin.content.loadedVersions.find((i) => i.versionName === 'current');
      const docs = currentVersion.docs;

      const changeLogDocs = docs.reduce((acc, cur) => {
        if (cur.sourceDirName === 'change-log') {
          acc.push(cur);
        }
        return acc;
      }, []);

      fs.writeFileSync(contentFile, JSON.stringify({ docs: changeLogDocs }, null, 2));

      console.log(chalk.greenBright(`found ${changeLogDocs.length} change log content docs !`));
      console.log(chalk.greenBright(contentFile) + ` has generate！`);
      console.log();
      console.log();
    },
  };
};
