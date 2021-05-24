const tileAt = (layers, point) => {
    for (const layer of layers) {
        if (layer.tileAt(point.x, point.y)) {
            return true
        }
    }
    return false
}

export default tileAt