import { PictureCanvas } from './components/picture-canvas'
import { elt } from './utils'

export class PixelEditor {
  constructor(state, config) {
    const { tools, controls, dispatch } = config
    this.state = state
    this.canvas = new PictureCanvas(state.picture, (pos) => {
      const selectedTool = tools[this.state.tool]
      // call the selected tool util in ./src/tools.js
      const drawFunction = selectedTool(pos, this.state, dispatch)
      if (!drawFunction) return
      return (pos) => drawFunction(pos, this.state)
    })
    this.controls = controls.map((Control) => new Control(state, config))
    this.dom = elt(
      'div',
      {
        style: `
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `,
      },
      elt('h3', {}, 'pixie'),
      this.canvas.dom,
      elt('br'),
      elt(
        'div',
        {},
        ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
      )
    )
    const onKeyDown = (e) => {
      e.preventDefault()
      dispatch({
        undo: (e.metaKey || e.ctrlKey) && e.code === 'KeyZ',
        redo: (e.metaKey || e.ctrlKey) && e.code === 'KeyY',
        save: (e.metaKey || e.ctrlKey) && e.code === 'KeyS',
      })
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('onbeforeunload', (e) => {
      e.preventDefault()
      document.removeEventListener('keydown', onKeyDown)
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
