/**
 * This class represents the picture in the canvas
 */
export class Picture {
  constructor(width, height, pixels) {
    this.width = width
    this.height = height
    this.pixels = pixels
  }

  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color)
    return new Picture(width, height, pixels)
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width]
  }

  draw(pixels) {
    let copy = this.pixels.slice()
    for (let { x, y, color } of pixels) {
      copy[x + y * this.width] = color
    }
    return new Picture(this.width, this.height, copy)
  }
}

export function drawPicture(picture, canvas, scale) {
  canvas.width = picture.width * scale
  canvas.height = picture.height * scale
  let ctx = canvas.getContext('2d')

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y)
      ctx.fillRect(x * scale, y * scale, scale, scale)
    }
  }
}
