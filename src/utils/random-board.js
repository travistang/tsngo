"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBoard = void 0;
const tsngo_board_1 = require("../tsngo-board");
const tsngo_neighbour_constraint_1 = require("../tsngo-neighbour-constraint");
const types_1 = require("../types");
const choose_n_1 = require("./choose-n");
const range_1 = require("./range");
const to_2d_indices_1 = require("./to-2d-indices");
const getRandomBoard = (numFilled = types_1.TSNGO_GRID_COUNT, numConstraints = 0) => {
    const randomBoard = new tsngo_board_1.TsngoBoard();
    const numOnes = Math.round(numFilled / 2);
    const indicesForOnes = (0, choose_n_1.chooseN)(types_1.TSNGO_GRID_COUNT, numOnes);
    const indicesForMinusOnes = (0, choose_n_1.chooseN)(types_1.TSNGO_GRID_COUNT, numFilled - numOnes, indicesForOnes);
    indicesForOnes.forEach((flatIndex) => {
        randomBoard.set(...(0, to_2d_indices_1.to2DIndices)(flatIndex), 1);
    });
    indicesForMinusOnes.forEach((flatIndex) => {
        randomBoard.set(...(0, to_2d_indices_1.to2DIndices)(flatIndex), -1);
    });
    (0, range_1.range)(numConstraints).forEach(() => {
        randomBoard.addNeighbourConstraint(tsngo_neighbour_constraint_1.TsngoNeighbourConstraint.randomConstraint());
    });
    return randomBoard;
};
exports.getRandomBoard = getRandomBoard;
