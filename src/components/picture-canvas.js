import { drawPicture, elt } from '../utils'

export class PictureCanvas {
  constructor(picture, scale, onPointerDown) {
    this.dom = elt('canvas', {
      onmousedown: (event) => this._mouse(event, onPointerDown),
      ontouchstart: (event) => this._touch(event, onPointerDown),
    })
    this.scale = scale
    this.syncState(picture)
  }

  syncState(picture) {
    if (this.picture == picture) return
    this.picture = picture
    drawPicture(this.picture, this.dom, this.scale)
  }

  _mouse(mouseDownEvent, onDown) {
    // return if not a left click
    if (mouseDownEvent.button != 0) return
    const pos = this._pointerPosition(mouseDownEvent)
    const onMove = onDown(pos)
    if (!onMove) return

    let move = (moveEvent) => {
      if (moveEvent.buttons == 0) {
        this.dom.removeEventListener('mousemove', move)
      } else {
        let newPos = this._pointerPosition(moveEvent)
        if (newPos.x == pos.x && newPos.y == pos.y) return
        onMove(newPos)
      }
    }

    this.dom.addEventListener('mousemove', move)
  }

  _touch(touchStartEvent, onDown) {
    let pos = this._pointerPosition(touchStartEvent.touches[0])
    const onMove = onDown(pos)
    touchStartEvent.preventDefault()
    if (!onMove) return

    let move = (moveEvent) => {
      const newPos = this._pointerPosition(moveEvent.touches[0])
      if (newPos.x == pos.x && newPos.y == pos.y) return
      pos = newPos
      onMove(newPos)
    }

    let end = () => {
      this.dom.removeEventListener('touchmove', move)
      this.dom.removeEventListener('touchend', move)
    }

    this.dom.addEventListener('touchmove', move)
    this.dom.addEventListener('touchend', end)
  }

  _pointerPosition(pos) {
    const rect = this.dom.getBoundingClientRect()
    return {
      x: Math.floor((pos.clientX - rect.left) / this.scale),
      y: Math.floor((pos.clientY - rect.top) / this.scale),
    }
  }
}
