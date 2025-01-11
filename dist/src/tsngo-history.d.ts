import { TsngoBoard } from "./tsngo-board";
import { TsngoCellValue } from "./types";
export declare class TsngoHistory {
    i: number;
    j: number;
    previousValue: TsngoCellValue;
    constructor(i: number, j: number, previousValue: TsngoCellValue);
    apply(board: TsngoBoard): void;
}
//# sourceMappingURL=tsngo-history.d.ts.map