function showTime(x: number, y: number, z?: number, ...args: number[]) {
  console.log(x, y, z, args);
}
showTime(100, 200);
showTime(1, 2, 3, 4, 5, 6, 7, 8, 9);
