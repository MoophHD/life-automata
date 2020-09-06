import React from "react";
import styled from "styled-components";

const History = ({ history, onSetFromHistory, activeStep }) => (
  <Container>
    {history.map((historyItem, i) => (
      <Item
        active={historyItem.step === activeStep}
        onClick={() => onSetFromHistory(historyItem.step)}
        key={`dateline ${historyItem.step}th`}
      >
        <Step>step №{historyItem.step}</Step>
        <Date>{historyItem.date}</Date>
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
  transition: all .15s ease-in;
  background-color: ${props => props.active ? '#fc2323' : 'transparent'};

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
