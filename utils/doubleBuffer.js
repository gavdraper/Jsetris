exports = function(state, divId) {
    var bufferSurface = document.createElement("canvas");
    var sideBarSize = 180;
    var bufferCtx = bufferSurface.getContext("2d");
    bufferSurface.width = state.fullGameWidth;
    bufferSurface.height = state.gameHeight;

    this.width = state.fullGameWidth;
    this.height = state.gameHeight;

    this.fullWidth = state.fullGameWidth + sideBarSize;

    var surface = document.createElement("canvas");
    var surfaceCtx = surface.getContext("2d");
    surface.width = state.fullGameWidth;
    surface.height = state.gameHeight;
    document.getElementById(divId).appendChild(surface);

    var drawing = false;

    this.getCtx = function() {
        if (!drawing) {
            throw "Must be in draw mode!";
        } else {
            return bufferCtx;
        }
    };

    this.beginDraw = function() {
        drawing = true;
    };

    this.endDraw = function() {
        drawing = false;
        surfaceCtx.drawImage(bufferSurface, 0, 0);
    };

};
