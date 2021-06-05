import { useMemo } from 'react'
import useObjects from './useObjects'

const useInteractableObjects = () => {
    const objects = useObjects()

    return useMemo(() => {
        const interactables = []

        for (const object of objects) {
            if (object.properties.isInteractable) {
                interactables.push(object)
            }
        }

        return interactables
    }, [ objects ])
}

export default useInteractableObjects