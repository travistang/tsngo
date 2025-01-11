"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const to_2d_indices_1 = require("../utils/to-2d-indices");
describe("to2DIndices", () => {
    it("should return correct 2D indices for valid input indices", () => {
        expect((0, to_2d_indices_1.to2DIndices)(0)).toEqual([0, 0]);
        expect((0, to_2d_indices_1.to2DIndices)(1)).toEqual([0, 1]);
        expect((0, to_2d_indices_1.to2DIndices)(types_1.TSNGO_GRID_SIZE - 1)).toEqual([0, types_1.TSNGO_GRID_SIZE - 1]);
        expect((0, to_2d_indices_1.to2DIndices)(types_1.TSNGO_GRID_SIZE)).toEqual([1, 0]);
        expect((0, to_2d_indices_1.to2DIndices)(types_1.TSNGO_GRID_SIZE * types_1.TSNGO_GRID_SIZE - 1)).toEqual([
            types_1.TSNGO_GRID_SIZE - 1,
            types_1.TSNGO_GRID_SIZE - 1,
        ]);
    });
    it("should throw an error for indices out of bounds", () => {
        expect(() => (0, to_2d_indices_1.to2DIndices)(-1)).toThrow(new Error("Invalid index: -1"));
        expect(() => (0, to_2d_indices_1.to2DIndices)(types_1.TSNGO_GRID_SIZE * types_1.TSNGO_GRID_SIZE)).toThrow(new Error(`Invalid index: ${types_1.TSNGO_GRID_SIZE * types_1.TSNGO_GRID_SIZE}`));
    });
    it("should throw an error for non-integer indices", () => {
        expect(() => (0, to_2d_indices_1.to2DIndices)(0.5)).toThrow(new Error("Invalid index: 0.5"));
        expect(() => (0, to_2d_indices_1.to2DIndices)(10.9)).toThrow(new Error("Invalid index: 10.9"));
    });
});
