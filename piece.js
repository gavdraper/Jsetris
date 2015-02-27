var Piece = function (color, blocks, tileSize, xTiles, yTiles, gameBoard, onPieceDone, onGameOver) {
    var that = this;
    this.locationY = -blocks[0].length;
    this.locationX = 0;
    this.blocks = blocks;
    var previousLocationY = -blocks[0].length;
    var previousLocationX = 0;

    var updateInterval = 0.1;
    var elapsedTime = 0;

    var isLocationValid = function() {
        //Don't go off bottom of screen
        if (that.locationY + blocks[0].length > yTiles) {
            if (that.locationY + blocks[0].length > yTiles) {
                return false;
            }
        }
        //Check not met another piece
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] === 1) {
                    if (gameBoard.tiles[that.locationX + x][that.locationY + y] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }; 

    this.update = function (gameTime) {
        elapsedTime += gameTime;
        if (updateInterval <= elapsedTime) {
            previousLocationY = that.locationY;
            that.locationY++;
            if (!isLocationValid()) {
                that.locationX = previousLocationX;
                that.locationY = previousLocationY;
                onPieceDone();
            }
            elapsedTime = 0;
        }
    };

    this.draw = function(gameSurface) {
        gameSurface.fillStyle = color;
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] === 1) {
                    gameSurface.fillRect(
                        (that.locationX + x) * tileSize, (that.locationY + y) * tileSize,
                        tileSize,
                        tileSize);
                }
            }
        }
    };

};

exports = Piece;
