import { PixelEditor } from './app'
import { ColorSelect, ToolSelect } from './controls'
import { draw, fill, pick, rectangle } from './tools'
import { Picture, LoadButton, SaveButton, UndoButton } from './components'

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

// quasi - reducer function
function historyUpdateState(state, action) {
  if (action.undo == true) {
    if (state.done.length == 0) return state
    return {
      ...state,
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0,
    }
  }

  // TODO: Add re-do functionality

  if (action.picture && state.doneAt < Date.now() - 1000) {
    return {
      ...state,
      ...action,
      done: [state.picture, ...state.done],
      doneAt: Date.now(),
    }
  }
  return { ...state, ...action }
}

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
