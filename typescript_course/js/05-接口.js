"use strict";
// interface 接口, 主要描述对象结构, 一个对象中应该有什么属性, 赋值的时候需要符合接口规范. 它主要针对的是对象结构, type关键字也可以描述对象, 除此之外, type 还可以描述基本类型, 联合类型等.
let puser = {
    pname: "小明",
    page: 22,
};
let puser1 = {
    pname: "小明1",
    page: 23,
    psex: true,
};
console.log(puser, puser1);
let setMyName = function (name, age, a) {
    console.log(name + age);
};
setMyName("新名称", 100);
// implements 表示一个类要实现某个接口, 必须按照接口的要求, 实现这个类的内部结构.
class Animal {
    constructor() {
        this.aname = "鸭子";
    }
    eat(a) {
        return "123";
    }
}
let ani = new Animal();
console.log(ani.eat("1"));
