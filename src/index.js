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
  SetScale,
} from './components'
import { Picture } from './picture'
import { cached, getCachedState } from './utils'

function startPixelEditor({
  state = getCachedState() ?? DEFAULT_STATE,
  tools = baseTools,
  controls = baseControls,
  scaleOptions = ['10', '15', '20', '25', '30'],
}) {
  const app = new PixelEditor(state, {
    tools,
    controls,
    scaleOptions,
    dispatch(action) {
      state = historyUpdateState(state, action)
      app.syncState(state)
    },
  })
  return app.dom
}

const DEFAULT_STATE = {
  tool: 'draw',
  scale: 20,
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
  SetScale,
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
    if (state.done.length <= 1) return state
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
    SaveButton.save(state.picture, state.scale)
    return cached({ ...state })
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

console.info('Fork me on github: https://github.com/collinsmuriuki/pixie')
document.getElementById('root').appendChild(startPixelEditor({}))
