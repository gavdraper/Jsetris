(function () {
    var GameState = require("GameState");
    var PauseScreen = require("screens/pauseScreen");

    var lastLoopTime = Date.now();
    var verticalTileCount = 22;
    var horizontalTileCount = 10;
    var tileSize = 30;
    var state = null;

    var update = function (timePassed) {
        if (state.windows.length > 0) {
            var i = state.windows.length-1;
            while (i >= 0) {
                var doneUpdate = false;
                if (state.windows[i].update) {
                    state.windows[i].update(timePassed);
                }
                if (state.windows[i].takeControlOfUpdating) {
                    doneUpdate=true;
                }
                if (state.windows[i].isDone) {
                    state.windows.splice(i, 1);
                    i++;
                }
                if (doneUpdate) {
                    return;
                }
                i--;
            }
        }
        //Handle Top Level Input only if a screen above hasnt taken control
        var enterState = state.keyboardInput.isPressed(state.keyboardInput.ENTER);
        if (enterState.pressed && !enterState.heldDown) {
            state.windows.push(new PauseScreen(state));
        }
    }

    var draw = function () {
        state.gameSurface.beginDraw();
        if (state.windows.length > 0) {
            var i = 0;
            while (i < state.windows.length) {
                if (state.windows[i].draw) {
                    state.windows[i].draw(state.gameSurface);
                }
                i++;
            }
        }
        state.gameSurface.endDraw();
    }

    var loop = function () {
        var now = Date.now();
        var timePassed = (now - lastLoopTime) / 1000.0;
        update(timePassed);
        draw();
        lastLoopTime = now;
        requestAnimationFrame(loop);
    };

    var init = function () {
        state = new GameState(horizontalTileCount, verticalTileCount, tileSize);
        loop();
    };

    init();
}());