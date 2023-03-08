import { PixelEditor } from './app'
import { ColorSelect, ToolSelect } from './controls'
import { draw, fill, pick, rectangle } from './tools'
import {
  Picture,
  LoadButton,
  SaveButton,
  UndoButton,
  RedoButton,
} from './components'

const INITIAL_STATE = {
  tool: 'draw',
  color: '#000000',
  picture: Picture.empty(60, 30, '#f0f0f0'),
  done: [],
  prev: [],
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
  RedoButton,
]

// quasi - reducer function
function historyUpdateState(state, action) {
  if (action.undo) {
    if (state.done.length < 2) return state
    let prev = state.done.pop()
    return {
      ...state,
      picture: state.done[state.done.length - 1],
      done: [...state.done],
      prev: [...state.prev, prev],
      doneAt: 0,
    }
  }

  if (action.redo) {
    if (state.prev.length < 1) return state
    let picture = state.prev.pop()
    return {
      ...state,
      picture,
      done: [...state.done, picture],
      prev: [...state.prev],
      doneAt: 0,
    }
  }

  if (action.picture && state.doneAt < Date.now() - 1000) {
    return {
      ...state,
      ...action,
      done: [...state.done, state.picture],
      prev: [...state],
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
