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

const getSprite = (tile, map, tilesets) => {
    const tileset = getTilesetForGID(tile.gid, map.tileSets)
    const atlas = tilesets[tileset.name]

    if (atlas) {
        const textures = getTilesetTextures(atlas, tileset)
        const texture = textures[tile.gid - tileset.firstGid]
        const { x, y, width, height } = tile

        return <Sprite key={`(${x},${y})`}
            texture={texture}
            x={x}
            y={y}
            width={width}
            height={height}
        />
    }
}

export default getSprite