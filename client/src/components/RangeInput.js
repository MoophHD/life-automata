import React from "react";
import styled from "styled-components";
import Ruler from "./Ruler";

//thump
const thumpSize = 0.9; //rem
const borderSize = 0.3; //rem
const inputSidePart = 0.4; //rem

const RangeInput = ({ style, min, max, step, defaultValue, register }) => {
  const count = ~~(max - min) / step + 1;
  return (
    <>
      <RulerWrapper count={count}>
        <Ruler count={count} />
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
    </>
  );
};

const RulerWrapper = styled.div`
  width: 100%;
  padding: ${props => `0 calc(calc(${inputSidePart}rem - ${100/props.count/2}%) / ${1 - 1/props.count})`};
`

const Input = styled.input`
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
    -webkit-appearance: none;
    width: 1px;
    height: 50px;
    margin-top: -0.7rem;
    background-color: tomato;

    // margin-top: -0.7rem;
    // transform: translateY(50%);
    // -webkit-appearance: none;
    // height: ${thumpSize}rem;
    // width: ${thumpSize}rem;
    // border-radius: 50%;
    // border: none;
    // box-shadow: 0 0 0 ${borderSize}rem #fc2323;
    // background: #ffffff;
    // cursor: pointer;
  }

  &::before {
    content: "";
    position: absolute;
    height: 0.45em;
    left: 0;
    width: ${inputSidePart}rem;
    background-color: tomato;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
  }

  &::after {
    content: "";
    position: absolute;
    height: 0.45em;
    right: 0;
    width: ${inputSidePart}rem;
    background-color: tomato;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  &::-webkit-slider-runnable-track {
    height: 0.45em;
    width: 100%;
    background-color: white;
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
