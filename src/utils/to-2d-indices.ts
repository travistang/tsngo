import { TSNGO_GRID_SIZE } from "../types";

export const to2DIndices = (index: number) => {
  if (
    index < 0 ||
    index >= TSNGO_GRID_SIZE * TSNGO_GRID_SIZE ||
    !Number.isInteger(index)
  ) {
    throw new Error(`Invalid index: ${index}`);
  }

  const j = index % TSNGO_GRID_SIZE;
  const i = (index - j) / TSNGO_GRID_SIZE;
  return [i, j] as [number, number];
};
