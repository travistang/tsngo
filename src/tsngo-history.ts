import { TsngoBoard } from "./tsngo-board";
import { TsngoCellValue } from "./types";

export class TsngoHistory {
  constructor(
    public i: number,
    public j: number,
    public previousValue: TsngoCellValue
  ) {}

  apply(board: TsngoBoard) {
    board.set(this.i, this.j, this.previousValue);
  }
}
