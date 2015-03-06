exports = {
    drawBlock: function (state, x, y, color, ctx, xOffSet, yOffSet) {
        if (!xOffSet) xOffSet = 0;
        if (!yOffSet) yOffSet = 0;
        var xpos = xOffSet + (state.tileSize * x);
        var ypos = yOffSet + (state.tileSize * y);
        ctx.fillStyle = "black";
        ctx.fillRect(xpos, ypos, state.tileSize, state.tileSize);

        ctx.fillStyle = color;
        ctx.fillRect(xpos + 1, ypos + 1, state.tileSize - 2, state.tileSize - 2);
    },

    outlineRectangle: function (x, y, width, height, color, ctx) {
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = color;
        ctx.stroke();
    },


};