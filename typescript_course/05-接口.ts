// interface 接口, 主要描述对象结构, 一个对象中应该有什么属性, 赋值的时候需要符合接口规范. 它主要针对的是对象结构, type关键字也可以描述对象, 除此之外, type 还可以描述基本类型, 联合类型等.

let puser: MyPeople = {
  pname: "小明",
  page: 22,
};
let puser1: MyPeople = {
  pname: "小明1",
  page: 23,
  psex: true,
};

console.log(puser, puser1);

// (newName: string) => void: 这就是类型, 对一个函数进行约束.
// 利用接口对函数进行约束, 描述一个函数的结构, 有什么参数, 什么返回值.
interface FunctionType {
  (newName: string, newAge: number, test?: string): void;
}

let setMyName: FunctionType = function (
  name: string,
  age: number,
  a?: string
): void {
  console.log(name + age);
};
setMyName("新名称", 100);

// 利用接口定义类的结构, 对类中的属性和方法进行约束.
interface AnimalType {
  aname: string;
  eat(n: string): void;
}

// implements 表示一个类要实现某个接口, 必须按照接口的要求, 实现这个类的内部结构.
class Animal implements AnimalType {
  aname: string;
  constructor() {
    this.aname = "鸭子";
  }
  eat(a: string): string {
    return "123";
  }
}
let ani = new Animal();
console.log(ani.eat("1"));
