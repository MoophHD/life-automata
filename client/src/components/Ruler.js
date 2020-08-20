import React from "react";
import styled from "styled-components";

const Ruler = ({ stumps = { 1: { text: "t" }, 3: { text: "b" } }, count }) => {
  return (
    <Table>
      <tbody>
        <Row>
          {[...Array(count)].map((_, i) => (
            <Cell key={`${i} ruler cel`}>
              {stumps[i] ? <StumpLine /> : <Line />}
            </Cell>
          ))}
        </Row>
        <Row>
          {[...Array(count)].map((_, i) => (
            <Cell key={`${i} stump text cel`}>
              {stumps[i] && <Text>{stumps[i].text}</Text>}
            </Cell>
          ))}
        </Row>
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
`;

const Row = styled.tr``;

const Cell = styled.td`
  padding: 0;
  text-align: center;
`;

const Line = styled.div`
  height: 100%;
  width: 1.5px;
  margin: auto;
  background-color: white;
  border-radius: 3px;
  height: 0.95rem;
`;

const StumpLine = styled(Line)`
  height: 1.45rem;
`;

const Text = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
`;

export default Ruler;
