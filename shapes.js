var Piece = require("piece");
var shapes = function() {
    var collection = [];

    //Straight Line
    collection.push([
        [1, 1, 1, 1]
    ]);

    //L Shape
    collection.push(
        [
            [1, 1, 1],
            [0, 0, 1]
        ]
    );

    var chooseShape = function() {
        return collection[(Math.floor((Math.random() * collection.length)))];
    };

    return {
        select: chooseShape
    };

}

exports = shapes();
