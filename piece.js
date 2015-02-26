var Piece = function(color, blocks, tileSize, xTiles, yTiles, gameBoard) {
    var that = this;
    this.locationY = -blocks[0].length;
    this.locationX = 0;
    this.previousLocationY = -blocks[0].length;
    this.previousLocationX = 0;
    this.done = false;

    var isLocationValid = function() {
        //Don't go off bottom of screen
        if (that.locationY + blocks[0].length > yTiles) {
            return false;
        }
        //Check not met another piece
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] == 1) {
                    if (gameBoard.tiles[that.locationX + x][that.locationY + y] == 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    this.update = function() {
        this.previousLocationY = this.locationY;
        this.locationY++;
        if (!isLocationValid()) {
            this.locationX = this.previousLocationX;
            this.locationY = this.previousLocationY;
            this.done = true;
            gameBoard.freezePiece(blocks, this.locationX, this.locationY);
        }
    };

    this.draw = function(gameSurface) {
        var ctx = gameSurface.getCtx();
        ctx.fillStyle = color;
        for (var x = 0; x < blocks.length; x++) {
            for (var y = 0; y < blocks[x].length; y++) {
                if (blocks[x][y] == 1) {
                    ctx.fillRect(
                        (this.locationX + x) * tileSize, (this.locationY + y) * tileSize,
                        tileSize,
                        tileSize);
                }
            }
        }
    };

};

exports = Piece;
