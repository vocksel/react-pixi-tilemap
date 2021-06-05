import { Stage } from '@inlet/react-pixi';
import { Tilemap, useTilemapLoader } from 'react-pixi-tilemap'

const tilemape = process.env.PUBLIC_URL + '/stages/map.tmx'

const App = () => {
    const map = useTilemapLoader(tilemape)

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} options={{ resizeTo: window }}>
            <Tilemap map={map} scale={0.75} />
        </Stage>
    )
}

export default App;
