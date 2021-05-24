import React from 'react'
import { Container } from "@inlet/react-pixi"
import useTileSprites from './useTileSprites'

const Layer = ({ layer, tilesets }) => {
    const tiles = useTileSprites(layer, tilesets)

    if (!layer.visible) {
        return null
    }

    return <Container alpha={layer.opacity}>
        {tiles}
    </Container>
}

export default Layer
