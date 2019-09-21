const fsPromises = require('fs').promises;
const path = require('path');
const pinyin = require('pinyin');
const formatPath = '../.prettierrc';
const citiesPath = './cities.txt';
const chineseNationPath = './chinese-nation.txt';
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

  let chineseNationText = await fsPromises.readFile(
    path.resolve(__dirname, chineseNationPath),
    fileOption,
  );

  let chineseNationLines = chineseNationText.split(endOfLine);
  let chineseNationList = chineseNationLines.filter(chineseNationLine => {
    return chineseNationLine !== '';
  });
  let nation = chineseNationList.join('|');

  let citiesLines = citiesText.split(endOfLine);
  let citiesList = citiesLines.filter(citiesLine => {
    return citiesLine !== '';
  });
  let citiesSet = citiesList.map(citiesLine => {
    let [code, name] = citiesLine.split(':');
    let suffixList = [
      '市',
      '省',
      '自治区',
      '盟',
      '自治州',
      '地区',
      '特别行政区',
    ];
    const suffix = suffixList.join('|');
    const citySuffixRule = new RegExp(`(${nation})*(${suffix})$`);
    let shortName = name.replace(citySuffixRule, '');

    let pinyinNormal = pinyin(name, {
      style: pinyin.STYLE_NORMAL,
    })
      .flat()
      .join('');
    let pinyinFirstLetter = pinyin(name, {
      style: pinyin.STYLE_FIRST_LETTER,
    })
      .flat()
      .join('');
    return {
      code,
      name,
      shortName,
      pinyin: pinyinNormal,
      pinyinFirstLetter,
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
