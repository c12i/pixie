import { elt } from '../utils'
import { drawPicture } from '../picture'

export class SaveButton {
  constructor(state) {
    this.picture = state.picture
    this.dom = elt(
      'button',
      {
        onclick: () => this.save(),
      },
      '💾 Save'
    )
  }

  save() {
    let canvas = elt('canvas')
    drawPicture(this.picture, canvas, 10)
    let link = elt('a', {
      href: canvas.toDataURL(),
      download: 'pixel-art.png',
    })
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  syncState(state) {
    this.picture = state.picture
  }
}
