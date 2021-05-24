import { Texture, Rectangle } from 'pixi.js'

const getTilesetTextures = (atlas, tileset) => {
    const textures = []

    const baseTexture = Texture.from(atlas)
    const { margin, image, tileHeight, tileWidth, spacing} = tileset

    for (let y = margin; y < image.height; y += tileHeight + spacing) {
        for (let x = margin; x < image.width; x += tileWidth + spacing) {
            const texture = new Texture(baseTexture, new Rectangle(x, y, tileWidth, tileHeight))
            textures.push(texture)
        }
    }

    return textures
}

export default getTilesetTextures