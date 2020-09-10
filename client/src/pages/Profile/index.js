import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/auth.context";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import { useHttp } from "../../hooks/http.hook";

const Profile = () => {
  const { username } = useContext(AuthContext);
  const { request } = useHttp();
  const [ids, setIds] = useState(null);

  useEffect(() => {
    if (!username) return;
    
    const fetchIds = async () => {
      const {ids} = await request(`/api/grid/ids`, "POST", { username });
      setIds(ids);
    };

    fetchIds();
  }, [request, username]);

  return (
    <Wrapper>
      <NavBar />

      <GridsContainer>
        {ids ? (
          ids.map((id, i) => (
            <GridElement key={`grid elem${id}`} href={`/${id}`}>
              {id}
            </GridElement>
          ))
        ) : (
          <span>So lonely in here. . . Add some grids</span>
        )}
      </GridsContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  width: 100%;
`;

const GridsContainer = styled.div`
  padding: 0.8rem 3.75rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GridElement = styled.a`
  border-radius: 0.5rem;
  padding: 0.8rem 5rem;
  background-color: #161f6b;
  transition: all 0.15s ease-out;
  text-decoration: none;
  color: white;
  &:hover {
    // box-shadow: 0 0.25rem 0.05rem 0.15rem #fc2323;
    box-shadow: 0 0.25rem 0.05rem 0.15rem rgba(103, 31, 194, 0.5);
  }
  margin-bottom: .5rem;
`;

export default Profile;
