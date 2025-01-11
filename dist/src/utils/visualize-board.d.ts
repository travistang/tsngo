import { TsngoBoard } from "../tsngo-board";
type VisualizeOptions = {
    defaultCells?: [number, number][];
    cursor?: [number, number];
    ruleViolations?: [number, number][];
};
export declare const visualizeBoard: (board: TsngoBoard, options?: VisualizeOptions) => string;
export {};
//# sourceMappingURL=visualize-board.d.ts.map