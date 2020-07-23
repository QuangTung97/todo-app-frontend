import React, { useContext } from "react";
import AppContext from "./context";
import { Route, Redirect } from "react-router-dom";

const PrivatedRoute = ({ exact, path, children }) => {
  const { token } = useContext(AppContext);
  return token === null ? (
    <Redirect to="/login" />
  ) : (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default PrivatedRoute;
