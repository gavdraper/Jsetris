exports = function (horizontalTileCount, verticalTileCount, tileSize) {
    var that = this;
    var DoubleBuffer = require("Utils/DoubleBuffer");
    var Board = require("Board");
    this.keyboardInput = require("Utils/KeyboardInput");
    this.score = 0;
    this.horizontalTileCount = horizontalTileCount;
    this.verticalTileCount = verticalTileCount;
    this.gameWidth = horizontalTileCount * tileSize;
    this.gameHeight = verticalTileCount * tileSize;
    this.sideBarWidth = 200;
    this.fullGameWidth = this.gameWidth + this.sideBarWidth;
    this.tileSize = tileSize;
    this.activePiece = null;
    this.windows = [];
    this.tiles = [];
    this.gameSurface =  new DoubleBuffer(this, "board");

    this.reset = function () {
        this.score = 0;
        this.tiles = [];
        this.windows = [];
        for (var x = 0; x < this.horizontalTileCount; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.verticalTileCount; y++) {
                this.tiles[x][y] = 0;
            }
        }        
        this.windows.push(new Board(this));
    }

    window.addEventListener('keyup', function (event) {
        that.keyboardInput.onKeyup(event);
    }, false);
    window.addEventListener('keydown', function (event) {
        that.keyboardInput.onKeydown(event);
    }, false);


    this.reset();
}