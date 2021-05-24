import { Sprite } from "@inlet/react-pixi"
import { useEffect, useState } from "react"

const useTileSprites = (layer, tilesets) => {
    const [sprites, setSprites] = useState([])

    useEffect(() => {
        const newSprites = []
        const { map, tiles } = layer

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                const i = x + y * map.width
                const tile = tiles[i]

                if (tile?.gid > 0) {
                    const tileset = getTilesetForGID(tile.gid, map.tileSets)
                    const atlas = tilesets[tileset.name]

                    if (atlas) {
                        const textures = getTilesetTextures(atlas, tileset)
                        const texture = textures[tile.gid - tileset.firstGid]

                        newSprites.push(<Sprite key={`(${x},${y})`}
                            texture={texture}
                            x={x * map.tileWidth}
                            y={y * map.tileHeight}
                        />)
                    }
                }
            }

            setSprites(newSprites)
        }
    }, [ layer, tilesets ])

    return sprites
}

export default useTileSprites