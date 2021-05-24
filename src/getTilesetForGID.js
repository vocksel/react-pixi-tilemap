const getTilesetForGID = (gid, tilesets) => {
    let result
    for (const tileset of tilesets) {
        if (gid >= tileset.firstGid) {
            result = tileset
        }
    }
    return result
}

export default getTilesetForGID