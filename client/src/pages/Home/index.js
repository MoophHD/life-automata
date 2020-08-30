import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import PlayArea from "./PlayArea";
import Tools from "./Tools";
import { produce } from "immer";

const initialState = {
  grid: [
    [1, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
  ],
  step: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle-cell":
      const { grid } = state;
      const { x, y } = action.payload;
      return {
        ...state,
        grid: produce(grid, (gridCopy) => {
          gridCopy[x][y] = gridCopy[x][y] === 1 ? 0 : 1;
        }),
      };
    case "step-in":
      return { ...state, step: state.step + 1 };
    case "step-out":
      return { ...state, ste: state.step - 1 };
    default:
      return state;
  }
}

const Home = ({navbar}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [running, setRunning] = useState(false);
  const [options, setOptions] = useState({ x: 50, y: 50, interval: 1000 });

  useEffect(() => {
    // TODO: Fetch grid from db
    onToggleCell(0, 0);
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
  return (
    <Container>
      <PlayArea
        step={state.step}
        grid={state.grid}
        running={running}
        options={options}
        onToggleCell={onToggleCell}
      />
      <Tools
        onStepIn={onStepIn}
        onStepOut={onStepOut}
        onTogglePlay={() => setRunning(!running)}
        setOptions={setOptions}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr minmax(min-content, 1fr);
  height: 100%;
  width: 100vw;
`;

export default Home;
