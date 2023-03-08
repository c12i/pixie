import { PixelEditor } from './app'
import { ColorSelect, ToolSelect } from './controls'
import { draw, fill, pick, rectangle, circle } from './tools'
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
  redone: [],
  doneAt: 0,
}

const baseTools = {
  draw,
  fill,
  rectangle,
  pick,
  circle,
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
    let redone = state.done.pop()
    return {
      ...state,
      picture: state.done[state.done.length - 1],
      done: [...state.done],
      redone: [...state.redone, redone],
      doneAt: 0,
    }
  }

  if (action.redo) {
    if (state.redone.length < 1) return state
    let picture = state.redone.pop()
    return {
      ...state,
      picture,
      done: [...state.done, picture],
      redone: [...state.redone],
      doneAt: 0,
    }
  }

  if (action.picture && state.doneAt < Date.now() - 1000) {
    return {
      ...state,
      ...action,
      done: [...state.done, state.picture],
      // redone state only relevant on undo, otherwise it remains empty
      // on regular draw action
      redone: [],
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
