"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizeBoard = void 0;
const chalk_1 = __importDefault(require("chalk"));
const types_1 = require("../types");
const range_1 = require("./range");
const renderCell = (i, j, cell, options) => {
    var _a, _b;
    let painter = chalk_1.default.white;
    if (cell.value === 1) {
        painter = chalk_1.default.red;
    }
    if (cell.value === -1) {
        painter = chalk_1.default.blue;
    }
    const isDefaultCell = (_a = options === null || options === void 0 ? void 0 : options.defaultCells) === null || _a === void 0 ? void 0 : _a.find((defaultCell) => defaultCell[0] === i && defaultCell[1] === j);
    const underCursor = (options === null || options === void 0 ? void 0 : options.cursor) && options.cursor[0] === i && options.cursor[1] === j;
    const ruleViolated = !!((_b = options === null || options === void 0 ? void 0 : options.ruleViolations) === null || _b === void 0 ? void 0 : _b.find((violation) => violation[0] === i && violation[1] === j));
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
const createHorizontalLine = (decorations = {}) => (0, range_1.range)(types_1.TSNGO_GRID_SIZE)
    .map((_, i) => { var _a; return `--${(_a = decorations[i]) !== null && _a !== void 0 ? _a : "-"}-`; })
    .join("") + "-\n";
const renderRow = (i, board, options) => {
    var _a;
    let rowString = "|";
    for (let j = 0; j < types_1.TSNGO_GRID_SIZE; j++) {
        const rowConstraint = board
            .getConstraintsAt(i, j)
            .find((constraint) => constraint.direction === "row");
        rowString += renderCell(i, j, board.get(i, j), options);
        rowString += (_a = rowConstraint === null || rowConstraint === void 0 ? void 0 : rowConstraint.toString()) !== null && _a !== void 0 ? _a : "|";
    }
    return rowString + "\n";
};
const visualizeBoard = (board, options = {}) => {
    const renderColumnDecorations = (i) => {
        const constraintsAtColumn = board
            .getConstraints()
            .filter((constraint) => constraint.i === i && constraint.direction === "col");
        return Object.fromEntries(constraintsAtColumn.map((constraint) => [
            constraint.j,
            constraint.toString(),
        ]));
    };
    let result = createHorizontalLine();
    for (let i = 0; i < types_1.TSNGO_GRID_SIZE; i++) {
        result += renderRow(i, board, options);
        const columnDecorations = renderColumnDecorations(i);
        result += createHorizontalLine(columnDecorations);
    }
    return result;
};
exports.visualizeBoard = visualizeBoard;
