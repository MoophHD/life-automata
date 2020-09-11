import { produce } from "immer";
import { getNextGrid, generateEmptyGrid } from "../pages/Home/misc/gridFunctions";

const ROWS = 20;
const COLS = 20;
const MAX_HISTORY_STORAGE = 30;

export const initialState = {
  grid: generateEmptyGrid(ROWS, COLS),
  step: 0,
  rows: ROWS,
  cols: COLS,
  interval: 650,
  history: [],
};

export function reducer(state, action) {
  const { grid, step, history } = state;

  switch (action.type) {
    case "load": {
      const { grid, step } = action.payload;
      const rows = grid.length;
      const cols = grid[0].length;
      return { ...state, grid, step, rows, cols };
    }
    case "toggle-cell": {
      const { x, y } = action.payload;
      return {
        ...state,
        grid: produce(grid, (gridCopy) => {
          gridCopy[x][y] = gridCopy[x][y] === 1 ? 0 : 1;
        }),
      };
    }
    case "set-from-history": {
      const { step } = action.payload;
      const historyElement = history.find((el) => el.step === step);

      if (history) {
        return { ...state, step, grid: JSON.parse(historyElement.grid) };
      } else {
        return state;
      }
    }
    case "step-in": {
      const nextStep = step + 1;
      let nextStepHistory = history.find((el) => el.step === nextStep);
      if (nextStepHistory) {
        // grab already existing grid
        return {
          ...state,
          grid: JSON.parse(nextStepHistory.grid),
          step: nextStep,
        };
      } else {
        let nextGrid = getNextGrid(grid);
        let nextHistory = produce(history, (historyCopy) => {
          // replace with shift/unshift when the internet is up
          if (historyCopy.length >= MAX_HISTORY_STORAGE) historyCopy.shift();
          historyCopy.push({
            date: new window.Date().toISOString(),
            grid: JSON.stringify(grid),
            step: nextStep,
          });
        });

        return {
          ...state,
          grid: nextGrid,
          step: nextStep,
          history: nextHistory,
        };
      }
    }
    case "step-out": {
      const prevStep = step - 1;

      if (prevStep < 0) return state;

      const prevHistory = history.find((el) => el.step === prevStep);
      const prevGrid = JSON.parse(prevHistory.grid);

      return { ...state, step: prevStep, grid: prevGrid };
    }
    case "set-rows":
      const newRows = action.payload;
      return {
        ...state,
        grid: generateEmptyGrid(newRows, state.cols),
        rows: newRows,
      };
    case "set-cols":
      const newCols = action.payload;
      return {
        ...state,
        grid: generateEmptyGrid(state.rows, newCols),
        cols: newCols,
      };
    case "set-interval":
      return {
        ...state,
        interval: action.payload,
      };
    case "put-pattern": {
      let { x, y, pattern } = action.payload;
      const patternWidth = pattern[0].length;
      const patternHeight = pattern.length;
      return {
        ...state,
        grid: produce(grid, (gridCopy) => {
          gridCopy.forEach((row, i) => {
            row.forEach((col, j) => {
              if (
                i >= y &&
                i < y + patternHeight &&
                j >= x &&
                j < x + patternWidth
              ) {
                if (pattern[i - y][j - x] === 1) gridCopy[i][j] = 1;
              }
            });
          });
        }),
      };
    }
    default:
      return state;
  }
}
