import React, { forwardRef } from "react";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";

const CustomScrollbars = forwardRef(({ children }, ref) => (
  <Scrollbars
    ref={ref}
    renderTrackHorizontal={() => <Track />}
    renderThumbVertical={() => <Thump />}
  >
    {children}
  </Scrollbars>
));

const Track = styled.div`
  background-color: rgba(256, 256, 256, 0.5);
  position: absolute;
  width: 6px;
  right: 2px;
  bottom: 2px;
  top: 2px;
  border-radius: 3px;
`;

const Thump = styled.div`
  position: relative;
  display: block;
  width: 100%;
  cursor: pointer;
  border-radius: inherit;
  background-color: white;
  height: 312px;
`;

export default CustomScrollbars;
