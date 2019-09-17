// 控制游戏逻辑

import DataStore from './base/DataStore.js'
import UpPencil from './runtime/UpPencil.js';
import DownPencil from './runtime/DownPencil.js';
export default class Director {
  constructor() {
    // console.log('构造器初始化')
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2
  }

  static getInstance() { // 初始化构造器函数
    if (!Director.instance) {// 变量直接赋值
      Director.instance = new Director()
    }
    return Director.instance
  }

  createPencil() {
    const maxTop = window.innerHeight / 8
    const minTop = window.innerHeight / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  run () {
    const backgroundSprite = this.dataStore.get('background').draw()
    const landSprite = this.dataStore.get('land').draw()
    const timer = requestAnimationFrame(() => {
      this.run()
    })
    this.dataStore.put('timer', timer)
    // this.dataStore.get('pencils').forEarch(function (value, index, array) {
    //     value.draw()
    // })
  }
}