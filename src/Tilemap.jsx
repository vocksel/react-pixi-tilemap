import React, { useMemo, useState } from 'react'
import { Container } from '@inlet/react-pixi'
import TilemapContext from './TilemapContext'
import Layer from './Layer'

const Tilemap = ({ map, children, ...props }) => {
    const [hasForeground, setHasForeground] = useState(false)

    const layers = useMemo(() => {
        return map?.layers.map((layer, index) => {
            const { name } = layer
            if (name === 'Foreground') {
                setHasForeground(true)
                return children
            } else {
                return <Layer key={index} layer={layer} map={map} />
            }
        })
    }, [ map, children ])

    // Only render once the map is loaded so that our hooks don't need to
    // conditionally check if anything in TilemapContext exists.
    if (map) {
        return <TilemapContext.Provider value={{ map }}>
            <Container {...props}>
                {layers}

                {/* If there's no foreground layer specified in the map, we simply render the children on top */}
                {!hasForeground && children}
            </Container>
        </TilemapContext.Provider>
    } else {
        return null
    }

}

export default Tilemap
