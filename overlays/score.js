exports = function (state) {
    var drawLib = require("utils/blockDrawer");

    this.draw = function (gameSurface) {
        drawLib.outlineRectangle(state.gameWidth + 20, 12, 166, 200, "blue", gameSurface.getCtx());
        gameSurface.getCtx().font = "bold 15px Georgia";
        gameSurface.getCtx().fillStyle = "#80FF00";
        gameSurface.getCtx().fillText("Score " + state.score, (state.tileSize * state.horizontalTileCount + 28) + 14, 50);
        gameSurface.getCtx().fillText("High Score", (state.tileSize * state.horizontalTileCount + 28) + 10, 100);
    }
};