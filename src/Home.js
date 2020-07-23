import React, { useContext } from "react";
import { Button } from "./util";
import AppContext from "./context";
import { apiPost } from "./api";

const Home = () => {
  const { token, setToken } = useContext(AppContext);

  const onClick = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  async function createAccount() {
    try {
      const res = await apiPost(
        "/accounts",
        { username: "quangtung1997", password: "admin1234" },
        token,
        setToken
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h2>Home Page</h2>
      <Button onClick={createAccount}>Create Account</Button>
      <Button onClick={onClick}>Logout</Button>
    </div>
  );
};

export default Home;
