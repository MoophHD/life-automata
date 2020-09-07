import React from "react";
import styled from "styled-components";

const BRAND_COLOR = {
  GOOGLE: "#DC4A32",
  GITHUB: "#24292E",
};

const Auth = () => (
  <Wrapper>
    <Container>
      <Title>SignUp</Title>
      <LinkContainer>
        <Link style={{ color: BRAND_COLOR.GOOGLE }} href="/api/auth/google">
          <i className="fab fa-google"></i>

          <LinkTitle>GOOGLE</LinkTitle>
        </Link>
        <Link style={{ color: BRAND_COLOR.GITHUB }} href="/api/auth/github">
          <i className="fab fa-github"></i>

          <LinkTitle>GITHUB</LinkTitle>
        </Link>
      </LinkContainer>
    </Container>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b0f34;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  background-color: #161f6b;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  min-height: 20rem;

  box-shadow: 0 0.25rem 0 .15rem rgba(103, 31, 194, 0.5);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: white;
  margin: 0;
  margin-bottom: 2rem;
`;

const LinkContainer = styled.div`
  width: 20rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Link = styled.a`
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  text-decoration: none;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-weight: bold;

  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  &:last-child {
    margin-bottom: 0;
  }
  transition: all 0.15s ease-out;
  &:hover {
    box-shadow: 0 0.25rem 0.05rem 0.15rem #fc2323;
  }
`;

const LinkTitle = styled.span`
  flex: 1;
  text-align: center;
`;

const LinkIcon = styled.div``;

export default Auth;
