const path = require('path');
const { walkSync } = require('./utils');

module.exports = function (context, options) {
  return {
    name: 'file-reload-config-plugin',
    getPathsToWatch() {
      const siteDir = path.resolve(context.siteDir);

      const sidebarConfigs = [];
      walkSync(`${siteDir}/sidebar`, (f) => {
        sidebarConfigs.push(f);
      });

      const watchFiles = [`${siteDir}/content.navbar.js`, `${siteDir}/content.footer.js`, ...sidebarConfigs];
      return watchFiles;
    },
  };
};
