import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Grid from "../../../components/Grid";
import NavBar from "../../../components/NavBar";

function PlayArea({
  grid,
  running,
  options,
  onToggleCell,
  setCellSide,
  onPutPattern,
  loadingGrid,
}) {
  const containerRef = useRef(null);
  const [freeRect, setFreeRect] = useState({ width: 0, height: 0 });
  const [gridVisible, setGridVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateFreeRect = () => {
      setGridVisible(false);
      const { height, width } = containerRef.current.getBoundingClientRect();

      const paddingTop = window
        .getComputedStyle(containerRef.current)
        .getPropertyValue("padding-top")
        .slice(0, -2);
      const paddingLeft = window
        .getComputedStyle(containerRef.current)
        .getPropertyValue("padding-left")
        .slice(0, -2);
      setFreeRect({
        width: width - paddingLeft * 2,
        height: height - paddingTop * 2,
      });
      setGridVisible(true);
    };

    updateFreeRect();
    window.addEventListener("resize", updateFreeRect);

    return () => window.removeEventListener("resize", updateFreeRect);
  }, [containerRef]);

  return (
    <Container>
      <NavBar />
      {loadingGrid ? (
        <Spinner>
          <SpinnerImg src="https://sun9-29.userapi.com/woazS2SvPAv283AKVTeoE6aWCArYAc-H-VbDAg/qLvgVlAtSis.jpg"/>
        </Spinner>
      ) : (
        <GridWrapper ref={containerRef}>
          <Grid
            style={{ display: gridVisible ? "block" : "none" }}
            freeHeight={freeRect.height}
            freeWidth={freeRect.width}
            onClickCell={onToggleCell}
            running={running}
            options={options}
            grid={grid}
            setCellSide={setCellSide}
            onPutPattern={onPutPattern}
          />
        </GridWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 3.75rem 6rem;

  @media (max-width: 800px) {
    padding: 1.5rem 2rem;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const SpinnerImg = styled.img`
  animation: ${rotate} 2s linear infinite;
  height: 5rem;
  width: 5rem;
`;

export default PlayArea;
