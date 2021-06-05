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
    const y = Math.floor(spriteIndex / (image.height / tileHeight)) * tileHeight

    const rootDir = path.dirname(map.path)
    const baseTexture = Texture.from(`${rootDir}/${tileset.image.source}`)

    return new Texture(baseTexture, new Rectangle(x, y, tileHeight, tileWidth))
}

const getTileSprite = (tile, map) => {
    const { x, y } = tile
    const tileset = getTilesetForGID(tile.gid, map.tileSets)

    if (tileset) {
        const { tileHeight, tileWidth } = tileset
        const texture = getTileTexture(tile, map, tileset)

        return <Sprite key={`(${x},${y})`}
            texture={texture}
            x={x}
            y={y}
            width={tileWidth}
            height={tileHeight}
        />
    }
}

export default getTileSprite
