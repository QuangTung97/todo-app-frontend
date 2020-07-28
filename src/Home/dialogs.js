import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Button, SecondaryButton, Input } from "../util";
import AppContext from "../context";
import { apiDelete, apiPut } from "../api";

const DialogBox = styled.div`
  background-color: white;
  padding: 16px;
`;

const DialogTitle = styled.h2`
  color: #008000;
  font-family: sans-serif;
  font-size: 24px;
  & > span {
    color: #e00;
  }
`;

const YesButton = styled(Button)`
  width: 100px;
`;

const NoButton = styled(SecondaryButton)`
  width: 100px;
  margin-left: 4px;
`;

const DialogButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditInput = styled(Input)`
  margin: 16px 8px;
`;

export const EditDialog = ({ todo, refresh, onCancel }) => {
  const [name, setName] = useState(todo && todo.name);

  useEffect(() => {
    setName(todo.name);
  }, [todo.name]);

  const enableSave = todo.name !== name;

  const { token, setToken } = useContext(AppContext);

  const onSubmit = e => {
    e.preventDefault();
    apiPut(
      "/todos",
      {
        id: todo.id,
        name
      },
      token,
      setToken
    ).then(() => {
      refresh();
      onCancel();
    });
  };

  return todo ? (
    <DialogBox>
      <DialogTitle>Edit Todo List</DialogTitle>
      <form onSubmit={onSubmit}>
        <EditInput
          autoFocus
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <DialogButtons>
          <YesButton type="submit" disabled={!enableSave}>
            Save
          </YesButton>
          <NoButton onClick={onCancel}>Close</NoButton>
        </DialogButtons>
      </form>
    </DialogBox>
  ) : (
    <div></div>
  );
};

export const DeleteDialog = ({ todo, refresh, onCancel }) => {
  const { token, setToken } = useContext(AppContext);

  const onYes = () => {
    apiDelete(`/todos/${todo.id}`, token, setToken).then(() => {
      refresh();
      onCancel();
    });
  };

  return todo ? (
    <DialogBox>
      <DialogTitle>
        Do you want to delete: <span>{todo.name}</span> ?
      </DialogTitle>
      <DialogButtons>
        <YesButton onClick={onYes}>Yes</YesButton>
        <NoButton onClick={onCancel}>No</NoButton>
      </DialogButtons>
    </DialogBox>
  ) : (
    <div></div>
  );
};
