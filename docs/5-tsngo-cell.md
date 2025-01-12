# `TsngoCell` class

A `TsngoCell` represent a "cell" on the board which concerns nothing but the _things_ (sun, moon, empty) on itself. Making it relatively simple.

It only has a few methods:

### toggle()

Rotate values on the board like

`0 -> 1 -> -1 -> 0 -> 1 -> -1 -> ...`

### isFilled()

Return `true` if there are _things_ on this cell. Equivalent to `cell.value !== 0`
