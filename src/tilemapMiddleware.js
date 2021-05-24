import tmx from 'tmx-parser'

const tilemapMiddleware = (resource, next) => {
    if (resource.extension !== 'tmx') return

    tmx.parse(resource.xhr.responseText, resource.url, (err, stage) => {
        if (err) throw err
        resource.stage = stage

        // TODO: Each tile layer has a tileAt(x,y) function. Maybe that could be
        // used instead of mutating the result.

        // Add (x,y) coordinates to each tile so it is easy to align collision
        // rectangles later.
        stage.layers = stage.layers.map(layer => {
            return {
                ...layer,
                tiles: layer.tiles?.map((tile, index) => {
                    const x = (index % stage.width) * stage.tileWidth
                    const y = Math.floor(index / stage.width) * stage.tileHeight

                    return { ...tile, x, y, }
                })
            }
        })

        next()
    })
}

export default tilemapMiddleware