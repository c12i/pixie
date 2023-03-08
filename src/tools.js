/**
 * The draw tool
 */
export function draw(pos, state, dispatch) {
  function drawPixel({ x, y }, state) {
    let drawn = { x, y, color: state.color }
    dispatch({ picture: state.picture.draw([drawn]) })
  }
  // immediate call to drawPixel and a return call of the same function
  drawPixel(pos, state)
  return drawPixel
}

/**
 * To draw larger shapes, it can be useful to quickly create rectangles.
 */
export function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x)
    let yStart = Math.min(start.y, pos.y)
    let xEnd = Math.max(start.x, pos.x)
    let yEnd = Math.max(start.y, pos.y)
    let drawn = []
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color })
      }
    }
    dispatch({ picture: state.picture.draw(drawn) })
  }
  drawRectangle(start)
  return drawRectangle
}

/**
 * To quickly draw circles
 * assisted by chatGPT
 */
export function circle(start, state, dispatch) {
  function drawCircle(pos) {
    const radius = Math.sqrt(
      // eslint-disable-next-line no-restricted-properties
      Math.pow(pos.x - start.x, 2) + Math.pow(pos.y - start.y, 2)
    )
    const centerX = start.x + radius
    const centerY = start.y + radius
    let drawn = []
    for (let y = centerY - radius; y <= centerY + radius; y++) {
      for (let x = centerX - radius; x <= centerX + radius; x++) {
        const distance = Math.sqrt(
          // eslint-disable-next-line no-restricted-properties
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        )
        if (distance <= radius) {
          drawn.push({ x, y, color: state.color })
        }
      }
    }
    dispatch({ picture: state.picture.draw(drawn) })
  }
  drawCircle(start)
  return drawCircle
}

/**
 * This function uses the Bresenham's line algorithm to draw a triangle
 * on the canvas
 * assisted by chatGPT
 */
export function triangle(start, state, dispatch) {
  function drawTriangle(pos) {
    const x1 = start.x
    const y1 = start.y
    const x2 = pos.x
    const y2 = pos.y
    const deltaX = Math.abs(x2 - x1)
    const deltaY = Math.abs(y2 - y1)
    const signX = x1 < x2 ? 1 : -1
    const signY = y1 < y2 ? 1 : -1
    let x = x1
    let y = y1
    let error = deltaX - deltaY
    let drawn = []

    while (x !== x2 || y !== y2) {
      drawn.push({ x, y, color: state.color })
      const error2 = 2 * error
      if (error2 > -deltaY) {
        error -= deltaY
        x += signX
      }
      if (error2 < deltaX) {
        error += deltaX
        y += signY
      }
    }
    drawn.push({ x: x2, y: y2, color: state.color })

    dispatch({ picture: state.picture.draw(drawn) })
  }

  drawTriangle(start)
  return drawTriangle
}

const around = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
]

/**
 * Flood fill tool.
 */
export function fill({ x, y }, state, dispatch) {
  let targetColor = state.picture.pixel(x, y)
  let drawn = [{ x, y, color: state.color }]
  for (let done = 0; done < drawn.length; done++) {
    for (let { dx, dy } of around) {
      // eslint-disable-next-line one-var
      let x = drawn[done].x + dx,
        y = drawn[done].y + dy
      if (
        x >= 0 &&
        x < state.picture.width &&
        y >= 0 &&
        y < state.picture.height &&
        state.picture.pixel(x, y) == targetColor &&
        !drawn.some((p) => p.x == x && p.y == y)
      ) {
        drawn.push({ x, y, color: state.color })
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) })
}

/**
 * Color picker tool
 */
export function pick(pos, state, dispatch) {
  dispatch({ color: state.picture.pixel(pos.x, pos.y) })
}
