import { elt } from '../utils'

export class ToolSelect {
  constructor(state, { tools, dispatch }) {
    this.select = elt(
      'select',
      {
        onchange: () => dispatch({ tool: this.select.value }),
      },
      ...Object.keys(tools).map((name) =>
        elt(
          'option',
          {
            selected: name == state.tool,
          },
          name
        )
      )
    )
    this.dom = elt('label', null, 'Tool: ', this.select)
  }

  syncState(state) {
    this.select.value = state.tool
  }
}
