var Piece = function(color, blocks, tileSize, xTiles, yTiles, gameBoard) {
    var locationY = -blocks[0].length;
    var locationX = 0;
    var previousLocationY = -blocks[0].length;
    var previousLocationX = 0;
    this.done = false;

    var updateInterval = 0.3;
    var elapsedTime = 0;

    var isLocationValid = function() {
        //Don't go off bottom of screen
        if (locationY + blocks[0].length > yTiles) {
            if (locationY + blocks[0].length > yTiles) {
                return false;
            }
        }
        //Check not met another piece
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] === 1) {
                    if (gameBoard.tiles[locationX + x][locationY + y] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    this.update = function (gameTime) {
        console.log(gameTime);
        elapsedTime += gameTime;
        if (updateInterval <= elapsedTime) {
            previousLocationY = locationY;
            locationY++;
            if (!isLocationValid()) {
                locationX = previousLocationX;
                locationY = previousLocationY;
                this.done = true;
                gameBoard.freezePiece(blocks, locationX, locationY);
            }
            elapsedTime = 0;
        }
    };

    this.draw = function(gameSurface) {
        var ctx = gameSurface.getCtx();
        ctx.fillStyle = color;
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] === 1) {
                    ctx.fillRect(
                        (locationX + x) * tileSize, (locationY + y) * tileSize,
                        tileSize,
                        tileSize);
                }
            }
        }
    };

};

exports = Piece;
