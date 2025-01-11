import { TsngoBoard } from "../tsngo-board";
import { TSNGO_GRID_SIZE, TsngoCellNonEmptyValue } from "../types";
import {
  equalNumberOfPatternsInRow,
  noThreeConsecutivePatterns,
} from "./validator";

const createMockBoard = (
  fillValues: [i: number, j: number, value: TsngoCellNonEmptyValue][] = []
) => {
  const board = new TsngoBoard();
  fillValues.forEach(([i, j, value]) => board.set(i, j, value));
  return board;
};
describe("Validator", () => {
  describe("noThreeConsecutivePatterns", () => {
    it("should not report violations on 3 consecutive empty cells", () => {
      expect(noThreeConsecutivePatterns(createMockBoard())).toHaveLength(0);
    });
    it("should detect violations on 3 consecutive non-empty cells on a row", () => {
      const mockBoard = createMockBoard([
        [0, 3, 1],
        [0, 4, 1],
        [0, 5, 1],
      ]);
      expect(noThreeConsecutivePatterns(mockBoard)).toHaveLength(3);
    });
  });

  describe("equalNumberOfPatternsInRow", () => {
    it("should not report violations on an empty board", () => {
      expect(equalNumberOfPatternsInRow(createMockBoard())).toHaveLength(0);
    });

    it("should report violations on a row", () => {
      expect(
        equalNumberOfPatternsInRow(
          createMockBoard([
            [2, 0, 1],
            [2, 1, -1],
            [2, 2, 1],
            [2, 3, 1],
            [2, 5, 1],
          ])
        )
      ).toHaveLength(TSNGO_GRID_SIZE);
    });
    it("should report violations on a column", () => {
      expect(
        equalNumberOfPatternsInRow(
          createMockBoard([
            [0, 2, 1],
            [1, 2, -1],
            [2, 2, 1],
            [3, 2, 1],
            [5, 2, 1],
          ])
        )
      ).toHaveLength(TSNGO_GRID_SIZE);
    });
  });
});
