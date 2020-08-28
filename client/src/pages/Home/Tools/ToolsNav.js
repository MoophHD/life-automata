import React from "react";
import styled from "styled-components";

const ToolsNav = ({ setWindow, window, windowEnum }) => (
    <Container>
      <NavItem
        onClick={() => setWindow(windowEnum.patterns)}
        selected={window === windowEnum.patterns}
      >
        <ItemTitle selected={window === windowEnum.patterns}>patterns</ItemTitle>
      </NavItem>
      <NavItem
        onClick={() => setWindow(windowEnum.history)}
        selected={window === windowEnum.history}
      >
        <ItemTitle selected={window === windowEnum.history}>history</ItemTitle>
      </NavItem>
    </Container>
);

const Container = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 3.5rem;
  width: 100%;
  display: flex;
`;

const NavItem = styled.li`
  cursor: pointer;
  height: 100%;
  flex: 1;
  background-color: ${(props) => (props.selected ? "#0B0F34" : "white")};
  color: ${(props) => (props.selected ? "white" : "#0B0F34")};
  border-radius: 2rem 2rem 0 0;
  padding-top: 1.5rem;
  text-align: center;
`;

const ItemTitle = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  color: inherit;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    display: ${(props) => (props.selected ? "block" : "none")};
    left: 0;
    top: 1.8rem;
    width: 100%;
    height: 0.3rem;
    border-radius: 0.1rem;
    background-color: white;
  }
`;

export default ToolsNav;
