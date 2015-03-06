var Jsetris = function (tileSize, xTiles, yTiles) {
    //Constructor Functions
    var DoubleBuffer = require("utils/doubleBuffer");
    var PauseScreen = require("screens/pauseScreen");
    var Board = require("board");
    var Piece = require("piece");
    //Objects
    var shapes = require("shapes");
    var keyboard = require("utils/keyboardInput");
    var modalScreens = [];

    //Jsetris!!!!
    var gameSurface = new DoubleBuffer(tileSize * xTiles, tileSize * yTiles, "board");    

    var gameBoard;
    var currentPiece;
    var lastLoopTime = Date.now();
    var gameTime;
    var lineScore;
    var inputDelay = 0.4;
    var gameState = {};
    var inputTimePassed;

    var handleInput = function (timePassed) {
        inputTimePassed += timePassed;
        if (inputTimePassed > inputDelay) {
            var enterState = keyboard.isPressed(keyboard.ENTER);
            if (enterState.pressed && !enterState.heldDown) {
                modalScreens.push(new PauseScreen());
            }
        }
    };

    var update = function (timePassed) {
        gameTime += timePassed;
        if (modalScreens.length > 0) {
            for (var i = modalScreens.length - 1; i >= 0; i--) {
                var endUpdate = modalScreens[i].takeControlOfUpdating;
                modalScreens[i].update(gameTime, keyboard);
                if (i === 0 && modalScreens[i].isDone) {
                    modalScreens.pop();
                }
                if (endUpdate) {
                    return;
                }
            }
        }
        handleInput(timePassed);
        currentPiece.update(timePassed, keyboard);
        gameBoard.update(timePassed, keyboard);
    };

    var draw = function () {
        gameSurface.beginDraw();
        
        gameBoard.draw(gameSurface);
        currentPiece.draw(gameSurface);
        if (modalScreens.length > 0) {
            for (var i = modalScreens.length - 1; i >= 0; i--) {
                modalScreens[i].draw(gameSurface);
            }
        }
        gameSurface.endDraw();
    };

    var gameLoop = function () {
        var now = Date.now();
        var timePassed = (now - lastLoopTime) / 1000.0;

        update(timePassed);
        draw();
        lastLoopTime = now;
        requestAnimationFrame(gameLoop);
    };

    var onGameOver = function () {
        newGame();
    }

    var onPieceDone = function () {
        gameBoard.freezePiece(currentPiece);
        currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles, gameBoard, onPieceDone);
    };

    var onScore = function (lines) {
        gameState.score += lines;
        document.getElementById("score").innerText = "Score : " + gameState.score + " lines";
    };

    var newGame = function () {
        gameState = {};
        gameState.score = 0;
        inputTimePassed = 0;
        modalScreens = [];
        document.getElementById("score").innerText = "Score : " + gameState.score + " lines";
        gameBoard = new Board(tileSize, xTiles, yTiles, onGameOver, onScore);
        currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles, gameBoard, onPieceDone);
        gameLoop();
    };

    window.addEventListener('keyup', function (event) {
        keyboard.onKeyup(event);
    }, false);
    window.addEventListener('keydown', function (event) {
        keyboard.onKeydown(event);
    }, false);

    newGame();
};

//Todo base tile size on screen size
var game = new Jsetris(30, 10, 20);

window.onload = function () {
    document.activeElement.blur();
};