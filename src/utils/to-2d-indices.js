"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to2DIndices = void 0;
const types_1 = require("../types");
const to2DIndices = (index) => {
    if (index < 0 ||
        index >= types_1.TSNGO_GRID_SIZE * types_1.TSNGO_GRID_SIZE ||
        !Number.isInteger(index)) {
        throw new Error(`Invalid index: ${index}`);
    }
    const j = index % types_1.TSNGO_GRID_SIZE;
    const i = (index - j) / types_1.TSNGO_GRID_SIZE;
    return [i, j];
};
exports.to2DIndices = to2DIndices;
