import { elt } from '../utils'

export class RedoButton {
  constructor(state, { dispatch }) {
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ redo: true }),
        disabled: state.redone.length < 1,
      },
      '⤵ Redo'
    )
  }

  syncState(state) {
    this.dom.disabled = state.redone.length < 1
  }
}
