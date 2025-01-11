"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsngo_board_1 = require("./tsngo-board");
describe("tsngo-board", () => {
    let board;
    beforeEach(() => {
        board = new tsngo_board_1.TsngoBoard();
    });
    describe("set", () => {
        it("allows setting valid values (-1, 0, 1)", () => {
            board.set(0, 0, -1);
            expect(board.get(0, 0).value).toBe(-1);
            board.set(0, 0, 0);
            expect(board.get(0, 0).value).toBe(0);
            board.set(0, 0, 1);
            expect(board.get(0, 0).value).toBe(1);
        });
        it("throws an error when setting an invalid value", () => {
            expect(() => board.set(0, 0, 2)).toThrow();
            expect(() => board.set(0, 0, 42)).toThrow();
        });
    });
});
