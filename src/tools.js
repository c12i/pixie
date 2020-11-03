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
export function draw(pos, state, dispatch) {
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
export function rectangle(start, state, dispatch) {
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

const around = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

/**
 * Flood fill tool.
 * This tool fills the pixel under the pointer and all adjacent pixels that have the same color.
 * Adjacent means horizontally or vertically adjacent but not diagonally.
 *
 * Algorithm is borrowed from the book *Eloquent JavaScript: A Modern Introduction to Programming*
 * @param {*} param0
 * @param {*} state
 * @param {*} dispatch
 */
export function fill({ x, y }, state, dispatch) {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{ x, y, color: state.color }];
  for (let done = 0; done < drawn.length; done++) {
    for (let { dx, dy } of around) {
      let x = drawn[done].x + dx,
        y = drawn[done].y + dy;
      if (
        x >= 0 &&
        x < state.picture.width &&
        y >= 0 &&
        y < state.picture.height &&
        state.picture.pixel(x, y) == targetColor &&
        !drawn.some((p) => p.x == x && p.y == y)
      ) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
}

/**
 * Color picker tool
 * @param {*} pos 
 * @param {*} state 
 * @param {*} dispatch 
 */
export function pick(pos, state, dispatch) {
  dispatch({ color: state.picture.pixel(pos.x, pos.y) });
}
