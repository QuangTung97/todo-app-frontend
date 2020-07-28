import React, { useState, useContext, useEffect } from "react";

import { useTitle } from "../hooks";
import Layout from "../Layout";
import {
  List,
  ListItem,
  Input,
  Button,
  Loader,
  ErrorText,
  EditButton,
  DeleteButton,
  Dialog
} from "../util";
import styled from "styled-components";
import AppContext from "../context";
import { apiPost, apiGet } from "../api";
import { DeleteDialog, EditDialog } from "./dialogs";
import RightPanel from "./RightPanel";

const Form = styled.form`
  margin: 0;
`;

const AddTodoButton = styled(Button)`
  margin-left: 4px;
  border-radius: 10px;
`;

const AddTotoBar = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`;

const LeftPanel = styled.div`
  flex: 3;
`;

const ListContent = styled.div`
  padding: 0.5px 0;
  background-color: #ddd;
`;

const TodoName = styled.div`
  font-family: sans-serif;
  font-size: 20px;
  color: green;
  padding: 4px 8px;
`;

const ItemButtons = styled.div`
  margin-left: auto;
  display: flex;
`;

const MainContent = styled.div`
  display: flex;
`;

const TodoList = ({ name, active, onClick, onClickEdit, onClickDelete }) => (
  <ListItem active={active} onClick={onClick}>
    <TodoName>{name}</TodoName>
    <ItemButtons>
      <EditButton onClick={onClickEdit} />
      <DeleteButton onClick={onClickDelete} />
    </ItemButtons>
  </ListItem>
);

const Home = () => {
  useTitle("Todo App");

  const [name, setName] = useState("");
  const [state, setState] = useState("initial"); // initial, loading, error
  const [todos, setTodos] = useState([]);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const { token, setToken } = useContext(AppContext);

  const onChangeName = e => {
    if (state === "error") {
      setState("initial");
    }
    setName(e.target.value);
  };

  const fetchTodos = () => {
    apiGet("/todos", token, setToken).then(res => setTodos(res.todos));
  };

  const onAdd = async function(e) {
    e.preventDefault();

    setState("loading");
    try {
      const res = await apiPost("/todos", { name }, token, setToken);
      setState("initial");
      console.log(res);
      fetchTodos();
    } catch (e) {
      setState("error");
      console.log(e);
    }
  };

  const onClickDelete = todo => {
    setOpenDelete(true);
    setSelectedTodo(todo);
  };

  const onClickEdit = todo => {
    setOpenEdit(true);
    setSelectedTodo(todo);
  };

  useEffect(fetchTodos, []);

  return (
    <Layout>
      <Form onSubmit={onAdd}>
        <AddTotoBar>
          <Input value={name} onChange={onChangeName} />
          <AddTodoButton type="submit">Add</AddTodoButton>
          {state === "loading" ? <Loader /> : ""}
          {state === "error" ? (
            <ErrorText>An error had happened!</ErrorText>
          ) : (
            ""
          )}
        </AddTotoBar>
      </Form>
      <MainContent>
        <LeftPanel>
          <ListContent>
            <List>
              {todos &&
                todos.map(e => (
                  <TodoList
                    onClick={() => setCurrentTodoId(e.id)}
                    active={e.id === currentTodoId}
                    key={e.id}
                    name={e.name}
                    onClickEdit={() => onClickEdit(e)}
                    onClickDelete={() => onClickDelete(e)}
                  />
                ))}
            </List>
          </ListContent>
        </LeftPanel>
        <RightPanel currentTodoId={currentTodoId} />

        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DeleteDialog
            todo={selectedTodo}
            refresh={fetchTodos}
            onCancel={() => setOpenDelete(false)}
          />
        </Dialog>
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <EditDialog
            todo={selectedTodo}
            refresh={fetchTodos}
            onCancel={() => setOpenEdit(false)}
          />
        </Dialog>
      </MainContent>
    </Layout>
  );
};

export default Home;
