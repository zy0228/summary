/**
 * (Client-Side routing)  create Mixin-Route
 */
// 1. Ceate with hash
class Routers {
  constructor() {
    this.routers = {};
    this.currentUrl = '';
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false)
  }

  route(path, callback) {
    this.routers[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.substr(1) || '/';   
    this.routers[this.currentUrl]();
  }
}
window.Router = new Routers();

let content = document.querySelector('body');
const changeColor = color => {
  content.style.backgroundColor = color;
}

Router.route('/', () => {
  changeColor('red');
})
Router.route('/blue', () => {
  changeColor('blue');
})

//2. Ceate with History
class Routers {
  constructor() {
    this.routes = {};
    //在初始化的时候监听popstate事件
    this._bindPopStae();
  }
  //初始化路由
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[paht]();
  }
  //将路径和相应的callback回调函数加入hashMap
  route(path, callback) {
    this.routes[path] = callback || function() {}
  }
  //触发路由的回调
  go(path) {
    history.pushState({path: path}, null, path);
    this.routes[path] || this.routes[path]();
  }
  //全局监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state || e.state.path;
      this.routes[path] || this.routes[path]();
    }, false)
  }
}

window.Router = new Routers();  
Router.init(location.pathname);
const ul = document.querySelector('ul');
ul.addEventListener('click', e => {
  if (e.target.tagName === 'a') {
    e.preventDefault();
    Router.go(this.e.target.getAttribute('href'));
  }
})