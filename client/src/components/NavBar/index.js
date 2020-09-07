import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";
import LogoIcon from "../LogoIcon";

const NavBar = ({ style }) => {
  // const [isEn, setIsEn] = useState(true);

  return (
    <Container style={style}>
      <Link to="/">
        <LogoIcon style={{height:'2rem'}}/>
      </Link>
      <SideWrapper>
        {/* <LanguageToggle isEn={isEn} setIsEn={setIsEn} /> */}
        <Link to="/profile">
          <ProfileIcon />
        </Link>
      </SideWrapper>
    </Container>
  );
};

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  padding: 0.8rem 3.75rem;
  background-color: #0b0f34;
`;

const Svg = styled(Icon)`
  height: 2rem;
  width: auto;
`;

const SideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileIcon = () => (
  <Svg width="48" height="49" viewBox="0 0 48 49" fill="none">
    <path
      d="M40.7946 36.7232C37.0714 41.9732 30.9375 45.4286 24 45.4286C17.0625 45.4286 10.9286 41.9732 7.20536 36.7232C7.90179 31.7143 9.9375 27.2679 14.4911 26.6518C16.8482 29.2232 20.25 30.8571 24 30.8571C27.75 30.8571 31.1518 29.2232 33.5089 26.6518C38.0625 27.2679 40.0982 31.7143 40.7946 36.7232ZM34.2857 18C34.2857 23.6786 29.6786 28.2857 24 28.2857C18.3214 28.2857 13.7143 23.6786 13.7143 18C13.7143 12.3214 18.3214 7.71428 24 7.71428C29.6786 7.71428 34.2857 12.3214 34.2857 18ZM48 24.8571C48 11.5982 37.2589 0.85714 24 0.85714C10.7411 0.85714 0 11.5982 0 24.8571C0 38.0893 10.7411 48.8571 24 48.8571C37.2857 48.8571 48 38.0625 48 24.8571Z"
      fill="white"
    />
  </Svg>
);

export default NavBar;
