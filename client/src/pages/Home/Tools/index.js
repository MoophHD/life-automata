import React from "react";
import styled from "styled-components";
import LifeNav from "./LifeNav";

function Tools({ setRunning, setOptions }) {
  return (
    <Container>
      <LifeNav
        onStepOut={() => {}}
        onStepIn={() => {}}
        onTogglePlay={() => {}}
      />
    </Container>
  );
}

const Container = styled.div`
  background-color: pink;
`;

export default Tools;
