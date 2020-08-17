import React, { useEffect } from "react";
import styled from 'styled-components';
import Grid from '../../components/Grid';

function PlayArea({grid, running, options}) {
  useEffect(() => {
    console.log(`play area got new props`)
    console.log(`running ${running}, ${options}`)
  }, [running, options])
  return (
    <Container>
      <Grid running={running} options={options} grid={grid}/>
    </Container>
  )
}

const Container = styled.div`
  background-color: blue;
`

export default PlayArea;