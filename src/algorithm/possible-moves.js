"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPossibleMoves = void 0;
const getPossibleMoves = (board) => {
    const unfilledCellCoordinates = board.unfilledCells();
    if (unfilledCellCoordinates.length === 0) {
        return null;
    }
    return unfilledCellCoordinates[0];
};
exports.getPossibleMoves = getPossibleMoves;
