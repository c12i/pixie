import { elt } from '../utils'

export class ResetButton {
  constructor(state, { dispatch }) {
    this.dom = elt(
      'button',
      {
        onclick: () => {
          // eslint-disable-next-line no-restricted-globals, no-alert
          if (confirm('Are you sure you want to reset the canvas?')) {
            dispatch({ reset: true })
          }
        },
        disabled: !state.done.length,
      },
      '🔁 Reset'
    )
  }

  syncState(state) {
    this.dom.disabled = !state.done.length
  }
}
