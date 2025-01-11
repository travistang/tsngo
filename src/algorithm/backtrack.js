"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backtrack = void 0;
const possible_moves_1 = require("./possible-moves");
/**
 * Return true if the board is definitely not acceptable - whether its filled or not
 */
const reject = (board) => {
    return !board.isValid();
};
/**
 * Return true if the board is completely solved
 */
const accept = (board) => {
    if (!board.isFilled()) {
        return false;
    }
    return board.isValid();
};
/**
 * Naive backtrack algorithm. No heuristics applied yet it is fast enough to solve the puzzle
 */
const backtrack = (board) => {
    if (reject(board)) {
        return undefined;
    }
    if (accept(board)) {
        return board;
    }
    const nextCellCoordinates = (0, possible_moves_1.getPossibleMoves)(board);
    if (!nextCellCoordinates) {
        return undefined;
    }
    for (const tryValue of [-1, 1]) {
        const nextBoard = board.clone();
        nextBoard.set(...nextCellCoordinates, tryValue);
        const solution = (0, exports.backtrack)(nextBoard);
        if (solution)
            return solution;
    }
    return undefined;
};
exports.backtrack = backtrack;
