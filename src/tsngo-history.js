"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsngoHistory = void 0;
class TsngoHistory {
    constructor(i, j, previousValue) {
        this.i = i;
        this.j = j;
        this.previousValue = previousValue;
    }
    apply(board) {
        board.set(this.i, this.j, this.previousValue);
    }
}
exports.TsngoHistory = TsngoHistory;
