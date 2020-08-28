import React, { useState } from "react";
import styled from "styled-components";
import LifeNav from "./LifeNav";
import Controls from "./Controls";
import Patterns from "./Patterns";
import History from "./History";
import ToolsNav from "./ToolsNav";

const windowEnum = { patterns: "patterns", history: "history" };

const Tools = ({ onStepIn, onStepOut, onTogglePlay }) => {
  const [window, setWindow] = useState(windowEnum.history);
  return (
    <Wrapper>
      <ToolsNav window={window} setWindow={setWindow} windowEnum={windowEnum} />
      <Container>
        {window === windowEnum.patterns ? <Patterns /> : <History />}
        <LifeNav
          onStepOut={onStepOut}
          onStepIn={onStepIn}
          onTogglePlay={onTogglePlay}
        />
        <Controls />
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
