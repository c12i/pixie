import { elt } from '../utils'

export function historyUpdateState(state, action) {
  if (action.undo == true) {
    if (state.done.length == 0) return state
    return {
      ...state,
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0,
    }
  }
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

export class UndoButton {
  constructor(state, { dispatch }) {
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ undo: true }),
        disabled: state.done.length == 0,
      },
      '⃔ Undo'
    )
  }

  /**
   * Sync `UndoButton` state
   * @param {*} state
   */
  syncState(state) {
    this.dom.disabled = state.done.length == 0
  }
}
