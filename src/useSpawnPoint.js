import { Point } from "pixi.js"
import { useMemo } from "react"
import useObjects from "./useObjects"

const useSpawnPoint = () => {
    const objects = useObjects()
    
    const point = useMemo(() => {
        const spawn = objects.find(object => object.name === 'Spawn')
        return new Point(spawn.x + spawn.width / 2, spawn.y + spawn.height / 2)
    })

    return point
}

export default useSpawnPoint
