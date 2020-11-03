import { elt } from "../utils";
import { drawPicture } from "./picture";

/**
 * Component for handling downloading of current picture as an image file.
 * The component keeps track of the current picture so it can access it while saving.
 */

export class SaveButton {
  constructor(state) {
    this.picture = state.picture;
    this.dom = elt(
      "button",
      {
        onclick: () => this.save(),
      },
      "💾 Save"
    );
  }

  /**
   * To save image, we use another `<canvas>` element where thr picture is drawn at a scale of 1 pixel per pixel.
   * The `toDataURL` method on a canvas element creates a url that starts with *data*
   * This url contains the whole resource, very long but it allows us to create working links to arbitrary pictures from the browser
   */
  save() {
    let canvas = elt("canvas");
    drawPicture(this.picture, canvas, 1);
    let link = elt("a", {
      href: canvas.toDataURL(),
      download: "pixel-art.png",
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  /**
   * Sync SaveButton state
   * @param {*} state 
   */
  syncState(state) {
    this.picture = state.picture;
  }
}
