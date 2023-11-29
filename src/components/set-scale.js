import { elt } from '../utils'

export class SetScale {
  constructor(state, { scaleOptions, dispatch }) {
    this.select = elt(
      'select',
      {
        onchange: () => {
          dispatch({ scale: Number(this.select.value) })
          window.location.reload()
        },
      },
      ...scaleOptions.map((value) =>
        elt('option', { selected: value == state?.scale }, value)
      )
    )
    this.dom = elt('label', null, 'Scale: ', this.select)
  }

  syncState(state) {
    this.select.value = state.scale
  }
}
