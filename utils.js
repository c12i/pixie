/**
 * Update object state
 */
export function updateState(state, action) {
    return  { ...state, ...action }
}

/**
 * A less verbose DOM builder
 */
export function elt(type, props, ...children) {
    let dom = document.createElement(type);
    if (props) {
        Object.assign(dom, props);
    }
    for (let child of children) {
        if (typeof child != "string") {
            dom.appendChild(child);
        } else {
            dom.appendChild(document.createTextNode(child));
        }
    }
    return dom;
}