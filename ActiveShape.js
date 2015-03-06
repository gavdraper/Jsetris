var Piece = function (state,onLand) {
    var drawLib = require("utils/blockDrawer");
    var shapes = require("shapes");
    var currentShape;
    var nextShape = shapes.select();
    var rotationIndex = 0;
    var previousRotationIndex = 0;
    var locationY;
    var locationX;
    var previousLocationY;
    var previousLocationX;
    var fallInterval = 0.50 - (state.score / 100);
    var elapsedFallTime = 0;
    var leftRightRepeatSpeed = 0.10;
    var leftRightRepeatTimer = 0;

    var onNewPiece = function () {
        if (currentShape) {
            onLand(currentShape.rotations[rotationIndex],locationX,locationY,currentShape.color);
        }
        rotationIndex = 0;
        currentShape = nextShape;
        nextShape = shapes.select();
        locationX = Math.floor(state.horizontalTileCount / 2) - 1;
        locationY = -currentShape.rotations[rotationIndex].length;
        previousLocationX = locationX;
        previousLocationY = locationY;
    }

    onNewPiece();

    var isLocationValid = function () {
        for (var x = 0; x < currentShape.rotations[rotationIndex].length; x++) {
            for (var y = 0; y < currentShape.rotations[rotationIndex][x].length; y++) {
                if (currentShape.rotations[rotationIndex][x][y] === 1) {
                    //Don't go off bottom of screen
                    if (locationY + y >= state.verticalTileCount) {
                        return false;
                    }
                    //Don't go off left of screen
                    if (locationX + x < 0) {
                        return false;
                    }
                    //Don't go off right of screen
                    if (locationX + x >= state.horizontalTileCount) {
                        return false;
                    }
                    //Check not met another piece
                    if (locationY + y > 0 && state.tiles[locationX + x][locationY + y] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    var tryMove = function (x, y, rotate, onInvalidMove) {
        previousLocationY = locationY;
        previousLocationX = locationX;
        previousRotationIndex = rotationIndex;
        locationX += x;
        locationY += y;
        if (rotate) {
            if (rotationIndex < (currentShape.rotations.length - 1)) {
                rotationIndex++;
            } else {
                rotationIndex = 0;
            }
        }

        if (!isLocationValid()) {
            if (x !== 0)
                locationX = previousLocationX;
            if (y !== 0)
                locationY = previousLocationY;
            if (rotate) {
                rotationIndex = previousRotationIndex;
            }

            if (onInvalidMove) {
                onInvalidMove();
            }
            return false;
        }
        return true;

    };

    this.update = function (timePassed) {
        var leftState = state.keyboardInput.isPressed(state.keyboardInput.LEFT);
        var rightState = state.keyboardInput.isPressed(state.keyboardInput.RIGHT);
        var downState = state.keyboardInput.isPressed(state.keyboardInput.DOWN);
        var spaceState = state.keyboardInput.isPressed(state.keyboardInput.SPACE);

        elapsedFallTime += timePassed;
        leftRightRepeatTimer += timePassed;
        if (fallInterval <= elapsedFallTime) {
            //Move Down
            tryMove(0, 1, false, onNewPiece);
            elapsedFallTime = 0;
        }
        
        if (downState.pressed && !downState.heldDown) {
            //Move down
            while (tryMove(0, 1)) { }
        }

        if (spaceState.pressed && !spaceState.heldDown) {
            //Rotate piece
            tryMove(0, 0, true);
        }

        if (leftState.pressed && (!leftState.heldDown || leftRightRepeatTimer > leftRightRepeatSpeed)) {
            //Move Left
            tryMove(-1, 0);
            leftRightRepeatTimer = 0;
        }
        else if (rightState.pressed && (!rightState.heldDown || leftRightRepeatTimer > leftRightRepeatSpeed)) {
            //Move Right
            tryMove(1, 0);
            leftRightRepeatTimer = 0;
        }
    };




    this.draw = function ( gameSurface) {
        var ctx = gameSurface.getCtx();
        for (var x = 0; x < currentShape.rotations[rotationIndex].length; x++) {
            for (var y = 0; y < currentShape.rotations[rotationIndex][x].length; y++) {
                if (currentShape.rotations[rotationIndex][x][y] === 1) {
                    drawLib.drawBlock(state, locationX + x, locationY + y, currentShape.color, ctx);
                }
            }
        }
    };

};

exports = Piece;