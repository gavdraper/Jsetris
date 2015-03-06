var shapes = function () {
    var collection = [];

    //Straight Line
    collection.push(
    {
        color: "#FF8000",
        rotations:
        [
            //Rotation 1
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            //Rotation 2
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        ]
    });

    //Square
    collection.push({
        color: "#00FFFF",
        rotations:
        [
            //Rotation 1
            [
                [1, 1],
                [1, 1]
            ]
        ]
    }
    );

    //Backwards L
    collection.push({
        color: "#FF0000",
        rotations:
        [
            //Rotation 1
            [
                [0, 0, 1],
                [1, 1, 1]
            ],
            //Rotation 2
            [
                [1, 1],
                [0, 1],
                [0, 1]
            ],
            //Rotation 3
            [
                [1, 1, 1],
                [1, 0, 0]
            ],
            //Rotation 4
            [
                [1, 0],
                [1, 0],
                [1, 1]
            ]
        ]
    });

    //S
    collection.push({
        color: "#FFFF00",
        rotations: [
            //Rotation 1
            [
                [1, 1, 0],
                [0, 1, 1]
            ],
            //Rotation 2
            [
                [0, 1],
                [1, 1],
                [1, 0]
            ]
        ]
    });

    //Back S
    collection.push({
        color: "#80FF00",
        rotations: [
            //Rotation 1
            [
                [0, 1, 1],
                [1, 1, 0]
            ],
            //Rotation 2
            [
                [1, 0],
                [1, 1],
                [0, 1]
            ]
        ]
    });

    //L Shape
    collection.push({
        color: "#FFC000",
        rotations: [
            //Rotation 1
            [
                [1, 1, 1],
                [0, 0, 1]
            ],
            //Rotation 2
            [
                [1, 1],
                [1, 0],
                [1, 0]
            ],
            //rotation 3
            [
                [1, 0, 0],
                [1, 1, 1]
            ],
            // roration 4
            [
                [0, 1],
                [0, 1],
                [1, 1]
            ]
        ]
    });

    //Flipping the bird
    collection.push({
        color: "#0000FF",
        rotations: [
            //Rotation 1
            [
                [0, 1],
                [1, 1],
                [0, 1]
            ],
            //Rotation 2
            [
                [1, 1, 1],
                [0, 1, 0]
            ],
            //Rotation 3
            [
                [1, 0],
                [1, 1],
                [1, 0]
            ],
            //Rotation 4
            [
                [0, 1, 0],
                [1, 1, 1]
            ]
        ]
    });

    var chooseShape = function () {
        return collection[(Math.floor((Math.random() * collection.length)))];
    };

    return {
        select: chooseShape
    };

}

exports = shapes();
