import React, { useContext } from "react";
import AuthContext from "../../context/auth.context";
import styled from "styled-components";

const Profile = ({}) => {
  const { isAuthentificated, checkAuth, userId } = useContext(AuthContext);

  return <>qweqwe</>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0b0f34;
  height: 100vh;
  width: 100vw;
`;

export default Profile;
