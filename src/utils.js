import { Picture } from './picture'

/**
 * A less verbose DOM builder
 */
export function elt(type, props, ...children) {
  let dom = document.createElement(type)
  if (props) {
    Object.assign(dom, props)
  }
  for (let child of children) {
    if (typeof child !== 'string') {
      dom.appendChild(child)
    } else {
      dom.appendChild(document.createTextNode(child))
    }
  }
  return dom
}

/**
 * Draws picture into the canvas
 */
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

/**
 * A hex helper function facilitate conversion of from 8 bit
 * numerical presentation of color to base-16.
 */
export function hex(n) {
  return n.toString(16).padStart(2, '0')
}

/**
 * Cache data to local storage
 */
export function cached(data) {
  localStorage.setItem('_state', JSON.stringify(data))
  return data
}

/**
 * Get cached state from local storage
 */
export function getCachedState() {
  let state = JSON.parse(localStorage.getItem('_state'))
  if (!state) return
  // for users running older version without cached scale
  if (!state.scale) {
    state.scale = 20
  }
  state.done = state.done.map(
    ({ width, height, pixels }) => new Picture(width, height, pixels)
  )
  state.redone = state.redone.map(
    ({ width, height, pixels }) => new Picture(width, height, pixels)
  )
  state.picture = new Picture(
    state.picture.width,
    state.picture.height,
    state.picture.pixels
  )
  return state
}
