import { drawPicture, elt } from '../utils'
import { SCALE } from './picture-canvas'

export class SaveButton {
  constructor(state, { dispatch }) {
    this.picture = state.picture
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ save: true }),
      },
      '💾 Save'
    )
  }

  static save(picture) {
    let canvas = elt('canvas')
    drawPicture(picture, canvas, SCALE)
    let link = elt('a', {
      href: canvas.toDataURL(),
      // eslint-disable-next-line no-alert
      download: `${prompt('save file as?', 'pixel-art') ?? 'pixel-art'}.png`,
    })
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  syncState(state) {
    this.picture = state.picture
  }
}
