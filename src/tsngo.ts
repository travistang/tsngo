import { backtrack } from "./algorithm/backtrack";
import { TsngoBoard } from "./tsngo-board";
import { TsngoHistory } from "./tsngo-history";
import { getRandomBoard } from "./utils/random-board";
import { visualizeBoard } from "./utils/visualize-board";

/**
 * Main class of the game.
 * It should concern about the game flow. From uninitialized, to game start, to finish (or some conflicts)
 */
export class Tsngo {
  /**
   * board the player initially sees
   **/
  initialBoard = new TsngoBoard();
  /**
   * board the player works on
   **/
  board = new TsngoBoard();
  /**
   * board with the solution
   **/
  solution = new TsngoBoard();
  /**
   * Move history by the player
   **/
  histories: TsngoHistory[] = [];

  /**
   * First find a valid, incomplete random board to start with (becomes the puzzle itself).
   * Then backtrack to get the solution.
   * Then set the solution
   */
  initialize(): void {
    let randomBoard = getRandomBoard(10, 6);
    while (!randomBoard.isValid()) {
      randomBoard = getRandomBoard(10, 6);
    }
    this.initialBoard = randomBoard.clone();
    this.board = randomBoard.clone();

    const backtrackedSolution = backtrack(randomBoard.clone());
    if (!backtrackedSolution) {
      return this.initialize();
    }
    this.solution = backtrackedSolution.clone();
  }

  solved() {
    return this.board.isFilled() && this.board.isValid();
  }

  select(i: number, j: number) {
    if (this.initialBoard.get(i, j).value !== 0) {
      return;
    }

    this.histories.push(new TsngoHistory(i, j, this.board.get(i, j).value));
    this.board.place(i, j);
  }

  isValid() {
    return this.board.isValid();
  }

  undo() {
    const history = this.histories.pop();
    if (!history) return;
    history.apply(this.board);
  }

  canUndo() {
    return this.histories.length > 0;
  }

  reset() {
    this.board = this.initialBoard.clone();
    this.histories = [];
  }

  toString() {
    const defaultCells = [
      ...this.initialBoard.getCoordinatesWithValue(-1),
      ...this.initialBoard.getCoordinatesWithValue(1),
    ];
    return visualizeBoard(this.board, { defaultCells });
  }
}
