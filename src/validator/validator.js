"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectViolations = exports.areNeighbourConstraintsSatisfied = exports.equalNumberOfPatternsInRow = exports.noThreeConsecutivePatterns = void 0;
const types_1 = require("../types");
const range_1 = require("../utils/range");
const remove_duplicates_1 = require("../utils/remove-duplicates");
const noThreeConsecutivePatterns = (board) => {
    const violations = [];
    // check columns
    for (let i = 0; i <= types_1.TSNGO_GRID_SIZE / 2; i++) {
        for (let j = 0; j < types_1.TSNGO_GRID_SIZE; j++) {
            const testValue = board.get(i, j).value;
            if (testValue === 0)
                continue;
            if (board.get(i + 1, j).value === testValue &&
                board.get(i + 2, j).value === testValue) {
                violations.push([i, j], [i + 1, j], [i + 2, j]);
            }
        }
    }
    // check rows
    for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
        for (let j = 0; j <= types_1.TSNGO_GRID_SIZE / 2; j++) {
            const testValue = board.get(i, j).value;
            if (testValue === 0)
                continue;
            if (board.get(i, j + 1).value === testValue &&
                board.get(i, j + 2).value === testValue) {
                violations.push([i, j], [i, j + 1], [i, j + 2]);
            }
        }
    }
    return violations;
};
exports.noThreeConsecutivePatterns = noThreeConsecutivePatterns;
const equalNumberOfPatternsInRow = (board) => {
    const violations = [];
    const hasViolatedRuleOnRowOrCol = (rowOrCol) => {
        return (rowOrCol.filter((value) => value === 1).length > types_1.TSNGO_GRID_SIZE / 2 ||
            rowOrCol.filter((value) => value === -1).length > types_1.TSNGO_GRID_SIZE / 2);
    };
    for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
        // check rows
        const rowIndices = (0, range_1.range)(types_1.TSNGO_GRID_SIZE).map((_, j) => [i, j]);
        const rowCellValues = rowIndices.map(([i, j]) => board.get(i, j).value);
        if (hasViolatedRuleOnRowOrCol(rowCellValues)) {
            violations.push(...rowIndices);
        }
        // check columns
        const colIndices = (0, range_1.range)(types_1.TSNGO_GRID_SIZE).map((_, j) => [j, i]);
        const colCellValues = colIndices.map(([i, j]) => board.get(i, j).value);
        if (hasViolatedRuleOnRowOrCol(colCellValues)) {
            violations.push(...colIndices);
        }
    }
    return violations;
};
exports.equalNumberOfPatternsInRow = equalNumberOfPatternsInRow;
const areNeighbourConstraintsSatisfied = (board) => {
    return board
        .getConstraints()
        .filter((constraint) => !constraint.satisfyConstraint(board))
        .flatMap((constraint) => [
        constraint.coordinates(),
        constraint.adjacentCoordinates(),
    ]);
};
exports.areNeighbourConstraintsSatisfied = areNeighbourConstraintsSatisfied;
const detectViolations = (board) => {
    const violations = [
        ...(0, exports.noThreeConsecutivePatterns)(board),
        ...(0, exports.equalNumberOfPatternsInRow)(board),
        ...(0, exports.areNeighbourConstraintsSatisfied)(board),
    ];
    const uniqueViolations = (0, remove_duplicates_1.removeDuplicates)(violations, ([x, y], [i, j]) => x === i && y === j);
    return uniqueViolations;
};
exports.detectViolations = detectViolations;
