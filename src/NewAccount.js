import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useTitle } from "./hooks";
import Layout from "./Layout";
import { Loader, Button, FormLabel, Paper, Input } from "./util";
import { apiPost } from "./api";
import AppContext from "./context";
import { useHistory } from "react-router";

const Centered = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const CreateTitle = styled.h3`
  color: #0384c3;
  font-weight: bold;
  font-size: 30px;
  margin: 0;
  font-family: Sans-serif;
  margin-right: 8px;
`;

const Label = styled(FormLabel)`
  margin-top: 12px;
  color: #0384c3;
`;

const CreateForm = styled(Paper)`
  padding: 24px;
  background-color: #eee;
`;

const Submit = styled(Button)`
  margin-top: 12px;
  width: 100%;
`;

const ErrorMsg = styled.h4`
  color: red;
`;

const USERNAME_REGEX = "^[a-zA-Z][a-zA-Z0-9]+$";

const NewAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState("initial"); // initial, loading, error

  useTitle("Sign Up");

  const { token, setToken } = useContext(AppContext);

  const history = useHistory();

  const usernameValid =
    username === "" ||
    (username.length >= 4 &&
      username.length <= 30 &&
      username.match(USERNAME_REGEX));
  const passwordValid = password === "" || password.length >= 5;
  const confirmValid = password === confirm;
  const enabled =
    username.length >= 4 &&
    username.length <= 30 &&
    username.match(USERNAME_REGEX) &&
    password.length >= 5 &&
    password === confirm;

  async function createAccount() {
    try {
      setState("loading");
      const res = await apiPost(
        "/accounts",
        { username, password },
        token,
        setToken
      );
      if (res.error) {
        setState("error");
      } else {
        history.push("/login");
        setState("initial");
      }
      console.log(res);
    } catch (e) {
      setState("error");
      console.log(e);
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    if (enabled) {
      createAccount();
    }
  };

  return (
    <Layout>
      <Centered>
        <CreateForm>
          <form onSubmit={onSubmit}>
            <Title>
              <CreateTitle>Sign Up</CreateTitle>
              {state === "loading" ? <Loader /> : ""}
            </Title>
            <ErrorMsg>
              {state === "error" ? "Can't create this account" : ""}
            </ErrorMsg>
            <Label required>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              error={!usernameValid}
            />
            <Label required>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={!passwordValid}
            />
            <Label required>Password Confirmation</Label>
            <Input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              error={!confirmValid}
            />
            <div>
              <Submit disabled={!enabled}>Create</Submit>
            </div>
          </form>
        </CreateForm>
      </Centered>
    </Layout>
  );
};

export default NewAccount;
