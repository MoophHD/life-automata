import React from "react";
import styled from "styled-components";

const RangeInput = ({ style, min, max, step, defaultValue, register }) => {
  return (
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
  );
};
//stump = {0: {title: ""}}
const Ruler = ({stumps={}, length, }) => {
  //must return lines like in ruler with stumps representing bigger lines with titles udnerneath
  return <></>
}

const thumpSize = .9; //rem
const borderSize = 0.3; //rem

const Input = styled.input`
  -webkit-appearance: none;
  background: transparent;
  padding: 0.4rem;

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
    margin-top: -0.7rem;
    transform: translateY(50%);
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
    border-radius: 2rem;
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
