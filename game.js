var Jsetris = function(tileSize, xTiles, yTiles) {
    //Constructor Functions
    var DoubleBuffer = require("doubleBuffer");
    var Board = require("board");
    var Piece = require("piece");
    //Objects
    var shapes = require("shapes");
    //Jsetris!!!!
    var gameSurface = new DoubleBuffer(tileSize * xTiles, tileSize * yTiles);
    var gameBoard = new Board(tileSize, xTiles, yTiles);
    var currentPiece = new Piece("red", shapes.select(), tileSize, xTiles, yTiles);

    var gameLoop = function() {
        update();
        draw();
        setTimeout(gameLoop, 300);
    };

    var update = function() {
        currentPiece.update(gameBoard);
        gameBoard.update();
    };

    var draw = function() {
        gameSurface.beginDraw();
        gameBoard.draw(gameSurface);
        currentPiece.draw(gameSurface);
        gameSurface.endDraw();
    };

    var newGame = function() {
        //TODO Add reset game code here
        gameLoop();
    };

    newGame();
};

var game = new Jsetris(30, 10, 12);
