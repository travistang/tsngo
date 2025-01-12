# Concept

Tango is a board game on a 6 x 6 grid. Each of the cells contain either _a sun_, _a moon_, or nothing. The goal of the game is to fill up all the cells while complying all of the following constraints:

1.  There are equal number of suns and moons in each row and column - so 3 suns and 3 moons.
2.  No more than 2 consecutive cells (along a row or a column. Diagonal doesn't count) can contain the same type of thing.
3.  There are constraints between two adjacent cells (horizontally or vertically) that specifies whether the thing on both of them should be the same kind or not and all of them must be fulfilled.

In _Tsngo_, a sun is represented as "1" and a moon is represented as "-1", whilst an empty cell is represented as "0" (p.s. the values can be swapped, it doesn't really matter.). Each "cell" is represented by a `TsngoCell` instance. This instance only concerns about the "thing" (or lack of) on it and nothing else.

The grid itself is represented by a `TsngoBoard` instance, which holds a 2D list of `TsngoCell` references, as well as a bunch of methods that help describing the status of these cells. Such as:

- If the boards are filled (i.e. no empty cells)
- If the boards are valid (more on this later)
- If the thing on the cell given a coordinate is a sun or a moon.
- ...

The `TsngoBoard` class also provides access to the contents of each cell with methods like `get`, `set`, `getCoordinatesWithValue`, `unfilledCells` etc. It also contains all the adjacent cell constraints, which are described by `TsngoNeighbourConstraint` class, as well as methods related to their query like `getNeighbourConstraints`, `addNeighbourConstraint`.

Finally, there's a main `Tsngo` class, which encapsulates the complete game mechanics. It consists of 3 boards: `initialBoard`, `board`, and `solution`.

- `initialBoard` contains the initial state of the board and will not be changed throughout the game.
- `board` is the one that the player sees and interacts with.
- `solution` is, of course, the board containing the solution.

When a `Tsngo` is instantiated. All boards are empty and you must call `initialize` to populate them. The method places random things and constraints on a board, copies the content to its `initialBoard` and `board` and compute a solution with backtracking. The solution will then be assigned to the `solution` board. If a solution cannot be found (rare but happens), then the method it invokes itself again until it finds a random board with solution.

User is supposed to interact with the game via `Tsngo`'s `select` and `undo` method. `select` method allows the user to "select" a cell given the coordinates, and the effect would be exactly the same as the original game: first "select" will place a sun on an empty cell; second will swap it to a moon and third one will make it empty. Selecting it one more time will make the cell placed with a sun again and so on. `Tsngo` will collect a `TsngoHistory` to its own `histories` list inside each `select`. Each `TsngoHistory` includes the coordinates of the selected cell as well as the thing on it before the selection happens. This allows the user to `undo` their moves by removing the last history from the game, apply the "original" thing in that history to the corresponding cell.

In the following section I will describe and document each class in detail.
