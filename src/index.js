import { PixelEditor } from './editor'
import { ColorSelect, ToolSelect } from './controls'
import { draw, fill, pick, rectangle } from './tools'
import { Picture, LoadButton, SaveButton, UndoButton } from './components'
import { historyUpdateState } from './components/undo-button'

const INITIAL_STATE = {
  tool: 'draw',
  color: '#000000',
  picture: Picture.empty(60, 30, '#f0f0f0'),
  done: [],
  doneAt: 0,
}

const baseTools = {
  draw,
  fill,
  rectangle,
  pick,
}

const baseControls = [
  ToolSelect,
  ColorSelect,
  SaveButton,
  LoadButton,
  UndoButton,
]

function startPixelEditor({
  state = INITIAL_STATE,
  tools = baseTools,
  controls = baseControls,
}) {
  const app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action) {
      state = historyUpdateState(state, action)
      app.syncState(state)
    },
  })
  return app.dom
}

document.getElementById('root').appendChild(startPixelEditor({}))
