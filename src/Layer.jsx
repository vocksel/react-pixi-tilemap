import React, { useMemo } from 'react'
import { Container } from "@inlet/react-pixi"
import getSprite from './getSprite'

const getTileSprites = (layer, map) => {
    const sprites = []

    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            const i = x + y * map.width
            const tile = layer.tiles[i]

            if (tile?.gid > 0) {
                sprites.push(getSprite('tile', tile, map))
            }
        }
    }

    return sprites
}

const getObjectSprites = (layer, map) => {
    return layer.objects.map(object => {
        if (object.gid) {
            return getSprite('object', object, map)
        }
    })
}

const Layer = ({ layer, map }) => {
    if (!layer.visible) {
        return null
    }

    const sprites = useMemo(() => {
        if (layer.type === 'tile') {
            return getTileSprites(layer, map)
        } else if (layer.type === 'object') {
            return getObjectSprites(layer, map)
        }
    }, [ layer ] )

    return <Container alpha={layer.opacity}>
        {sprites}
    </Container>
}

export default Layer
