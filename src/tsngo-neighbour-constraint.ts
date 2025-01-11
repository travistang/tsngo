import { TsngoBoard } from "./tsngo-board";
import { TSNGO_GRID_SIZE } from "./types";
import { randInt } from "./utils/rand-int";

export class TsngoNeighbourConstraint {
  constructor(
    public i: number,
    public j: number,
    public type: "equal" | "not-equal",
    public direction: "col" | "row"
  ) {}

  hash() {
    return `${this.i}-${this.j}-${this.direction}`;
  }

  coordinates(): [number, number] {
    return [this.i, this.j];
  }

  adjacentCoordinates(): [number, number] {
    if (this.direction === "col") {
      return [this.i + 1, this.j];
    }
    return [this.i, this.j + 1];
  }
  satisfyConstraint(board: TsngoBoard) {
    const firstValue = board.get(this.i, this.j).value;
    const secondValue = board.get(...this.adjacentCoordinates()).value;

    if (firstValue === 0 || secondValue === 0) {
      return true;
    }

    return this.type === "equal"
      ? firstValue === secondValue
      : firstValue !== secondValue;
  }

  isValid() {
    const { i, j, direction } = this;
    if (i < 0 || i >= TSNGO_GRID_SIZE || !Number.isInteger(i)) {
      return false;
    }
    if (j < 0 || j >= TSNGO_GRID_SIZE || !Number.isInteger(j)) {
      return false;
    }

    if (i === TSNGO_GRID_SIZE - 1 && direction === "col") {
      return false;
    }
    if (j === TSNGO_GRID_SIZE - 1 && direction === "row") {
      return false;
    }

    return true;
  }

  static randomConstraint(): TsngoNeighbourConstraint {
    const randomType = randInt(2) === 0 ? "equal" : "not-equal";
    const randomDirection = randInt(2) === 0 ? "col" : "row";

    let i = randInt(TSNGO_GRID_SIZE);
    let j = randInt(TSNGO_GRID_SIZE);
    let constraint = new TsngoNeighbourConstraint(
      i,
      j,
      randomType,
      randomDirection
    );
    if (!constraint.isValid()) {
      return this.randomConstraint();
    }
    return constraint;
  }

  toString() {
    return this.type === "equal" ? "=" : "x";
  }

  clone() {
    return new TsngoNeighbourConstraint(
      this.i,
      this.j,
      this.type,
      this.direction
    );
  }
}
