import { TsngoBoard } from "../tsngo-board";
import { TsngoNeighbourConstraint } from "../tsngo-neighbour-constraint";
import { TSNGO_GRID_COUNT } from "../types";
import { chooseN } from "./choose-n";
import { range } from "./range";
import { to2DIndices } from "./to-2d-indices";

export const getRandomBoard = (
  numFilled: number = TSNGO_GRID_COUNT,
  numConstraints = 0
): TsngoBoard => {
  const randomBoard = new TsngoBoard();
  const numOnes = Math.round(numFilled / 2);
  const indicesForOnes = chooseN(TSNGO_GRID_COUNT, numOnes);
  const indicesForMinusOnes = chooseN(
    TSNGO_GRID_COUNT,
    numFilled - numOnes,
    indicesForOnes
  );
  indicesForOnes.forEach((flatIndex) => {
    randomBoard.set(...to2DIndices(flatIndex), 1);
  });
  indicesForMinusOnes.forEach((flatIndex) => {
    randomBoard.set(...to2DIndices(flatIndex), -1);
  });

  range(numConstraints).forEach(() => {
    randomBoard.addNeighbourConstraint(
      TsngoNeighbourConstraint.randomConstraint()
    );
  });
  return randomBoard;
};
