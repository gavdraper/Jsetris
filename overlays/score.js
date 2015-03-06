exports = function (state) {
    var drawLib = require("Utils/BlockDrawer");

    this.draw = function (gameSurface) {
        drawLib.outlineRectangle(state.gameWidth + 20, 12, 166, 200, "blue", gameSurface.getCtx());
        gameSurface.getCtx().font = "bold 18px Georgia";
        gameSurface.getCtx().fillStyle = "#80FF00";
        gameSurface.getCtx().fillText("Score : " + state.score, (state.tileSize * state.horizontalTileCount + 28) + 14, 50);
    }
};