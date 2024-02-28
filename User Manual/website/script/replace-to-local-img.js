const fs = require('fs');
const path = require('path');
const fsx = require('fs-extra');
const chalk = require('chalk');
const replaceInFile = require('replace-in-file');

const f = require('../tmp/img-data.json');

if (Array.isArray(f)) {
  f.forEach((item) => {
    const mdDir = path.dirname(item.file);
    const fileName = path.basename(item.img);
    console.log();
    const imgPath = `${mdDir}/images/${fileName}`;

    if (fs.existsSync(imgPath)) {
      replaceInFile({
        files: item.file,
        from: item.img,
        to: `./images/${path.basename(item.img)}`,
      })
        .then(() => {
          console.log(chalk.green(`${path.basename(item.file)}`));
        })
        .catch((error) => {
          console.error('Error occurred:', error);
        });
    }
  });
}
