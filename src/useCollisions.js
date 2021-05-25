import { Rectangle } from "pixi.js"
import { useContext, useMemo } from "react"
import TilemapContext from "./TilemapContext"

const useCollisions = () => {
    const { map } = useContext(TilemapContext)

    const collisions = useMemo(() => {
        return map.layers
            .filter(layer => layer.type === 'tile')    
            .map(layer => {
                const rects = []
        
                for (const tile of layer.tiles) {
                    if (tile) {
                        const { objectGroups } = tile
        
                        if (objectGroups.length > 0) {
                            for (const rectangle of objectGroups) {
                                const { x, y, width, height } = rectangle
                                rects.push(new Rectangle(tile.x + x, tile.y + y, width, height))
                            }
                        }
                    }
                }
        
                return rects
            })
            .flat()
    }, [ map ])

    return collisions
}

export default useCollisions