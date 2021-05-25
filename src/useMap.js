import { useContext } from "react"
import TilemapContext from './TilemapContext'

const useMap = () => {
    const { map } = useContext(TilemapContext)
    return map
}

export default useMap