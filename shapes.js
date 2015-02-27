var Piece = require("piece");
var shapes = function () {
    var collection = [];

    //Straight Line
    collection.push([
        //Rotation 1
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0 ,0 ,0]
        ],
        //Rotation 2
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
            ]]);

    //L Shape
    collection.push([
        //Rotation 1
        [   [1, 1, 1],
            [0, 0, 1]],
        //Rotation 2
        [   [1, 1],
            [1, 0],
            [1, 0]],
        //rotation 3
        [   [1, 0, 0],
            [1, 1, 1]],
        // roration 4
        [   [0, 1],
            [0, 1],
            [1, 1]]
            ]);

    //Flipping the bird
    collection.push([
        //Rotation 1
        [   [0, 1],
            [1, 1],
            [0, 1]],
        //Rotation 2
        [   [1, 1, 1],
            [0, 1, 0]],
        //Rotation 3
        [   [1, 0],
            [1, 1],
            [1, 0]],
        //Rotation 4
        [   [0, 1, 0],
            [1, 1, 1]]
        ]);

    var chooseShape = function () {
        return collection[(Math.floor((Math.random() * collection.length)))];
    };

    return {
        select: chooseShape
    };

}

exports = shapes();
