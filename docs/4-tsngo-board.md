# TsngoBoard class

A `TsngoBoard` class contains all the cells on the board and the neighbouring constraints. It provides methods to manipulate them and visualizing them.

## Cell-related methods

### get(i: number, j: number): TsngoCell

Get the cell at the given coordinates.

### set(i: number, j: number, value: TsngoCellValue)

Set the value of the cell at the coordinates. If the value is not one of `-1`, `0` or `1`, this method _will throw_.

### place(i: number, j: number)

Toggle the value of the cell at the coordinates at the following order:
`Empty (0) -> Sun (1) -> Moon (-1) -> Empty (0) -> ...`

## Board-level methods

The following methods concern about interactions between boards and can affect all cell values at once.

### clone(): TsngoBoard

Create a deep copy of this board by copying all cells (and their values) and constraints. Any changes made to a clone will not affect the original board.

### setAs(another: TsngoBoard)

Copy all values of the cells and constraints of another board to this board.

### equals(another: TsngoBoard): boolean

Check if all the cell values of the board are equal. _note_: this does NOT check if the constraints are equal.

### reset()

Remove all things on this board. Constraints are kept. Note that this is different from `tsngo.reset()`, which does not wipe out everything on the board.

### isFilled(): boolean

Check if all cells are filled

### getCoordinatesWithValue(value: TsngoCellValue): [number, number][]

Get list of coordinates on which the cell contains the provided value.

### unfilledCells(): [number, number][]

Get list of coordinates containing an empty cell. This is the same as `getCoordinatesWithValue(0)`

## Constraint-related methods

### getConstraints(): TsngoNeighbourConstraint[]

Return list of neighbour constraints added to this board.

### getConstraintsAt(x: number, y: number): TsngoNeighbourConstraint[]

Return list of constraints imposed on a cell. Note that there can be 0, 1 or 2 constraints returned from this method since a cell can be attributed to a "row" constraint and a "column" constraint.

### addNeighbourConstraint(constraint: TsngoNeighbourConstraint)

Add a given constraint to this board. An existing constraint conflicting with the new one will be replaced.

Constraint conflicts another when they:

- Have the same coordinates
- Have the same direction (row / column)

## Rule-related methods

### ruleViolations(): RuleViolation

Return all cells that violates one or more game rules in the board. a `RuleViolation` is essentially `[number, number][]`, which means its just a list of coordinates.

### isValid(): boolean

Returns `true` if there are no violations on the board and `false` otherwise. Equivalent to `board.ruleViolations().length === 0`
