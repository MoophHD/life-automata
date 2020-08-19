import React, { useState } from "react";
import styled from "styled-components";
import LifeNav from "./LifeNav";
import Controls from "./Controls";

const Tools = ({ onStepIn, onStepOut, onTogglePlay }) => {
  return (
    <Container>
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
`;

export default Tools;
