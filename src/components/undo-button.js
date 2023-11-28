import { elt } from '../utils'

export class UndoButton {
  constructor(state, { dispatch }) {
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ undo: true }),
        disabled: state.done.length <= 1,
      },
      '⤴ Undo'
    )
  }

  syncState(state) {
    this.dom.disabled = state.done.length <= 1
  }
}
