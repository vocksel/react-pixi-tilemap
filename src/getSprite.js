import path from 'path'
import { Rectangle, Texture } from 'pixi.js'
import { Sprite } from "@inlet/react-pixi"
import React from "react"

const getTilesetForGID = (gid, tilesets) => {
    let result
    for (const tileset of tilesets) {
        if (gid >= tileset.firstGid) {
            result = tileset
        }
    }
    return result
}

const getTileTexture = (tile, map, tileset) => {
    const { image, tileHeight, tileWidth } = tileset
    const spriteIndex = tile.gid - tileset.firstGid

    const x = (spriteIndex % (image.width / tileWidth)) * tileWidth
    const y = Math.floor(spriteIndex / (image.height / tileHeight)) % (image.height / tileHeight) * tileHeight

    const rootDir = path.dirname(map.path)
    const baseTexture = Texture.from(`${rootDir}/${tileset.image.source}`)

    return new Texture(baseTexture, new Rectangle(x, y, tileWidth, tileHeight))
}

const getTileSprite = (tileType, tile, map) => {
    const tileset = getTilesetForGID(tile.gid, map.tileSets)

    if (tileset) {
        const { x, width, height } = tile
        const texture = getTileTexture(tile, map, tileset)

        // Objects are bottom aligned for some reason. This pushes them up so they align with the rest of the tilemap.
        let y = tile.y
        if (tileType === 'object') {
            y -= height
        }

        return <Sprite key={`(${x},${y})`}
            texture={texture}
            x={x}
            y={y}
            width={width}
            height={height}
        />
    }
}

export default getTileSprite
