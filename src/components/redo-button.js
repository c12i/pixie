import { elt } from '../utils'

export class RedoButton {
  constructor(state, { dispatch }) {
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ redo: true }),
        disabled: state.done.length == 0,
      },
      '⤵ Redo'
    )
  }

  syncState(state) {
    this.dom.disabled = state.done.length == 0
  }
}
