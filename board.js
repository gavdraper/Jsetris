exports = function (tileSize, tilesX, tilesY, onGameOver, onScore) {
    var that = this;
    this.tiles = [];
    this.score = 0;

    //for (var i = 0; i < tilesX; i++) {
    //this.tiles.push([]);
    //}

    for (var x = 0; x < tilesX; x++) {
        this.tiles[x] = [];
        for (var y = 0; y < tilesY; y++) {
            this.tiles[x][y] = 0;
        }
    }

    this.update = function (gameTime) {
    };

    this.draw = function (gameSurface) {
        //draw parked pieces        
        var ctx = gameSurface.getCtx();
        ctx.fillStyle = "black";
        console.log()
        ctx.fillRect(0, 0, gameSurface.fullWidth, gameSurface.height);
        for (var x = 0; x < that.tiles.length; x++) {
            for (var y = 0; y < that.tiles[x].length; y++) {
                if (that.tiles[x][y] !== 0) {
                    
                    ctx.fillStyle = "black";
                    ctx.fillRect(
                        x * tileSize, y * tileSize, tileSize, tileSize);

                    ctx.fillStyle = that.tiles[x][y];
                    ctx.fillRect(
                    (x * tileSize) + 1, (y * tileSize) + 1, tileSize - 2, tileSize - 2);


                }
            }
        }


        //Draw Side Bar
        ctx.fillStyle = "blue";
        //Seperator
        ctx.fillRect(tileSize * tilesX, 0, 2, tilesY * tileSize);

        //Next Block Area
        ctx.fillStyle = "blue";
        ctx.fillRect((tileSize * tilesX + 10), 10, 162, 150);
        ctx.fillStyle = "black";
        ctx.fillRect((tileSize * tilesX + 10) + 2, 10 + 2, 162 - 4, 150 - 4);
        ctx.font = "bold 15px Georgia";
        ctx.fillStyle = "#80FF00";
        ctx.fillText("Score", (tileSize * tilesX + 10) + 14, 50);
        ctx.fillText("High Score", (tileSize * tilesX + 14) + 10, 100);
    


        //Score Area
        ctx.fillStyle = "blue";
        ctx.fillRect((tileSize * tilesX + 10), 200, 162, 150);
        ctx.fillStyle = "black";
        ctx.fillRect((tileSize * tilesX + 10) + 2, 200 + 2, 162 - 4, 150 - 4);
        ctx.font = "bold 15px Georgia";
        ctx.fillStyle = "#80FF00";
        ctx.fillText("Next Piece", (tileSize * tilesX + 10) + 14, 230);
    };

    this.freezePiece = function (piece) {
        for (var x = 0; x < piece.blocks.length; x++) {
            for (var y = 0; y < piece.blocks[x].length; y++) {
                if (piece.blocks[x][y] !==0) {
                    //Add to board
                    if (piece.locationY < 0) {
                        onGameOver();
                    } else {
                        that.tiles[piece.locationX + x][piece.locationY + y] = [piece.color];
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
                if (that.tiles[x][y] === 0) {
                    completedLines[y] = 0;
                }
            }
        }
        //Increment score and remove complete lines
        for (var i = 0; i < completedLines.length; i++) {
            if (completedLines[i] === 1) {
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

        if (completedLineCount > 0) {
            this.score += completedLineCount;
            onScore(completedLineCount);
        }

    };
};