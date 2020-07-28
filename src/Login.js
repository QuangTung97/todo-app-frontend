import React, { useState, useContext } from "react";
import styled from "styled-components";

import { Loader, Input, Paper, FormLabel, Button } from "./util";
import { login } from "./api";
import AppContext from "./context";
import { Redirect } from "react-router";
import { useTitle } from "./hooks";
import Layout from "./Layout";

const Background = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.h3`
  color: #0384c3;
  font-weight: bold;
  font-size: 30px;
  margin: 0;
  text-align: center;
  font-family: Sans-serif;
  margin-right: 8px;
`;

const LoginForm = styled(Paper)`
  background-color: #eee;
  padding: 20px;
`;

const Label = styled(FormLabel)`
  color: #0384c3;
`;

const Submit = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
`;

const ErrorMsg = styled.h4`
  color: red;
`;

const defaultErrMsg = "Encounter an error while login";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("initial"); // initial, loading, error
  const [errorMsg, setErrorMsg] = useState(defaultErrMsg);

  useTitle("Login");

  const { token, setToken } = useContext(AppContext);

  async function onSubmit(e) {
    e.preventDefault();
    setState("loading");
    try {
      const token = await login(username, password, setToken);
      if (token === null) {
        setState("error");
        setErrorMsg("Username or password is incorrect");
        return;
      }
      setState("initial");
      setToken(token);
      localStorage.setItem("token", token);
    } catch (e) {
      setState("error");
      setErrorMsg("Network error");
    }
  }

  const changeUsername = e => {
    setState("initial");
    setUsername(e.target.value);
  };

  const changePassword = e => {
    setState("initial");
    setPassword(e.target.value);
  };

  return token === null ? (
    <Layout>
      <Background>
        <LoginForm>
          <form onSubmit={onSubmit}>
            <Title>
              <LoginTitle>Todo App</LoginTitle>
              {state === "loading" ? <Loader /> : ""}
            </Title>
            <ErrorMsg>{state === "error" ? errorMsg : ""}</ErrorMsg>
            <div>
              <Label>Username</Label>
              <Input type="text" value={username} onChange={changeUsername} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={changePassword}
              />
            </div>
            <div>
              <Submit type="submit">Login</Submit>
            </div>
          </form>
        </LoginForm>
      </Background>
    </Layout>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
