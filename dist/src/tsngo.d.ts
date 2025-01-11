import { TsngoBoard } from "./tsngo-board";
import { TsngoHistory } from "./tsngo-history";
/**
 * Main class of the game.
 * It should concern about the game flow. From uninitialized, to game start, to finish (or some conflicts)
 */
export declare class Tsngo {
    /**
     * board the player initially sees
     **/
    initialBoard: TsngoBoard;
    /**
     * board the player works on
     **/
    board: TsngoBoard;
    /**
     * board with the solution
     **/
    solution: TsngoBoard;
    /**
     * Move history by the player
     **/
    histories: TsngoHistory[];
    /**
     * First find a valid, incomplete random board to start with (becomes the puzzle itself).
     * Then backtrack to get the solution.
     * Then set the solution
     */
    initialize(): void;
    solved(): boolean;
    select(i: number, j: number): void;
    isValid(): boolean;
    undo(): void;
    canUndo(): boolean;
    reset(): void;
    toString(): string;
}
//# sourceMappingURL=tsngo.d.ts.map