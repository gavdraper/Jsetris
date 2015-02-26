exports = function(tileSize, tilesX, tilesY) {
    this.tiles = [];
    for (var i = 0; i < tilesY; i++) {
        this.tiles.push([]);
    }

    for (var x = 0; x < tilesX; x++) {
        for (var y = 0; y < tilesY; y++) {
            this.tiles[x][y] = 0;
        }
    }

    this.update = function() {
        //Check for complete lines
        //  Remove any
        //  Add Score
        //  Increment level?
    };

    this.draw = function(gameSurface) {
        //draw parked pieces
        var ctx = gameSurface.getCtx();
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, tileSize * tilesX, tileSize * tilesY);
    };
};
