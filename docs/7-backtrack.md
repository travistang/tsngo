# Backtrack algorithm

The puzzle is solved programmatically during the initialization of a `Tsngo` using a backtracking algorithm. This is done so to make sure that the initial puzzle contains at least one valid solution.

In `Tsngo` the backtracking is done using a naive approach (i.e. without any heuristics):

- If the board is solved, then reports it as the solution.
- If the board is invalid (i.e. rules are violated), reports no solution
- Pick an empty cell
  - If no empty cells are there, reports no solution (because it means boards are filled but its neither solved nor invalid, which is a weird state)
- Try to put a sun on that cell on a cloned board
- Repeat this process recursively, if it comes with a solution then report it.
- If not, then put a moon on that instead
- Repeat this process recursively (this time with a moon), again if theres a solution reports it.
- Otherwise reports no solution in this case.

Most of the time a randomly initialized board (with prefilled cells and constraints) contains at least a solution and the naive backtracking algorithm can come up with one relatively quickly. Therefore I have no incentives to add in heuristics for now.
