import ResorcesLoader from './js/base/ResourcesLoder.js'
import Director from './js/Director.js'
import Background from './js/runtime/Background.js'
import Land from './js/runtime/Land.js'
import DataStore from './js/base/DataStore.js'
import UpPencil from './js/runtime/UpPencil.js';
import DownPencil from './js/runtime/DownPencil.js';

export default class Main{
  constructor() {
    this.canvas = document.getElementById('gamecanvas')
    this.ctx = this.canvas.getContext('2d')
    this.dataSource = DataStore.getInstance()
    const loader = ResorcesLoader.create()
    loader.onImageLoad(map => this.onFirstResourceLoader(map))
    this.director = Director.getInstance()

    // const bacimage = new Image()
    // bacimage.src = './res/background.png'
    // bacimage.onload = () => {
    //   this.ctx.drawImage(
    //     bacimage,
    //     0,
    //     0,
    //     bacimage.width,
    //     bacimage.height,
    //     0,
    //     0,
    //     bacimage.width,
    //     bacimage.height
    //   )
    // }



  }

  onFirstResourceLoader(map) {
    // let background = new Background(this.ctx, map.get('background'))
    // background.draw()
    this.dataSource.ctx = this.ctx
    this.dataSource.res = map
    this.init()
  }

  init () {
    this.dataSource
    .put('pencils', [])
    .put('background', Background)
    .put('land', Land)// class相当于一个函数，class内的函数和变量相当于原型链上的东西，类也就是一个function
    .put('pencilUp', UpPencil)
    .put('pencilDown', DownPencil)
    this.director.createPencil()
    this.director.run()
  }
}