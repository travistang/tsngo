import { TSNGO_GRID_SIZE } from "../types";

export const toFlatIndex = (i: number, j: number) => {
  if (
    i < 0 ||
    i >= TSNGO_GRID_SIZE ||
    j < 0 ||
    j >= TSNGO_GRID_SIZE ||
    !Number.isInteger(i) ||
    !Number.isInteger(j)
  ) {
    throw new Error(`Invalid 2D index: ${i}, ${j}`);
  }
  return i * TSNGO_GRID_SIZE + j;
};
