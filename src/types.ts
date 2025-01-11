export const TSNGO_GRID_SIZE = 6;
export const TSNGO_GRID_COUNT = TSNGO_GRID_SIZE * TSNGO_GRID_SIZE;

export const POSSIBLE_TSNGO_CELL_VALUES = [-1, 0, 1] as const;
export type TsngoCellValue = (typeof POSSIBLE_TSNGO_CELL_VALUES)[number];
export type TsngoCellNonEmptyValue = -1 | 1;
