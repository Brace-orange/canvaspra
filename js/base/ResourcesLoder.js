import Resources from './Resources.js'

export default class ResourcesLoader {
  constructor() {
    this.map = new Map(Resources)
    for (let [key, value] of this.map) {
      const image = new Image()
      image.src = value
      this.map.set(key, image)
    }
  }

  onImageLoad (callback) {
    let loadCount = 0
    for (let value of this.map.values()) {
      value.onload = () => { // this
        loadCount++ 
        if (loadCount >= this.map.size) {
          callback(this.map)
        }
      }
    }
  }

  static create() {
    return new ResourcesLoader()
  }
}