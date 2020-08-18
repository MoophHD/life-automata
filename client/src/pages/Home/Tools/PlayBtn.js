import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";

const PlayBtn = ({ onTogglePlay }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <Container
      onClick={() => {
        setPlaying(!playing);
        onTogglePlay();
      }}
    >
      {playing ? <PlayIcon /> : <StopIcon />}
    </Container>
  );
};

const Container = styled.button`
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-color: #fc2323;
  box-shadow: 0px 0.35rem 0px #740000;
  border: none;
  margin: 0 1.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  margin-bottom: 0.35rem;
  &:active {
    box-shadow: none;
    margin-top: 0.35rem;
    margin-bottom: 0rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Svg = styled(Icon)`
  height: 1.5em;
  width: auto;
`;

const PlayIcon = () => (
  <Svg style={{ height: "1.75rem" }} viewBox="0 0 34 38" fill="none">
    <path
      d="M32 15.5359C34.6667 17.0755 34.6667 20.9245 32 22.4641L6.5 37.1865C3.83333 38.7261 0.499998 36.8016 0.499998 33.7224L0.5 4.27757C0.5 1.19837 3.83333 -0.726135 6.5 0.813465L32 15.5359Z"
      fill="white"
    />
  </Svg>
);

const StopIcon = () => (
  <Svg style={{ height: "1.75rem" }} viewBox="0 0 32 38" fill="none">
    <rect width="10" height="38" rx="5" fill="white" />
    <rect x="22" width="10" height="38" rx="5" fill="white" />
  </Svg>
);

export default PlayBtn;
