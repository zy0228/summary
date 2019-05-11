//实现 new 方法
// function myNew(constructor) {
//   const obj = {};
//   Object.setPrototypeOf(obj, constructor.prototype);
//   var args = Array.prototype.slice.apply(arguments);
//   return constructor.apply(obj, args.slice(1)) || obj
// }

// function Persion(name, age) {
//   this.name = name;
//   this.age = age;
// }

// var mike = myNew(Persion, 'mike', 19);
// console.log(mike.name);      //mike

//实现 instanceOf
function myInstanceOf(left, right) {
  var leftProto = left.__proto__;
  var prototype = right.prototype;

  while (true) {
    if (leftProto === null)
      return false;
    if (leftProto === prototype)
      return true;
    leftProto = leftProto.__proto__;
  }
}

console.log(myInstanceOf(1, Number));
//实现apply, call, bind
//实现reduce, map, filter
//实现promise