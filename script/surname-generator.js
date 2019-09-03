const fsPromises = require('fs').promises;
const path = require('path');
const surnamePath = './surname.txt';
const endOfLine = /(?:\n|\r|\r\n)/;
const prettier = require('prettier');
const formatPath = '../.prettierrc';
const distPath = '../src/install/surname.ts';
const fileOption = {
  encoding: 'utf8',
};

async function main() {
  let surnameText = await fsPromises.readFile(
    path.resolve(__dirname, surnamePath),
    fileOption,
  );
  let formatText = await fsPromises.readFile(
    path.resolve(__dirname, formatPath),
    fileOption,
  );
  let format = JSON.parse(formatText);
  format.parser = 'typescript';
  let surnameLines = surnameText.split(endOfLine);
  let surnameList = surnameLines.filter(surnameLine => {
    return surnameLine !== '';
  });
  let surnameJSON = JSON.stringify(surnameList);

  let content = `/**
 * 此文件由脚本自动生成，请勿直接修改
 */
export const SURNAME = ${surnameJSON}
`;

  await fsPromises.writeFile(
    path.resolve(__dirname, distPath),
    prettier.format(content, format),
    fileOption,
  );
}

main().then(() => 0);
