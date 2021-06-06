import { Stage, Sprite } from '@inlet/react-pixi';
import { Texture } from '@pixi/core';
import { Tilemap, useTilemapLoader } from 'react-pixi-tilemap'

const tilemape = process.env.PUBLIC_URL + '/stages/map.tmx'

const App = () => {
    const map = useTilemapLoader(tilemape)

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} options={{ resizeTo: window }}>
            <Tilemap map={map} scale={0.75}>
                {/* These sprites show off the layering order */}
                <Sprite texture={Texture.WHITE} x={120} y={380} width={64} height={64} />
                <Sprite texture={Texture.WHITE} x={700} y={420} width={64} height={64} />
                <Sprite texture={Texture.WHITE} x={500} y={700} width={64} height={64} />
            </Tilemap>
        </Stage>
    )
}

export default App;
