exports = function(state) {

    this.takeControlOfUpdating = true;
    this.isDone = false;

    this.update = function () {
        var enterState = state.keyboardInput.isPressed(state.keyboardInput.ENTER);
        if (enterState.pressed && !enterState.heldDown)
            this.isDone = true;
    };


    this.draw = function (gameSurface) {
        var ctx = gameSurface.getCtx();
        ctx.font = "bold 25px Georgia";
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(0, 0, state.gameWidth, state.gameHeight);
        
        ctx.fillStyle = "#80FF00";
        ctx.fillText("Paused", (state.gameWidth / 2)-50, state.gameHeight / 2);
    };

};