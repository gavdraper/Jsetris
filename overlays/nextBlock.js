exports = function (state) {
    var drawLib = require("Utils/BlockDrawer");

    this.draw = function (gameSurface,nextPiece) {
        drawLib.outlineRectangle(state.gameWidth + 20, 228, 166, 200, "blue", gameSurface.getCtx());
        gameSurface.getCtx().font = "bold 18px Georgia";
        gameSurface.getCtx().fillStyle = "#80FF00";
        gameSurface.getCtx().fillText("Next Piece", (state.tileSize * state.horizontalTileCount + 28) + 14, 260);
        for (var x = 0; x < nextPiece.rotations[0].length; x++) {
            for (var y = 0; y < nextPiece.rotations[0][x].length; y++) {
                if (nextPiece.rotations[0][x][y] === 1) {
                    //Draw square
                    drawLib.drawBlock(state, x, y, nextPiece.color, gameSurface.getCtx(),state.gameWidth+60,290);
                }
            }
        }
    }
};