import React, { useState } from "react";
import styled from "styled-components";
import LifeNav from "./LifeNav/";
import Controls from "./Controls";
import Patterns from "./Patterns/";
import History from "./History";
import ToolsNav from "./ToolsNav";
import useWindowSize from "../../../hooks/windowsize.hook";

const BREAK_WIDTH = 800;
const windowEnum = { patterns: "patterns", history: "history" };
const Tools = ({
  patterns,
  step,
  history,
  onSetFromHistory,
  onStepIn,
  onStepOut,
  onTogglePlay,
  onSetCols,
  onSetRows,
  onSetInterval,
  interval,
  running,
  cellSide,
  rows,
  cols,
}) => {
  const { width } = useWindowSize();
  const [window, setWindow] = useState(windowEnum.patterns);
  return (
    <Wrapper>
      {width >= BREAK_WIDTH && (
        <ToolsNav
          window={window}
          setWindow={setWindow}
          windowEnum={windowEnum}
        />
      )}
      <Container>
        {(width >= BREAK_WIDTH) && (window === windowEnum.patterns ? (
          <Patterns patterns={patterns} cellSide={cellSide} />
        ) : (
          <History
            activeStep={step}
            history={history}
            onSetFromHistory={onSetFromHistory}
          />
        ))}
        
        <LifeNav
          running={running}
          onStepOut={onStepOut}
          onStepIn={onStepIn}
          onTogglePlay={onTogglePlay}
        />
        <Controls
          cols={cols}
          rows={rows}
          interval={interval}
          onSetInterval={onSetInterval}
          onSetCols={onSetCols}
          onSetRows={onSetRows}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  background-color: #0b0f34;
  padding: 0.5rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Tools;
