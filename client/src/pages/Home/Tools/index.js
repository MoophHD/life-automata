import React from "react";
import styled from "styled-components";
import LifeNav from "./LifeNav";
import Controls from "./Controls";
import Patterns from './Patterns';

const Tools = ({ onStepIn, onStepOut, onTogglePlay }) => {
  return (
    <Container>
      <Patterns />
      <LifeNav
        onStepOut={onStepOut}
        onStepIn={onStepIn}
        onTogglePlay={onTogglePlay}
      />
      <Controls />
    </Container>
  );
};

const Container = styled.div`
  background-color: #0B0F34;
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Tools;
