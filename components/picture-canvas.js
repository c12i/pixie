import { elt } from "../utils";

// we are drawing each pixel as a 10 x 10 square
const scale = 10;

/**
 * This component is part of the interface that displays the picture
 * as a grid of colored boxes.
 * This component is responsible for two things:
 * * Showing a picture
 * * Communicating pointer events on that picture to the rest of
 * the application
 */
export class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt("canvas", {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown),
        });
        this.syncState(picture);
    }

    /**
     * The component keeps track of the current picture and only does
     * a re-draw when sync state is given a new picture
     * @param {*} picture
     */
    syncState(picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }

    /**
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

    /**
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

/**
 * Gets the pointer's current position
 * @param {*} pos
 * @param {*} domNode
 * @returns {}
 */
function pointerPosition(pos, domNode) {
    let rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale),
    }
}