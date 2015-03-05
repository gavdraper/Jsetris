exports = function(width, height, divId) {
    var bufferSurface = document.createElement("canvas");
    var bufferCtx = bufferSurface.getContext("2d");
    bufferSurface.width = width;
    bufferSurface.height = height;

    this.width = width;
    this.height = height;

    var surface = document.createElement("canvas");
    var surfaceCtx = surface.getContext("2d");
    surface.width = width;
    surface.height = height;
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
