import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import fontmin from 'fontmin';
import filesize from 'filesize';
/** 字体裁剪脚本 */

const fontsSrc = 'static/fonts';
const fontsDest = 'static/fonts/compressed';

function compress(font, text) {
  const srcPath = path.join(fontsSrc, font);
  const destPath = path.join(fontsDest, font);
  const fm = new fontmin()
    .src(srcPath).dest(fontsDest)
    .use(
      fontmin.glyph({
        text,
        hinting: false,
      })
    );
  console.log(chalk.yellow(`[${font}] 开始压缩...`));
  console.log(chalk.yellow(`[${font}] 文字内容:`), text);
  fm.run((err) => {
    if (err) {
      console.log(chalk.red(`[${font}] 压缩失败, ${err?.message}`));
      return;
    }
    const { size: srcSize } = fs.statSync(srcPath);
    const { size: destSize } = fs.statSync(destPath);
    const compressRate = `${(((srcSize - destSize) / srcSize) * 100).toFixed(
      2
    )}%`;
    console.log(
      chalk.green(
        `[${font}] 压缩成功! ${filesize(srcSize)} -> ${filesize(
          destSize
        )} (${compressRate})`
      )
    );
  });
}

function getJSONByFilePath(basePath, file) {
  return JSON.parse(fs.readFileSync(path.join(basePath, file), 'utf8'));
}

const text = [
  ...Object.values(getJSONByFilePath('src/modules/indexpage', 'text.json')),
].join('');

// 阿里妈妈数黑体 (Alimama_ShuHeiTi_Bold.ttf)
compress('Alimama_ShuHeiTi_Bold.ttf', text);
