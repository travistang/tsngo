"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsngoNeighbourConstraint = void 0;
const types_1 = require("./types");
const rand_int_1 = require("./utils/rand-int");
class TsngoNeighbourConstraint {
    constructor(i, j, type, direction) {
        this.i = i;
        this.j = j;
        this.type = type;
        this.direction = direction;
    }
    hash() {
        return `${this.i}-${this.j}-${this.direction}`;
    }
    coordinates() {
        return [this.i, this.j];
    }
    adjacentCoordinates() {
        if (this.direction === "col") {
            return [this.i + 1, this.j];
        }
        return [this.i, this.j + 1];
    }
    satisfyConstraint(board) {
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
        if (i < 0 || i >= types_1.TSNGO_GRID_SIZE || !Number.isInteger(i)) {
            return false;
        }
        if (j < 0 || j >= types_1.TSNGO_GRID_SIZE || !Number.isInteger(j)) {
            return false;
        }
        if (i === types_1.TSNGO_GRID_SIZE - 1 && direction === "col") {
            return false;
        }
        if (j === types_1.TSNGO_GRID_SIZE - 1 && direction === "row") {
            return false;
        }
        return true;
    }
    static randomConstraint() {
        const randomType = (0, rand_int_1.randInt)(2) === 0 ? "equal" : "not-equal";
        const randomDirection = (0, rand_int_1.randInt)(2) === 0 ? "col" : "row";
        let i = (0, rand_int_1.randInt)(types_1.TSNGO_GRID_SIZE);
        let j = (0, rand_int_1.randInt)(types_1.TSNGO_GRID_SIZE);
        let constraint = new TsngoNeighbourConstraint(i, j, randomType, randomDirection);
        if (!constraint.isValid()) {
            return this.randomConstraint();
        }
        return constraint;
    }
    toString() {
        return this.type === "equal" ? "=" : "x";
    }
    clone() {
        return new TsngoNeighbourConstraint(this.i, this.j, this.type, this.direction);
    }
}
exports.TsngoNeighbourConstraint = TsngoNeighbourConstraint;
