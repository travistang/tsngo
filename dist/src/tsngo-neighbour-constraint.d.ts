import { TsngoBoard } from "./tsngo-board";
export declare class TsngoNeighbourConstraint {
    i: number;
    j: number;
    type: "equal" | "not-equal";
    direction: "col" | "row";
    constructor(i: number, j: number, type: "equal" | "not-equal", direction: "col" | "row");
    hash(): string;
    coordinates(): [number, number];
    adjacentCoordinates(): [number, number];
    satisfyConstraint(board: TsngoBoard): boolean;
    isValid(): boolean;
    static randomConstraint(): TsngoNeighbourConstraint;
    toString(): "=" | "x";
    clone(): TsngoNeighbourConstraint;
}
//# sourceMappingURL=tsngo-neighbour-constraint.d.ts.map