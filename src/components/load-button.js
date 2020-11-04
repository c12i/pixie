import { elt, hex } from "../utils";
import { Picture } from "./picture";

/**
 * Component responsible for loading existing image files into the app
 */
export class LoadButton {
  constructor(_, { dispatch }) {
    this.dom = elt(
      "button",
      {
        onclick: () => startLoad(dispatch),
      },
      "📁 Load"
    );
  }

  /**
   * TODO: implement
   */
  syncState() {}
}

/**
 * Gets the file from the user's computer through use of an `<input>` HTML element with the `file` attribute
 * @param {*} dispatch
 */
function startLoad(dispatch) {
  let input = elt("input", {
    type: "file",
    onchange: () => finishLoad(input.files[0], dispatch),
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}

/**
 * When the user has selected a file, we use the `FileReader` to
 * get access to its contents, again as a data URL.
 * This URL can be used to create a `<img>` element; since we can't
 * get direct access to the pixels in such an image, we can't create
 * a `Picture` object from that. A call to `pictureFromImage` handles this conversion.
 * @param {*} file
 * @param {*} dispatch
 */
function finishLoad(file, dispatch) {
  if (file == null) return;
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let image = elt("img", {
      onload: () =>
        dispatch({
          picture: pictureFromImage(image),
        }),
      src: reader.result,
    });
  });
  reader.readAsDataURL(file);
}

/**
 * Getting the pixels so as to create a Picture object.
 * To get pixel, we first draw the picture to a `<canvas>` element.
 *
 * The canvas context has a `getImageData` that allows a script to
 * read its pixels. So once the picture is on the canvas, we can get
 * its pixels and construct a `Picture` object.
 *
 * See: *Eloquent JavaScript: A Modern Introduction to Programming* chapter 19 page 639
 * @param {*} image
 */
function pictureFromImage(image) {
  let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);
  let canvas = elt("canvas", { width, height });
  let ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  let pixels = [];
  // this data property is an array of color components
  // contains 4 values which represent reg, green, blue and alpha (for transparency) of the pixel's color as 8 bit numbers (0-255)
  let { data } = ctx.getImageData(0, 0, width, height);

  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3);
    pixels.push("#" + hex(r) + hex(g) + hex(b));
  }
  return new Picture(width, height, pixels);
}
