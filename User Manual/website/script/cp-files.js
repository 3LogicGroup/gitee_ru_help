const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const resolve = (src) => {
  return path.resolve(__dirname, src);
};

const websiteDir = resolve('..');
const sourceDir = resolve('../../docs');
const destDir = resolve('../docs');

const cpAllFiles = () => {
  fs.copy(sourceDir, destDir, (err) => {
    if (err) return console.error(err);
  });
};

const cpFile = (src, dest) => {
  fs.copy(src, dest, (err) => {
    if (err) return console.error(err);
  });
};

const delFile = (src) => {
  fs.remove(src, (err) => {
    if (err) return console.error(err);
  });
};

const watcher = chokidar.watch(sourceDir, { ignoreInitial: true }).on('all', (event, src) => {
  console.log();
  console.log(chalk.gray(path.basename(src)), chalk.yellowBright(`${event}`.toUpperCase()));
  const absPath = path.relative(websiteDir, src);

  if (['unlink', 'unlinkDir'].includes(event)) {
    delFile(resolve(absPath));
  } else {
    cpFile(src, resolve(absPath));
  }
  console.log();
});

// run initial copy
cpAllFiles();

process.on('SIGINT', () => {
  watcher
    .close()
    .then(() => {
      console.log('chokidar watcher closed');
      process.exit();
    })
    .catch((e) => {});
});
