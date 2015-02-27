var Jsetris = function (tileSize, xTiles, yTiles) {
    //Constructor Functions
    var DoubleBuffer = require("doubleBuffer");
    var Board = require("board");
    var Piece = require("piece");
    //Objects
    var shapes = require("shapes");
    //Jsetris!!!!
    var gameSurface = new DoubleBuffer(tileSize * xTiles, tileSize * yTiles, "board");
    var gameBoard;
    var currentPiece;
    var lastLoopTime = Date.now();
    var gameTime;
    var pressedKey;
    var lastPressedKey;
    var lineScore;

    var update = function (timePassed) {
        gameTime += timePassed;
        currentPiece.update(timePassed, pressedKey, lastPressedKey === pressedKey);
        gameBoard.update(timePassed, lastPressedKey === pressedKey);
        lastPressedKey = pressedKey;
    };

    var draw = function () {
        gameSurface.beginDraw();
        var ctx = gameSurface.getCtx();
        gameBoard.draw(ctx);
        currentPiece.draw(ctx);
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
    }
    var onScore = function (_lineScore) {
        lineScore += _lineScore;
        document.getElementById("score").innerText = "Score : " + lineScore + " lines";
    };

    var newGame = function () {
        lineScore = 0;
        document.getElementById("score").innerText = "Score : " + lineScore + " lines";
        gameBoard = new Board(tileSize, xTiles, yTiles, onGameOver, onScore);
        currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles, gameBoard, onPieceDone);
        gameLoop();
    };

    var onKeyDown = function (e) {
        pressedKey = e.keyCode;
    }

    var onKeyUp = function (e) {
        pressedKey = null;
    }

    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    newGame();
};

//Todo base tile size on screen size
var game = new Jsetris(30, 10, 20);
