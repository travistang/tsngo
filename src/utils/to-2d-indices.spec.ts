import { TSNGO_GRID_SIZE } from "../types";
import { to2DIndices } from "../utils/to-2d-indices";

describe("to2DIndices", () => {
  it("should return correct 2D indices for valid input indices", () => {
    expect(to2DIndices(0)).toEqual([0, 0]);
    expect(to2DIndices(1)).toEqual([0, 1]);
    expect(to2DIndices(TSNGO_GRID_SIZE - 1)).toEqual([0, TSNGO_GRID_SIZE - 1]);
    expect(to2DIndices(TSNGO_GRID_SIZE)).toEqual([1, 0]);
    expect(to2DIndices(TSNGO_GRID_SIZE * TSNGO_GRID_SIZE - 1)).toEqual([
      TSNGO_GRID_SIZE - 1,
      TSNGO_GRID_SIZE - 1,
    ]);
  });

  it("should throw an error for indices out of bounds", () => {
    expect(() => to2DIndices(-1)).toThrow(new Error("Invalid index: -1"));
    expect(() => to2DIndices(TSNGO_GRID_SIZE * TSNGO_GRID_SIZE)).toThrow(
      new Error(`Invalid index: ${TSNGO_GRID_SIZE * TSNGO_GRID_SIZE}`)
    );
  });

  it("should throw an error for non-integer indices", () => {
    expect(() => to2DIndices(0.5)).toThrow(new Error("Invalid index: 0.5"));
    expect(() => to2DIndices(10.9)).toThrow(new Error("Invalid index: 10.9"));
  });
});
