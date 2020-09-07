import React, { useContext } from "react";
import { Redirect } from "react-router";
import AuthContext from "../../context/auth.context";

const Profile = () => {
  const { isAuthentificated, userId } = useContext(AuthContext);

  if (!isAuthentificated) return <Redirect to="/auth"/> 
  return (
    <>
    
    </>
  )
};

export default Profile;
