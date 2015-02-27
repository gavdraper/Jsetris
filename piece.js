var Piece = function(color, shape, tileSize, xTiles, yTiles, gameBoard, onPieceDone, onGameOver) {
    var that = this;
    this.shape = shape;
    var shapeRotation = 0;
    var previousShapeRotation = 0;
    this.blocks = shape[0];
    this.locationY = -that.blocks[0].length;
    this.locationX = 0;

    var previousLocationY = -that.blocks[0].length;
    var previousLocationX = 0;

    var fallInterval = 0.45-(gameBoard.score/100);
    var elapsedFallTime = 0;


    var lastKeyPress;
    var leftRightRepeatSpeed = 0.1;
    var leftRightRepeatTimer = 0;

    var isLocationValid = function() {
        for (var x = 0; x < that.blocks.length; x++) {
            for (var y = 0; y < that.blocks[x].length; y++) {
                if (that.blocks[x][y] === 1) {
                    //Don't go off bottom of screen
                    if (that.locationY + y >= yTiles) {
                        return false;
                    }
                    //Don't go off left of screen
                    if (that.locationX + x < 0) {
                        return false;
                    }
                    //Don't go off right of screen
                    if (that.locationX + x >= xTiles) {
                        return false;
                    }
                    //Check not met another piece
                    if (gameBoard.tiles[that.locationX + x][that.locationY + y] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    };

    var tryMove = function(x, y, rotate, onInvalidMove) {
        previousLocationY = that.locationY;
        previousLocationX = that.locationX;
        previousShapeRotation = shapeRotation;
        that.locationX += x;
        that.locationY += y;
        if (rotate) {
            if (shapeRotation < (shape.length - 1)) {
                shapeRotation++;
            } else {
                shapeRotation = 0;
            }
            that.blocks = shape[shapeRotation];
        }

        if (!isLocationValid()) {
            if (x !== 0)
                that.locationX = previousLocationX;
            if (y !== 0)
                that.locationY = previousLocationY;
            if (rotate)
                shapeRotation = previousShapeRotation;
            that.blocks = shape[previousShapeRotation];

            if (onInvalidMove) {
                onInvalidMove();
            }
            return false;
        }
        return true;

    };

    var lastKey;
    this.update = function(gameTime, keyboard) {
        var leftState = keyboard.isPressed(keyboard.LEFT);
        var rightState = keyboard.isPressed(keyboard.RIGHT);
        var downState = keyboard.isPressed(keyboard.DOWN);
        var spaceState = keyboard.isPressed(keyboard.SPACE);


        elapsedFallTime += gameTime;
        leftRightRepeatTimer += gameTime;

        if (fallInterval <= elapsedFallTime) {
            //Move Down
            tryMove(0, 1, false, onPieceDone);
            elapsedFallTime = 0;
        }

        if (downState.pressed && !downState.heldDown) {
            //Move down
            while (tryMove(0, 1)) {}
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




    this.draw = function(gameSurface) {
        gameSurface.fillStyle = color;
        for (var x = 0; x < that.blocks.length; x++) {
            for (var y = 0; y < that.blocks[x].length; y++) {
                if (that.blocks[x][y] === 1) {
                    gameSurface.fillRect(
                        (that.locationX + x) * tileSize, (that.locationY + y) * tileSize,
                        tileSize,
                        tileSize);
                }
            }
        }
    };

};

exports = Piece;
