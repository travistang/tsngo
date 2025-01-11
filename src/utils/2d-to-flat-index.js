"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFlatIndex = void 0;
const types_1 = require("../types");
const toFlatIndex = (i, j) => {
    if (i < 0 ||
        i >= types_1.TSNGO_GRID_SIZE ||
        j < 0 ||
        j >= types_1.TSNGO_GRID_SIZE ||
        !Number.isInteger(i) ||
        !Number.isInteger(j)) {
        throw new Error(`Invalid 2D index: ${i}, ${j}`);
    }
    return i * types_1.TSNGO_GRID_SIZE + j;
};
exports.toFlatIndex = toFlatIndex;
