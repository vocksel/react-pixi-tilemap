# react-pixi-tilemap

WIP!!

Need docs!!

## Install

```
yarn add react-pixi-tilemap
```

## Usage

Use [Tiled](https://www.mapeditor.org/) to create your .tmx files for your game, then import them into your app.

```js
import { Tilemap } from 'react-pixi-tilemap' 
import map from './map.tmx'

<Stage>
    <Tilemap tilemap={map}>
        <Sprite ... />
        <Sprite ... />
        <Sprite ... />
    </Tilemap>
</Stage>
```

## License

MIT