# TsngoNeighbourConstraint class

A `TsngoNeighbourConstraint` represents a neighbouring constraint (or simply _constraint_) in the game. A _constraint_ specifies whether 2 adjacent cells (along a row or a column) should have equal or distinct values.

In `Tsngo`, a constraint is attached to a particular coordinates having a `direction` and a `type`. Its direction can be either `row` or `column`. A constraint with `row` direction constrains the cell with the same coordinates and the one to its _right_, whereas a `column` constraint constraints the cell _below_ it. For example, if a `row` constraint is attached to `[2, 3]`, then it will constrain `[2, 3]` and `[2, 4]`; If its a `column` constraint, then it constrains `[2, 3]` and `[3, 3]`.

As a result, a `row` constraint on the last column will be _invalid_ because there are no cells to its _right_. Similarly a `column` constraint on the last row will also be invalid because there are no cells _below_ it.

Two constraints _conflict_ each other if they are attached to the same coordinates and have the same directions.

It has the following list of methods:

### new TsngoNeighbourConstraint(i: number, j: number, type: 'equal' | 'not-equal', direction: 'col' | 'row)

Constructor of this class. `i` `j` jointly defines the coordinates it attaches to. `type` specifies the constraint `type` (whether the things on the constrained cells should be equal or not) and `direction` specifies the direction.

### coordinates(): [number, number]

Return the coordinates it attaches to.

### adjacentCoordinates(): [number, number]

Return the coordinates of the other cell it constrains. If its attached to `[i, j]` and is a `row` constraint, then it returns `[i, j + 1]`, otherwise `[i + 1, j]`.

### satisfyConstraint(board: TsngoBoard): boolean

Return `true` if the values of a `TsngoBoard` satisfy this constraint. `false` otherwise.

### isValid(): boolean

Return `true` if the constraint is _valid_ and `false` otherwise. See the paragraph above for the definition of an _invalid_ constraint.

### clone(): TsngoNeighbourConstraint

Create a deep copy of itself.

### hash(): string

Create a hash using the constraint's coordinates and direction. This is useful for quickly determining the conflicting constraint on a board as they will have the same hash. All constraints stored in a `TsngoBoard` are kept in a dictionary with their hash as key. As a result adding a new constraint to a board will effectively replacing the old conflicting one.

### static randomConstraint(): TsngoNeighbourConstraint

Create a random and _valid_ constraint.
