"use strict";
// 泛型: 在定义函数function 或者 接口interface 或者 类型type 时, 由我们传入指定类型, 函数/接口/类型 内部都会根据这个类型做业务处理.
let pp1 = {
    p: "123",
    p1: "222",
};
let pp2 = {
    p: 12,
    p1: 22,
};
let pp3 = {
    p: [1, 2, 3],
    p1: [4, 5, 6],
};
// 制作泛型函数
function getValue(a, b) {
    return a + b;
}
console.log(getValue("10", "20"));
console.log(getValue(10, 20));
function getResult(a, b) {
    return a + b;
}
console.log(getResult("10", 20));
