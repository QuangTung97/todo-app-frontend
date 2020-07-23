import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./Login";
import AppContext from "./context";
import ErrorPage from "./ErrorPage";
import PrivatedRoute from "./PrivatedRoute";
import Home from "./Home";

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const context = {
    token,
    setToken
  };

  const onChangeToken = useCallback(e => {
    if (e.key === "token") {
      setToken(e.newValue);
    }
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("token") || null);
    setLoading(false);
    addEventListener("storage", onChangeToken);
    return () => {
      removeEventListener("storage", onChangeToken);
    };
  }, [onChangeToken]);

  return loading ? (
    <div></div>
  ) : (
    <AppContext.Provider value={context}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivatedRoute exact path="/">
            <Home />
          </PrivatedRoute>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
