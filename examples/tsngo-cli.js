"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = __importDefault(require("readline"));
const tsngo_1 = require("../src/tsngo");
const types_1 = require("../src/types");
const visualize_board_1 = require("../src/utils/visualize-board");
function showTsngoLogo() {
    console.log(`  _____                      
 |_   _|__ _ __   __ _  ___  
   | |/ __| '_ \ / _\` |/ _ \ 
   | |\__ \ | | | (_| | (_) |
   |_||___/_| |_|\__, |\___/ 
                 |___/  `);
}
function showInstructions() {
    console.log(`
Instructions:
- Use "w" to move up
- Use "a" to move left
- Use "s" to move down
- Use "d" to move right
- Use "space" to toggle cells
- Use "u" to undo your last move
- Press "q" to quit the game
`);
}
class TsngoCliGame {
    constructor() {
        this.cursor = [0, 0];
        this.tsngo = new tsngo_1.Tsngo();
        this.tsngo.initialize();
    }
    move(direction) {
        let [i, j] = [...this.cursor];
        switch (direction) {
            case "a":
                j -= 1;
                break;
            case "d":
                j += 1;
                break;
            case "w":
                i -= 1;
                break;
            case "s":
                i += 1;
                break;
        }
        this.cursor[0] = (i + types_1.TSNGO_GRID_SIZE) % types_1.TSNGO_GRID_SIZE;
        this.cursor[1] = (j + types_1.TSNGO_GRID_SIZE) % types_1.TSNGO_GRID_SIZE;
    }
    handleInput(key) {
        switch (key) {
            case "q": {
                console.log("Alright. Bye!");
                process.exit(0);
            }
            case "w":
            case "a":
            case "s":
            case "d":
                this.move(key);
                break;
            case "u":
                this.tsngo.undo();
                break;
            case " ":
                this.tsngo.select(...this.cursor);
                break;
        }
    }
    render() {
        console.clear();
        showTsngoLogo();
        const defaultCells = [
            ...this.tsngo.initialBoard.getCoordinatesWithValue(-1),
            ...this.tsngo.initialBoard.getCoordinatesWithValue(1),
        ];
        const ruleViolations = this.tsngo.board.ruleViolations();
        console.log((0, visualize_board_1.visualizeBoard)(this.tsngo.board, {
            defaultCells,
            cursor: this.cursor,
            ruleViolations,
        }));
        if (ruleViolations.length > 0) {
            console.log(chalk_1.default.bgRedBright.white(`Some rules are violated!`));
        }
        showInstructions();
    }
    run() {
        readline_1.default.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true);
        }
        process.stdin.on("keypress", (ch, key) => {
            this.handleInput(ch);
            this.render();
            if (this.tsngo.solved()) {
                console.log(chalk_1.default.bgGreen.white("You win!"));
                process.exit(0);
            }
        });
        this.render();
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const game = new TsngoCliGame();
        game.run();
    });
}
main();
