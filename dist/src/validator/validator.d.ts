import { TsngoBoard } from "../tsngo-board";
type RuleViolation = [number, number][];
type Rule = (board: TsngoBoard) => RuleViolation;
export declare const noThreeConsecutivePatterns: Rule;
export declare const equalNumberOfPatternsInRow: Rule;
export declare const areNeighbourConstraintsSatisfied: Rule;
export declare const detectViolations: (board: TsngoBoard) => RuleViolation;
export {};
//# sourceMappingURL=validator.d.ts.map