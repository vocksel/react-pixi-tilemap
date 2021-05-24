import { Container } from '@inlet/react-pixi'
import React, { useEffect, useMemo } from 'react'
import Layer from './Layer'
import useTilemap from './useTilemap'
import TilemapContext from './TilemapContext'

const Tilemap = ({ tilemap, tilesets, children }) => {
    const map = useTilemap(tilemap)

    const tileLayers = useMemo(() => 
        map?.layers.filter(layer => layer.type === 'tile'),
    [ map ])

    const layers = useMemo(() => {
        return tileLayers?.map((layer, index) => {
            const { name } = layer
            if (name === 'Foreground') {
                return children
            } else {
                return <Layer key={index} layer={layer} tilesets={tilesets} />
            }
        })
    }, [ tileLayers ])
 
    useEffect(() => {
        if (children) {
            if (map?.layers.find(layer => layer.name === 'Foreground') === null) {
                throw new Error(`Tilemap ${tilemap} has children specified, but no 'Foreground' layer. You need a Foreground layer for the children to render.`)
            }
        }
    }, [ map ])

    return <Container>
        <TilemapContext.Provider value={{ map, tileLayers }}>
            {layers}
        </TilemapContext.Provider>
    </Container>
}

export default Tilemap
