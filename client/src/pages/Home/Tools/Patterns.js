import React, { useState } from "react";
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
        [1, 0],
        [1, 1],
      ],
      name: "Square",
    },
  ],
  
}) => (
  <Container>
    {patterns.map(({ pattern, name }, i) => (
      <ShapeContainer key={`${i}th pattern shape`}>
        <Shape cols={pattern[0].length} rows={pattern.length}>
          {pattern.flat().map((num, i) => (
            <Cell key={`${i}th pattern cel`} colored={!!num} />
          ))}
        </Shape>
        <Name>{name}</Name>
      </ShapeContainer>
    ))}
  </Container>
);

const Container = styled.div`
  overflow-y: auto;
  display: flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const ShapeContainer = styled.div`
  background-color: white;
  padding: 2rem 1.625rem 1rem;
  box-shadow: 0px 4px 0px #aeaeae;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  margin: .5rem;
`;

const Shape = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols}, 1.6rem)`};
  grid-template-rows: ${(props) => `repeat(${props.rows}, 1.6rem)`};
  grid-row-gap: 0.3rem;
  grid-column-gap: 0.3rem;

  justify-items: center;
  align-items: center;
  margin: auto;
  margin-bottom: 1.5rem; 
`;

const Cell = styled.div`
  background-color: ${(props) => (props.colored ? "#DADADA" : "none")};
  height: 1.6rem;
  width: 1.6rem;
  border-radius: 0.3rem;
`;

const Name = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`;

export default Patterns;
