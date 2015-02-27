exports = function(width, height) {
    bufferSurface = document.createElement("canvas");
    bufferCtx = bufferSurface.getContext("2d");
    bufferSurface.width = width;
    bufferSurface.height = height;

    surface = document.createElement("canvas");
    surfaceCtx = surface.getContext("2d");
    surface.width = width;
    surface.height = height;
    document.getElementById("main").appendChild(surface);

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
