// implementing tools that will control the functionality of mouse
// touch events on the canvas

/**
 * The draw tool, which changes any pixel clicked on or tapped on
 * to the currently selected color
 * It dispatches an action that updates the picture to a version in
 * which the pointed-at pixel is given the currently selected color.
 *
 * @param {*} pos
 * @param {*} state
 * @param {*} dispatch
 */
function draw(pos, state, dispatch) {
  function drawPixel({ x, y }, state) {
    let drawn = { x, y, color: state.color };
    dispatch({ picture: state.picture.draw([drawn]) });
  }
  // immediate call to drawPixel and a return call of the same function
  drawPixel(pos, state);
  return drawPixel;
}

/**
 * To draw larger shapes, it can be useful to quickly create rectangles.
 * This tool draws a rectangle between the point at which a user starts
 * dragging and the point a user drags to
 * @param {*} start
 * @param {*} state
 * @param {*} dispatch
 */
function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color });
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawRectangle(start);
  return drawRectangle;
}
