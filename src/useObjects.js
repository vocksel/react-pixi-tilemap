import { useContext } from "react"
import TilemapContext from "./TilemapContext"

const useObjects = () => {
    const { map } = useContext(TilemapContext)

    const objects = useMemo(() => map?.layers
        .filter(layer => layer.type === 'object')
        .map(layer => layer.objects)
        .flat(),
    [ map ])

    return objects
}

export default useObjects