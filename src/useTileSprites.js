import { Rectangle, Texture } from 'pixi.js'
import { Sprite } from "@inlet/react-pixi"
import React, { useEffect, useState } from "react"

const getTilesetForGID = (gid, tilesets) => {
    let result
    for (const tileset of tilesets) {
        if (gid >= tileset.firstGid) {
            result = tileset
        }
    }
    return result
}

const getTilesetTextures = (atlas, tileset) => {
    const textures = []

    const baseTexture = Texture.from(atlas)
    const { margin, image, tileHeight, tileWidth, spacing} = tileset

    for (let y = margin; y < image.height; y += tileHeight + spacing) {
        for (let x = margin; x < image.width; x += tileWidth + spacing) {
            const texture = new Texture(baseTexture, new Rectangle(x, y, tileWidth, tileHeight))
            textures.push(texture)
        }
    }

    return textures
}

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