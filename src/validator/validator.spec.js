"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsngo_board_1 = require("../tsngo-board");
const types_1 = require("../types");
const validator_1 = require("./validator");
const createMockBoard = (fillValues = []) => {
    const board = new tsngo_board_1.TsngoBoard();
    fillValues.forEach(([i, j, value]) => board.set(i, j, value));
    return board;
};
describe("Validator", () => {
    describe("noThreeConsecutivePatterns", () => {
        it("should not report violations on 3 consecutive empty cells", () => {
            expect((0, validator_1.noThreeConsecutivePatterns)(createMockBoard())).toHaveLength(0);
        });
        it("should detect violations on 3 consecutive non-empty cells on a row", () => {
            const mockBoard = createMockBoard([
                [0, 3, 1],
                [0, 4, 1],
                [0, 5, 1],
            ]);
            expect((0, validator_1.noThreeConsecutivePatterns)(mockBoard)).toHaveLength(3);
        });
    });
    describe("equalNumberOfPatternsInRow", () => {
        it("should not report violations on an empty board", () => {
            expect((0, validator_1.equalNumberOfPatternsInRow)(createMockBoard())).toHaveLength(0);
        });
        it("should report violations on a row", () => {
            expect((0, validator_1.equalNumberOfPatternsInRow)(createMockBoard([
                [2, 0, 1],
                [2, 1, -1],
                [2, 2, 1],
                [2, 3, 1],
                [2, 5, 1],
            ]))).toHaveLength(types_1.TSNGO_GRID_SIZE);
        });
        it("should report violations on a column", () => {
            expect((0, validator_1.equalNumberOfPatternsInRow)(createMockBoard([
                [0, 2, 1],
                [1, 2, -1],
                [2, 2, 1],
                [3, 2, 1],
                [5, 2, 1],
            ]))).toHaveLength(types_1.TSNGO_GRID_SIZE);
        });
    });
});
