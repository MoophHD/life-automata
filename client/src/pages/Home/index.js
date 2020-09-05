import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import styled from "styled-components";
import PlayArea from "./PlayArea";
import Tools from "./Tools";
import { produce } from "immer";
import { getNextGrid, generateEmptyGrid } from "./gridFunctions";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const initialState = {
  grid: generateEmptyGrid(20, 20),
  step: 0,
  rows: 20,
  cols: 20,
  interval: 650,
};

function reducer(state, action) {
  const { grid } = state;

  switch (action.type) {
    case "toggle-cell": {
      const { x, y } = action.payload;
      return {
        ...state,
        grid: produce(grid, (gridCopy) => {
          gridCopy[x][y] = gridCopy[x][y] === 1 ? 0 : 1;
        }),
      };
    }
    case "step-in":
      return { ...state, grid: getNextGrid(state.grid), step: state.step + 1 };
    case "step-out":
      return { ...state, step: state.step - 1 };
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
                if (pattern[i-y][j-x] === 1) gridCopy[i][j] = 1;
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

const Home = ({ navbar }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [running, setRunning] = useState(false);
  //lord forgive me
  const [cellSide, setCellSide] = useState(10);

  const { grid, rows, cols, interval } = state;

  const runningRef = useRef(running);
  runningRef.current = running;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  useEffect(() => {
    // TODO: Fetch grid from db
  }, []);

  const onStepIn = () => {
    dispatch({ type: "step-in" });
  };

  const onStepOut = () => {
    dispatch({ type: "step-out" });
  };

  const onToggleCell = (x, y) => {
    dispatch({ type: "toggle-cell", payload: { x, y } });
  };

  const onSetRows = (rows) => {
    dispatch({ type: "set-rows", payload: rows });
  };

  const onSetCols = (cols) => {
    dispatch({ type: "set-cols", payload: cols });
  };

  const onSetInterval = (interval) => {
    console.log(interval);
    dispatch({ type: "set-interval", payload: interval });
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    onStepIn();

    setTimeout(runSimulation, intervalRef.current);
  }, []);

  const toggleRunning = () => {
    setRunning(!running);
    runningRef.current = !running;

    runSimulation();
  };

  const onPutPattern = (x, y, pattern) => {
    dispatch({ type: "put-pattern", payload: { x, y, pattern } });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <PlayArea
          step={state.step}
          grid={state.grid}
          running={running}
          onPutPattern={onPutPattern}
          setCellSide={(cellSide) => setCellSide(cellSide)}
          onToggleCell={onToggleCell}
        />
        <Tools
          onSetRows={onSetRows}
          onSetCols={onSetCols}
          onStepIn={onStepIn}
          onStepOut={onStepOut}
          onSetInterval={onSetInterval}
          interval={interval}
          running={running}
          onTogglePlay={toggleRunning}
          cellSide={cellSide}
        />
      </Container>
    </DndProvider>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr minmax(min-content, 1fr);
  height: 100%;
  width: 100vw;
`;

export default Home;
