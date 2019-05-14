//实现 new 方法
function myNew(constructor) {
  const obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  var args = Array.prototype.slice.apply(arguments);
  return constructor.apply(obj, args.slice(1)) || obj
}

function Persion(name, age) {
  this.name = name;
  this.age = age;
}

var mike = myNew(Persion, 'mike', 19);
console.log(mike.name);      //mike

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

console.log(myInstanceOf(1, Number)); //true
//实现apply, call, bind
Function.prototype.myOwnCall = function(something) {
  something = something || window;
  var uniqueID = '00' + Math.random();
  while (something.hasOwnProperty(uniqueID)) {
    uniqueID = '00' + Math.random();
  }
  something[uniqueID] = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]")
  }

  var result = eval("something[uniqueID](" + args + ")");
  delete something[uniqueID];
  return result;
}

Function.prototype.myOwnApply = function(something, arr) {
  something = something || window;
  var uniqueID = '00' + Math.random();
  while (something.hasOwnProerty(uniqueID)) {
    uniqueID = '00' + Math.random();
  }
  something[uniqueID] = this;

  var args = [];
  var result = null;

  if (!arr) {
    result = something[uniqueID]();
  } else {
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("something[uniqueID](" + args + ")")
  }

  return result;
}
//实现reduce, map, filter
//实现promise