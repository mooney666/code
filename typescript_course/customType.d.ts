// 文件名.d.ts 文件的作用：全局声明公共的类型，所有的.ts文件默认从这个文件中查找类名名称，.ts不需要单独导入这个文件，.d.ts文件也不需要单独的导出某个类型。

// 对于联合类型比较长的情况，可以通过type关键字，给这个联合类型起个别名(相当于自定义了一种新类型)。重用的时候写起来方便。
type baseTypeArr = (number | string | boolean)[];

// number | string | boolean | number[]: 联合类型，表示当前这个变量，允许接收number/string/boolean/number[]这几个类型中的一个即可。
type baseType = number | string | boolean | number[];

// 对于初始值可能为null/undefined的类型，也使用联合类型约束
declare type dataType = string | undefined;
declare type arrType = number[] | null;

// declare 声明类型 namespace 命名空间 ，每个命名空间内都是独立作用域，其实就是将不同的类型放到各自的模块内，统一管理。
namespace HomeType {
  type homeList = number | string;
}

declare namespace CateType {
  type cateList = number | string;
}

declare namespace CartType {
  type cartList = number | string;
}

// 自定义类型，叫People类型
// psex?: boolean 表示People类型中的psex属性可有可无
type People = {
  page: number;
  pname: string;
  psex?: boolean | undefined;
};

type CommonObject = {
  // [propName: string | number]: string | number | boolean; // [propName: string] 接收任意key，且是字符串。
  [propName: string | number]: any; // any：让一个变量可以是任意类型的值，被any标识的数据，ts会放弃对它的检查，而是直接通过编译，ts失效了。一定是在不确定类型/类型不统一是才使用any。
};

declare interface MyPeople {
  pname: string;
  page: number;
  psex?: boolean;
}
