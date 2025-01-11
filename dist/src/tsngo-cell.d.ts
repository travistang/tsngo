import { TsngoCellValue } from "./types";
export declare class TsngoCell {
    value: TsngoCellValue;
    constructor(defaultValue?: TsngoCellValue);
    toggle(): void;
    isFilled(): boolean;
    toString(): "T" | " " | "S";
}
//# sourceMappingURL=tsngo-cell.d.ts.map