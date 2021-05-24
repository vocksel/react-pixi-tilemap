import { Rectangle } from "pixi.js"
import { useContext, useState, useEffect } from "react"
import TilemapContext from "./TilemapContext"

const useCollisions = () => {
    const { map } = useContext(TilemapContext)
    const [collisions, set] = useState([])

    useEffect(() => {
        const collisionRects = map?.layers
            .filter(layer => layer.tiles === null)    
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
        
        const newCollisions = collisionRects.map((rect, index) =>
            <Sprite key={index} texture={Texture.WHITE} position={new Point(rect.x, rect.y)} width={rect.width} height={rect.height} />)

        set(newCollisions)
    }, [ map ])

    return collisions
}

export default useCollisions