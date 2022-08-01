// number[]: 数据类型，有number类型的数据构成的数组。
let ages: number[] = [22, 33, 44, 55];
let names: string[] = ["小红", "小明"];
let sexes: boolean[] = [true, true, true];

console.log(ages, names, sexes);

let ages1: Array<number> = [22, 33, 44, 55];
let names1: Array<string> = ["小红", "小明"];
let sexes1: Array<boolean> = [true, true, true];

console.log(ages1, names1, sexes1);

// (number | string | boolean)[]: 联合类型，数组中的元素，只能是三个类型中的其中一种。
let data: baseTypeArr = [10, "11", true];
let data1: baseTypeArr = [20, "13", false];
let data2: baseTypeArr = [30, "14", true];
let data3: baseTypeArr = [40, "15", false];

let testData: baseType = 20;
testData = "小明";
testData = true;
testData = [1, 2, 3, 4];
console.log(testData);

// null和undefined，在ts中也是作为类型存在了，一般不会将一个变量设置为null或undefined，很少使用。但是可以将null和undefined作为某个类型的初始值，前提是需要关闭"strictNullChecks": false，否则在严格检查null的模式下，null和undefined不能作为其他类型的初始值。
// let test1: number = undefined;
// let test2: string = undefined;
// let test3: number[] = null;
// let test4: string[] = null;

let test5: dataType = undefined;
test5 = "有数据了";

let homeData: HomeType.homeList = 100;
let cartData: CartType.cartList = "100";

// { pname: string; page: number }: 这就是一个类型，一般对象会采用这种类型，用于描述一个对象中有哪些属性，每个属性的类型是什么。
let p: { pname: string; page: number } = {
  pname: "小红",
  page: 22,
  // psex: true, // 会报错，因为{ pname: string; page: number }这个类型中只约束了两个属性。
};

// { pname: string; page: number; psex: boolean }: 也是一个类型，约束了对象的属性以及属性的类型
let p1: { pname: string; page: number; psex: boolean } = {
  pname: "小红",
  page: 22,
  psex: true,
};
let p2: People = {
  pname: "小红",
  page: 22,
  psex: true,
};
let p3: People = {
  pname: "小红",
  page: 22,
};

let p4: CommonObject = {
  a: 100,
  c: 29,
  100: "哈哈",
  d: [1, 2, 3, 4],
  e: { aa: 100, c: { a: { a: 100 } } },
};

// 枚举类型：列举一些固定的属性值，比如性别、颜色、班级
// 枚举的优势就是将一些常量通过枚举定义，在逻辑中通过枚举值来引用这个常量，后期常量的值发生变化，所有采用枚举值的变量都会及时获取最新值。类似于less/scss里面的变量定义功能。
// enum Sex {
//   man, // 0
//   women, // 1
// }
// let s1: Sex = Sex.women; // 将某个枚举值赋值给s1
// console.log(s1);

// enum Sex {
//   man = "男",
//   women = "女",
// }
// let s1: Sex = Sex.women; // 将某个枚举值赋值给s1
// let s2: Sex = Sex.women; // 将某个枚举值赋值给s1
// let s3: Sex = Sex.women; // 将某个枚举值赋值给s1
// let s4: Sex = Sex.women; // 将某个枚举值赋值给s1
// let s5: Sex = Sex.women; // 将某个枚举值赋值给s1
// console.log(s1, s2, s3, s4, s5);

// enum Sex {
//   man = 10, // 10
//   women, // 11
// }
// let s1: Sex = Sex.women; // 将某个枚举值赋值给s1
// console.log(s1);

// void: 空,一般作为函数的返回值约束. 当一个函数没有返回值, 通常用void表示.
function sumB(a: number, b: number): void {
  console.log(a + b);
}
sumB(1000, 2000);

function sumA(a: number, b: number): number {
  return a + b;
}
let res: number = sumA(100, 200);
console.log(res);

// Object类型: Object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
// let user: Object = {
//   ua: 1,
//   ub: 2,
// };
// console.log(user);
// console.log(user.ua, user.ub);

type Goods = {
  id: number;
  title: string;
};
let users: unknown = "123";

// 断言: 当TS无法准确识别变量类型,导致一些方法无法正确调用而报错. 此时可以使用断言,明确告诉TS某个变量的类型,因为有时候我们比TS更清楚这个变量的类型.
// (<断言类型>users) 方式一
// (users as 断言类型) 方式二
(<Array<Goods>>users).forEach((item: Goods, i: number) => {});
(users as Array<Goods>).forEach((item: Goods, i: number) => {});
