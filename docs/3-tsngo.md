# `Tsngo` class

`Tsngo` class serves as the encapsulation of the entire game logic, whose mechanism are described in the [concepts chapter](./2-concepts.md). It exposes the following methods:

### initialize()

Initializes the game by: 1. Randomly generating a valid initial board. 2. Copying the state to initialBoard and board. 3. Computing the solution using backtracking.

If a solution cannot be found, the method retries until a valid configuration is generated.

### select(x: number, y: number)

Toggles the state of the cell at (x, y):
`Empty -> Sun -> Moon -> Empty (cyclic order).`

Adds the change to the histories list for tracking purposes.

### undo()

Reverts the last move made by the player using the histories list. This does nothing if there isn't anything to undo.

### isValid(): boolean

Checks whether the current board state satisfies all game rules and constraints.

_note_: an incomplete board (containing cells without things) can be (and often is) valid. It only validates if any game rules are violated given a board and will not check for its completion.

### isFilled(): boolean

Determines whether all cells on the board are filled.

_note_: It only checks if there are NO empty cells on the `board`, it does not imply that its _valid_.

### solved(): boolean

Determines whether the board is _solved_, which means when the board is _valid_ and _filled_.

Note that it does not involve comparing the board's value against its own solution because I found that sometimes there can be multiple solutions to a random board. This may be improved in the future.

### reset()

Resets the current `board` to its `initial state` by copying the content of `initialBoard` to `board`. This will _not_ create a new puzzle nor wiping out the `solution`. If you want a new puzzle, call `initialize()` again instead.

### get(x: number, y: number): TsngoCell

Returns the cell at the specified coordinates.

Note: to access the "thing" on the cell given coordinates, do it like `tsngo.get(x, y).value`.

### canUndo(): boolean

Return `true` if `histories` stack is not empty. `false` otherwise.
