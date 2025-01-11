import { TsngoBoard } from "../tsngo-board";
import { TsngoCellNonEmptyValue } from "../types";
import { getPossibleMoves } from "./possible-moves";

/**
 * Return true if the board is definitely not acceptable - whether its filled or not
 */
const reject = (board: TsngoBoard) => {
  return !board.isValid();
};

/**
 * Return true if the board is completely solved
 */
const accept = (board: TsngoBoard) => {
  if (!board.isFilled()) {
    return false;
  }
  return board.isValid();
};

/**
 * Naive backtrack algorithm. No heuristics applied yet it is fast enough to solve the puzzle
 */

export const backtrack = (board: TsngoBoard): TsngoBoard | undefined => {
  if (reject(board)) {
    return undefined;
  }

  if (accept(board)) {
    return board;
  }

  const nextCellCoordinates = getPossibleMoves(board);
  if (!nextCellCoordinates) {
    return undefined;
  }

  for (const tryValue of [-1, 1] as TsngoCellNonEmptyValue[]) {
    const nextBoard = board.clone();
    nextBoard.set(...nextCellCoordinates, tryValue);
    const solution = backtrack(nextBoard);
    if (solution) return solution;
  }
  return undefined;
};
