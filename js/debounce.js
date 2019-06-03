/**
 * 防抖的mixin实现
 * @param {function} fn 需要防抖的函数
 * @param {number} ms 等待执行的最小时间
 */
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

//EXAMPLES
window.addEventListener('resize', debounce(() => {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
}))

/**
 * 加强版的防抖实现 例如点赞功能的防抖
 * @param {function} func 需要防抖的函数
 * @param {number} wait 等待执行的最小时间
 * @param {boolean} immediate immediate的ture or false来判断是否立即执行
 * @return function 返回客户调用函数
 */
const debounce = (func, wait, immediate) => {
  let timer, context, args;
  const later = () => setTimeout(() => {
    timer = null;
    if (!immediate) {
      func.apply(context, args);
      content = args = null;
    }
  }, wait);

  return function(...params) {
    if (!timer) {
      timer = later();
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
    } else {
      clearTimeout(timer);
      timer = later()
    }
  }
}

/**
 * 节流的实现
 * @param {funcion} fn 需要节流的函数
 * @param {number} wait 等待执行的间隔时间
 * @return function 返回客户调用函数
 */
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  } 
}

//EXAMPLES
window.addEventListener('resize', throttle(function() {
  console.log(window.innerHeight);
  console.log(window.innerWidth)
}, 250))