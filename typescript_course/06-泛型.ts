// 泛型: 在定义函数function 或者 接口interface 或者 类型type 时, 由我们传入指定类型, 函数/接口/类型 内部都会根据这个类型做业务处理.

// 制作泛型接口, 用T来表示广泛的类型, 就看使用的时候, 传递的是什么类型.
interface PType<T> {
  p: T;
  p1: T;
}

type PTypeOne<T> = {
  p: T;
  p1: T;
};

let pp1: PTypeOne<string> = {
  p: "123",
  p1: "222",
};

let pp2: PType<number> = {
  p: 12,
  p1: 22,
};

let pp3: PType<number[]> = {
  p: [1, 2, 3],
  p1: [4, 5, 6],
};

// 制作泛型函数
function getValue<T>(a: T, b: T): T {
  return (a as any) + (b as any);
}
console.log(getValue<string>("10", "20"));
console.log(getValue<number>(10, 20));

function getResult<T, Y>(a: T, b: Y): any {
  return (a as any) + (b as any);
}
console.log(getResult<string, number>("10", 20));
