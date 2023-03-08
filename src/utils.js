import { Picture } from './picture'

/**
 * Update object state
 */
export function updateState(state, action) {
  return { ...state, ...action }
}

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
