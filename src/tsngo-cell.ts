import { TsngoCellValue } from "./types";

export class TsngoCell {
  value: TsngoCellValue;
  constructor(defaultValue: TsngoCellValue = 0) {
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
