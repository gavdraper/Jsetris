exports = function(tileSize, tilesX, tilesY) {
    var that = this;
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
        for (var x = 0; x < that.tiles.length; x++) {
            for (var y = 0; y < that.tiles[x].length; y++) {
                if (that.tiles[x][y] == 1) {
                    ctx.fillStyle = "blue";
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }
    };

    this.freezePiece = function(blocks, positionX, positionY) {
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] == 1) {
                    //Add to board
                    that.tiles[positionX + x][positionY + y] = 1;
                }
            }
        }
    };
};
