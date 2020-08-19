import React from "react";
import styled from "styled-components";

const RangeInput = ({ style, min, max, step, defaultValue, register }) => {
  return (
    <>
      {/* <Ruler length={~~((max-min)/step)} /> */}
      <Ruler length={5} />

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
//stump = {0: {title: ""}}
const Ruler = ({ stumps = {}, length }) => {
  //must return lines like in ruler with stumps representing bigger lines with titles udnerneath
  return <Scale length={length} />;
};

const color = "tomato";
const width = 2; //px

const gedGradientRecepy = (length) => {
  const recepy = [];
  const gapPercentage = 100 / (length - 1);

  //draws line than gap
  for (let i = 0; i < length - 1; i++) {
    recepy.push(`${color} ${gapPercentage * i}%`);
    recepy.push(`${color} calc(${gapPercentage * i}% + ${width}px)`);
    recepy.push(`transparent calc(${gapPercentage * i}% + ${width}px)`);
    recepy.push(`transparent ${gapPercentage * (i + 1)}%`);
  }

  //last gap has to be shorter in order to accomodate the last line
  recepy.pop();
  recepy.push(`transparent calc(100% - ${width}px)`);
  // *.5 is a workaround, google renders the list line at 2 * width
  recepy.push(`${color} calc(100% - ${width * 0.5}px), ${color} 100%`);

  return recepy.join(",");
};
const Scale = styled.div`
  width: 200px;
  height: 40px;
  background: linear-gradient(
    90deg,
    ${(props) => gedGradientRecepy(props.length)}
  );
`;

const thumpSize = 0.9; //rem
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
