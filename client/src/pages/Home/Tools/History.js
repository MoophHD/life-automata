import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import CustomScrollbars from "../../../components/CustomScrollbars";

const History = ({ history, onSetFromHistory, activeStep }) => {
  const scrollbarRef = useRef(null);
  useEffect(() => {
    console.log(scrollbarRef.current);
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  }, [history]);

  return (
    <CustomScrollbars ref={scrollbarRef}>
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
    </CustomScrollbars>
  );
};

const Container = styled.ul`
  padding: 1rem 0;
  list-style-type: none;
  margin: 0;
  color: white;
  flex: 1;
  padding-right: 12px;
`;

const Item = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0.125rem;
  position: relative;
  transition: all 0.15s ease-in;
  background-color: ${(props) => (props.active ? "#fc2323" : "transparent")};

  border-top: 0.15rem solid #fc2323;

  &:first-child {
    border-top: none;
  }
`;

const Date = styled.span`
  font-size: 0.8rem;
`;

const Step = styled.span``;

export default History;
