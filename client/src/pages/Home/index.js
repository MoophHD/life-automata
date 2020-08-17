import React, { useState } from "react";
import styled from 'styled-components';
import PlayArea from './PlayArea';
import Tools from './Tools';

function Home() {
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const [options, setOptions] = useState({x: 50, y: 50, interval: 1000});

  return (
    <Container>
      <PlayArea grid={grid} running={running} options={options}/>
      <Tools setRunning={setRunning} setOptions={setOptions}/>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr minmax(min-content, 1fr);
  height: 100%;
  width: 100vw;
`


export default Home;