exports = function (state) {
    var ActiveShape = require("ActiveShape");
    var ScoreOutline = require("overlays/score");
    var NextBlockOutline = require("overlays/nextBlock");
    var drawLib = require("utils/blockDrawer");
    var scoreBox = new ScoreOutline(state);
    var nextBlockBox = new NextBlockOutline(state);
    

    this.update = function(timePassed) {
        activePiece.update(timePassed);
    }

    this.draw = function (gameSurface) {
        //draw parked pieces        
        var ctx = gameSurface.getCtx();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, gameSurface.fullWidth, gameSurface.height);
        for (var x = 0; x < state.tiles.length; x++) {
            for (var y = 0; y < state.tiles[x].length; y++) {
                if (state.tiles[x][y] !== 0) {
                    drawLib.drawBlock(state, x, y, state.tiles[x][y], ctx);
                }
            }
        }


        //Draw Side Bar
        ctx.fillStyle = "blue";
        //Seperator
        ctx.fillRect(state.tileSize * state.horizontalTileCount, 0, 2, state.verticalTileCount * state.tileSize);


        scoreBox.draw(gameSurface);
        nextBlockBox.draw(gameSurface);
        /*
        //Next Block Area
        ctx.fillStyle = "blue";
        ctx.fillRect((state.tileSize * state.horizontalTileCount + 26), 10, 162, 150);
        ctx.fillStyle = "black";
        ctx.fillRect((state.tileSize * state.horizontalTileCount + 26) + 2, 10 + 2, 162 - 4, 150 - 4);
        ctx.font = "bold 15px Georgia";
        ctx.fillStyle = "#80FF00";
        ctx.fillText("Score " + score, (state.tileSize * state.horizontalTileCount + 28) + 14, 50);
        ctx.fillText("High Score", (state.tileSize * state.horizontalTileCount + 28) + 10, 100);
        //Score Area
        ctx.fillStyle = "blue";
        ctx.fillRect((state.tileSize * state.horizontalTileCount + 26), 200, 162, 150);
        ctx.fillStyle = "black";
        ctx.fillRect((state.tileSize * state.horizontalTileCount + 26) + 2, 200 + 2, 162 - 4, 150 - 4);
        ctx.font = "bold 15px Georgia";
        ctx.fillStyle = "#80FF00";
        ctx.fillText("Next Piece", (state.tileSize * state.horizontalTileCount + 28) + 14, 230);
        */
        activePiece.draw(gameSurface);
    };

    var freezePiece = function (piece,locationX,locationY,color) {
        for (var x = 0; x < piece.length; x++) {
            for (var y = 0; y < piece[x].length; y++) {
                if (piece[x][y] !==0) {
                    //Add to board
                    if (locationY < 0) {
                        state.reset();
                    } else {
                        state.tiles[locationX + x][locationY + y] = [color];
                    }
                }
            }
        }

        //Find complete lines
        var completedLines = [];
        var completedLineCount = 0;
        for (var i = 0; i < state.verticalTileCount; i++) {
            completedLines[i] = 1;
        }

        for (var x = 0; x < state.tiles.length; x++) {
            for (var y = 0; y < state.tiles[x].length; y++) {
                if (state.tiles[x][y] === 0) {
                    completedLines[y] = 0;
                }
            }
        }
        //Increment score and remove complete lines
        for (var i = 0; i < completedLines.length; i++) {
            if (completedLines[i] === 1) {
                //Remove line
                completedLineCount++;
                for (var x = 0; x < state.tiles.length; x++) {
                    //remove completed row
                    state.tiles[x].splice(i, 1);
                    //Add new row to top
                    state.tiles[x].unshift(0);

                }

            }
        }

        if (completedLineCount > 0) {
            state.score += completedLineCount;
        }

    };

    var activePiece = new ActiveShape(state, freezePiece);
};