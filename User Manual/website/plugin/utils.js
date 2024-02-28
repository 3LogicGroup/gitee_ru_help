const fs = require('fs');
const path = require('path');

function requireUncached(module) {
  delete require.cache[module];
  return require(module);
}

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (dirent) {
    const filePath = path.join(currentDirPath, dirent.name);
    if (dirent.isFile()) {
      callback(filePath, dirent);
    } else if (dirent.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

module.exports = {
  requireUncached,
  walkSync,
};
