const useTilemap = (tilemap) => {
    const app = useApp()
    const [stage, setMap] = useState(null)

    useEffect(() => {
        const existing = app.loader.resources[tilemap]

        if (existing) {
            setMap(existing.stage)
        } else {
            app.loader
                .add(tilemap)
                .use(tilemapMiddleware)
                .load((_, resources) => setMap(resources[tilemap].stage))
        }
    }, [ app.loader, tilemap ])

    return stage
}

export default useTilemap