const fsPromises = require('fs').promises;
const path = require('path');
const formatPath = '../.prettierrc';
const citiesPath = './cities.txt';
const citiesDistPath = '../src/install/cities.ts';
const endOfLine = /(?:\n|\r|\r\n)/;
const fileOption = {
  encoding: 'utf8',
};

const prettier = require('prettier');

async function main() {
  let formatText = await fsPromises.readFile(
    path.resolve(__dirname, formatPath),
    fileOption,
  );
  let format = JSON.parse(formatText);
  format.parser = 'typescript';

  let citiesText = await fsPromises.readFile(
    path.resolve(__dirname, citiesPath),
    fileOption,
  );

  let citiesLines = citiesText.split(endOfLine);
  let citiesList = citiesLines.filter(citiesLine => {
    return citiesLine !== '';
  });
  let citiesSet = citiesList.map(citiesLine => {
    let [code, name] = citiesLine.split(':');
    return {
      code: code,
      name,
    };
  });

  let citiesJSON = JSON.stringify(citiesSet);
  let content = `/**
 * 此文件由脚本自动生成，请勿直接修改
 */
export const CITIES = ${citiesJSON}
`;

  await fsPromises.writeFile(
    path.resolve(__dirname, citiesDistPath),
    prettier.format(content, format),
    fileOption,
  );
}

main().then(() => 0);
