const fs = require('fs-extra');
const chalk = require('chalk');
const { default: inspectUrls } = require('@jsdevtools/rehype-url-inspector');
const IMAGE_DATA = process.env.IMAGE_DATA;
const fileName = './tmp/img-data.json';

// 删掉旧的
fs.removeSync(fileName);
fs.writeJsonSync(fileName, []);

function appendJsonFile(data) {
  try {
    const json = fs.readJsonSync(fileName);
    const newData = [...json, ...data];
    fs.writeJsonSync(fileName, newData);
    console.log(chalk.greenBright(`发现${data.length}张图片... 写入到了 img-data.json 中！`));
  } catch (e) {
    console.log(e);
  }
}

module.exports = [
  inspectUrls,
  {
    selectors: ['img[src]'],
    inspect(urls) {
      if (IMAGE_DATA) {
        const result = urls.map((item) => {
          const { file, node, root, url } = item;
          return {
            img: url,
            file: file.history[0],
          };
        });
        if (result.length === 0) return;
        appendJsonFile(result);
      }
    },
  },
];
