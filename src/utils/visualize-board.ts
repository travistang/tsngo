import chalk from "chalk";
import { TsngoBoard } from "../tsngo-board";
import { TsngoCell } from "../tsngo-cell";
import { TSNGO_GRID_SIZE } from "../types";
import { range } from "./range";

type VisualizeOptions = {
  defaultCells?: [number, number][];
  cursor?: [number, number];
  ruleViolations?: [number, number][];
};
const renderCell = (
  i: number,
  j: number,
  cell: TsngoCell,
  options?: VisualizeOptions
) => {
  let painter = chalk.white;
  if (cell.value === 1) {
    painter = chalk.red;
  }
  if (cell.value === -1) {
    painter = chalk.blue;
  }
  const isDefaultCell = options?.defaultCells?.find(
    (defaultCell) => defaultCell[0] === i && defaultCell[1] === j
  );
  const underCursor =
    options?.cursor && options.cursor[0] === i && options.cursor[1] === j;
  const ruleViolated = !!options?.ruleViolations?.find(
    (violation) => violation[0] === i && violation[1] === j
  );

  if (isDefaultCell) {
    painter = underCursor ? painter.bgWhite : painter.bgGray;
  }

  if (ruleViolated) {
    painter = painter.bgRedBright.white;
  }

  if (underCursor) {
    painter = painter.bgYellow;
  }
  const baseString = ` ${cell.toString()} `;
  return painter(baseString);
};
const createHorizontalLine = (decorations: Record<number, string> = {}) =>
  range(TSNGO_GRID_SIZE)
    .map((_, i) => `--${decorations[i] ?? "-"}-`)
    .join("") + "-\n";

const renderRow = (
  i: number,
  board: TsngoBoard,
  options?: VisualizeOptions
) => {
  let rowString = "|";
  for (let j = 0; j < TSNGO_GRID_SIZE; j++) {
    const rowConstraint = board
      .getConstraintsAt(i, j)
      .find((constraint) => constraint.direction === "row");

    rowString += renderCell(i, j, board.get(i, j), options);
    rowString += rowConstraint?.toString() ?? "|";
  }
  return rowString + "\n";
};
export const visualizeBoard = (
  board: TsngoBoard,
  options: VisualizeOptions = {}
) => {
  const renderColumnDecorations = (i: number) => {
    const constraintsAtColumn = board
      .getConstraints()
      .filter(
        (constraint) => constraint.i === i && constraint.direction === "col"
      );
    return Object.fromEntries(
      constraintsAtColumn.map((constraint) => [
        constraint.j,
        constraint.toString(),
      ])
    );
  };

  let result = createHorizontalLine();
  for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
    result += renderRow(i, board, options);
    const columnDecorations = renderColumnDecorations(i);
    result += createHorizontalLine(columnDecorations);
  }

  return result;
};
