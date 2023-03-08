import { PictureCanvas } from './components/picture-canvas'
import { elt } from './utils'

export class PixelEditor {
  constructor(state, config) {
    let { tools, controls, dispatch } = config
    this.state = state
    this.canvas = new PictureCanvas(state.picture, (pos) => {
      let selectedTool = tools[this.state.tool]
      // call the selected tool util in ./src/tools.js
      let drawFunction = selectedTool(pos, this.state, dispatch)
      if (drawFunction) {
        // call the function returned by the selected tool
        return (pos) => drawFunction(pos, this.state)
      }
    })
    this.controls = controls.map((Control) => new Control(state, config))
    this.dom = elt(
      'div',
      {},
      this.canvas.dom,
      elt('br'),
      ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
    )
    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      dispatch({
        undo: (e.metaKey || e.ctrlKey) && e.code === 'KeyZ',
        redo: (e.metaKey || e.ctrlKey) && e.code === 'KeyY',
      })
    })
  }

  syncState(state) {
    this.state = state
    this.canvas.syncState(state.picture)
    for (let ctrl of this.controls) {
      ctrl.syncState(state)
    }
  }
}
