import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router";
import AuthContext from "../../context/auth.context";

const Profile = (props) => {
  const { isAuthentificated, checkAuth, userId } = useContext(AuthContext);

  return <>qweqwe</>;
};

export default Profile;
