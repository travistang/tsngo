"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsngo = void 0;
const backtrack_1 = require("./algorithm/backtrack");
const tsngo_board_1 = require("./tsngo-board");
const tsngo_history_1 = require("./tsngo-history");
const random_board_1 = require("./utils/random-board");
const visualize_board_1 = require("./utils/visualize-board");
/**
 * Main class of the game.
 * It should concern about the game flow. From uninitialized, to game start, to finish (or some conflicts)
 */
class Tsngo {
    constructor() {
        /**
         * board the player initially sees
         **/
        this.initialBoard = new tsngo_board_1.TsngoBoard();
        /**
         * board the player works on
         **/
        this.board = new tsngo_board_1.TsngoBoard();
        /**
         * board with the solution
         **/
        this.solution = new tsngo_board_1.TsngoBoard();
        /**
         * Move history by the player
         **/
        this.histories = [];
    }
    /**
     * First find a valid, incomplete random board to start with (becomes the puzzle itself).
     * Then backtrack to get the solution.
     * Then set the solution
     */
    initialize() {
        let randomBoard = (0, random_board_1.getRandomBoard)(10, 6);
        while (!randomBoard.isValid()) {
            randomBoard = (0, random_board_1.getRandomBoard)(10, 6);
        }
        this.initialBoard = randomBoard.clone();
        this.board = randomBoard.clone();
        const backtrackedSolution = (0, backtrack_1.backtrack)(randomBoard.clone());
        if (!backtrackedSolution) {
            return this.initialize();
        }
        this.solution = backtrackedSolution.clone();
    }
    solved() {
        return this.solution.isFilled() && this.board.equals(this.solution);
    }
    select(i, j) {
        if (this.initialBoard.get(i, j).value !== 0) {
            return;
        }
        this.histories.push(new tsngo_history_1.TsngoHistory(i, j, this.board.get(i, j).value));
        this.board.place(i, j);
    }
    isValid() {
        return this.board.isValid();
    }
    undo() {
        const history = this.histories.pop();
        if (!history)
            return;
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
        return (0, visualize_board_1.visualizeBoard)(this.board, { defaultCells });
    }
}
exports.Tsngo = Tsngo;
