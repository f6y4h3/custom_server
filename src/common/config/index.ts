import * as fs from 'node:fs';
// 获取当前应用运行变量
const ENV = process.env.NODE_ENV;
// 配置文件模块化
// 获取文件夹下所有文件
function getFilesAndFoldersInDir(path) {
  const filesObj = {};
  readFile(path, filesObj);
  return filesObj;
}
// 遍历读取文件
function readFile(path, filesObj) {
  const files = fs.readdirSync(path); // 需要用到同步读取
  files.forEach(walk);

  function walk(file) {
    const states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesObj);
    } else {
      // 创建一个对象保存信息
      const obj = {};
      obj['name'] = file; // 文件名
      obj['path'] = path + '/' + file; // 文件绝对路径
      filesObj[`${file.replace('.json', '')}`] = obj;
    }
  }
}

const moduleObj = getFilesAndFoldersInDir('src/common/config/modules')
const config = fs.readFileSync(moduleObj[ENV].path, 'utf8');

export default JSON.parse(config);
