import React from "react";
import styled from "styled-components";
import Ruler from "./Ruler";

//thump
const thumpSize = 0.8; //rem
const borderSize = 0.3; //rem
//input
const inputSidePart = 0.4; //rem

const RangeInput = ({ style, min, max, step, defaultValue, register }) => {
  const count = ~~(max - min) / step + 1;
  return (
    <Container>
      <RulerWrapper count={count}>
        {/* TODO: Add stumps */}
        <Ruler stumps={null} count={count} />
      </RulerWrapper>

      <Input
        name="interval"
        style={style}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        ref={register}
      />
    </Container>
  );
};

const RulerWrapper = styled.div`
  position: absolute;
  top: 49%;
  transform: translateY(-25%);
  width: 100%;
  padding: ${props => `0 calc(calc(${inputSidePart}rem - ${100/props.count/2}% + ${thumpSize * 0.5}rem) / ${1 - 1/props.count})`};
`

const Container = styled.div`
  width: 100%;
  position: relative;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: .5em;
`

const Input = styled.input`
z-index: 1;
  margin: 0;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  position: relative;
  padding: 0 ${inputSidePart}rem;

  &:focus {
    outline: none;
  }

  &::-ms-track {
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-thumb {
    transform: translate(0, -25%);
    -webkit-appearance: none;
    height: ${thumpSize}rem;
    width: ${thumpSize}rem;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 0 ${borderSize}rem #fc2323;
    background: #ffffff;
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    height: 0.45em;
    width: 100%;
    background-color: white;
  }

  &:before {
    content: "";
    position: absolute;
    height: 0.45em;
    left: 0;
    width: ${inputSidePart}rem;
    background-color: white;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    height: 0.45em;
    right: 0;
    width: ${inputSidePart}rem;
    background-color: white;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  &::-moz-range-thumb {
    height: ${thumpSize}rem;
    width: ${thumpSize}rem;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 0 ${borderSize}rem #fc2323;
    background: #ffffff;
    cursor: pointer;
  }

  &::-moz-range-track {
    height: 0.45em;
    width: 100%;
    background-color: white;
  }

  &::-ms-track {
    height: 0.45em;
    width: 100%;
    background-color: white;
  }

  &::-ms-thumb {
    height: ${thumpSize}rem;
    width: ${thumpSize}rem;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 0 ${borderSize}rem #fc2323;
    background: #ffffff;
    cursor: pointer;
  }
`;

export default RangeInput;
