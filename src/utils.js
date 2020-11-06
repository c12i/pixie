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
 * numerical presentation of color to base-16. To ensure each
 * number takes two digits we call `padStart` to add a leading zero
 * when necessary
 * @param {*} n
 */
export function hex(n) {
  return n.toString(16).padStart(2, '0')
}
