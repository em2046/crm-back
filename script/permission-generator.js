const fsPromises = require('fs').promises;
const path = require('path');
const prettier = require('prettier');
const formatPath = '../.prettierrc';
const distPath = '../src/permission/permission.ts';
const fileOption = {
  encoding: 'utf8',
};

//region 数据区域
const CREATE = { name: 'create', title: '创建' };
const UPDATE = { name: 'update', title: '更新' };
const RETRIEVE = { name: 'retrieve', title: '读取' };
const DELETE = { name: 'delete', title: '删除' };

const BASE = {
  CREATE,
  UPDATE,
  RETRIEVE,
  DELETE,
};

function generate(preName, preTitle, base = BASE, addition = {}) {
  let ret = {};
  Object.keys(base).map(p => {
    const value = base[p];
    ret[p] = {
      name: preName + '_' + value.name,
      title: preTitle + value.title,
    };
  });
  return Object.assign(ret, addition);
}

const TASK = generate(
  'task',
  '任务',
  { CREATE, RETRIEVE, DELETE },
  {
    ASSIGN: { name: 'task_assign', title: '任务指派' },
    EXECUTE: { name: 'task_execute', title: '任务执行' },
  },
);

const PERMISSION = {
  USER: generate('user', '用户'),
  ROLE: generate('role', '角色'),
  KNOWLEDGE: generate('knowledge', '知识'),
  CUSTOMER: generate('customer', '客户'),
  TASK,
};

//endregion

//region 生成区域
async function main() {
  let formatText = await fsPromises.readFile(
    path.resolve(__dirname, formatPath),
    fileOption,
  );
  let format = JSON.parse(formatText);
  format.parser = 'typescript';
  let permissionJSON = JSON.stringify(PERMISSION);

  let content = `/**
 * 此文件由脚本自动生成，请勿直接修改
 */
export const PERMISSION = ${permissionJSON}
`;

  await fsPromises.writeFile(
    path.resolve(__dirname, distPath),
    prettier.format(content, format),
    fileOption,
  );
}

main().then(() => 0);
//endregion
