import React from "react";
import styled from "styled-components";

// { date: new window.Date().toISOString(), step: 1 },
// { date: new window.Date().toISOString(), step: 2 },
// { date: new window.Date().toISOString(), step: 3 },

const History = ({dates=[], onItemClick}) => (
  <Container>
    {dates.map((date, i) => (
      <Item onClick={() => onItemClick()} key={`dateline ${date.step}th`}>
        <Step>step №{date.step}</Step>
        <Date>{date.date}</Date>
      </Item>
    ))}
  </Container>
);

const Container = styled.ul`
  padding: 1rem 0;
  list-style-type: none;
  margin: 0;
  color: white;
  flex: 1;
`;

const Item = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0.125rem;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 0 0.125rem white;
  }

  &:hover:before {
    box-shadow: 0 0 0 0.15rem #fc2323;
    z-index: 1;
  }
`;

const Date = styled.span`
  font-size: 0.8rem;
`;

const Step = styled.span``;

export default History;
