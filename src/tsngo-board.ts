import { TsngoCell } from "./tsngo-cell";
import { TsngoNeighbourConstraint } from "./tsngo-neighbour-constraint";
import {
  POSSIBLE_TSNGO_CELL_VALUES,
  TSNGO_GRID_SIZE,
  TsngoCellValue,
} from "./types";
import { visualizeBoard } from "./utils/visualize-board";
import { detectViolations } from "./validator/validator";

export class TsngoBoard {
  cells: TsngoCell[][];
  neighbourConstraints: Record<string, TsngoNeighbourConstraint> = {};

  constructor() {
    this.cells = [];
    for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
      const row: TsngoCell[] = [];
      for (let j = 0; j < TSNGO_GRID_SIZE; j++) {
        row.push(new TsngoCell());
      }
      this.cells.push(row);
    }
  }

  clone(): TsngoBoard {
    const newBoard = new TsngoBoard();
    newBoard.setAs(this);
    return newBoard;
  }

  get(i: number, j: number) {
    return this.cells[i][j];
  }
  set(i: number, j: number, value: TsngoCellValue) {
    if (!POSSIBLE_TSNGO_CELL_VALUES.includes(value)) {
      throw new Error(`Invalid value: ${value}`);
    }
    this.cells[i][j].value = value;
  }

  setAs(another: TsngoBoard) {
    for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
      for (let j = 0; j < TSNGO_GRID_SIZE; j++) {
        this.set(i, j, another.get(i, j).value);
      }
    }

    this.neighbourConstraints = {};
    another
      .getConstraints()
      .forEach((constraint) => this.addNeighbourConstraint(constraint.clone()));
  }

  equals(another: TsngoBoard) {
    for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
      for (let j = 0; j < TSNGO_GRID_SIZE; j++) {
        if (this.cells[i][j].value !== another.cells[i][j].value) {
          return false;
        }
      }
    }
    return true;
  }

  reset() {
    this.cells.flat().forEach((cell) => (cell.value = 0));
  }

  isFilled() {
    return this.cells.flat().every((cell) => cell.isFilled());
  }

  place(i: number, j: number) {
    this.cells[i][j].toggle();
  }

  ruleViolations() {
    return detectViolations(this);
  }

  isValid() {
    return this.ruleViolations().length === 0;
  }

  addNeighbourConstraint(constraint: TsngoNeighbourConstraint) {
    if (!constraint.isValid()) {
      throw new Error("Attempting to add invalid constraint");
    }
    this.neighbourConstraints[constraint.hash()] = constraint;
  }

  getConstraints(): TsngoNeighbourConstraint[] {
    return Object.values(this.neighbourConstraints);
  }
  getConstraintsAt(x: number, y: number) {
    return this.getConstraints().filter(({ i, j }) => i === x && j === y);
  }

  getCoordinatesWithValue(value: TsngoCellValue): [number, number][] {
    const results: [number, number][] = [];
    for (let i = 0; i < TSNGO_GRID_SIZE; i++) {
      for (let j = 0; j < TSNGO_GRID_SIZE; j++) {
        if (this.cells[i][j].value === value) {
          results.push([i, j]);
        }
      }
    }
    return results;
  }

  unfilledCells(): [number, number][] {
    return this.getCoordinatesWithValue(0);
  }

  toString() {
    return visualizeBoard(this);
  }
}
