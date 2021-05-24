import { useContext, useEffect, useState } from "react"
import TilemapContext from "./TilemapContext"

const useTiles = () => {
    const { map } = useContext(TilemapContext)
    const [tiles, set] = useState([])

    useEffect(() => {
        if (map) {
            const newTiles = map.layers
                .filter(layer => layer.type === 'tile')
                .map(layer => layer.tiles)
                .flat()
                .filter(tile => tile !== null)

            set(newTiles)
        }
    }, [ map ])

    return tiles
}

export default useTiles