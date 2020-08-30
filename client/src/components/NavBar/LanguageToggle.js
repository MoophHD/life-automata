import React from "react";
import styled from "styled-components";
// import LangContext from "../../context/lang.context";

const LanguageToggle = ({ isEn }) => (
  <Wrapper>
    <Lang isActive={isEn}>en</Lang>
    <Lang isActive={!isEn}>ru</Lang>
  </Wrapper>
);

const Wrapper = styled.div``;

const Lang = styled.span`
  cursor: pointer;
  font-weight: bold;
  color: ${(props) => (props.isActive ? "white" : "#A1A1A1")};
`;

export default LanguageToggle;
