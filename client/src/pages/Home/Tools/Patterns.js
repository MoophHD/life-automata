import React from "react";
import styled from "styled-components";

const Patterns = ({
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
        <ShapeContainer key={`${i}th pattern shape`}>
          <Shape
            onDragStart={(e) => handleDragStart(e, i)}
            draggable={true}
            cols={pattern[0].length}
            rows={pattern.length}
          >
            {pattern.flat().map((num, i) => (
              <Cell key={`${i}th pattern cel`} colored={!!num} />
            ))}
          </Shape>
          <Name>{name}</Name>
        </ShapeContainer>
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

const ShapeContainer = styled.div`
  cursor: pointer;
  background-color: white;
  padding: 2rem 1.65rem 1rem;
  box-shadow: 0px 4px 0px #aeaeae;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0.5rem;
  height: 10rem;
`;

const Shape = styled.div`
  //wtf?, fixed untranparent background
  transform: translate(0, 0);

  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr)`};
  grid-row-gap: 0.3rem;
  grid-column-gap: 0.3rem;
  height: ${({ cols, rows }) => Math.min(rows / cols, 1) * 4.5}rem;
  width: ${({ cols, rows }) => Math.min(cols / rows, 1) * 4.5}rem;
  margin-bottom: 1.5rem;
`;

const Cell = styled.div`
  background-color: ${(props) => (props.colored ? "#DADADA" : "none")};
  height: 100%;
  width: 100%;
  border-radius: 0.3rem;
`;

const Name = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`;

export default Patterns;
