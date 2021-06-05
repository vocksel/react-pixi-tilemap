import React, { useEffect, useMemo } from 'react'
import TilemapContext from './TilemapContext'
import Layer from './Layer'

const Tilemap = ({ map, children }) => {
    const layers = useMemo(() => {
        return map?.layers.map((layer, index) => {
            const { name } = layer
            if (name === 'Foreground') {
                return children
            } else {
                return <Layer key={index} layer={layer} map={map} />
            }
        })
    }, [ map, children ])

    useEffect(() => {
        if (children) {
            if (map?.layers.find(layer => layer.name === 'Foreground') === null) {
                throw new Error(`Tilemap has children specified, but no 'Foreground' layer. You need a Foreground layer for the children to render.`)
            }
        }
    }, [ map ])

    // Only render once the map is loaded so that our hooks don't need to
    // conditionally check if anything in TilemapContext exists.
    if (map) {
        return <TilemapContext.Provider value={{ map }}>
            {layers}
        </TilemapContext.Provider>
    } else {
        return null
    }

}

export default Tilemap
