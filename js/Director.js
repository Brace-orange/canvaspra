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
    const maxTop = DataStore.getInstance().canvas.height / 8
    const minTop = DataStore.getInstance().canvas.height / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  run () {
    this.check()
    if (!this.isGameOver) {
      const backgroundSprite = this.dataStore.get('background').draw()
    
      const pencils = this.dataStore.get('pencils')
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').isScore = true;
      }
      if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) /2 && pencils.length ===2) {
        this.createPencil()
      }
      this.dataStore.get('pencils').map((item, index) =>  {
        item.draw()
      })
      const landSprite = this.dataStore.get('land').draw()
      this.dataStore.get('score').draw()
      const birdsSprite = this.dataStore.get('birds').draw()
      const timer = requestAnimationFrame(() => {
        this.run()
      })
      this.dataStore.put('timer', timer)
      } else {
        console.log('游戏结束')
        this.dataStore.get('startButton').draw();
        cancelAnimationFrame(this.dataStore.get('timer'))
        this.dataStore.destory() //销毁游戏变量
        wx.triggerGC()
      }
  }

  birdsEvent() {
    for (let i = 0; i <= 2; i++) {
        this.dataStore.get('birds').y[i] =
            this.dataStore.get('birds').birdsY[i];
    }
    this.dataStore.get('birds').time = 0;
  }

  check() {
    const birds = this.dataStore.get('birds');
    const land = this.dataStore.get('land');
    const pencils = this.dataStore.get('pencils');
    const score = this.dataStore.get('score');

    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      console.log('撞击地板啦');
      this.isGameOver = true;
      return;
    }

    //小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }

    const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };

            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width
          && score.isScore) {
          wx.vibrateShort({
              success: function () {
                  console.log('振动成功');
              }
          });
          score.isScore = false;
          score.scoreNumber++;
      }
  }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
      let s = false;
      if (bird.top > pencil.bottom ||
          bird.bottom < pencil.top ||
          bird.right < pencil.left ||
          bird.left > pencil.right
      ) {
          s = true;
      }
      return !s;
    }
}