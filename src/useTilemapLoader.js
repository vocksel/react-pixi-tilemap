import { useEffect, useState } from 'react'
import tmx from 'tmx-parser'

const useTilemapLoader = (tilemapPath) => {
    const [map, setMap] = useState(null)

    useEffect(() => {
        tmx.parseFile(tilemapPath, (err, map) => {
            if (err) throw err

            // Add (x,y) coordinates to each tile so it is easy to align collision
            // rectangles later.
            map.layers = map.layers.map(layer => {
                return {
                    ...layer,
                    tiles: layer.tiles?.map((tile, index) => {
                        const x = (index % map.width) * map.tileWidth
                        const y = Math.floor(index / map.width) * map.tileHeight
                        const width = map.tileWidth
                        const height = map.tileHeight

                        return { ...tile, x, y, width, height}
                    })
                }
            })

            map.path = tilemapPath

            setMap(map)
        })
    }, [ tilemapPath ])

    return map
}

export default useTilemapLoader
