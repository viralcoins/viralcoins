"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Coin = /** @class */ (function () {
    function Coin(id, code, value, coordinates, description) {
        this.id = id;
        this.code = code;
        this.value = value;
        this.coordinates = coordinates;
        this.description = description;
    }
    return Coin;
}());
exports.Coin = Coin;
