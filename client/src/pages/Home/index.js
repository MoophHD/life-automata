import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PlayArea from "./PlayArea";
import Tools from "./Tools";

function Home() {
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [options, setOptions] = useState({ x: 50, y: 50, interval: 1000 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    // TODO: Fetch grid from db
    setGrid([]);
  }, [])

  const onStepIn = () => {
    setStep(step + 1);
  };

  const onStepOut = () => {
    setStep(step - 1);
  };

  return (
    <Container>
      <PlayArea step={step} grid={grid} running={running} options={options} />
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
