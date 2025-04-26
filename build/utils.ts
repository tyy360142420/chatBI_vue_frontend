import { resolve } from 'path';
/** 获取当前工作目录的路径 */
const root: string = process.cwd();
/** 根目录 */
const pathResolve = (dir: string): string => {
  return resolve(root, '.', dir);
};

export { pathResolve };