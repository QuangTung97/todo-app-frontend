import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../util";
import AppContext from "../context";

const VertialBar = styled.div`
  height: 50px;
  width: 100%;
  background-color: #008000;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ItemLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: white;
  padding: 0 16px;
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  height: 100%;
  align-items: center;
  &:hover {
    background-color: #009000;
  }
`;

const Logout = styled(SecondaryButton)`
  font-weight: bold;
  margin-left: auto;
  margin-right: 3px;
`;

const Item = ({ title, url }) => {
  return <ItemLink to={url}>{title}</ItemLink>;
};

const logout = setToken => {
  setToken(null);
  localStorage.removeItem("token");
};

const TopBar = () => {
  const { token, setToken } = useContext(AppContext);

  return (
    <VertialBar>
      {token ? <Item url="/" title="Home" /> : ""}
      <Item url="/accounts/new" title="Sign Up" />
      {token ? "" : <Item url="/login" title="Login" />}
      {token ? <Logout onClick={() => logout(setToken)}>Log Out</Logout> : ""}
    </VertialBar>
  );
};

export default TopBar;
