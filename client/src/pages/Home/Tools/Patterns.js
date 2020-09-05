import React from "react";
import styled from "styled-components";
import PatternShape from "./PatternShape";

const Patterns = ({
  cellSide,
  patterns = [
    {
      pattern: [
        [1, 0],
        [1, 1],
      ],
      name: "Square",
    },
    {
      pattern: [
        [1, 0],
        [1, 1],
      ],
      name: "Square",
    },
    {
      pattern: [
        [1, 0, 1],
        [1, 1, 0],
      ],
      name: "Square",
    },
  ],
}) => {
  const handleDragStart = (e, i) => {
    e.dataTransfer.setData("pattern", JSON.stringify(patterns[i].pattern));
  };

  return (
    <Container>
      {patterns.map(({ pattern, name }, i) => (
        <PatternShape
          globalCellSide={cellSide}
          pattern={pattern}
          name={name}
          key={`${i}th pattern shape`}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export default Patterns;
