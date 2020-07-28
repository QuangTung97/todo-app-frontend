import React from "react";
import styled from "styled-components";

const DialogOuter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = ({ children }) => {
  const onClick = e => {
    e.stopPropagation();
  };
  return <div onClick={onClick}>{children}</div>;
};

const Dialog = ({ children, open, onClose }) => {
  return (
    <React.Fragment>
      {open ? (
        <DialogOuter onClick={onClose}>
          <Content>{children}</Content>
        </DialogOuter>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default Dialog;
