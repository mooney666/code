/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_sum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/sum */ \"./src/sum.js\");\n/* harmony import */ var _src_css_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/css/index.css */ \"./src/css/index.css\");\n/* harmony import */ var _src_less_index_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/less/index.less */ \"./src/less/index.less\");\n/* harmony import */ var _src_sass_index_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/sass/index.sass */ \"./src/sass/index.sass\");\n\r\nlet res = (0,_src_sum__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(100, 100);\r\nconsole.log(res);\r\n\r\n// 注意：webpack包默认只能处理js，如果要处理css/less/sass等其它资源，需要借助于各种loader加载器或者第三方插件才可以。\r\n\r\n // 在 main.js 导入样式：就是希望webpack对样式打包，处理样式压缩和兼容性等。直接使用link在.html导入，webpack是不会打包的，webpack只打包入口文件main.js中的内容\r\n\r\n\r\n\r\n\r\n/**\r\n * npm init -y : 初始化包文件\r\n * npm i/install/uninstall 包名 : 默认将这个包装到生产环境\r\n * npm i/install/uninstall 包名 -D/--save : 安装包到开发环境\r\n * npm i/install/uninstall 包名 -S/--save-dev : 安装包到生产环境\r\n * npm i/install/uninstall 包名 -g : 全局安装\r\n */\r\n\n\n//# sourceURL=webpack://webpack_course/./main.js?");

/***/ }),

/***/ "./src/less/index.less":
/*!*****************************!*\
  !*** ./src/less/index.less ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack_course/./src/less/index.less?");

/***/ }),

/***/ "./src/sass/index.sass":
/*!*****************************!*\
  !*** ./src/sass/index.sass ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack_course/./src/sass/index.sass?");

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://webpack_course/./src/css/index.css?");

/***/ }),

/***/ "./src/sum.js":
/*!********************!*\
  !*** ./src/sum.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nfunction sum(a, b) {\r\n  return a + b;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (sum);\r\n\n\n//# sourceURL=webpack://webpack_course/./src/sum.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;