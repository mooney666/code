"use strict";
// TS关于基本数据类型的类型约束。TS支持强类型，JS是弱类型语言。
// TS是是在编译代码阶段发现代码错误的，JS是在运行阶段发现代码错误的。
// TS仅仅是编译阶段发现一些类型不匹配的现象，给开发者提示，但最终打包成js代码是没有任何问题的。虽然编译错误，还是可以打包成功。
let uname = "小红";
let uage = 20;
let usex = true;
console.log(uname, uage, usex);
function sum(a, b) {
    console.log(a + b);
}
sum(20, 30);
function show(arr) {
    console.log("---", arr);
}
show([100, false, "222"]);
show([100, false]);
