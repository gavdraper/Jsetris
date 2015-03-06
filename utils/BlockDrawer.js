exports = {
    drawBlock: function (state, x, y, color, ctx) {
        var xpos = state.tileSize * x;
        var ypos = state.tileSize * y;
        ctx.fillStyle = "black";
        ctx.fillRect(xpos, ypos, state.tileSize, state.tileSize);

        ctx.fillStyle = color;
        ctx.fillRect(xpos + 1, ypos + 1, state.tileSize - 2, state.tileSize - 2);
    },

    outlineRectangle : function(x, y, width,height, color, ctx) {
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
};