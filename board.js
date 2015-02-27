exports = function(tileSize, tilesX, tilesY, onGameOver, onScore) {
    var that = this;
    this.tiles = [];
    
    //for (var i = 0; i < tilesX; i++) {
        //this.tiles.push([]);
    //}

    for (var x = 0; x < tilesX; x++) {
        this.tiles[x] = [];
        for (var y = 0; y < tilesY; y++) {
            this.tiles[x][y] = 0;
        }
    }

    this.update = function(gameTime) {
        //Check for complete lines
        //  Remove any
        //  Add Score
        //  Increment level?
    };

    this.draw = function(gameSurface) {
        //draw parked pieces
        gameSurface.fillStyle = "gray";
        gameSurface.fillRect(0, 0, tileSize * tilesX, tileSize * tilesY);
        for (var x = 0; x < that.tiles.length; x++) {
            for (var y = 0; y < that.tiles[x].length; y++) {
                if (that.tiles[x][y] === 1) {
                    gameSurface.fillStyle = "blue";
                    gameSurface.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }
        }
    };

    this.freezePiece = function (piece) {
        for (var x = 0; x < piece.blocks.length; x++) {
            for (var y = 0; y < piece.blocks[x].length; y++) {
                if (piece.blocks[x][y] === 1) {
                    //Add to board
                    if (piece.locationY < 0) {
                        onGameOver();
                    } else {
                        that.tiles[piece.locationX + x][piece.locationY + y] = 1;
                    }
                }
            }
        }

        //Find complete lines
        var completedLines = [];
        var completedLineCount = 0;
        for (var i = 0; i < tilesY; i++) {
            completedLines[i] = 1;
        }

        for (var x = 0; x < that.tiles.length; x++) {
            for (var y = 0; y < that.tiles[x].length; y++) {
                if (that.tiles[x][y] !== 1) {
                    completedLines[y] = 0;
                }
            }
        }
        //Increment score and remove complete lines
        for (var i = 0; i < completedLines.length; i++) {
            if (completedLines[i] === 1) {
                console.log(that.tiles);
                //Remove line
                completedLineCount++;
                for (var x = 0; x < that.tiles.length; x++) {
                    //remove completed row
                    that.tiles[x].splice(i, 1);
                    //Add new row to top
                    that.tiles[x].unshift(0);
                    
                }

            }
        }

        if (completedLineCount > 0)
            onScore(completedLineCount);

    };
};
