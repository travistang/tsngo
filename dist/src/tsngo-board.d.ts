import { TsngoCell } from "./tsngo-cell";
import { TsngoNeighbourConstraint } from "./tsngo-neighbour-constraint";
import { TsngoCellValue } from "./types";
export declare class TsngoBoard {
    cells: TsngoCell[][];
    neighbourConstraints: Record<string, TsngoNeighbourConstraint>;
    constructor();
    clone(): TsngoBoard;
    get(i: number, j: number): TsngoCell;
    set(i: number, j: number, value: TsngoCellValue): void;
    setAs(another: TsngoBoard): void;
    equals(another: TsngoBoard): boolean;
    reset(): void;
    isFilled(): boolean;
    place(i: number, j: number): void;
    ruleViolations(): [number, number][];
    isValid(): boolean;
    addNeighbourConstraint(constraint: TsngoNeighbourConstraint): void;
    getConstraints(): TsngoNeighbourConstraint[];
    getConstraintsAt(x: number, y: number): TsngoNeighbourConstraint[];
    getCoordinatesWithValue(value: TsngoCellValue): [number, number][];
    unfilledCells(): [number, number][];
    toString(): string;
}
//# sourceMappingURL=tsngo-board.d.ts.map