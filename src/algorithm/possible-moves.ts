import { TsngoBoard } from "../tsngo-board";

export const getPossibleMoves = (board: TsngoBoard) => {
  const unfilledCellCoordinates = board.unfilledCells();
  if (unfilledCellCoordinates.length === 0) {
    return null;
  }
  return unfilledCellCoordinates[0];
};
