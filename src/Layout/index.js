import React from "react";
import styled from "styled-components";

import TopBar from "./TopBar";

const FullPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => {
  return (
    <FullPage>
      <TopBar />
      {children}
    </FullPage>
  );
};

export default Layout;
