/**
 * 
 * What I Cannot create, I do not undersatand
 */

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

Function.prototype.ownBind = function(OThis) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.propotype.bownBind what -bound can not callable');
  }

  let args = Array.prototype.slice.call(arguments, 1),
      fTo = this,
      fop = function() {},
      fBound = function() {
        return fTo.apply(this instanceof OThis ? this : OThis, args.concat(Array.prototype.slice.call(arguments)));
      };

  if (this.prototype) {
    fTo.prototype = this.prototype;
  }

  fBound.prototype = new fop();

  return fBound;
}

//数组去重
function unique1(arr) {
  var res = [];
  for (var i = 0, len = arr.length; i < len; i ++) {
    for (var k = 0, resLen = res.length; k < resLen; k++) {
      if (arr[i] === res[k]) {
        break;
      }
    }
    if (k === res.length) {
      res.push(arr[i]);
    }
  }
  return res;
}

function unique2(arr) {
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var v = arr[i];
    if (res.indexOf(v) === -1) {
      res.push(v);
    }
  }
  return res;
}

function unique3(arr) {
  return [...new Set(arr)]
}

//扁平化数组
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))


/**
 * 对象深拷贝
 * @param {*} obj 
 */
const deepClone = obj => {
  let result
  if (typeof obj === 'object') {
    result = (Object.prototype.toString.call(obj) === '[object Array]') ? [] : {}
    for (let i in obj) {
      if (typeof obj[i] === 'object') {
        result[i] = deepClone(obj[i])
      } else {
        result[i] = obj[i]
      }
    }
  } else {
    result = obj
  }

  return result
}


/**
 * 产生随机整数，包含下限值，但不包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}


/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower+1)) + lower;
}

/**
 * 求两个数组的交集
 * @param {*} arr 
 * @param {*} arr1 
 */
function intersect(arr, arr1) {
  return arr.filter(item => {
    return arr1.indexOf(item) !== -1
  })
}

function intersectAll() {
  let arrayList = Array.prototype.slice.call(arguments)
  return arrayList.reduce((pre, cur) => {
    return intersect(pre ,cur)
  })
}

let result = intersectAll([2,3,4,6,78,9],[4,5,89,0,6,3],[5,3,6],[4,5,3,55,6]);

console.log(result)

