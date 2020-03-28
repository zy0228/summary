class EventBus {
  constructor() {
    this.data = {}
  }

  on(name, fn) {
    if (this.data[name] === undefined) {
      this.data[name] = []
    }
    this.data[name].push(fn)
  }

  emit(name, value) {
    this.data[name].forEach(fn => {
      if (typeof fn !== 'function') {
        throw new TypeError('handler must be a function')
      }
      fn(value)
    })
  }
}

const hub = new EventBus()
hub.on('subscribe', (v) => {
  console.log('A', v)
})
hub.on('subscribe', (v) => {
  console.log('B', v)
})
hub.on('subscribe', (v) => {
  console.log('C', v)
})

hub.emit('subscribe', '我笑了')