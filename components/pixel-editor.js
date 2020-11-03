import { PictureCanvas } from "./picture-canvas";
import { elt } from "../utils";

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
    let { tools, controls, dispatch } = config;
    this.state = state;
    this.canvas = new PictureCanvas(state.picture, (pos) => {
      let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);

      if (onMove) {
        return (pos) => onMove(pos, this.state);
      }
      this.controls = controls.map((Control) => new Control(state, config));
      this.dom = elt(
        "div",
        {},
        this.canvas.dom,
        elt("br"),
        ...this.controls.reduce((a, c) => a.concat(" ", c.dom), [])
      );
    });
  }

  syncState(state) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) {
      ctrl.syncState(state);
    }
  }
}
