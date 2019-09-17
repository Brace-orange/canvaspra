class DataStore {
  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  constructor() {
    this.map = new Map()
  }

  put(key, value) { // 随时销毁
    if (typeof value === 'function') {
      value = new value()
    }
    this.map.set(key, value)
    return this // 返回这个对象本身
  }
  get (key) {
    return this.map.get(key)
  }

  destory() {
    for (let value of this.map.values()) {
      value = null // 指向另一个位置
    }
  }
}

export default DataStore