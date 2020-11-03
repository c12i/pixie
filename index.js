/*
 * The Picture state object; immutable in nature, this object stores
 * the width, height and pixel content.
 * The pixels are stored in an array.
 */
class Picture {
    constructor(width, height, pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }

    /*
     * This method creates an array in which all pixels have the same
     * color
     * @param {*} width
     * @param {*} height
     * @param {*} color
     * @returns {Picture}
     */
    static empty(width, height, color) {
        let pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }

    /*
     * Get pixels at a given point
     * @param {*} x
     * @param {*} y
     */
    pixel(x, y) {
        return this.pixels[x + y * this.width]
    }

    /*
     * Updates a picture's pixels
     * @param {*} an array of updated pixels
     * @returns Picture
     */
    draw(pixels) {
        let copy = this.pixels.slice();
        for (let { x, y, color } of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
}

/*
 * Update object state
 */
function updateState(state, action) {
    return  { ...state, ...action }
}

/*
 * A less verbose DOM builder
 */
function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) {
        Object.assign(dom, props);
    }
    for (let child of chilren) {
        if (typeof child != "string") {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child));
        }
    }
    return dom;
}

// we are drawing each pixel as a 10 x 10 square
const scale = 10;

/*
 * This component is part of the interface that displays the picture
 * as a grid of colored boxes.
 * This component is responsible for two things:
 * * Showing a picture
 * * Communicating pointer events on that picture to the rest of
 * the application
 */
class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown),
        });
        this.syncState(picture);
    }

    /*
     * The component keeps track of the current picture and only does
     * a re-draw when sync state is given a new picture
     * @param {*} picture
     */
    syncState(picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }

    /*
     * When the left mouse is pressed while the mouse is over the 
     * picture canvas, the component calls the pointerDown callback,
     * giving it the position of the pixel that was clicked - in 
     * picture coordinates.
     *
     * @param {*} document
     * @param {Function} onDown
     */
    static mouse(downEvent, onDown) {
        // return if not a left click
        if (downEvent.button != 0) return;
        let pos = pointerPosition(downEvent, this.dom);
        onMove = onDown(pos);
        if (!onMove) return;

        let move = moveEvent => {
            if (mouseEvent.buttons == 0) {
                this.dom.removeEventListener("mousemove", move);
            } else {
                let newPos = pointerPosition(moveEvent, this.dom);
                if (newPos.x == pos.x && newPos.y == pos.y) return;
                onMove(newPos);
            }
        }
        this.dom.addEventListener("mousemove", move);
    }

    /*
     * With touch events, we do the almost the same thing as `mouse`
     * but we must use different events and ensure we call
     * `preventDefault` on the `"touchstart"` event to prevent paning.
     */
    static touch(startEvent, onDown) {
        let pos = pointerPosition(startEvent.touches[0], this.dom);
        let onMove = onDown(pos);
        startEvent.preventDefault();
        if (!onMove) return;

        let move = moveEvent => {
            let newPos = pointerPosition(moveEvent.touches[0], this.dom);
            if (newPos.x == pos.x && newPos.y == pos.y) return;
            pos = newPos;
            onMove(newPos);
        }
        let end = () => {
            this.dom.removeEventListener("touchmove", move);
            this.dom.removeEventListener("touchend", move);
        }
        this.dom.addEventListener("touchmove", move);
        this.dom.addEventListener("touchend", end);
    }
}

/*
 * The actual drawing function.
 * Sets the size of the canvas based on the scale and picture size
 * and fills it with a series of squares, one for each pixel.
 * @param {Picture} picture
 * @param {*} canvas
 * @param {number} scale
 */
function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let ctx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x ++) {
            ctx.fillStyle = picture.pixel(x, y);
            ctx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

/*
 * Gets the pointer's current position
 * @param {*} pos
 * @param {*} domNode
 */
function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale),
    }
}
