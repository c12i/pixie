import { elt } from '../utils'

export class ColorSelect {
  constructor(state, { dispatch }) {
    this.input = elt('input', {
      type: 'color',
      value: state.color,
      onchange: () => dispatch({ color: this.input.value }),
    })
    this.dom = elt('label', null, '🎨 Color: ', this.input)
  }

  /**
   * Sync the ColorSelect state
   * @param {*} state
   */
  syncState(state) {
    this.input.value = state.color
  }
}
