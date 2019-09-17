import {Sprite} from '../base/Sprite.js'
import Director from '../Director.js'

class Pencil extends Sprite{
  constructor(image, top) {
    super(image,
      0, 0,
      image.width, image.height,
      window.width, 0,
      image.width, image.height
      )
      this.top = this.top
  }

  draw() {
    this.x = this.x - Director.getInstance().moveSpeed
    super.draw(
      this.img,
      0, 0,
      this.img.width, this.img.height,
      this.x, this.y,
      this.img.width,this.img.height
    )
  }
}

export default Pencil