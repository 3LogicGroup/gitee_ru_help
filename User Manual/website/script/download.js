const { parse } = require('url');
const http = require('https');
const fs = require('fs');
const { basename } = require('path');

const TIMEOUT = 10000;

module.exports = function (url, dist) {
  const uri = parse(url);
  const file = fs.createWriteStream(dist);

  return new Promise(function (resolve, reject) {
    const request = http.get(uri.href).on('response', function (res) {
      const len = parseInt(res.headers['content-length'], 10);
      let downloaded = 0;
      let percent = 0;
      res
        .on('data', function (chunk) {
          file.write(chunk);
          downloaded += chunk.length;
          percent = ((100.0 * downloaded) / len).toFixed(2);
          process.stdout.write(`Downloading ${percent}% ${downloaded} bytes\r`);
        })
        .on('end', function () {
          file.end();
          console.log(`downloaded finished: ${url}`);
          resolve();
        })
        .on('error', function (err) {
          reject(err);
        });
    });
    request.setTimeout(TIMEOUT, function () {
      request.abort();
      reject(new Error(`request timeout after ${TIMEOUT / 1000.0}s`));
    });
  });
};
