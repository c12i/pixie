import { PictureCanvas } from './picture-canvas'
import { elt } from '../utils'

/**
 * This is the editor shell around a picture canvas with
 * a dynamic set of tools and controls
 *
 */
export class PixelEditor {
  /**
   * Builds a pixel editor
   * @param {*} state
   * @param {*} config object contains the set of tools and controls
   * The controls are the interface elements that appear below the picture.
   * They’ll be provided as an array of component constructors.
   * The tools do things like drawing pixels or filling in an area.
   *
   * The set of available tools is provided as an object that maps
   * the names that appear in the drop-down field to functions
   * that implement the tools.
   *
   * Such functions get a picture position, a current application
   * state, and a dispatch function as arguments.
   *
   * They may return a move handler function that gets called with a new position and a current state when the pointer moves to a different pixel.
   */
  constructor(state, config) {
    let { tools, controls, dispatch } = config
    this.state = state
    // pointer handler passed to Picture canvas calls currently selected tool with appropriate args
    this.canvas = new PictureCanvas(state.picture, (pos) => {
      // get tool function
      let tool = tools[this.state.tool]
      // call tool function
      let onMove = tool(pos, this.state, dispatch)
      if (onMove) {
        return (pos) => onMove(pos, this.state)
      }
    })
    this.controls = controls.map((Control) => new Control(state, config))
    // the call to reduce introduces spaces between the control's DOM elements.
    this.dom = elt(
      'div',
      {},
      this.canvas.dom,
      elt('br'),
      ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
    )
  }

  /**
   * Sync Pixel editor state
   * @param {*} state
   */
  syncState(state) {
    this.state = state
    this.canvas.syncState(state.picture)
    for (let ctrl of this.controls) {
      ctrl.syncState(state)
    }
  }
}

/**
 * Tool select object
 */
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

  /**
   * Sync ToolSelect state
   * @param {*} state
   */
  syncState(state) {
    this.select.value = state.tool
  }
}

/**
 * A color selector; basically a HTML `<input>` element with a `type`
 * attribute of `color`
 */
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
