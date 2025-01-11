import { TsngoBoard } from "./tsngo-board";
import { TsngoCellValue } from "./types";

describe("tsngo-board", () => {
  let board: TsngoBoard;
  beforeEach(() => {
    board = new TsngoBoard();
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
      expect(() => board.set(0, 0, 2 as TsngoCellValue)).toThrow();
      expect(() => board.set(0, 0, 42 as TsngoCellValue)).toThrow();
    });
  });
});
