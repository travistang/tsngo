"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsngoCell = void 0;
class TsngoCell {
    constructor(defaultValue = 0) {
        this.value = defaultValue;
    }
    toggle() {
        this.value += 1;
        if (this.value > 1) {
            this.value = -1;
        }
    }
    isFilled() {
        return this.value !== 0;
    }
    toString() {
        switch (this.value) {
            case 1:
                return "T";
            case 0:
                return " ";
            case -1:
                return "S";
        }
    }
}
exports.TsngoCell = TsngoCell;
