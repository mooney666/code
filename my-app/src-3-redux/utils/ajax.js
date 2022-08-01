export default function ajax() {
  // 通过 process.env 获取当前项目中，使用的环境变量。
  // NODE_ENV 是安装nodejs时，内置的环境变量。可以得到当前项目的环境是生产环境还是开发环境。
  let isProduction = process.env.NODE_ENV;
  let api =
    isProduction === "production"
      ? process.env.REACT_APP_PRODUCTION_API
      : process.env.REACT_APP_DEVELOPMENT_API;
  console.log("---", api);
}
