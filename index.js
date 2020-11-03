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
