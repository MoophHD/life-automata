import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
  useContext,
} from "react";
import styled from "styled-components";
import PlayArea from "./PlayArea";
import Tools from "./Tools";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { patterns } from "./misc/patterns";
import AuthContext from "../../context/auth.context";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";
import { reducer, initialState } from "../../store/reducer";
import { actions } from "../../store/actions";

const STEPS_TO_UPDATE = 5;

const Home = ({ match }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [running, setRunning] = useState(false);
  const [cellSide, setCellSide] = useState(10);
  const { isAuthentificated } = useContext(AuthContext);
  const { request } = useHttp();
  const domHistory = useHistory();

  const { interval, history, step, grid, rows, cols } = state;

  const runningRef = useRef(running);
  runningRef.current = running;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  useEffect(() => {
    if (!match.params.id) return;

    const fetchData = async () => {
      const data = await request(`/api/grid/${match.params.id}`, "GET");

      const { grid, step } = data;
      onLoad(JSON.parse(grid), step);
    };
    fetchData();
  }, [match.params.id, request]);

  useEffect(() => {
    if (step === 0 || !isAuthentificated) return;

    if (match.params.id && step % STEPS_TO_UPDATE === 0) {
      const updateGrid = async () => {
        await request("/api/grid/update", "POST", {
          grid: JSON.stringify(grid),
          step,
          id: match.params.id,
        });
      };

      updateGrid();
    } else if (!match.params.id) {
      const setGrid = async () => {
        const data = await request("/api/grid/generate", "POST", {
          grid: JSON.stringify(grid),
          step,
        });
        domHistory.push(`/${data.grid.id}`);
      };

      setGrid();
    }
  }, [step, domHistory, grid, isAuthentificated, match.params.id, request]);

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

  const onLoad = (grid, step) => {
    dispatch({ type: actions.LOAD, payload: { grid, step } });
  };

  const onStepIn = () => {
    dispatch({ type: actions.STEP_IN });
  };

  const onStepOut = () => {
    dispatch({ type: actions.STEP_OUT });
  };

  const onToggleCell = (x, y) => {
    dispatch({ type: actions.TOGGLE_CELL, payload: { x, y } });
  };

  const onSetRows = (rows) => {
    dispatch({ type: actions.SET_ROWS, payload: rows });
  };

  const onSetCols = (cols) => {
    dispatch({ type: actions.SET_COLS, payload: cols });
  };

  const onSetInterval = (interval) => {
    dispatch({ type: actions.SET_INTERVAL, payload: interval });
  };

  const onPutPattern = (x, y, pattern) => {
    dispatch({ type: actions.PUT_PATTERN, payload: { x, y, pattern } });
  };

  const onSetFromHistory = (step) => {
    dispatch({ type: actions.SET_FROM_HISTORY, payload: { step } });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <PlayArea
          step={step}
          grid={grid}
          running={running}
          onPutPattern={onPutPattern}
          setCellSide={(cellSide) => setCellSide(cellSide)}
          onToggleCell={onToggleCell}
        />
        <Tools
          step={step}
          history={history}
          onSetFromHistory={onSetFromHistory}
          onSetRows={onSetRows}
          onSetCols={onSetCols}
          onStepIn={onStepIn}
          onStepOut={onStepOut}
          onSetInterval={onSetInterval}
          interval={interval}
          running={running}
          onTogglePlay={toggleRunning}
          cellSide={cellSide}
          patterns={patterns}
          rows={rows}
          cols={cols}
        />
      </Container>
    </DndProvider>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr minmax(min-content, 1fr);
  height: 100%;
  width: 100%;

  @media (max-width: 800px) {
    grid-template-columns: none;
    grid-template-rows: 2fr minmax(min-content, 1fr);
  }
`;

export default Home;
