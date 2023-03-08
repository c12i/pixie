import { elt } from '../utils'

export class ResetButton {
  constructor(state, { dispatch }) {
    this.dom = elt(
      'button',
      {
        onclick: () => dispatch({ reset: true }),
        disabled: !state.done.length,
      },
      '🔁 Reset'
    )
  }

  syncState(state) {
    this.dom.disabled = !state.done.length
  }
}
