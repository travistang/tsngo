"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsngo_1 = require("./tsngo");
jest.mock("./utils/random-board", () => {
    // Tango #96
    const { TsngoBoard } = require("./tsngo-board");
    const { TsngoNeighbourConstraint } = require("./tsngo-neighbour-constraint");
    const board = new TsngoBoard();
    board.set(1, 4, 1);
    board.set(2, 3, -1);
    board.set(2, 4, -1);
    board.set(3, 1, -1);
    board.set(3, 2, 1);
    board.set(4, 1, 1);
    board.addNeighbourConstraint(new TsngoNeighbourConstraint(0, 3, "equal", "row"));
    board.addNeighbourConstraint(new TsngoNeighbourConstraint(0, 4, "not-equal", "row"));
    board.addNeighbourConstraint(new TsngoNeighbourConstraint(1, 0, "equal", "col"));
    board.addNeighbourConstraint(new TsngoNeighbourConstraint(3, 5, "equal", "col"));
    board.addNeighbourConstraint(new TsngoNeighbourConstraint(5, 0, "equal", "row"));
    board.addNeighbourConstraint(new TsngoNeighbourConstraint(5, 1, "not-equal", "row"));
    return {
        getRandomBoard: jest.fn().mockReturnValue(board),
    };
});
describe("tsngo-board", () => {
    let game;
    beforeEach(() => {
        game = new tsngo_1.Tsngo();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    it("should initialize the game correctly", () => {
        game.initialize();
        expect(game.solution.isValid()).toBe(true);
        expect(game.solution.isFilled()).toBe(true);
    });
});
