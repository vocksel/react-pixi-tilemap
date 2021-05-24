import { Point } from "@pixi/math"
import { useEffect, useState } from "react"
import useObjects from "./useObjects"

const DEFAULT_POSITION = new Point(0, 0)

const useSpawnPoint = (origin=DEFAULT_POSITION) => {
    const objects = useObjects()
    const [ point, set ] = useState(new Point(0, 0))

    useEffect(() => {
        const spawn = objects.find(object => object.name === 'Spawn')

        if (spawn) {
            // Center point of the spawn tile
            set(new Point(spawn.x + spawn.width / 2, spawn.y + spawn.height / 2))
        } else {
            set(origin)
        }
    }, [ objects, origin ])

    return point
}

export default useSpawnPoint
