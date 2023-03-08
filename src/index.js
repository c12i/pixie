import { PixelEditor } from './app'
import { draw, fill, pick, rectangle, circle, triangle } from './tools'
import {
  LoadButton,
  SaveButton,
  UndoButton,
  RedoButton,
  ResetButton,
  ToolSelect,
  ColorSelect,
} from './components'
import { Picture } from './picture'
import { cached, getCachedState } from './utils'

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
  pick,
  rectangle,
  circle,
  triangle,
}

const baseControls = [
  ToolSelect,
  ColorSelect,
  SaveButton,
  LoadButton,
  UndoButton,
  RedoButton,
  ResetButton,
]

// quasi - reducer function
function historyUpdateState(state, action) {
  if (action.undo) {
    if (state.done.length < 2) return state
    let redone = state.done.pop()
    return cached({
      ...state,
      picture: state.done[state.done.length - 1],
      done: [...state.done],
      redone: [...state.redone, redone],
      doneAt: 0,
    })
  }

  if (action.redo) {
    if (state.redone.length < 1) return state
    let picture = state.redone.pop()
    return cached({
      ...state,
      picture,
      done: [...state.done, picture],
      redone: [...state.redone],
      doneAt: 0,
    })
  }

  if (action.reset) {
    let picture = Picture.empty(60, 30, '#f0f0f0')
    return cached({
      ...state,
      picture,
      done: [],
      redone: [],
    })
  }

  if (action.save) {
    SaveButton.save(state.picture)
    return { ...state }
  }

  if (action.picture && state.doneAt < Date.now() - 1000) {
    return cached({
      ...state,
      ...action,
      done: [...state.done, state.picture],
      // redone state only relevant on undo, otherwise it remains empty
      // on regular picture action
      redone: [],
      doneAt: Date.now(),
    })
  }
  return cached({ ...state, ...action })
}

function startPixelEditor({
  state = getCachedState() ?? INITIAL_STATE,
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
