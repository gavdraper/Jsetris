exports = {
    _pressed: {},

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32,

    isPressed: function(keyCode) {
        if (!this._pressed[keyCode]) {
            return {
                pressed: false,
                heldDown: false
            };
        }
        if (!this._pressed[keyCode].heldDown) {
            this._pressed[keyCode].heldDown = true;
            return {
                pressed: true,
                heldDown: false
            };
        }
        return this._pressed[keyCode];

    },

    onKeydown: function(event) {
        if (!this._pressed[event.keyCode])
            this._pressed[event.keyCode] = {
                pressed: true,
                heldDown: false
            };
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};
