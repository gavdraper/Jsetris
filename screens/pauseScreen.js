﻿exports = function() {
    var that = this;

    this.takeControlOfUpdating = true;

    this.isDone = false;

    this.update = function (gameTime, keyboard) {
        var enterState = keyboard.isPressed(keyboard.ENTER);
        if (enterState.pressed && !enterState.heldDown)
            that.isDone = true;
    };


    this.draw = function (gameSurface) {
        var ctx = gameSurface.getCtx();
        ctx.font = "20px Georgia";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(0, 0, gameSurface.width, gameSurface.height);
        ctx.textAlign = "center";
        ctx.fillText("Paused", gameSurface.width/2, gameSurface.height/2);
    };

};