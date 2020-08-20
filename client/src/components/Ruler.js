import React from "react";
import styled from "styled-components";

const Ruler = ({ stumps = {}, count }) => {
  //must return lines like in ruler with stumps representing bigger lines with titles udnerneath
  return (
    <Table>
      <Row>
        {[...Array(count)].map(() => <Cell><Line /></Cell>)}
      </Row>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const Row = styled.tr`

`

const Cell = styled.td`
  padding: 0;
`

const Line = styled.div`
  height: 100%;
  width: 1px;
  margin: auto;
  background-color: white;
  border-radius: 3px;
  height: 1rem;
`

export default Ruler;