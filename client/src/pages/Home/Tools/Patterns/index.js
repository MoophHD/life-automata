import React from "react";
import styled from "styled-components";
import PatternShape from "./PatternShape";
import CustomScrollbars from '../../../../components/CustomScrollbars';

const Patterns = ({ cellSide, patterns = [] }) => {
  return (
    <CustomScrollbars>
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
    </CustomScrollbars>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export default Patterns;
