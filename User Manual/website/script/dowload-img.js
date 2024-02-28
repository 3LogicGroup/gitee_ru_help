const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');
const chalk = require('chalk');
const download = require('./download');

const jsonFile = './tmp/img-data.json';
const cwd = process.cwd();
const rootDir = process.cwd();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getDistPath = (mdPath) => {
  const mdFileDir = path.dirname(mdPath);
  const rel = path.relative(cwd, mdFileDir);
  const docRealPath = path.resolve(rootDir, rel);
  return `${docRealPath}/images`;
};

async function pMapSeries(iterable, mapper) {
  const result = [];
  let index = 0;

  for (const value of iterable) {
    result.push(await mapper(await value, index++));
  }

  return result;
}

/**
 * 下载 img data 图片
 */
const arrayData = fsx.readJsonSync(jsonFile);
console.log(chalk.greenBright(`读取 img-data.json 发现 ${arrayData.length} 张图片...`));

const mapper = async ({ img, file }) => {
  const distPath = getDistPath(file);
  const distFile = path.resolve(distPath, path.basename(img));

  // 确保 images 目录存在
  await fsx.ensureDir(distPath);

  // 检查是否下载过
  if (await fsx.exists(distFile)) {
    return;
  }

  await download(img, distFile);
  return true;
};

(async function () {
  await pMapSeries(arrayData, mapper);
})();
