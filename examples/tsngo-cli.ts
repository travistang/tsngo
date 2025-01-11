import chalk from "chalk";
import readline from "readline";

import { Tsngo } from "../src/tsngo";
import { TSNGO_GRID_SIZE } from "../src/types";
import { visualizeBoard } from "../src/utils/visualize-board";

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
  cursor: [number, number] = [0, 0];
  tsngo = new Tsngo();

  constructor() {
    this.tsngo.initialize();
  }
  move(direction: "w" | "a" | "s" | "d") {
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
    this.cursor[0] = (i + TSNGO_GRID_SIZE) % TSNGO_GRID_SIZE;
    this.cursor[1] = (j + TSNGO_GRID_SIZE) % TSNGO_GRID_SIZE;
  }

  handleInput(key: string) {
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
    console.log(
      visualizeBoard(this.tsngo.board, {
        defaultCells,
        cursor: this.cursor,
        ruleViolations,
      })
    );
    if (ruleViolations.length > 0) {
      console.log(chalk.bgRedBright.white(`Some rules are violated!`));
    }
    showInstructions();
  }
  run() {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.on("keypress", (ch, key) => {
      this.handleInput(ch);
      this.render();

      if (this.tsngo.solved()) {
        console.log(chalk.bgGreen.white("You win!"));
        process.exit(0);
      }
    });
    this.render();
  }
}

async function main() {
  const game = new TsngoCliGame();
  game.run();
}

main();
