/**
 * 2. 属性和方法的修饰符
 * public: 默认的修饰符,公共的,在类的外部通过new出来的实例访问属性和方法; 在类中通过this.访问属性和方法; 子类也可以访问这些属性和方法;
 * private: 私有属性和方法,只能在类的内部使用, 类的外部及子类都无法访问;
 * protected: 受保护的属性和方法,只能类内部及其子类可以访问;
 * readonly: 只读属性, 只读属性必须在声明时或构造函数里被初始化;
 */
class Greeter {
  // 1. 类中的实例属性, 需要提前声明, 才能在 constructor 构造函数中进行实例属性的初始化.
  public greeting: string;
  public gname: string;
  private _num: number; // 私有属性, 一般在类中参与逻辑运算, 类外不用.
  protected gsex: boolean;
  constructor(message: string, gname: string) {
    this.greeting = message;
    this.gname = gname;
    this._num = 100;
    this.gsex = true;
  }
  public greet(): string {
    return "Hello, " + this.greeting + this._num;
  }
  // set 方法: 负责对内部的私有属性赋值. 同时可以达到对外部数据的拦截作用.
  public set setNum(v: number) {
    if (v % 2 === 0) {
      this._num = v;
    } else {
      throw new Error("值不符合要求");
    }
  }
  // get 方法: 负责对外提供私有属性的值.
  public get getNum(): number {
    return this._num;
  }
}

let greeter: Greeter = new Greeter("world", "123");
console.log(greeter.gname, greeter.greeting);
// console.log(greeter._num); // 报错

// 存取器的操作: 就像操作普通对象一样即可.
greeter.setNum = 2001;
console.log(greeter.getNum);
