import React, { useMemo } from 'react'
import { Container } from "@inlet/react-pixi"
import getSprite from './getSprite'

const getTileSprites = (layer, map, tilesets) => {
    const sprites = []

    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const i = x + y * map.width
            const tile = layer.tiles[i]

            if (tile?.gid > 0) {
                sprites.push(getSprite(tile, map, tilesets))
            }
        }
    }

    return sprites
}

const getObjectSprites = (layer, map, tilesets) => {
    return layer.objects.map(object => {
        if (object.gid) {
            return getSprite(object, map, tilesets)
        }
    })
}

const Layer = ({ layer, map, tilesets }) => {
    if (!layer.visible) {
        return null
    }

    const sprites = useMemo(() => {
        if (layer.type === 'tile') {
            return getTileSprites(layer, map, tilesets)
        } else if (layer.type === 'object') {
            return getObjectSprites(layer, map, tilesets)
        }
    }, [ layer ] )

    return <Container alpha={layer.opacity}>
        {sprites}
    </Container>
}

export default Layer
