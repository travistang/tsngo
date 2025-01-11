import { TsngoBoard } from "../tsngo-board";
import { TSNGO_GRID_SIZE, TsngoCellValue } from "../types";
import { range } from "../utils/range";
import { removeDuplicates } from "../utils/remove-duplicates";

type RuleViolation = [number, number][];
type Rule = (board: TsngoBoard) => RuleViolation;

export const noThreeConsecutivePatterns: Rule = (board) => {
  const violations: RuleViolation = [];
  // check columns
  for (let i = 0; i <= TSNGO_GRID_SIZE / 2; i++) {
    for (let j = 0; j < TSNGO_GRID_SIZE; j++) {
      const testValue = board.get(i, j).value;
      if (testValue === 0) continue;

      if (
        board.get(i + 1, j).value === testValue &&
        board.get(i + 2, j).value === testValue
      ) {
        violations.push([i, j], [i + 1, j], [i + 2, j]);
      }
    }
  }

  // check rows
  for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
    for (let j = 0; j <= TSNGO_GRID_SIZE / 2; j++) {
      const testValue = board.get(i, j).value;
      if (testValue === 0) continue;

      if (
        board.get(i, j + 1).value === testValue &&
        board.get(i, j + 2).value === testValue
      ) {
        violations.push([i, j], [i, j + 1], [i, j + 2]);
      }
    }
  }
  return violations;
};

export const equalNumberOfPatternsInRow: Rule = (board) => {
  const violations: RuleViolation = [];
  const hasViolatedRuleOnRowOrCol = (rowOrCol: TsngoCellValue[]) => {
    return (
      rowOrCol.filter((value) => value === 1).length > TSNGO_GRID_SIZE / 2 ||
      rowOrCol.filter((value) => value === -1).length > TSNGO_GRID_SIZE / 2
    );
  };

  for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
    // check rows
    const rowIndices = range(TSNGO_GRID_SIZE).map(
      (_, j) => [i, j] as [number, number]
    );
    const rowCellValues = rowIndices.map(([i, j]) => board.get(i, j).value);
    if (hasViolatedRuleOnRowOrCol(rowCellValues)) {
      violations.push(...rowIndices);
    }

    // check columns
    const colIndices = range(TSNGO_GRID_SIZE).map(
      (_, j) => [j, i] as [number, number]
    );
    const colCellValues = colIndices.map(([i, j]) => board.get(i, j).value);
    if (hasViolatedRuleOnRowOrCol(colCellValues)) {
      violations.push(...colIndices);
    }
  }
  return violations;
};

export const areNeighbourConstraintsSatisfied: Rule = (board) => {
  return board
    .getConstraints()
    .filter((constraint) => !constraint.satisfyConstraint(board))
    .flatMap((constraint) => [
      constraint.coordinates(),
      constraint.adjacentCoordinates(),
    ]);
};

export const detectViolations = (board: TsngoBoard): RuleViolation => {
  const violations: RuleViolation = [
    ...noThreeConsecutivePatterns(board),
    ...equalNumberOfPatternsInRow(board),
    ...areNeighbourConstraintsSatisfied(board),
  ];
  const uniqueViolations = removeDuplicates(
    violations,
    ([x, y], [i, j]) => x === i && y === j
  );

  return uniqueViolations;
};
