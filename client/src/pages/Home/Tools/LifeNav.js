import React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import PlayBtn from "./PlayBtn";

const LifeNav = ({onStepOut, onStepIn, onTogglePlay}) => {
  return (
    <Container>
      <StepBtn>
        <StepOutIcon />
      </StepBtn>
      <PlayBtn onTogglePlay={onTogglePlay}/>
      <StepBtn>
        <StepInIcon />
      </StepBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  margin: 0;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Svg = styled(Icon)`
  height: 1.5em;
  width: auto;
`;

const StepOutIcon = () => (
  <Svg viewBox="0 0 21 32" fill="none">
    <path
      d="M20.096 0.689732L5.83259 14.9531C5.71206 15.0737 5.6317 15.1942 5.57143 15.3348L5.57143 1.71428C5.57143 1.01116 4.98884 0.42857 4.28572 0.42857L1.71429 0.42857C1.01116 0.42857 0.428574 1.01116 0.428574 1.71428L0.428571 30C0.428571 30.7031 1.01116 31.2857 1.71428 31.2857L4.28571 31.2857C4.98884 31.2857 5.57143 30.7031 5.57143 30L5.57143 16.3795C5.6317 16.5201 5.71206 16.6406 5.83259 16.7612L20.096 31.0246C20.5982 31.5268 21 31.346 21 30.6429L21 1.07143C21 0.368303 20.5982 0.1875 20.096 0.689732Z"
      fill="white"
    />
  </Svg>
);

const StepInIcon = () => (
  <Svg style={{ transform: "rotate(180deg)" }} viewBox="0 0 21 32" fill="none">
    <path
      d="M20.096 0.689732L5.83259 14.9531C5.71206 15.0737 5.6317 15.1942 5.57143 15.3348L5.57143 1.71428C5.57143 1.01116 4.98884 0.42857 4.28572 0.42857L1.71429 0.42857C1.01116 0.42857 0.428574 1.01116 0.428574 1.71428L0.428571 30C0.428571 30.7031 1.01116 31.2857 1.71428 31.2857L4.28571 31.2857C4.98884 31.2857 5.57143 30.7031 5.57143 30L5.57143 16.3795C5.6317 16.5201 5.71206 16.6406 5.83259 16.7612L20.096 31.0246C20.5982 31.5268 21 31.346 21 30.6429L21 1.07143C21 0.368303 20.5982 0.1875 20.096 0.689732Z"
      fill="white"
    />
  </Svg>
);

export default LifeNav;
