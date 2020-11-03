/**
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

    /**
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

    /**
     * Get pixels at a given point
     * @param {*} x
     * @param {*} y
     */
    pixel(x, y) {
        return this.pixels[x + y * this.width]
    }

    /**
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

/**
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