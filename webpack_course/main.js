import sum from "./src/sum";
let res = sum(100, 100);
console.log(res);

// 注意：webpack包默认只能处理js，如果要处理css/less/sass等其它资源，需要借助于各种loader加载器或者第三方插件才可以。

import "@cs/index.css"; // 在 main.js 导入样式：就是希望webpack对样式打包，处理样式压缩和兼容性等。直接使用link在.html导入，webpack是不会打包的，webpack只打包入口文件main.js中的内容

import "@ls/index.less";
import "@ss/index.sass";

/**
 * npm init -y : 初始化包文件
 * npm i/install/uninstall 包名 : 默认将这个包装到生产环境
 * npm i/install/uninstall 包名 -D/--save : 安装包到开发环境
 * npm i/install/uninstall 包名 -S/--save-dev : 安装包到生产环境
 * npm i/install/uninstall 包名 -g : 全局安装
 */
