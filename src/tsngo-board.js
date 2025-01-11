"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsngoBoard = void 0;
const tsngo_cell_1 = require("./tsngo-cell");
const types_1 = require("./types");
const visualize_board_1 = require("./utils/visualize-board");
const validator_1 = require("./validator/validator");
class TsngoBoard {
    constructor() {
        this.neighbourConstraints = {};
        this.cells = [];
        for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
            const row = [];
            for (let j = 0; j < types_1.TSNGO_GRID_SIZE; j++) {
                row.push(new tsngo_cell_1.TsngoCell());
            }
            this.cells.push(row);
        }
    }
    clone() {
        const newBoard = new TsngoBoard();
        newBoard.setAs(this);
        return newBoard;
    }
    get(i, j) {
        return this.cells[i][j];
    }
    set(i, j, value) {
        if (!types_1.POSSIBLE_TSNGO_CELL_VALUES.includes(value)) {
            throw new Error(`Invalid value: ${value}`);
        }
        this.cells[i][j].value = value;
    }
    setAs(another) {
        for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
            for (let j = 0; j < types_1.TSNGO_GRID_SIZE; j++) {
                this.set(i, j, another.get(i, j).value);
            }
        }
        this.neighbourConstraints = {};
        another
            .getConstraints()
            .forEach((constraint) => this.addNeighbourConstraint(constraint.clone()));
    }
    equals(another) {
        for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
            for (let j = 0; j < types_1.TSNGO_GRID_SIZE; j++) {
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
    place(i, j) {
        this.cells[i][j].toggle();
    }
    ruleViolations() {
        return (0, validator_1.detectViolations)(this);
    }
    isValid() {
        return this.ruleViolations().length === 0;
    }
    addNeighbourConstraint(constraint) {
        if (!constraint.isValid()) {
            throw new Error("Attempting to add invalid constraint");
        }
        this.neighbourConstraints[constraint.hash()] = constraint;
    }
    getConstraints() {
        return Object.values(this.neighbourConstraints);
    }
    getConstraintsAt(x, y) {
        return this.getConstraints().filter(({ i, j }) => i === x && j === y);
    }
    getCoordinatesWithValue(value) {
        const results = [];
        for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
            for (let j = 0; j < types_1.TSNGO_GRID_SIZE; j++) {
                if (this.cells[i][j].value === value) {
                    results.push([i, j]);
                }
            }
        }
        return results;
    }
    unfilledCells() {
        return this.getCoordinatesWithValue(0);
    }
    toString() {
        return (0, visualize_board_1.visualizeBoard)(this);
    }
}
exports.TsngoBoard = TsngoBoard;
