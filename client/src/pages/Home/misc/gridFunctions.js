import { produce } from "immer";

const operations = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const countNeighbors = (grid, x, y, numRows, numCols) => {
  return operations.reduce((acc, [i, j]) => {
    const row = (x + i + numRows) % numRows;
    const col = (y + j + numCols) % numCols;
    acc += grid[row][col];
    return acc;
  }, 0);
};

export const getNextGrid = (grid) => {
  const numRows = grid.length;
  const numCols = grid[0].length;

  return produce(grid, (newGrid) => {
    for (let i = 0; i < numRows; i++) {
      for (let k = 0; k < numCols; k++) {
        let neighbours = countNeighbors(grid, i, k, numRows, numCols);
        if (neighbours < 2 || neighbours > 3) {
          newGrid[i][k] = 0;
        } else if (newGrid[i][k] === 0 && neighbours === 3) {
          newGrid[i][k] = 1;
        }
      }
    }
  });
};

export const generateEmptyGrid = (numRows, numCols) => {
  return Array.from({length: numRows}).map(() => Array.from({length: numCols}).fill(0));
}