import React, { useState } from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";

const Controls = ({ onControlsChange }) => {
  const [folded, setFolded] = useState(true);
  //add hook for all the input stuff
  return (
    <>
      {folded ? (
        <ToggleBtn onClick={() => setFolded(false)}>
          <DownArrow /> More Options
        </ToggleBtn>
      ) : (
        <>
          <ToggleBtn onClick={() => setFolded(true)}>
            <DownArrow isUp={true} /> Less Options
          </ToggleBtn>
        </>
      )}
    </>
  );
};

const ToggleBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85em;
  font-weight: 600;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Svg = styled(Icon)`
  height: 0.8rem;
  width: auto;
  margin-right: 0.75em;
`;

const DownArrow = ({ isUp = false }) => (
  <Svg
    style={{ transform: isUp ? "rotate(180deg)" : "" }}
    viewBox="0 0 22 15"
    fill="none"
  >
    <path
      d="M21.5402 4.25C21.875 3.91518 21.875 3.36607 21.5402 3.03125L19.317 0.821427C18.9821 0.486606 18.4464 0.486606 18.1116 0.821427L11 7.93304L3.88839 0.821427C3.55357 0.486606 3.01786 0.486606 2.68304 0.821427L0.459821 3.03125C0.125 3.36607 0.125 3.91518 0.459821 4.25L10.3973 14.1741C10.7321 14.5089 11.2679 14.5089 11.6027 14.1741L21.5402 4.25Z"
      fill="white"
      fillOpacity="0.75"
    />
  </Svg>
);

export default Controls;
