var Jsetris = function (tileSize, xTiles, yTiles) {
    //Constructor Functions
    var DoubleBuffer = require("doubleBuffer");
    var Board = require("board");
    var Piece = require("piece");
    //Objects
    var shapes = require("shapes");
    //Jsetris!!!!
    var gameSurface = new DoubleBuffer(tileSize * xTiles, tileSize * yTiles);
    var gameBoard;
    var currentPiece;
    var lastLoopTime = Date.now();
    var gameTime;

    var update = function (timePassed) {
        gameTime += timePassed;
        if (currentPiece.done) {
            currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles, gameBoard);
        }
        currentPiece.update(timePassed);
        gameBoard.update(timePassed);
    };

    var draw = function () {
        gameSurface.beginDraw();
        gameBoard.draw(gameSurface);
        currentPiece.draw(gameSurface);
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

    var onPieceDone = function() {
        gameBoard.freezePiece(currentPiece);
        currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles, gameBoard, onPieceDone);
    }

    var newGame = function () {
        //TODO Add reset game code here
        gameBoard =  new Board(tileSize, xTiles, yTiles, onGameOver);
        currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles, gameBoard, onPieceDone);
        gameLoop();
    };

    newGame();
};


//Todo base tile size on screen size
var game = new Jsetris(60, 10, 12);
