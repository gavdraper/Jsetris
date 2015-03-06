exports = function (state) {
    var drawLib = require("utils/blockDrawer");

    this.draw = function (gameSurface) {
        drawLib.outlineRectangle(state.gameWidth + 20, 228, 166, 200, "blue", gameSurface.getCtx());
    }
};